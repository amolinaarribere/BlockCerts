// Provider - Pool
import {PRIVATE_ABI, PROVIDER_ABI, ETHDecimals, ETHFactor, ProviderContractType} from '../config'

const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");
const OwnersFunc = require("./OwnerFunctions.js");
const CertificateFunc = require("./CertificateFunctions.js");
const BrowserStorageFunction = require("./BrowserStorageFunctions.js");
const ENSFunc = require("./ENSFunctions.js");
const BigNumber = require('bignumber.js');
const ValidationFunc = require("./ValidationFunctions.js");


export var privatePool = "";
export var provider = "";

export var pendingAdd = [] 
export var pendingRemove = []
export var Balance = "";

export var PrivatePoolAddress = "";
export var PrivatePoolUnResolvedAddress = "";

export var ProviderAddress = "";
export var ProviderUnResolvedAddress = "";

export var Total = ""
export var Items = []

export async function AddProviderPool(address, Info, subscribe, contractType, price, contract){
  let CheckAddress = ValidationFunc.validateAddress(address);
  let CheckInfo = ValidationFunc.validateString(Info);
  let CheckContractType = ValidationFunc.validatePositiveInteger(contractType);
  let CheckSubscribe = (ProviderContractType != CheckContractType[0])? true : ValidationFunc.validateBoolean(subscribe);
  let CheckPrice = ValidationFunc.validatePositiveFloat(price);

  if(true == CheckAddress &&
    true == CheckPrice[1] &&
    true == CheckContractType[1] &&
    true == CheckSubscribe){
      (ProviderContractType != CheckContractType[0])? 
        await Aux.CallBackFrame(contract.methods.addProvider(address, CheckInfo).send({from: Aux.account , value: CheckPrice[0]})) :
        await Aux.CallBackFrame(contract.methods.addPool(address, CheckInfo, subscribe).send({from: Aux.account }));
    }
  else{
    ValidationFunc.FormatErrorMessage([CheckAddress, CheckPrice[1], CheckContractType[1], CheckSubscribe], ["Address", "Price", "Contract Type", "Subscribe"]);
  }
  
}
  
  export async function RemoveProviderPool(address, contractType, contract){
    await ManagerProviderPool(address, contractType, contract, 0);
  }

  export async function ValidateProviderPool(address, contractType, contract){
    await ManagerProviderPool(address, contractType, contract, 1);
  }
  
  export async function RejectProviderPool(address, contractType, contract){
    await ManagerProviderPool(address, contractType, contract, 2);
  }

  async function ManagerProviderPool(address, contractType, contract, id){
    let CheckAddress = ValidationFunc.validateAddress(address);
    let CheckContractType = ValidationFunc.validatePositiveInteger(contractType);

    if(true == CheckAddress &&
      true == CheckContractType[1]){

      if(id == 0) (ProviderContractType != CheckContractType[0])? 
        await Aux.CallBackFrame(contract.methods.removeProvider(address).send({from: Aux.account })) :
        await Aux.CallBackFrame(contract.methods.removePool(address).send({from: Aux.account }));
      else if(id == 1) (ProviderContractType != CheckContractType[0])? 
        await Aux.CallBackFrame(contract.methods.validateProvider(address).send({from: Aux.account })) :
        await Aux.CallBackFrame(contract.methods.validatePool(address).send({from: Aux.account }));
      else if(id == 2) (ProviderContractType != CheckContractType[0])? 
        await Aux.CallBackFrame(contract.methods.rejectProvider(address).send({from: Aux.account })) :
        await Aux.CallBackFrame(contract.methods.rejectPool(address).send({from: Aux.account }));
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAddress, CheckContractType[1]], ["Address", "Contract Type"]);
    }
  }

  export async function RetrieveProviderPool(contractType, contract){
    try{
      let Addresses = (ProviderContractType != contractType)? 
        await contract.methods.retrieveAllProviders().call():
        await contract.methods.retrieveAllPools().call();
      Total = Addresses.length
      Items = []

      for (let i = 0; i < Total; i++) {
        let {0:Info,1:is} = (ProviderContractType != contractType)?
          await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(Addresses[i])).call():
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(Addresses[i])).call();

        Items[i] = [await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(Addresses[i])), Info]
      }
      pendingAdd = []
      let pendingAddAddresses = (ProviderContractType != contractType)?
        await contract.methods.retrievePendingProviders(true).call():
        await contract.methods.retrievePendingPools(true).call();

      for (let i = 0; i < pendingAddAddresses.length; i++) {
        let {0:Info} = (ProviderContractType != contractType)?
          await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingAddAddresses[i])).call():
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingAddAddresses[i])).call();
          let address = await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(pendingAddAddresses[i]));
        pendingAdd[i] = [address, Info]
      }
      pendingRemove = []
      let pendingRemoveAddresses = (ProviderContractType != contractType)?
        await contract.methods.retrievePendingProviders(false).call():
        await contract.methods.retrievePendingPools(false).call();

      for (let i = 0; i < pendingRemoveAddresses.length; i++) {
        let {0:Info} = (ProviderContractType != contractType)?
          await contract.methods.retrieveProvider(Aux.Bytes32ToAddress(pendingRemoveAddresses[i])).call():
          await contract.methods.retrievePool(Aux.Bytes32ToAddress(pendingRemoveAddresses[i])).call();
          let address = await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(pendingRemoveAddresses[i]));
        pendingRemove[i] = [address, Info]
      }

    }
    catch(e){
      window.alert("error retrieving the providers or pools : " + JSON.stringify(e))
    }
    
  }

  export async function SelectProviderPool(address, contractType){
    let CheckAddress = ValidationFunc.validateAddress(address);
    let CheckContractType = ValidationFunc.validatePositiveInteger(contractType);

    if(true == CheckAddress &&
      true == CheckContractType[1]){

        try{
          if(ProviderContractType != CheckContractType[0]){
            PrivatePoolUnResolvedAddress = address
            PrivatePoolAddress = await ENSFunc.Resolution(address)
            privatePool = await new Aux.web3.eth.Contract(PRIVATE_ABI, PrivatePoolAddress)
            Contracts.setPrivatePool(privatePool);
            await RetrieveProviderPool(CheckContractType[0], privatePool)
            await OwnersFunc.RetrieveOwners(privatePool)
          }
          else{
            ProviderUnResolvedAddress = address
            ProviderAddress = await ENSFunc.Resolution(address)
            provider = await new Aux.web3.eth.Contract(PROVIDER_ABI, ProviderAddress)
            Contracts.setProvider(provider);
            Balance = (new BigNumber(await Aux.web3.eth.getBalance(ProviderAddress))).dividedBy(ETHFactor).dp(ETHDecimals,0).toString();
            await RetrieveProviderPool(CheckContractType[0], provider)
            await OwnersFunc.RetrieveOwners(provider)
            await CertificateFunc.RetrievePendingCertificates(provider)
          }
        }
        catch(e) { 
          window.alert("error selecting the providers or pools : " + JSON.stringify(e)); 
        }
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAddress, CheckContractType[1]], ["Address", "Contract Type"]);
    }
    
  }

  export async function UnSelectProviderPool(contractType){
    try{
      if(ProviderContractType != contractType){
        PrivatePoolUnResolvedAddress = ""
        PrivatePoolAddress = ""
        privatePool = ""
        Contracts.setPrivatePool(privatePool);
      }
      else{
        ProviderUnResolvedAddress = ""
        ProviderAddress = ""
        provider = ""
        Contracts.setProvider(provider);
      }  
    }
    catch(e) { 
      window.alert("error unselecting the providers or pools : " + JSON.stringify(e)); 
    }
  }

  export async function FundProvider(amount){
    let CheckAmount = ValidationFunc.validatePositiveFloat(amount);

    if(true == CheckAmount[1]){
      await Aux.web3.eth.sendTransaction({from:Aux.account , to:provider._address, value:CheckAmount[0].multipliedBy(ETHFactor).dp(0, 1).toString()});
    }
    else{
      ValidationFunc.FormatErrorMessage([CheckAmount[1]], ["Amount"]);
    }

  }

  export async function ReadKeys(key, contractType){
    let UnResolvedAddress = BrowserStorageFunction.ReadKey(key);
    let Address = await ENSFunc.Resolution(UnResolvedAddress)
    if(ProviderContractType != contractType){
      PrivatePoolUnResolvedAddress = UnResolvedAddress;
      PrivatePoolAddress = Address
    }
    else{
      ProviderUnResolvedAddress = UnResolvedAddress;
      ProviderAddress = Address
    }  
  }