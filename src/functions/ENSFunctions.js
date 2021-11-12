import ENS, { getEnsAddress } from '@ensdomains/ensjs'

const Aux = require("./AuxiliaryFunctions.js");
const EmptyAddress = "0x0000000000000000000000000000000000000000"
var ens = ""

export var ENSRegistryAddress = "";
export var ENSReverseRegistryAddress = "";
export var PrivatePoolNode = "";
export var ProviderNode = "";

export var PendingENSRegistryAddress = "";
export var PendingENSReverseRegistryAddress = "";
export var PendingPrivatePoolNode = "";
export var PendingProviderNode = "";

export async function RetrieveENSConfig(contract){
    try{
      let result = await contract.methods.retrieveSettings().call({from: Aux.account });
      ENSRegistryAddress = result[0];
      ENSReverseRegistryAddress = result[1];
      PrivatePoolNode = result[2];
      ProviderNode = result[3];
    }
    catch(e) { 
      window.alert("error retrieving the ens config : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePendingENSConfig(contract){
    try{
      let result = await contract.methods.retrieveProposition().call({from: Aux.account });
      PendingENSRegistryAddress = "-"
      PendingENSReverseRegistryAddress = "-"
      PendingPrivatePoolNode = "-"
      PendingProviderNode = "-"
      
      if(result[0] != undefined)PendingENSRegistryAddress = Aux.Bytes32ToAddress(result[0])
      if(result[1] != undefined)PendingENSReverseRegistryAddress = Aux.Bytes32ToAddress(result[1])
      if(result[2] != undefined)PendingPrivatePoolNode = result[2]
      if(result[3] != undefined)PendingProviderNode = result[3]
    }
    catch(e) { 
      window.alert("error retrieving the pending ens config : " + JSON.stringify(e)); 
    }
    
  }

  export async function UpgradeENSConfig(NewENSRegistryAddress, NewENSReverseRegistryAddress, NewPrivatePoolNode, NewProviderNode, contract){
    await Aux.CallBackFrame(contract.methods.sendProposition(
        [Aux.AddressToBytes32(NewENSRegistryAddress),
        Aux.AddressToBytes32(NewENSReverseRegistryAddress),
        NewPrivatePoolNode,
        NewProviderNode,
        ]).send({from: Aux.account }));
  }

export async function Resolution(name){
    try{
        initENS();
        var address = await ens.name(name).getAddress();
        if(EmptyAddress == address)address = name;
        return address;
    }
    catch(e){
        window.alert("error reversing the address : " + e)
        return name;
    }
    
}

export async function ReverseResolution(address){
    try{
        initENS();
        var name = await ens.getName(address)

        if(name.name == null ||
            Aux.web3.utils.toChecksumAddress(address) != Aux.web3.utils.toChecksumAddress(await ens.name(name.name).getAddress())) return [address, false];
        
        return [name.name, true];
    }
    catch(e){
        window.alert("error reversing the address : " + e)
        return [address, false];
    }
   
}

function initENS(){
    var provider = Aux.web3.currentProvider
    ens = new ENS({ provider, ensAddress: getEnsAddress('1') })
}

