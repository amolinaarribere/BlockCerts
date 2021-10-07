 // Certis Tokens
const Aux = require("./AuxiliaryFunctions.js");
const load = require("./LoadFunctions.js");

export var TokensTotalSupply = "";
export var TokensBalance = "";
export var isOwner;

 export async function totalSupply(contract){
    TokensTotalSupply = await contract.methods.totalSupply().call({from: Aux.account });
  }

  export async function balanceOf(address, contract){
    TokensBalance = await contract.methods.balanceOf(address).call({from: Aux.account });
  }

  export async function transfer(address, amount, contract){
    await Aux.CallBackFrame(contract.methods.transfer(address, amount).send({from: Aux.account }));
  }

  export async function isTokenOwner(address, contract){
    isOwner = false;
    if(load.Admin){
      let tokens = await contract.methods.balanceOf(address).call({from: Aux.account });
      if(tokens > 0 ) isOwner = true;
    }
    else {
      isOwner = true;
    }
  }