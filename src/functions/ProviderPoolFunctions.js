// Provider - Pool
import {PRIVATE_ABI, PROVIDER_ABI } from '../config'

const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");
const OwnersFunc = require("./OwnerFunctions.js");
const CertificateFunc = require("./CertificateFunctions.js");
const BrowserStorageFunction = require("./BrowserStorageFunctions.js");

export var privatePool = "";
export var provider = "";

export var pendingAdd = [] 
export var pendingRemove = []
export var Balance = "";

export var privatePoolAddress = "";
export var providerAddress = "";

export var Total = ""
export var Items = []

/*export var pendingPublicProvidersAdd = [] 
export var pendingPublicProvidersRemove = []
export var pendingPrivateProvidersAdd = [] 
export var pendingPrivateProvidersRemove = []
export var pendingProviderPoolsAdd = [] 
export var pendingProviderPoolsRemove = []
export var providerBalance = "";

export var privatePoolAddress = "";
export var providerAddress = "";

export var publicTotalProviders = ""
export var publicProviders = []

export var privateTotalProviders = ""
export var privateProviders = []

export var providerTotalPools = ""
export var providerPools = []*/

export async function AddProviderPool(address, Info, subscribe, contractType, price, contract){
  (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.addProvider(address, Info).send({from: Aux.account , value: price})) :
      await Aux.CallBackFrame(contract.methods.addPool(address, Info, subscribe).send({from: Aux.account }));
    /*if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.addProvider(address, Info).send({from: Aux.account , value: Treasury.PublicPriceWei}));
    else if(2 == contractType)await Aux.CallBackFrame(privatePool.methods.addProvider(address, Info).send({from: Aux.account }));
    else await Aux.CallBackFrame(provider.methods.addPool(address, Info, subscribe).send({from: Aux.account }));*/
  }
  
  export async function RemoveProviderPool(address, contractType, contract){
    (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.removeProvider(address).send({from: Aux.account })) :
      await Aux.CallBackFrame(contract.methods.removePool(address).send({from: Aux.account }));
    /*if(1 == contractType) await Aux.CallBackFrame(Contracts.publicPool.methods.removeProvider(address).send({from: Aux.account }));
    else if(2 == contractType) await Aux.CallBackFrame(privatePool.methods.removeProvider(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(provider.methods.removePool(address).send({from: Aux.account }));*/
  }

  export async function ValidateProviderPool(address, contractType, contract){
    (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.validateProvider(address).send({from: Aux.account })) :
      await Aux.CallBackFrame(contract.methods.validatePool(address).send({from: Aux.account }));
    /*if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.validateProvider(address).send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(privatePool.methods.validateProvider(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(provider.methods.validatePool(address).send({from: Aux.account }));*/
  }
  
  export async function RejectProviderPool(address, contractType, contract){
    (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.rejectProvider(address).send({from: Aux.account })) :
      await Aux.CallBackFrame(contract.methods.rejectPool(address).send({from: Aux.account }));
   /* if(1 == contractType)await Aux.CallBackFrame(Contracts.publicPool.methods.rejectProvider(address).send({from: Aux.account }));
    else if(2 == contractType)await Aux.CallBackFrame(privatePool.methods.rejectProvider(address).send({from: Aux.account }));
    else await Aux.CallBackFrame(provider.methods.rejectPool(address).send({from: Aux.account }));*/
  }

  export async function RetrieveProviderPool(contractType, contract){
    try{
      let Addresses = (3 != contractType)? 
        await contract.methods.retrieveAllProviders().call():
        await contract.methods.retrieveAllPools().call();

      Total = Addresses.length
      Items = []

      for (let i = 0; i < Total; i++) {
        let {0:Info,1:is} = (3 != contractType)?
          await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(Addresses[i])).call():
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(Addresses[i])).call();

        Items[i] = [Addresses[i], Info]
      }

      pendingAdd = []
      let pendingAddAddresses = (3 != contractType)?
        await contract.methods.retrievePendingProviders(true).call():
        await contract.methods.retrievePendingPools(true).call();

      for (let i = 0; i < pendingAddAddresses.length; i++) {
        let {0:Info} = (3 != contractType)?
          await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingAddAddresses[i])).call():
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingAddAddresses[i])).call();;
        pendingAdd[i] = [pendingAddAddresses[i], Info]
      }

      pendingRemove = []
      let pendingRemoveAddresses = (3 != contractType)?
        await contract.methods.retrievePendingProviders(false).call():
        await contract.methods.retrievePendingPools(false).call();

      for (let i = 0; i < pendingRemoveAddresses.length; i++) {
        let {0:Info} = (3 != contractType)?
          await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingRemoveAddresses[i])).call():
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingRemoveAddresses[i])).call();
        pendingRemove[i] = [pendingRemoveAddresses[i], Info]
      }

      /*if(1 == contractType){
        let publicProvidersAddresses = await contract.methods.retrieveAllProviders().call()
        publicTotalProviders = publicProvidersAddresses.length
        publicProviders = []
  
        for (let i = 0; i < publicTotalProviders; i++) {
          let {0:publicProviderInfo,1:isProvider} = await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(publicProvidersAddresses[i])).call()
          publicProviders[i] = [publicProvidersAddresses[i], publicProviderInfo]
        }
  
        pendingPublicProvidersAdd = []
        let pendingPublicProvidersAddAddresses = await contract.methods.retrievePendingProviders(true).call();
        for (let i = 0; i < pendingPublicProvidersAddAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingPublicProvidersAddAddresses[i])).call();
          pendingPublicProvidersAdd[i] = [pendingPublicProvidersAddAddresses[i], Info]
        }
  
        pendingPublicProvidersRemove = []
        let pendingPublicProvidersRemoveAddresses = await contract.methods.retrievePendingProviders(false).call();
        for (let i = 0; i < pendingPublicProvidersRemoveAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingPublicProvidersRemoveAddresses[i])).call();
          pendingPublicProvidersRemove[i] = [pendingPublicProvidersRemoveAddresses[i], Info]
        }
      }
      else if(2 == contractType){
        let privateProvidersAddresses = await contract.methods.retrieveAllProviders().call()
        privateTotalProviders = privateProvidersAddresses.length
        privateProviders = []
      
        for (let i = 0; i < privateTotalProviders; i++) {
          let {0:privateProviderInfo,1:isProvider} = await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(privateProvidersAddresses[i])).call()
          privateProviders[i] = [privateProvidersAddresses[i], privateProviderInfo]
        }
  
        pendingPrivateProvidersAdd = []
        let pendingPrivateProvidersAddAddresses = await contract.methods.retrievePendingProviders(true).call();
        for (let i = 0; i < pendingPrivateProvidersAddAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingPrivateProvidersAddAddresses[i])).call();
          pendingPrivateProvidersAdd[i] = [pendingPrivateProvidersAddAddresses[i], Info]
        }
  
        pendingPrivateProvidersRemove = []
        let pendingPrivateProvidersRemoveAddresses = await contract.methods.retrievePendingProviders(false).call();
        for (let i = 0; i < pendingPrivateProvidersRemoveAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingPrivateProvidersRemoveAddresses[i])).call();
          pendingPrivateProvidersRemove[i] = [pendingPrivateProvidersRemoveAddresses[i], Info]
        }
  
      }
      else{
        let providerPoolsAddresses = await contract.methods.retrieveAllPools().call()
        providerTotalPools = providerPoolsAddresses.length
        providerPools = []
      
        for (let i = 0; i < providerTotalPools; i++) {
          let {0:providerPoolInfo,1:isPool} = await contract.methods.retrievePool(Aux.Bytes32ToAddress(providerPoolsAddresses[i])).call()
          providerPools[i] = [providerPoolsAddresses[i], providerPoolInfo]
        }
      
        pendingProviderPoolsAdd = []
        let pendingProviderPoolsAddAddresses = await contract.methods.retrievePendingPools(true).call();
        for (let i = 0; i < pendingProviderPoolsAddAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingProviderPoolsAddAddresses[i])).call();
          pendingProviderPoolsAdd[i] = [pendingProviderPoolsAddAddresses[i], Info]
        }
  
        pendingProviderPoolsRemove = []
        let pendingProviderPoolsRemoveAddresses = await contract.methods.retrievePendingPools(false).call();
        for (let i = 0; i < pendingProviderPoolsRemoveAddresses.length; i++) {
          let {0:Info} = await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingProviderPoolsRemoveAddresses[i])).call();
          pendingProviderPoolsRemove[i] = [pendingProviderPoolsRemoveAddresses[i], Info]
        }
      }*/
    }
    catch(e){}
    
  }

  export async function SelectProviderPool(address, contractType){
    
    try{
      if(2 == contractType){
        privatePoolAddress = address
        privatePool = await new Aux.web3.eth.Contract(PRIVATE_ABI, address)
        Contracts.setPrivatePool(privatePool);
        RetrieveProviderPool(contractType, privatePool);
        OwnersFunc.RetrieveOwners(contractType, privatePool);
      }
      else{
        providerAddress = address
        provider = await new Aux.web3.eth.Contract(PROVIDER_ABI, address)
        Contracts.setProvider(provider);
        providerBalance = await Aux.web3.eth.getBalance(providerAddress);
        RetrieveProviderPool(contractType, provider);
        OwnersFunc.RetrieveOwners(contractType, provider);
        CertificateFunc.RetrievePendingCertificates(provider);
      }
      

    }
    catch(e) { window.alert(e); }
  }

  export async function FundProvider(amount){
    await Aux.web3.eth.sendTransaction({from:Aux.account , to:provider._address, value:amount});
  }

  export function ReadKeys(){
    privatePoolAddress = BrowserStorageFunction.ReadKey(BrowserStorageFunction.privatePoolKey);
    providerAddress = BrowserStorageFunction.ReadKey(BrowserStorageFunction.providerKey);
  }