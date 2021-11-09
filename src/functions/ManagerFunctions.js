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
export var PropositionSettingsAddress = ""
export var PropositionSettingsAddressProxy = ""
export var ENSAddress = ""
export var ENSAddressProxy = ""

export var PendingPublicPoolAddress = ""
export var PendingPrivatePoolFactoryAddress = ""
export var PendingPrivatePoolImplAddress = "";
export var PendingProviderFactoryAddress = ""
export var PendingProviderImplAddress = "";
export var PendingTreasuryAddress = ""
export var PendingCertisTokenAddress = ""
export var PendingPriceConverterAddress = ""
export var PendingPropositionSettingsAddress = ""
export var PendingENSAddress = ""


export async function RetrieveContractsAddresses(contract){
  let TransparentProxies = await contract.methods.retrieveTransparentProxies().call({from: Aux.account});
  let TransparentImpl = await contract.methods.retrieveTransparentProxiesImpl().call({from: Aux.account});
  let BeaconsImpl = await contract.methods.retrieveBeaconsImpl().call({from: Aux.account});

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
  
  export async function UpgradeContracts(NewPublicPoolAddress, NewTreasuryAddress, NewCertisTokenAddress, NewPrivatePoolFactoryAddress, NewPrivatePoolAddress, NewProviderFactoryAddress, NewProviderAddress, NewPriceConverterAddress, NewPropositionSettingsAddress, NewENSAddress, contract){
    /*await Aux.CallBackFrame(contract.methods.sendProposition({
                "TransparentAddresses": [Aux.AddressToBytes32(NewPublicPoolAddress), 
                  Aux.AddressToBytes32(NewTreasuryAddress), 
                  Aux.AddressToBytes32(NewCertisTokenAddress), 
                  Aux.AddressToBytes32(NewPrivatePoolFactoryAddress), 
                  Aux.AddressToBytes32(NewProviderFactoryAddress), 
                  Aux.AddressToBytes32(NewPriceConverterAddress), 
                  Aux.AddressToBytes32(NewPropositionSettingsAddress), 
                  Aux.AddressToBytes32(NewENSAddress)],
                "BeaconAddresses": [Aux.AddressToBytes32(NewPrivatePoolAddress), 
                  Aux.AddressToBytes32(NewProviderAddress)],
                "TransparentData": ["0x", "0x", "0x", "0x", "0x", "0x", "0x", "0x"],
                "PrivatePoolContractName": "0x",
                "PrivatePoolContractVersion": "0x"
            }).send({from: Aux.account }));*/
        await Aux.CallBackFrame(contract.methods.sendProposition([
          Aux.IntToBytes32(0),
          Aux.IntToBytes32(0),
          Aux.AddressToBytes32(NewPublicPoolAddress),
          Aux.AddressToBytes32(NewTreasuryAddress),
          Aux.AddressToBytes32(NewCertisTokenAddress),
          Aux.AddressToBytes32(NewPrivatePoolFactoryAddress),
          Aux.AddressToBytes32(NewProviderFactoryAddress),
          Aux.AddressToBytes32(NewPriceConverterAddress),
          Aux.AddressToBytes32(NewPropositionSettingsAddress),
          Aux.AddressToBytes32(NewENSAddress),
          Aux.AddressToBytes32(NewPrivatePoolAddress),
          Aux.AddressToBytes32(NewProviderAddress),
          "0x", "0x", "0x", "0x", "0x", "0x", "0x", "0x", "0x", "0x"
        ]).send({from: Aux.account }));
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
    }
    catch(e){
      window.alert("error retrieving the pending contract addresses : " + JSON.stringify(e))
    }
    
  }