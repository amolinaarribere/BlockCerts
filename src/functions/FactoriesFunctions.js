 // Factories
 import {ETHDecimals} from '../config'

 const Aux = require("./AuxiliaryFunctions.js");
 const ENSFunc = require("./ENSFunctions.js");


 export var ProviderAddresses = []
 export var PrivatePoolAddresses = []

 export async function CreatenewPoolProvider(min, list, name, ensName, contract, price){
  await Aux.CallBackFrame(contract.methods.create(list, min, name, ensName).send({from: Aux.account , value: price * ETHDecimals}));
}

 export async function RetrieveFactories(contract, contractType){
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
    if(2 == contractType){
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