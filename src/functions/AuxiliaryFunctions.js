// auxiliary
import Web3 from 'web3';

export var account = "";
export var web3 = "";

export function setAccount(_value){
  account = _value;
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


