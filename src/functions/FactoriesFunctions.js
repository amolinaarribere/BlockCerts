 // Factories
 const Aux = require("./AuxiliaryFunctions.js");

 export var Addresses = []

 export async function CreatenewPoolProvider(min, list, name, contract, price){
  await Aux.CallBackFrame(contract.methods.create(list, min, name).send({from: Aux.account , value: price}));
  /*if(2 == contractType) await Aux.CallBackFrame(Contracts.privatePoolFactory.methods.create(list, min, name).send({from: Aux.account , value: Treasury.PrivatePriceWei}));
  else await Aux.CallBackFrame(Contracts.providerFactory.methods.create(list, min, name).send({from: Aux.account , value: Treasury.ProviderPriceWei}));*/
}

 export async function RetrieveFactories(contract){
  let TotalPool = await contract.methods.retrieveTotal().call()
  Addresses = []

  for (let i = 0; i < TotalPool; i++) {
    let Address = await contract.methods.retrieve(i).call()
    Addresses[i] = Address
  }
    /*let privateTotalPool = await Contracts.privatePoolFactory.methods.retrieveTotal().call()
    privatePoolAddresses = []

    for (let i = 0; i < privateTotalPool; i++) {
      let privatePoolAddress = await Contracts.privatePoolFactory.methods.retrieve(i).call()
      privatePoolAddresses[i] = privatePoolAddress
    }

    let providerTotalPool = await Contracts.providerFactory.methods.retrieveTotal().call()
    providerAddresses = []

    for (let i = 0; i < providerTotalPool; i++) {
      let providerAddress = await Contracts.providerFactory.methods.retrieve(i).call()
      providerAddresses[i] = providerAddress
    }*/
  }