// Manager
const Aux = require("./AuxiliaryFunctions.js");

export var publicPoolAddress = ""
export var publicPoolAddressProxy = ""
export var privatePoolFactoryAddress = ""
export var privatePoolFactoryAddressProxy = ""
export var privatePoolImplAddress = "";
export var providerFactoryAddress = ""
export var providerFactoryAddressProxy = ""
export var providerImplAddress = "";
export var TreasuryAddress = ""
export var TreasuryAddressProxy = ""
export var CertisTokenAddress = ""
export var CertisTokenAddressProxy = ""
export var PriceConverterAddress = ""
export var PriceConverterAddressProxy = ""

export var PendingPublicPoolAddress = ""
export var PendingPrivatePoolFactoryAddress = ""
export var PendingPrivatePoolImplAddress = "";
export var PendingProviderFactoryAddress = ""
export var PendingProviderImplAddress = "";
export var PendingTreasuryAddress = ""
export var PendingCertisTokenAddress = ""
export var PendingPriceConverterAddress = ""


export async function RetrieveContractsAddresses(contract){
    publicPoolAddressProxy = await contract.methods.retrievePublicCertificatePoolProxy().call();
    privatePoolFactoryAddressProxy = await contract.methods.retrievePrivatePoolFactoryProxy().call();
    providerFactoryAddressProxy = await contract.methods.retrieveProviderFactoryProxy().call();
    TreasuryAddressProxy = await contract.methods.retrieveTreasuryProxy().call();
    CertisTokenAddressProxy = await contract.methods.retrieveCertisTokenProxy().call();
    PriceConverterAddressProxy = await contract.methods.retrievePriceConverterProxy().call();
  
    publicPoolAddress = await contract.methods.retrievePublicCertificatePool().call();
    privatePoolFactoryAddress = await contract.methods.retrievePrivatePoolFactory().call();
    privatePoolImplAddress = await contract.methods.retrievePrivatePool().call();
    providerFactoryAddress = await contract.methods.retrieveProviderFactory().call();
    providerImplAddress = await contract.methods.retrieveProvider().call();
    TreasuryAddress = await contract.methods.retrieveTreasury().call();
    CertisTokenAddress = await contract.methods.retrieveCertisToken().call();
    PriceConverterAddress = await contract.methods.retrievePriceConverter().call();
  }
  
  export async function UpgradeContracts(NewPublicPoolAddress, NewTreasuryAddress, NewCertisTokenAddress, NewPrivatePoolFactoryAddress, NewPrivatePoolAddress, NewProviderFactoryAddress, NewProviderAddress, NewPriceConverterAddress, contract){
    await Aux.CallBackFrame(contract.methods.upgradeContracts({
                "NewPublicPoolAddress": NewPublicPoolAddress,
                "NewTreasuryAddress": NewTreasuryAddress,
                "NewCertisTokenAddress": NewCertisTokenAddress,
                "NewPrivatePoolFactoryAddress": NewPrivatePoolFactoryAddress,
                "NewPrivatePoolAddress": NewPrivatePoolAddress,
                "NewProviderFactoryAddress": NewProviderFactoryAddress,
                "NewProviderAddress": NewProviderAddress,
                "NewPriceConverterAddress": NewPriceConverterAddress,
                "NewPublicPoolData": "0x",
                "NewTreasuryData":  "0x",
                "NewCertisTokenData": "0x",
                "NewPrivatePoolFactoryData": "0x",
                "NewProviderFactoryData":  "0x",
                "NewPriceConverterData":  "0x"
            }).send({from: Aux.account }));
  }
  
  export async function RetrievePendingContractsAddresses(contract){
    try{
      [PendingPublicPoolAddress,
        PendingTreasuryAddress,
        PendingCertisTokenAddress,
        PendingPrivatePoolFactoryAddress,
        PendingPrivatePoolImplAddress,
        PendingProviderFactoryAddress,
        PendingProviderImplAddress,
        PendingPriceConverterAddress] = await contract.methods.retrieveProposition().call();
    }
    catch(e){
      window.alert("error retrieving the pending contract addresses : " + JSON.stringify(e))
    }
    
  }