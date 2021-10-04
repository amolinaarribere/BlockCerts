import { CERTIFICATE_POOL_MANAGER_ABI, CERTIFICATE_POOL_MANAGER_ADDRESS, PUBLIC_ABI, PRIVATEFACTORY_ABI, PROVIDERFACTORY_ABI, TREASURY_ABI, CERTIS_ABI, PRICECONVERTER_ABI, AdminRights } from '../config'

const ProviderPoolFunc = require("./ProviderPoolFunctions.js");
const OwnersFunc = require("./OwnerFunctions.js");
const FactoriesFunc = require("./FactoriesFunctions.js");
const TreasuryFunc = require("./TreasuryFunctions.js");
const PropositionFunc = require("./PropositionFunctions.js");
const CertisFunc = require("./CertisFunctions.js");
const CertificateFunc = require("./CertificateFunctions.js");
const Contracts = require("./Contracts.js");
const ManagerFunc = require("./ManagerFunctions.js");
const PriceConverterFunc = require("./PriceConverterFunctions.js");
const Aux = require("./AuxiliaryFunctions.js");
const BrowserStorageFunc = require("./BrowserStorageFunctions.js");

export var chairPerson = ""
export var balance = ""
export var Network = ""
export var Admin = AdminRights;

export async function ReadAccount(){
  try{
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload();
    })
    window.ethereum.on('chainChanged', function (chainId) {
      window.location.reload();
    });
    window.ethereum.on('disconnect', function () {
      Aux.setAccount("");
    });
    Aux.LoadWeb3();
    Aux.setAccount(accounts[0]);
  }
  catch(e){
    if (e.code === 4001) {
      window.alert('Please connect to MetaMask in order to use the dApp.');
    } else {
      window.alert(e);
    }
  }
  
}

export async function LoadBlockchain() {
  if (window.ethereum) {
    try {
      await ReadAccount();
      Network = await Aux.web3.eth.net.getNetworkType();

      ProviderPoolFunc.ReadKeys();

      Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, CERTIFICATE_POOL_MANAGER_ADDRESS))
      await LoadManagerFunc();

      Contracts.setPublicPool(await new Aux.web3.eth.Contract(PUBLIC_ABI, ManagerFunc.publicPoolAddressProxy))
      Contracts.setPrivatePoolFactory(await new Aux.web3.eth.Contract(PRIVATEFACTORY_ABI, ManagerFunc.privatePoolFactoryAddressProxy))
      Contracts.setProviderFactory(await new Aux.web3.eth.Contract(PROVIDERFACTORY_ABI, ManagerFunc.providerFactoryAddressProxy))
      Contracts.setTreasury(await new Aux.web3.eth.Contract(TREASURY_ABI, ManagerFunc.TreasuryAddressProxy))
      Contracts.setCertisToken(await new Aux.web3.eth.Contract(CERTIS_ABI, ManagerFunc.CertisTokenAddressProxy))
      Contracts.setPriceConverter(await new Aux.web3.eth.Contract(PRICECONVERTER_ABI, ManagerFunc.PriceConverterAddressProxy))

      await Promise.all([
        LoadProviderPoolFunc(1),
        LoadProviderPoolFunc(2),
        LoadProviderPoolFunc(3),
        LoadOwnersFunc(1),
        LoadOwnersFunc(2),
        LoadOwnersFunc(3),
        LoadFactoriesFunc(),
        LoadPropositionFunc(),
        LoadCertisFunc(),
        LoadTreasuryFunc(),
        LoadPriceConverterFunc()])

    } catch (err) {
      window.alert("User cancelled " + JSON.stringify(err));
    }
    
  }
  else{
    window.alert("You should connect your wallet for the dAPP to work")
  }
  
}

export async function LoadManagerFunc() {
  await Promise.all([ManagerFunc.RetrieveContractsAddresses(), 
    ManagerFunc.RetrievePendingContractsAddresses()]);
}

export async function LoadCertisFunc() {
  await Promise.all([CertisFunc.isTokenOwner(Aux.account), 
    CertisFunc.totalSupply(),
    CertisFunc.balanceOf(Aux.account)]);
}

export async function LoadPropositionFunc() {
  await Promise.all([PropositionFunc.RetrieveProposition(1), 
    PropositionFunc.RetrieveProposition(2),
    PropositionFunc.RetrieveProposition(3),
    PropositionFunc.RetrievePendingProposition(1),
    PropositionFunc.RetrievePendingProposition(2),
    PropositionFunc.RetrievePendingProposition(3)]);
}

export async function LoadTreasuryFunc() {
  await Promise.all([TreasuryFunc.RetrievePricesTreasury(), 
    TreasuryFunc.RetrievePendingPricesTreasury(),
    TreasuryFunc.RetrieveLastAssigned(Aux.account),
    TreasuryFunc.RetrieveBalance(Aux.account),
    TreasuryFunc.RetrieveTreasuryBalance()]);
}

export async function LoadPriceConverterFunc() {
  await Promise.all([PriceConverterFunc.RetrieveRegistryAddress(),
    PriceConverterFunc.RetrievePendingRegistryAddress()]);
}

export async function LoadProviderPoolFunc(ContractId) {
  await ProviderPoolFunc.RetrieveProviderPool(ContractId);
}

export async function LoadOwnersFunc(ContractId) {
  await OwnersFunc.RetrieveOwners(ContractId);
}

export async function LoadFactoriesFunc() {
  await FactoriesFunc.RetrieveFactories();
}

export async function LoadCertificateFunc() {
  await CertificateFunc.RetrievePendingCertificates();
}


  