 // Factories
 const Aux = require("./AuxiliaryFunctions.js");

 export var Addresses = []

 export async function CreatenewPoolProvider(min, list, name, contract, price){
  await Aux.CallBackFrame(contract.methods.create(list, min, name).send({from: Aux.account , value: price}));
}

 export async function RetrieveFactories(contract){
  let TotalPool = await contract.methods.retrieveTotal().call()
  Addresses = []

  for (let i = 0; i < TotalPool; i++) {
    let Address = await contract.methods.retrieve(i).call()
    Addresses[i] = Address
  }

  }