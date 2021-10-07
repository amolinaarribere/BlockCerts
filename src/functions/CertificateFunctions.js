// Certificate
const Aux = require("./AuxiliaryFunctions.js");

export var pendingCertificates = []
export var certificatesByHolder = []
export var currentHolder = "";
export var certificateProvider = ""

export function SwitchContext(){
  currentHolder = "";
  certificatesByHolder = []
  certificateProvider = ""
}

export async function AddCertificate(hash, holder, price, contractType, contract, pool){
  (3 != contractType)? 
    await Aux.CallBackFrame(contract.methods.addCertificate(hash, holder).send({from: Aux.account, value: price})) :
    await Aux.CallBackFrame(contract.methods.addCertificate(pool, hash, holder).send({from: Aux.account }));

    /*if("" == pool){
      await Aux.CallBackFrame(contract.methods.addCertificate(hash, holder).send({from: Aux.account, value: price}));
    }
    else{
      await Aux.CallBackFrame(contract.methods.addCertificate(pool, hash, holder).send({from: Aux.account }));
    }*/
    
  }

  export async function AddCertificateOnBehalfOf(provider, hash, holder, nonce, deadline, signature, contract, price){
    await Aux.CallBackFrame(contract.methods.addCertificateOnBehalfOf(provider, hash, holder, nonce, deadline, signature).send({from: Aux.account, value: price }));
  }

  export async function ValidateCertificate(pool, hash, holder, contract){
    await Aux.CallBackFrame(contract.methods.validateCertificate(pool, hash, holder).send({from: Aux.account }));
  }

  export async function RejectCertificate(pool, hash, holder, contract){
    await Aux.CallBackFrame(contract.methods.rejectCertificate(pool, hash, holder).send({from: Aux.account }));
  }

  export async function RetrievePendingCertificates(contract){
    pendingCertificates = []
    let pendingCerts = await contract.methods.retrievePendingCertificates().call({from: Aux.account });
    for (let i = 0; i < pendingCerts.length; i++) {
      pendingCertificates[i] = [pendingCerts[i][0], pendingCerts[i][1], pendingCerts[i][2]]
    }
  }

  export async function CheckCertificate(hash, address, contract){
    try{
      certificateProvider = await contract.methods.retrieveCertificateProvider(hash, address).call({from: Aux.account });
      if (certificateProvider == "0x0000000000000000000000000000000000000000")certificateProvider = "Certificate Does not Belong to Holder " + address
      else certificateProvider = "Certificate Provided by " + certificateProvider + " to " + address
    }
    catch(e) { window.alert(e); }
  }

  export async function retrieveCertificatesByHolder(address, init, max, contract){
    try{
      certificatesByHolder = []
      currentHolder = address;
      certificatesByHolder = await contract.methods.retrieveCertificatesByHolder(address, init, max).call({from: Aux.account });
    }
    catch(e) { window.alert("here " + e); }
    
  }
