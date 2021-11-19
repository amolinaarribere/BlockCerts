export var ManagerAddress = ""
export var ManagerAddressProxy = ""

export var PendingManagerAddress = ""
export var PendingManagerInit = ""
export var PendingAdminAddress = ""

const Aux = require("./AuxiliaryFunctions.js");
const ENSFunc = require("./ENSFunctions.js");


export async function RetrieveManagerAddresses(contract){
    try{
        ManagerAddress = await ENSFunc.ReverseResolution(await contract.methods.retrieveManager().call());
        ManagerAddressProxy = await ENSFunc.ReverseResolution(await contract.methods.retrieveManagerProxy().call());
    }
    catch(e){
      window.alert("error retrieving the admin addresses : " + JSON.stringify(e))
    }
}

export async function RetrievePendingAdminConfig(contract){
  try{
    let result = await contract.methods.retrieveProposition().call({from: Aux.account });
    PendingManagerAddress = "-"
    PendingManagerInit = "-"
    PendingAdminAddress = "-"
    
    if(result[0] != undefined)PendingManagerAddress = await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(result[0]))
    if(result[1] != undefined)PendingManagerInit = result[1]
    if(result[2] != undefined)PendingAdminAddress = await ENSFunc.ReverseResolution(Aux.Bytes32ToAddress(result[2]))
  }
  catch(e) { 
    window.alert("error retrieving the pending admin config : " + JSON.stringify(e)); 
  }
  
}