// Owner
const Aux = require("./AuxiliaryFunctions.js");
const load = require("./LoadFunctions.js");

export var isOwner;
export var MinOwners = ""
export var PendingMinOwners = ""
export var TotalOwners = ""
export var Owners = []
export var pendingOwnersAdd = []
export var pendingOwnersRemove = []


/*export var isPublicOwner;
export var isPrivateOwner;
export var isProviderOwner;
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
export var pendingProviderOwnersRemove = []*/

export async function AddOwner(address, info, contract){
    await Aux.CallBackFrame(contract.methods.addOwner(address, info).send({from: Aux.account }));
    /*if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.addOwner(address, info).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(ProviderPool.privatePool.methods.addOwner(address, info).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.addOwner(address, info).send({from: Aux.account }));*/
  }
  
  export async function RemoveOwner(address, contract){
    await Aux.CallBackFrame(contract.methods.removeOwner(address).send({from: Aux.account }));
    /*if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.removeOwner(address).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(ProviderPool.privatePool.methods.removeOwner(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.removeOwner(address).send({from: Aux.account }));*/

  }

  export async function ValidateOwner(address, contract){
    await Aux.CallBackFrame(contract.methods.validateOwner(address).send({from: Aux.account }));
    /*if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.validateOwner(address).send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.validateOwner(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.validateOwner(address).send({from: Aux.account }));*/
  }

  export async function RejectOwner(address, contract){
    await Aux.CallBackFrame(contract.methods.rejectOwner(address).send({from: Aux.account }));
    /*if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.rejectOwner(address).send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.rejectOwner(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.rejectOwner(address).send({from: Aux.account }));*/
  }

  export async function RetrieveOwners(contract){
    try{
        isOwner = false;
        MinOwners = await contract.methods.retrieveMinOwners().call()
        Owners = await contract.methods.retrieveAllOwners().call()
        TotalOwners = Owners.length
  
        pendingOwnersAdd = []
        let pendingOwnersAddAddresses = await contract.methods.retrievePendingOwners(true).call();
        for (let i = 0; i < pendingOwnersAddAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingOwnersAddAddresses[i])).call();
          pendingOwnersAdd[i] = [pendingOwnersAddAddresses[i], Info]
        }
  
        pendingOwnersRemove = []
        let pendingOwnersRemoveAddresses = await contract.methods.retrievePendingOwners(false).call();
        for (let i = 0; i < pendingOwnersRemoveAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrieveOwner(Aux.Bytes32ToAddress(pendingOwnersRemoveAddresses[i])).call();
          pendingOwnersRemove[i] = [pendingOwnersRemoveAddresses[i], Info]
        }
  
        PendingMinOwners = await contract.methods.retrievePendingMinOwners().call();

        if(load.Admin){
          let result = await contract.methods.retrieveOwner(Aux.account).call();
          isOwner = result[1];
        }
        else {
          isOwner = true;
        }
      /*if(1 == contractType){
        isPublicOwner = false;
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

        if(load.Admin){
          let resultPublic = await Contracts.publicPool.methods.retrieveOwner(Aux.account).call();
          isPublicOwner = resultPublic[1];
        }
        else {
          isPublicOwner = true;
        }
        
      }
      else if(2 == contractType){
        isPrivateOwner = false;
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

        if(load.Admin){
          let resultPrivate = await ProviderPool.privatePool.methods.retrieveOwner(Aux.account).call();
          isPrivateOwner = resultPrivate[1];
        }
        else {
          isPrivateOwner = true;
        }
      }
      else{
        isProviderOwner = false;
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

        if(load.Admin){
          let resultProvider = await ProviderPool.provider.methods.retrieveOwner(Aux.account).call();
          isProviderOwner = resultProvider[1];
        }
        else {
          isProviderOwner = true;
        }
      }*/
    }
    catch(e){}
  }

  export async function UpdateMinOwner(minOwner, contract){
    await Aux.CallBackFrame(contract.methods.changeMinOwners(minOwner).send({from: Aux.account }));
    /*if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.changeMinOwners(minOwner).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(ProviderPool.privatePool.methods.changeMinOwners(minOwner).send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.changeMinOwners(minOwner).send({from: Aux.account }));*/
  }

  export async function ValidateMinOwner(contract){
    await Aux.CallBackFrame(contract.methods.validateMinOwners().send({from: Aux.account }));
    /*if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.validateMinOwners().send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.validateMinOwners().send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.validateMinOwners().send({from: Aux.account }));*/
  }

  export async function RejectMinOwner(contract){
    await Aux.CallBackFrame(contract.methods.rejectMinOwners().send({from: Aux.account }));
    /*if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.rejectMinOwners().send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(ProviderPool.privatePool.methods.rejectMinOwners().send({from: Aux.account }));
    else await Aux.CallBackFrame(ProviderPool.provider.methods.rejectMinOwners().send({from: Aux.account }));*/
  }