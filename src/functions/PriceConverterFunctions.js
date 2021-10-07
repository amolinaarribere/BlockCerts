const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var RegistryAddress = "";
export var PendingRegistryAddress = "";

  export async function USDToEther(amount, contract){
    let result = await contract.methods.fromUSDToETH((new BigNumber(100 * amount)).decimalPlaces(0)).call({from: Aux.account });
    return result;
  }

  export async function RetrieveRegistryAddress(contract){
    RegistryAddress = await contract.methods.retrieveRegistryAddress().call({from: Aux.account });
  }

  export async function RetrievePendingRegistryAddress(contract){
    [PendingRegistryAddress] = await contract.methods.retrieveProposition().call({from: Aux.account });
  }

  export async function UpgradeRegistryAddress(NewRegistryAddress, contract){
    await Aux.CallBackFrame(contract.methods.updateRegistryAddress(NewRegistryAddress).send({from: Aux.account }));
  }
    