 // Factories
 import {ETHDecimals} from '../config'

 const Aux = require("./AuxiliaryFunctions.js");
 const ENSFunc = require("./ENSFunctions.js");


 export var Addresses = []

 export async function CreatenewPoolProvider(min, list, name, ensName, contract, price){
  await Aux.CallBackFrame(contract.methods.create(list, min, name, ensName).send({from: Aux.account , value: price * ETHDecimals}));
}

 export async function RetrieveFactories(contract){
  try{
      let Total = await contract.methods.retrieveTotal().call()
      Addresses = []

      for (let i = 0; i < Total; i++) {
        let Address = await ENSFunc.ReverseResolution(await contract.methods.retrieve(i).call())
        Addresses[i] = Address
      }
   }
  catch(e){
    window.alert("error retrieving the factories items : " + JSON.stringify(e))
  }

  }