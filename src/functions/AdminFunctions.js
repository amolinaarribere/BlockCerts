export var ManagerAddress = ""
export var ManagerAddressProxy = ""

export var PendingManagerAddress = ""
export var PendingAdminAddress = ""

const Aux = require("./AuxiliaryFunctions.js");


export async function RetrieveManagerAddresses(contract){
    try{
        ManagerAddress = await contract.methods.retrieveManager().call();
        ManagerAddressProxy = await contract.methods.retrieveManagerProxy().call();
    }
    catch(e){
      window.alert("error retrieving the manager addresses : " + JSON.stringify(e))
    }
}

export async function RetrievePendingAdminConfig(contract){
  try{
    let result = await contract.methods.retrieveProposition().call({from: Aux.account });
    PendingManagerAddress = "-"
    PendingAdminAddress = "-"
    
    if(result[0] != undefined)PendingManagerAddress = Aux.Bytes32ToAddress(result[0])
    if(result[1] != undefined)PendingAdminAddress = Aux.Bytes32ToAddress(result[2])
  }
  catch(e) { 
    window.alert("error retrieving the pending ens config : " + JSON.stringify(e)); 
  }
  
}

export async function UpgradeAdminConfig(NewManagerAddress, NewAdminAddress, contract){
  await Aux.CallBackFrame(contract.methods.sendProposition(
      [Aux.AddressToBytes32(NewManagerAddress),
        "0x",
      Aux.AddressToBytes32(NewAdminAddress)
      ]).send({from: Aux.account }));
}