
const Aux = require("./AuxiliaryFunctions.js");

export const method = 'eth_signTypedData_v4';

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