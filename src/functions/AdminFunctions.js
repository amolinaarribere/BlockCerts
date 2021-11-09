export var ManagerAddress = ""
export var ManagerAddressProxy = ""

export async function RetrieveManagerAddresses(contract){
    try{
        ManagerAddress = await contract.methods.retrieveManager().call();
        ManagerAddressProxy = await contract.methods.retrieveManagerProxy().call();
    }
    catch(e){
      window.alert("error retrieving the manager addresses : " + JSON.stringify(e))
    }
}