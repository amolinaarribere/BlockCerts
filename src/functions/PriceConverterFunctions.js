import { USDFactor } from '../config';

const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');
const ENSFunc = require("./ENSFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");


export var RegistryAddress = "";
export var PendingRegistryAddress = "";

  export async function CentsToWeis(amountInCents, contract){
    let CheckAmount = ValidationFunc.validatePositiveFloat(amountInCents);

    if(true == CheckAmount[1]){
      try{
        let NewAmountInCents = CheckAmount[0].multipliedBy(USDFactor);
        let CheckAmountInCents = ValidationFunc.validatePositiveLargeInteger(NewAmountInCents);

        if(true == CheckAmountInCents[1]){
          let resultInWei =new BigNumber(await contract.methods.fromUSDToETH(CheckAmountInCents[0].toString()).call());
          if(resultInWei != undefined)return [resultInWei, true];
        }
        else ValidationFunc.FormatErrorMessage([CheckAmountInCents[1]], ["Amount"]);
        return ["-", false];
      }
      catch(e) { 
        window.alert("error getting the USD to Ether excahgne rate : " + JSON.stringify(e)); 
        return ["-", false];
      }
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAmount[1]], ["Amount"]);
      return ["-", false];
    }
    
  }

  export async function RetrieveRegistryAddress(contract){
    try{
      RegistryAddress = await ENSFunc.ReverseResolution(await contract.methods.retrieveSettings().call());
    }
    catch(e) { 
      window.alert("error retrieving the registry address : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePendingRegistryAddress(contract){
    try{
      let result = await contract.methods.retrieveProposition().call();
      PendingRegistryAddress = "-"
      
      if(result[0] != undefined)PendingRegistryAddress = await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(result[0]))
    }
    catch(e) { 
      window.alert("error retrieving the pending registry address : " + JSON.stringify(e)); 
    }
    
  }
    