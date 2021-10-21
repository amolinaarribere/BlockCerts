const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var RegistryAddress = "";
export var PendingRegistryAddress = "";

  export async function USDToEther(amount, contract){
    try{
      let result = await contract.methods.fromUSDToETH((new BigNumber(100 * amount)).decimalPlaces(0)).call({from: Aux.account });
      return result;
    }
    catch(e) { 
      window.alert("error getting the USD to Ether excahgne rate : " + JSON.stringify(e)); 
    }
  }

  export async function RetrieveRegistryAddress(contract){
    try{
      RegistryAddress = await contract.methods.retrieveRegistryAddress().call({from: Aux.account });
    }
    catch(e) { 
      window.alert("error retrieving the registry address : " + JSON.stringify(e)); 
    }
    
  }

  export async function RetrievePendingRegistryAddress(contract){
    try{
      [PendingRegistryAddress] = await contract.methods.retrieveProposition().call({from: Aux.account });
    }
    catch(e) { 
      window.alert("error retrieving the pending registry address : " + JSON.stringify(e)); 
    }
    
  }

  export async function UpgradeRegistryAddress(NewRegistryAddress, contract){
    await Aux.CallBackFrame(contract.methods.updateRegistryAddress(NewRegistryAddress).send({from: Aux.account }));
  }
    