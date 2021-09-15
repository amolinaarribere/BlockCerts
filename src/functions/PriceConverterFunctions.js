  // Treasury
const Contracts = require("./Contracts.js");
const Aux = require("./AuxiliaryFunctions.js");

export var RegistryAddress = "";
export var PendingRegistryAddress = "";

  export async function USDToEther(amount){
    window.alert("price to USD")
    //let result = await Contracts.PriceConverter.methods.fromUSDToETH(amount).call({from: Aux.account });
    //let dataToSend = await Aux.web3.eth.abi.encodeFunctionCall(jsonInterface, [parameters])
    //let result = await Aux.web3.eth.call({from: Aux.account, to: "0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0", data: dataToSend});
    //window.alert(result)
    return amount;
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
    