
const Aux = require("./AuxiliaryFunctions.js");

const method = 'eth_signTypedData_v4';

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

  export function SignMessage(_params, _from){
    let signature = await Aux.web3.currentProvider.send({method,_params,_from}, 
        (err, result) => {
          if (err) window.alert("error " + err);
          else if (result.error)  window.alert("error " + result.error);
          else return result.result
        });

    return signature;
  }

  export function Domain(_name, _contract, _version){
    return {
        chainId: await Aux.web3.eth.getChainId(),
        name: _name,
        verifyingContract: _contract,
        version: _version,
      }
  }