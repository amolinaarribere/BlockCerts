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

export async function UpgradeAdminConfig(NewManagerAddress, NewAdminAddress, contract){
  await Aux.CallBackFrame(contract.methods.sendProposition(
      [Aux.AddressToBytes32(NewManagerAddress),
        "0x",
      Aux.AddressToBytes32(NewAdminAddress)
      ]).send({from: Aux.account }));
}