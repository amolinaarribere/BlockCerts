// Certificate
import {ProviderContractType} from '../config'

const Aux = require("./AuxiliaryFunctions.js");
const ENSFunc = require("./ENSFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");


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
  let CheckHash = ValidationFunc.validateHash(hash);
  let CheckHolder = ValidationFunc.validateAddress(holder);
  let CheckPrice = ValidationFunc.validatePositiveFloat(price);
  let CheckContractType = ValidationFunc.validatePositiveInteger(contractType);
  let CheckPool = (ProviderContractType != CheckContractType[0])? true : ValidationFunc.validateAddress(pool);

  if(true == CheckHash &&
    true == CheckHolder &&
    true == CheckPrice[1] &&
    true == CheckContractType[1] &&
    true == CheckPool){
      (ProviderContractType != CheckContractType[0])? 
        await Aux.CallBackFrame(contract.methods.addCertificate(hash, holder).send({from: Aux.account, value: CheckPrice[0]})) :
        await Aux.CallBackFrame(contract.methods.addCertificate(pool, hash, holder).send({from: Aux.account }));
    }
  else{
    ValidationFunc.FormatErrorMessage([CheckHash, CheckHolder, CheckPrice[1], CheckContractType[1], CheckPool], ["Hash", "Holder", "Price", "Contract Type", "Pool"]);
  }
}

  export async function AddCertificateOnBehalfOf(provider, hash, holder, nonce, deadline, signature, contract, price){
    let CheckProvider = ValidationFunc.validateAddress(provider);
    let CheckHash = ValidationFunc.validateHash(hash);
    let CheckHolder = ValidationFunc.validateAddress(holder);
    let CheckNonce = ValidationFunc.validatePositiveInteger(nonce);
    let CheckDeadline = ValidationFunc.validatePositiveLargeInteger(deadline);
    let CheckSignature = ValidationFunc.validateSignature(signature);
    let CheckPrice = ValidationFunc.validatePositiveFloat(price);

    if(true == CheckProvider &&
      true == CheckHash &&
      true == CheckHolder &&
      true == CheckNonce[1] &&
      true == CheckDeadline[1] &&
      true == CheckSignature &&
      true == CheckPrice[1]){
        await Aux.CallBackFrame(contract.methods.addCertificateOnBehalfOf(provider, hash, holder, CheckNonce[0], CheckDeadline[0], signature).send({from: Aux.account, value: CheckPrice[0]}));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckProvider, CheckHash, CheckHolder, CheckNonce[1], CheckDeadline[1], CheckSignature, CheckPrice[1]], 
        ["Provider", "Hash", "Holder", "Nonce", "Deadline", "Signature", "Price"]);
    }
  }

  export async function TransferCertificate(hash, newHolder, contract){
    let CheckHash = ValidationFunc.validateHash(hash);
    let CheckNewHolder = ValidationFunc.validateAddress(newHolder);

    if(true == CheckHash &&
      true == CheckNewHolder){
        await Aux.CallBackFrame(contract.methods.transferCertificate(hash, newHolder).send({from: Aux.account }));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckHash, CheckNewHolder], ["Hash", "New Holder"]);
    }
  }

  export async function ValidateCertificate(pool, hash, holder, contract){
    let CheckPool = ValidationFunc.validateAddress(pool);
    let CheckHash = ValidationFunc.validateHash(hash);
    let CheckHolder = ValidationFunc.validateAddress(holder);

    if(true == CheckPool &&
      true == CheckHash &&
      true == CheckHolder){
        await Aux.CallBackFrame(contract.methods.validateCertificate(pool, hash, holder).send({from: Aux.account }));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckPool, CheckHash, CheckHolder], ["Pool", "Hash", "Holder"]);
    }
  }

  export async function RejectCertificate(pool, hash, holder, contract){
    let CheckPool = ValidationFunc.validateAddress(pool);
    let CheckHash = ValidationFunc.validateHash(hash);
    let CheckHolder = ValidationFunc.validateAddress(holder);

    if(true == CheckPool &&
      true == CheckHash &&
      true == CheckHolder){
        await Aux.CallBackFrame(contract.methods.rejectCertificate(pool, hash, holder).send({from: Aux.account }));
      }
    else{
      ValidationFunc.FormatErrorMessage([CheckPool, CheckHash, CheckHolder], ["Pool", "Hash", "Holder"]);
    }
  }

  export async function RetrievePendingCertificates(contract){
    try{
      pendingCertificates = []
      let pendingCerts = await contract.methods.retrievePendingCertificates().call();
      for (let i = 0; i < pendingCerts.length; i++) {
        pendingCertificates[i] = [pendingCerts[i][0], pendingCerts[i][1], pendingCerts[i][2]]
      }
    }
    catch(e) { 
      window.alert("error retrieving pending certificates : " + JSON.stringify(e)); 
    }
    
  }

  export async function CheckCertificate(hash, address, contract){
    let CheckHash = ValidationFunc.validateHash(hash);
    let CheckAddress = ValidationFunc.validateAddress(address);

    if(true == CheckHash &&
      true == CheckAddress){
        try{
          certificateProvider = await contract.methods.retrieveCertificateProvider(hash, address).call();
          if (certificateProvider == "0x0000000000000000000000000000000000000000")certificateProvider = "Certificate Does not Belong to Holder " + await ENSFunc.ReverseResolution(address)
          else certificateProvider = "Certificate Provided by " + await ENSFunc.ReverseResolution(certificateProvider) + " to " + await ENSFunc.ReverseResolution(address)
        }
        catch(e) { 
          window.alert("error retrieving provider's certificate : " + JSON.stringify(e)); 
        }      
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckHash, CheckAddress], ["Hash", "Holder"]);
    }
  }

  export async function retrieveCertificatesByHolder(address, init, max, contract){
    let CheckInit = ValidationFunc.validatePositiveInteger(init);
    let CheckAddress = ValidationFunc.validateAddress(address);
    let CheckMax = ValidationFunc.validatePositiveInteger(max);

    if(true == CheckInit[1] &&
      true == CheckAddress &&
      true == CheckMax[1]){
        try{
          certificatesByHolder = []
          currentHolder = await ENSFunc.ReverseResolution(address);
          certificatesByHolder = await contract.methods.retrieveCertificatesByHolder(address, CheckInit[0], CheckMax[0]).call();
        }
        catch(e) { 
          window.alert("error retrieving holder's certificate : " + JSON.stringify(e)); 
        }    
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckInit[1], CheckAddress, CheckMax[1]], ["Init", "Holder", "Max"]);
    }
    
    
  }
