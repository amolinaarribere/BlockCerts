  // Treasury
const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");
const BigNumber = require('bignumber.js');

export var RegistryAddress = "";
export var PendingRegistryAddress = "";

  export async function USDToEther(amount){
    let result = await Contracts.PriceConverter.methods.fromUSDToETH((new BigNumber(100 * amount)).decimalPlaces(0)).call({from: Aux.account });
    return result;
  }

  export async function RetrieveRegistryAddress(){
    RegistryAddress = await Contracts.PriceConverter.methods.retrieveRegistryAddress().call({from: Aux.account });
  }

  export async function RetrievePendingRegistryAddress(){
    [PendingRegistryAddress] = await Contracts.PriceConverter.methods.retrieveProposition().call({from: Aux.account });
  }

  export async function UpgradeRegistryAddress(NewRegistryAddress){
    await Aux.CallBackFrame(Contracts.PriceConverter.methods.updateRegistryAddress(NewRegistryAddress).send({from: Aux.account }));
  }
    