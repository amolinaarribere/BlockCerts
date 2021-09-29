// Certificate
const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");
const Treasury = require("./TreasuryFunctions.js");
const ProviderPool = require("./ProviderPoolFunctions.js");

export var pendingCertificates = []
export var certificatesByHolder = []
export var currentHolder = "";
export var certificateProvider = ""

export function SwitchContext(){
  currentHolder = "";
  certificatesByHolder = []
  certificateProvider = ""
}

export async function AddCertificate(hash, holder, isPrivate, contractType, pool){
    if(3 != contractType){
      if(true == isPrivate) await Aux.CallBackFrame(ProviderPool.privatePool.methods.addCertificate(hash, holder).send({from: Aux.account }));
      else await Aux.CallBackFrame(Contracts.publicPool.methods.addCertificate(hash, holder).send({from: Aux.account , value: Treasury.CertificatePriceWei}));
    }
    else{
      await Aux.CallBackFrame(ProviderPool.provider.methods.addCertificate(pool, hash, holder).send({from: Aux.account }));
    }
    
  }

  export async function AddCertificateOnBehalfOf(provider, hash, holder, deadline, signature, isPrivate){
    if(true == isPrivate) await Aux.CallBackFrame(ProviderPool.privatePool.methods.addCertificateOnBehalfOf(provider, hash, holder, deadline, signature).send({from: Aux.account }));
    else await Aux.CallBackFrame(Contracts.publicPool.methods.addCertificateOnBehalfOf(provider, hash, holder, deadline, signature).send({from: Aux.account , value: Treasury.CertificatePriceWei}));
  }

  export async function ValidateCertificate(pool, hash, holder){
    await Aux.CallBackFrame(ProviderPool.provider.methods.validateCertificate(pool, hash, holder).send({from: Aux.account }));
  }

  export async function RejectCertificate(pool, hash, holder){
    await Aux.CallBackFrame(ProviderPool.provider.methods.rejectCertificate(pool, hash, holder).send({from: Aux.account }));
  }

  export async function RetrievePendingCertificates(){
    pendingCertificates = []
    let pendingCerts = await ProviderPool.provider.methods.retrievePendingCertificates().call({from: Aux.account });
    for (let i = 0; i < pendingCerts.length; i++) {
      pendingCertificates[i] = [pendingCerts[i][0], pendingCerts[i][1], pendingCerts[i][2]]
    }
  }

  export async function CheckCertificate(hash, address, isPrivate){
    try{
      if(true == isPrivate) certificateProvider = await ProviderPool.privatePool.methods.retrieveCertificateProvider(hash, address).call({from: Aux.account });
      else certificateProvider = await Contracts.publicPool.methods.retrieveCertificateProvider(hash, address).call({from: Aux.account });
      if (certificateProvider == "0x0000000000000000000000000000000000000000")certificateProvider = "Certificate Does not Belong to Holder " + address
      else certificateProvider = "Certificate Provided by " + certificateProvider + " to " + address
    }
    catch(e) { window.alert(e); }
  }

  export async function retrieveCertificatesByHolder(address, init, max, isPrivate){
    try{
      certificatesByHolder = []
      currentHolder = address;
      if(true == isPrivate) {
        certificatesByHolder = await ProviderPool.privatePool.methods.retrieveCertificatesByHolder(address, init, max).call({from: Aux.account });
      }
      else{
        certificatesByHolder = await Contracts.publicPool.methods.retrieveCertificatesByHolder(address, init, max).call({from: Aux.account });
      }
    }
    catch(e) { window.alert("here " + e); }
    
  }