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
      
      Contracts.setCertificatePoolManager(await new Aux.web3.eth.Contract(CERTIFICATE_POOL_MANAGER_ABI, CERTIFICATE_POOL_MANAGER_ADDRESS))
      await LoadManagerFunc(Contracts.certificatePoolManager);

      Contracts.setPublicPool(await new Aux.web3.eth.Contract(PUBLIC_ABI, ManagerFunc.publicPoolAddressProxy))
      Contracts.setPrivatePoolFactory(await new Aux.web3.eth.Contract(PRIVATEFACTORY_ABI, ManagerFunc.privatePoolFactoryAddressProxy))
      Contracts.setProviderFactory(await new Aux.web3.eth.Contract(PROVIDERFACTORY_ABI, ManagerFunc.providerFactoryAddressProxy))
      Contracts.setTreasury(await new Aux.web3.eth.Contract(TREASURY_ABI, ManagerFunc.TreasuryAddressProxy))
      Contracts.setCertisToken(await new Aux.web3.eth.Contract(CERTIS_ABI, ManagerFunc.CertisTokenAddressProxy))
      Contracts.setPriceConverter(await new Aux.web3.eth.Contract(PRICECONVERTER_ABI, ManagerFunc.PriceConverterAddressProxy))

      await LoadPriceConverterFunc(Contracts.PriceConverter);
      await LoadTreasuryFunc(Contracts.Treasury);

    } catch (err) {
      window.alert("User cancelled " + JSON.stringify(err));
    }
    
  }
  else{
    window.alert("You should connect your wallet for the dAPP to work")
  }
  
}

export async function LoadManagerFunc(contract) {
  await Promise.all([ManagerFunc.RetrieveContractsAddresses(contract), 
    ManagerFunc.RetrievePendingContractsAddresses(contract)]);
}

export async function LoadCertisFunc(contract) {
  await Promise.all([CertisFunc.isTokenOwner(Aux.account, contract), 
    CertisFunc.totalSupply(contract),
    CertisFunc.balanceOf(Aux.account, contract)]);
}

export async function LoadPropositionFunc(contract) {
  await Promise.all([PropositionFunc.RetrieveProposition(contract),
    PropositionFunc.RetrievePendingProposition(contract)]);
}

export async function LoadTreasuryFunc(contract) {
  await Promise.all([TreasuryFunc.RetrievePricesTreasury(contract), 
    TreasuryFunc.RetrievePendingPricesTreasury(contract),
    TreasuryFunc.RetrieveLastAssigned(Aux.account, contract),
    TreasuryFunc.RetrieveBalance(Aux.account, contract),
    TreasuryFunc.RetrieveTreasuryBalance(contract)]);
}

export async function LoadPriceConverterFunc(contract) {
  await Promise.all([PriceConverterFunc.RetrieveRegistryAddress(contract),
    PriceConverterFunc.RetrievePendingRegistryAddress(contract)]);
}

export async function LoadProviderPoolFunc(ContractId, contract) {
  await ProviderPoolFunc.RetrieveProviderPool(ContractId, contract);
}

export async function LoadOwnersFunc(contract) {
  await OwnersFunc.RetrieveOwners(contract);
}

export async function LoadFactoriesFunc(contract) {
  await FactoriesFunc.RetrieveFactories(contract);
}

export async function LoadCertificateFunc(contract) {
  await CertificateFunc.RetrievePendingCertificates(contract);
}


  