 const Aux = require("./AuxiliaryFunctions.js");
 const ENSFunc = require("./ENSFunctions.js");
 const ValidationFunc = require("./ValidationFunctions.js");


 export var ProviderAddresses = []
 export var PrivatePoolAddresses = []

 export async function CreatenewPoolProvider(min, list, name, ensName, contract, price){
  let CheckMin = ValidationFunc.validatePositiveInteger(min);
  let CheckName = ValidationFunc.validateString(name);
  let CheckENSName = ValidationFunc.validateString(ensName);
  let CheckPrice = ValidationFunc.validatePositiveFloat(price);
  let CheckListOfOwners = true;

  for(let i=0; i < list.length; i++){
    let CheckOwner = ValidationFunc.validateAddress(list[i]);
    if(false == CheckOwner) {
      CheckListOfOwners = false
      break;
    }
  }

  if(true == CheckMin[1] &&
    true == CheckPrice[1] &&
    true == CheckListOfOwners){
      await Aux.CallBackFrame(contract.methods.create(list, CheckMin[0], CheckName, CheckENSName).send({from: Aux.account , value: CheckPrice[0]}));
    }
  else{
    ValidationFunc.FormatErrorMessage([CheckMin[1], CheckPrice[1], CheckListOfOwners], 
      ["Minimum", "Price", "Owner's list"]);
  }

}

 export async function RetrieveFactories(contract, contractType){
  let CheckContractType = ValidationFunc.validatePositiveInteger(contractType);

  if(true == CheckContractType[1]){
    try{
      let Total = await contract.methods.retrieveTotal().call()
      let Addresses = []
  
      for (let i = 0; i < Total; i++) {
        let result = await contract.methods.retrieve(i).call();
        let AddressCreator = await ENSFunc.ReverseResolution(result[0])
        let AddressElement = await ENSFunc.ReverseResolution(result[1])
        let ElementName = await ENSFunc.ReverseResolution(result[2])
        Addresses[i] = [AddressCreator, AddressElement, ElementName]
      }
      if(2 == CheckContractType[0]){
        PrivatePoolAddresses = Addresses
      }
      else{
        ProviderAddresses = Addresses
      }
       
    }
    catch(e){
      window.alert("error retrieving the factories items : " + JSON.stringify(e))
    }
  }
  else{
    ValidationFunc.FormatErrorMessage([CheckContractType[1]], ["Contract Type"]);
  }

}