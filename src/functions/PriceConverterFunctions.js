const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');
const ENSFunc = require("./ENSFunctions.js");
const ValidationFunc = require("./ValidationFunctions.js");


export var RegistryAddress = "";
export var PendingRegistryAddress = "";

  export async function CentsToWeis(amountInCents, contract){
    let CheckAmount = ValidationFunc.validatePositiveLargeInteger(amountInCents);

    if(true == CheckAmount[1]){
      try{
        let resultInWei = new BigNumber(await contract.methods.fromUSDToETH(CheckAmount[0]).call());
        if(resultInWei != undefined)return resultInWei;
        return "-";
      }
      catch(e) { 
        window.alert("error getting the USD to Ether excahgne rate : " + JSON.stringify(e)); 
      }
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAmount[1]], ["Amount"]);
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
    