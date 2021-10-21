// Provider - Pool
import {PRIVATE_ABI, PROVIDER_ABI } from '../config'

const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");
const OwnersFunc = require("./OwnerFunctions.js");
const CertificateFunc = require("./CertificateFunctions.js");
const BrowserStorageFunction = require("./BrowserStorageFunctions.js");
const ENSFunc = require("./ENSFunctions.js");

export var privatePool = "";
export var provider = "";

export var pendingAdd = [] 
export var pendingRemove = []
export var Balance = "";

export var Address = "";

export var Total = ""
export var Items = []

export async function AddProviderPool(address, Info, subscribe, contractType, price, contract){
  (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.addProvider(address, Info).send({from: Aux.account , value: price})) :
      await Aux.CallBackFrame(contract.methods.addPool(address, Info, subscribe).send({from: Aux.account }));
  }
  
  export async function RemoveProviderPool(address, contractType, contract){
    (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.removeProvider(address).send({from: Aux.account })) :
      await Aux.CallBackFrame(contract.methods.removePool(address).send({from: Aux.account }));
  }

  export async function ValidateProviderPool(address, contractType, contract){
    (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.validateProvider(address).send({from: Aux.account })) :
      await Aux.CallBackFrame(contract.methods.validatePool(address).send({from: Aux.account }));
  }
  
  export async function RejectProviderPool(address, contractType, contract){
    (3 != contractType)? 
      await Aux.CallBackFrame(contract.methods.rejectProvider(address).send({from: Aux.account })) :
      await Aux.CallBackFrame(contract.methods.rejectPool(address).send({from: Aux.account }));
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
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingAddAddresses[i])).call();
          let address = await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(pendingAddAddresses[i]));
        pendingAdd[i] = [address, Info]
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

    }
    catch(e){
      window.alert("error retrieving the providers or pools : " + JSON.stringify(e))
    }
    
  }

  export async function SelectProviderPool(address, contractType){
    try{
      Address = address
      if(2 == contractType){
        privatePool = await new Aux.web3.eth.Contract(PRIVATE_ABI, Address)
        Contracts.setPrivatePool(privatePool);
        await RetrieveProviderPool(contractType, privatePool)
        await OwnersFunc.RetrieveOwners(privatePool)
      }
      else{
        provider = await new Aux.web3.eth.Contract(PROVIDER_ABI, Address)
        Contracts.setProvider(provider);
        Balance = await Aux.web3.eth.getBalance(Address);
        await RetrieveProviderPool(contractType, provider)
        await OwnersFunc.RetrieveOwners(provider)
        await CertificateFunc.RetrievePendingCertificates(provider)
      }
    }
    catch(e) { 
      window.alert("error selecting the providers or pools : " + JSON.stringify(e)); 
    }
  }

  export async function UnSelectProviderPool(contractType){
    try{
      Address = ""
      if(2 == contractType){
        privatePool = ""
        Contracts.setPrivatePool(privatePool);
      }
      else{
        provider = ""
        Contracts.setProvider(provider);
      }  
    }
    catch(e) { 
      window.alert("error unselecting the providers or pools : " + JSON.stringify(e)); 
    }
  }

  export async function FundProvider(amount){
    await Aux.web3.eth.sendTransaction({from:Aux.account , to:provider._address, value:amount});
  }

  export function ReadKeys(key){
    Address = BrowserStorageFunction.ReadKey(key);
  }