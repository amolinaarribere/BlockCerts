// auxiliary
import Web3 from 'web3';

const ENSFunc = require("./ENSFunctions.js");

export var account = "";
export var accountResolved = "";
export var web3 = "";

export async function setAccount(_value){
  account = _value;
  accountResolved = await ENSFunc.ReverseResolution(account)
}

export function removeAccount(){
  account = "";
  accountResolved = ""
}

export function LoadWeb3(){
  web3 = new Web3(window.ethereum)
}

export async function CallBackFrame(callback){
    try{
      let result = await callback;
      return result;
     }
     catch(e) { window.alert(JSON.stringify(e)); }
}
  
export function Bytes32ToAddress(bytes){
    return ("0x" + (bytes.toString()).substring(26));
}


