// Manager
const Aux = require("./AuxiliaryFunctions.js");

export var ManagerAdminAddress = ""
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
export var PropositionSettingsAddress = ""
export var PropositionSettingsAddressProxy = ""
export var ENSAddress = ""
export var ENSAddressProxy = ""

export var PendingPublicPoolAddress = ""
export var PendingPublicPoolInit = ""
export var PendingPrivatePoolFactoryAddress = ""
export var PendingPrivatePoolFactoryInit = ""
export var PendingPrivatePoolImplAddress = "";
export var PendingProviderFactoryAddress = ""
export var PendingProviderFactoryInit = ""
export var PendingProviderImplAddress = "";
export var PendingTreasuryAddress = ""
export var PendingTreasuryInit = ""
export var PendingCertisTokenAddress = ""
export var PendingCertisTokenInit = ""
export var PendingPriceConverterAddress = ""
export var PendingPriceConverterInit = ""
export var PendingPropositionSettingsAddress = ""
export var PendingPropositionSettingsInit = ""
export var PendingENSAddress = ""
export var PendingENSInit = ""



export async function RetrieveContractsAddresses(contract){
  let TransparentProxies = await contract.methods.retrieveTransparentProxies().call({from: Aux.account});
  let TransparentImpl = await contract.methods.retrieveTransparentProxiesImpl().call({from: Aux.account});
  let BeaconsImpl = await contract.methods.retrieveBeaconsImpl().call({from: Aux.account});
  ManagerAdminAddress = await contract.methods.retrieveManagerAdmin().call({from: Aux.account});

  publicPoolAddressProxy = TransparentProxies[0];
  TreasuryAddressProxy = TransparentProxies[1];
  CertisTokenAddressProxy = TransparentProxies[2];
  privatePoolFactoryAddressProxy = TransparentProxies[3];
  providerFactoryAddressProxy = TransparentProxies[4];
  PriceConverterAddressProxy = TransparentProxies[5];
  PropositionSettingsAddressProxy = TransparentProxies[6];
  ENSAddressProxy = TransparentProxies[7];

  publicPoolAddress = TransparentImpl[0];
  TreasuryAddress = TransparentImpl[1];
  CertisTokenAddress = TransparentImpl[2];
  privatePoolFactoryAddress = TransparentImpl[3];
  providerFactoryAddress = TransparentImpl[4];
  PriceConverterAddress = TransparentImpl[5];
  PropositionSettingsAddress = TransparentImpl[6];
  ENSAddress = TransparentImpl[7];

  privatePoolImplAddress = BeaconsImpl[0];
  providerImplAddress = BeaconsImpl[1];
}
  
  
  export async function RetrievePendingContractsAddresses(contract){
    try{
      let result = await contract.methods.retrieveProposition().call();
      PendingPublicPoolAddress = "-";
      PendingTreasuryAddress = "-";
      PendingCertisTokenAddress = "-";
      PendingPrivatePoolFactoryAddress = "-";
      PendingProviderFactoryAddress = "-";
      PendingPriceConverterAddress = "-";
      PendingPropositionSettingsAddress = "-";
      PendingENSAddress = "-";
      PendingPrivatePoolImplAddress = "-";
      PendingProviderImplAddress = "-";

      PendingPublicPoolInit = "-";
      PendingTreasuryInit = "-";
      PendingCertisTokenInit = "-";
      PendingPrivatePoolFactoryInit = "-";
      PendingProviderFactoryInit = "-";
      PendingPriceConverterInit = "-";
      PendingPropositionSettingsInit = "-";
      PendingENSInit = "-";

      if(result[2] != undefined)PendingPublicPoolAddress = Aux.Bytes32ToAddress(result[2]);
      if(result[3] != undefined)PendingTreasuryAddress = Aux.Bytes32ToAddress(result[3]);
      if(result[4] != undefined)PendingCertisTokenAddress = Aux.Bytes32ToAddress(result[4]);
      if(result[5] != undefined)PendingPrivatePoolFactoryAddress = Aux.Bytes32ToAddress(result[5]);
      if(result[6] != undefined)PendingProviderFactoryAddress = Aux.Bytes32ToAddress(result[6]);
      if(result[7] != undefined)PendingPriceConverterAddress = Aux.Bytes32ToAddress(result[7]);
      if(result[8] != undefined)PendingPropositionSettingsAddress = Aux.Bytes32ToAddress(result[8]);
      if(result[9] != undefined)PendingENSAddress = Aux.Bytes32ToAddress(result[9]);
      if(result[10] != undefined)PendingPrivatePoolImplAddress = Aux.Bytes32ToAddress(result[10]);
      if(result[11] != undefined)PendingProviderImplAddress = Aux.Bytes32ToAddress(result[11]);

      if(result[12] != undefined)PendingPublicPoolInit = result[12];
      if(result[13] != undefined)PendingTreasuryInit = result[13];
      if(result[14] != undefined)PendingCertisTokenInit = result[14];
      if(result[15] != undefined)PendingPrivatePoolFactoryInit = result[15];
      if(result[16] != undefined)PendingProviderFactoryInit = result[16];
      if(result[17] != undefined)PendingPriceConverterInit = result[17];
      if(result[18] != undefined)PendingPropositionSettingsInit = result[18];
      if(result[19] != undefined)PendingENSInit = result[19];

    }
    catch(e){
      window.alert("error retrieving the pending contract addresses : " + JSON.stringify(e))
    }
    
  }