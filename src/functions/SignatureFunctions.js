
const Aux = require("./AuxiliaryFunctions.js");

export const method = 'eth_signTypedData_v4';
export var ContractName = ""
export var ContractVersion = ""

  export function AddCertificatesMsgParams(_domain, _msg){
      return JSON.stringify({
        domain: _domain,
        message: _msg,
        primaryType: 'addCertificateOnBehalfOf',
        types: {
          EIP712Domain: EIP712Domain(),
          addCertificateOnBehalfOf: AddCertificateDomain()
        }
      });
  }

  export function VoteMsgParams(_domain, _msg){
    return JSON.stringify({
      domain: _domain,
      message: _msg,
      primaryType: 'voteOnBehalfOf',
      types: {
        EIP712Domain: EIP712Domain(),
        voting: VoteDomain()
      }
    });
}

  function EIP712Domain(){
      return  [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' },
      ]
  }

  function AddCertificateDomain(){
    return  [
        { name: 'provider', type: 'address' },
        { name: 'certificateHash', type: 'bytes32' },
        { name: 'holder', type: 'address' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ]
  } 

  function VoteDomain(){
    return  [
        { name: 'voter', type: 'address' },
        { name: 'propID', type: 'uint256' },
        { name: 'vote', type: 'bool' },
        { name: 'nonce', type: 'uint256' },
        { name: 'deadline', type: 'uint256' }
      ]
  } 

  export async function Domain(_name, _contract, _version){
    return {
        name: _name,
        version: _version,
        chainId: await Aux.web3.eth.getChainId(),
        verifyingContract: _contract
      }
  }

  export function AddCertificateOnBehalfOfMessage(_from, _certificateHash, _holder, _nonce, _deadline){
    return {
      provider: _from,
      certificateHash: _certificateHash,
      holder: _holder,
      nonce: _nonce,
      deadline: _deadline
    }
  }

  export function VoteOnBehalfOfMessage(_from, _propID, _vote, _nonce, _deadline){
    return {
      voter: _from,
      propID: _propID,
      vote: _vote,
      nonce: _nonce,
      deadline: _deadline
    }
  }

  export async function retrieveContractConfig(contract){
    try{
      let result = await contract.methods.retrieveContractConfig().call();
      ContractName = result[0];
      ContractVersion = result[1];
    }
    catch(e) { 
      window.alert("error retrieving the contract's signature configuration :  " + e); 
    }
  }

  export async function retrieveNonce(contract, address, nonce){
    try{
      return await contract.methods.retrieveNonce(address, nonce).call();
    }
    catch(e) { 
      window.alert("error retrieving the nonce :  " + e); 
    }
  }
