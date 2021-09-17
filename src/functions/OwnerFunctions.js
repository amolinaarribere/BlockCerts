// Owner
const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");
const ProviderPool = require("./ProviderPoolFunctions.js");

export var publicMinOwners = ""
export var publicPendingMinOwners = ""
export var publicTotalOwners = ""
export var publicOwners = []
export var privateMinOwners = ""
export var privatePendingMinOwners = ""
export var privateTotalOwners = ""
export var privateOwners = []
export var providerMinOwners = ""
export var providerPendingMinOwners = ""
export var providerTotalOwners = ""
export var providerOwners = []
export var pendingPublicOwnersAdd = []
export var pendingPublicOwnersRemove = []
export var pendingPrivateOwnersAdd = [] 
export var pendingPrivateOwnersRemove = []
export var pendingProviderOwnersAdd = []
export var pendingProviderOwnersRemove = []

export async function AddOwner(address, info, contractType){
    if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.addOwner(address, info).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(ProviderPool.privatePool.methods.addOwner(address, info).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.addOwner(address, info).send({from: Aux.account }));
  }
  
  export async function RemoveOwner(address, contractType){
    if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.removeOwner(address).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(ProviderPool.privatePool.methods.removeOwner(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.removeOwner(address).send({from: Aux.account }));

  }

  export async function ValidateOwner(address, contractType){
    if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.validateOwner(address).send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.validateOwner(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.validateOwner(address).send({from: Aux.account }));
  }

  export async function RejectOwner(address, contractType){
    if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.rejectOwner(address).send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.rejectOwner(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.rejectOwner(address).send({from: Aux.account }));
  }

  export async function RetrieveOwners(contractType){
    try{
      if(1 == contractType){
        publicMinOwners = await Contracts.publicPool.methods.retrieveMinOwners().call()
        publicOwners = await Contracts.publicPool.methods.retrieveAllOwners().call()
        publicTotalOwners = publicOwners.length
  
        pendingPublicOwnersAdd = []
        let pendingPublicOwnersAddAddresses = await Contracts.publicPool.methods.retrievePendingOwners(true).call();
        for (let i = 0; i < pendingPublicOwnersAddAddresses.length; i++) {
          let {0:Info} = await Contracts.publicPool.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingPublicOwnersAddAddresses[i])).call();
          pendingPublicOwnersAdd[i] = [pendingPublicOwnersAddAddresses[i], Info]
        }
  
        pendingPublicOwnersRemove = []
        let pendingPublicOwnersRemoveAddresses = await Contracts.publicPool.methods.retrievePendingOwners(false).call();
        for (let i = 0; i < pendingPublicOwnersRemoveAddresses.length; i++) {
          let {0:Info} = await Contracts.publicPool.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingPublicOwnersRemoveAddresses[i])).call();
          pendingPublicOwnersRemove[i] = [pendingPublicOwnersRemoveAddresses[i], Info]
        }
  
        publicPendingMinOwners = await Contracts.publicPool.methods.retrievePendingMinOwners().call();
      }
      else if(2 == contractType){
        
        privateMinOwners = await ProviderPool.privatePool.methods.retrieveMinOwners().call()
        privateOwners = await ProviderPool.privatePool.methods.retrieveAllOwners().call()
        privateTotalOwners = privateOwners.length
  
        pendingPrivateOwnersAdd = []
        let pendingPrivateOwnersAddAddresses = await ProviderPool.privatePool.methods.retrievePendingOwners(true).call();
        for (let i = 0; i < pendingPrivateOwnersAddAddresses.length; i++) {
          let {0:Info} = await ProviderPool.privatePool.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingPrivateOwnersAddAddresses[i])).call();
          pendingPrivateOwnersAdd[i] = [pendingPrivateOwnersAddAddresses[i], Info]
        }
  
        pendingPrivateOwnersRemove = []
        let pendingPrivateOwnersRemoveAddresses = await ProviderPool.privatePool.methods.retrievePendingOwners(false).call();
        for (let i = 0; i < pendingPrivateOwnersRemoveAddresses.length; i++) {
          let {0:Info} = await ProviderPool.privatePool.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingPrivateOwnersRemoveAddresses[i])).call();
          pendingPrivateOwnersRemove[i] = [pendingPrivateOwnersRemoveAddresses[i], Info]
        }
  
        privatePendingMinOwners = await ProviderPool.privatePool.methods.retrievePendingMinOwners().call();
      }
      else{
        providerMinOwners = await ProviderPool.provider.methods.retrieveMinOwners().call()
        providerOwners = await ProviderPool.provider.methods.retrieveAllOwners().call()
        providerTotalOwners = providerOwners.length
  
        pendingProviderOwnersAdd = []
        let pendingProviderOwnersAddAddresses = await ProviderPool.provider.methods.retrievePendingOwners(true).call();
        for (let i = 0; i < pendingProviderOwnersAddAddresses.length; i++) {
          let {0:Info} = await ProviderPool.provider.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingProviderOwnersAddAddresses[i])).call();
          pendingProviderOwnersAdd[i] = [pendingProviderOwnersAddAddresses[i], Info]
        }
  
        pendingProviderOwnersRemove = []
        let pendingProviderOwnersRemoveAddresses = await ProviderPool.provider.methods.retrievePendingOwners(false).call();
        for (let i = 0; i < pendingProviderOwnersRemoveAddresses.length; i++) {
          let {0:Info} = await ProviderPool.provider.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingProviderOwnersRemoveAddresses[i])).call();
          pendingProviderOwnersRemove[i] = [pendingProviderOwnersRemoveAddresses[i], Info]
        }
  
        providerPendingMinOwners = await ProviderPool.provider.methods.retrievePendingMinOwners().call();
      }
    }
    catch(e){}
  }

  export async function UpdateMinOwner(minOwner, contractType){
    if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.changeMinOwners(minOwner).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(ProviderPool.privatePool.methods.changeMinOwners(minOwner).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.changeMinOwners(minOwner).send({from: Aux.account }));
  }

  export async function ValidateMinOwner(contractType){
    if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.validateMinOwners().send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.validateMinOwners().send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.validateMinOwners().send({from: Aux.account }));
  }

  export async function RejectMinOwner(contractType){
    if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.rejectMinOwners().send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.rejectMinOwners().send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.rejectMinOwners().send({from: Aux.account }));
  }