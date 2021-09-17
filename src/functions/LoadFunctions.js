import { CERTIFICATE_POOL_MANAGER_ABI, CERTIFICATE_POOL_MANAGER_ADDRESS, PUBLIC_ABI, PRIVATEFACTORY_ABI, PROVIDERFACTORY_ABI, TREASURY_ABI, CERTIS_ABI, PRICECONVERTER_ABI } from '../config'

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

export var chairPerson = ""
export var balance = ""
export var Network = ""


export async function LoadBlockchain() {
  Aux.LoadWeb3();
  
  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload();
  })
  Aux.setAccount(accounts[0]);

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

  await LoadProviderPoolFunc(1);
  await LoadProviderPoolFunc(2);
  await LoadProviderPoolFunc(3);
  await LoadOwnersFunc(1);
  await LoadOwnersFunc(2);
  await LoadOwnersFunc(3);
  await LoadFactoriesFunc();
  await LoadPropositionFunc();
  await LoadCertisFunc();
  await LoadTreasuryFunc();
  await LoadPriceConverterFunc();
}

export async function LoadManagerFunc() {
  await ManagerFunc.RetrieveContractsAddresses();
  await ManagerFunc.RetrievePendingContractsAddresses();
}

export async function LoadCertisFunc() {
  await CertisFunc.isTokenOwner(Aux.account);
  await CertisFunc.totalSupply();
  await CertisFunc.balanceOf(Aux.account);
}

export async function LoadPropositionFunc() {
  await PropositionFunc.RetrieveProposition(1);
  await PropositionFunc.RetrieveProposition(2);
  await PropositionFunc.RetrieveProposition(3);
  await PropositionFunc.RetrievePendingProposition(1);
  await PropositionFunc.RetrievePendingProposition(2);
  await PropositionFunc.RetrievePendingProposition(3);
}

export async function LoadTreasuryFunc() {
  await TreasuryFunc.RetrievePricesTreasury();
  await TreasuryFunc.RetrievePendingPricesTreasury();
  await TreasuryFunc.RetrieveLastAssigned(Aux.account);
  await TreasuryFunc.RetrieveBalance(Aux.account);
  await TreasuryFunc.RetrieveTreasuryBalance();
}

export async function LoadPriceConverterFunc() {
  await PriceConverterFunc.RetrieveRegistryAddress();
  await PriceConverterFunc.RetrievePendingRegistryAddress();
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


  