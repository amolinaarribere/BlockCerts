import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const Contracts = require("../../../functions/Contracts.js");
const sigUtil = require("eth-sig-util");
const ethUtil = require('ethereumjs-util');

class SignCertificateComponent extends React.Component{

    state = {
      certificateHash : "",
      holderAddress: "",
      date: "",
      time: "",

      certificateHash_2 : "",
      holderAddress_2: "",
      providerAddress_2: "",
      date_2: "",
      time_2: "",
      signature_2: "",
      
      signatureDisplayed : false,
      displayCertificateHash: "",
      displayHolder: "",
      displayProvider: "",
      displayDeadline: "",
      displaySignature: ""
    };
  
    captureFile = (event) => {
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => this.convertToBuffer(reader);
    };
  
    convertToBuffer = async (reader) => {
      const buffer = await Buffer.from(reader.result);
      this.setState({certificateHash: Aux.web3.utils.keccak256(buffer)});
    };

    resetState() {
      this.setState({ certificateHash: "",  holderAddress: "", date: "", time: "",
        certificateHash_2: "",  holderAddress_2: "", providerAddress_2: "", signature_2: "",  date_2: "", time_2: ""})
    }

    handleSubmitSignature = async (event) => {
      event.preventDefault();
      let deadline = Math.ceil(new Date(this.state.date_2 + " " + this.state.time_2) / 1000);
    await func.AddCertificateOnBehalfOf(this.state.providerAddress_2, 
        this.state.certificateHash_2, 
        this.state.holderAddress_2,
        deadline,
        this.state.signature_2,
        this.props.privateEnv);
    this.resetState()
  };
  

    handleSignCertificate = async (event) => {
      event.preventDefault();

      try{
        let deadline = Math.ceil(new Date(this.state.date + " " + this.state.time) / 1000);
        let nonce = 0;

        // domain hash
        let DomainHeader = Aux.web3.utils.keccak256("EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)");
        let ContractName =  Aux.web3.utils.keccak256(Aux.web3.utils.stringToHex("Public Certificate Pool"));
        let ContractVersion = Aux.web3.utils.keccak256(Aux.web3.utils.stringToHex("1.0"));
        let chainId = await Aux.web3.eth.getChainId();
        let ContractAddress = Contracts.publicPool._address;

        let domainHash = Aux.web3.eth.abi.encodeParameters(['bytes32','bytes32','bytes32','uint256','address']
            ,[DomainHeader, ContractName, ContractVersion, chainId, ContractAddress])

        // function hash
        let FunctionHeader = Aux.web3.utils.keccak256("addCertificateOnBehalfOf(address provider,bytes32 CertificateHash,address holder,uint nonce,uint256 deadline)");

        let functionHash = Aux.web3.eth.abi.encodeParameters(['bytes32','address','bytes32','address','uint256','uint256']
            ,[FunctionHeader, Aux.account, this.state.certificateHash, this.state.holderAddress, nonce, deadline])

        // header
        let Header = "\x19Ethereum Signed Message:\n32";

        // signature
        let dataToSign = Aux.web3.utils.keccak256(Aux.web3.eth.abi.encodeParameters(['string','bytes','bytes'],
            [Header, domainHash, functionHash]));
          
        let signature = await Aux.web3.eth.personal.sign(dataToSign, Aux.account);

        this.state.displayCertificateHash = this.state.certificateHash;
        this.state.displayHolder = this.state.holderAddress;
        this.state.displayProvider = Aux.account;
        this.state.displayDeadline = (new Date(this.state.date + " " + this.state.time)).toString();
        this.state.displaySignature = signature;

        this.state.signatureDisplayed = true;
      }
      catch(e){
        window.alert("error : " + e)
      }
      
      this.resetState()
  };

  handleSignCertificate2 = async (event) => {
    event.preventDefault();
    const msgParams = JSON.stringify({
      domain: {
        // Defining the chain aka Rinkeby testnet or Ethereum Main Net
        chainId: await Aux.web3.eth.getChainId(),
        // Give a user friendly name to the specific contract you are signing for.
        name: 'Ether Mail',
        // If name isn't enough add verifying contract to make sure you are establishing contracts with the proper entity
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
        // Just let's you know the latest version. Definitely make sure the field name is correct.
        version: '1',
      },
  
      // Defining the message signing data content.
      message: {
        /*
         - Anything you want. Just a JSON Blob that encodes the data you want to send
         - No required fields
         - This is DApp Specific
         - Be as explicit as possible when building out the message schema.
        */
        contents: 'Hello, Bob!',
        attachedMoneyInEth: 4.2,
        from: {
          name: 'Cow',
          wallets: [
            '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
            '0xDeaDbeefdEAdbeefdEadbEEFdeadbeEFdEaDbeeF',
          ],
        },
        to: [
          {
            name: 'Bob',
            wallets: [
              '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
              '0xB0BdaBea57B0BDABeA57b0bdABEA57b0BDabEa57',
              '0xB0B0b0b0b0b0B000000000000000000000000000',
            ],
          },
        ],
      },
      // Refers to the keys of the *types* object below.
      primaryType: 'Mail',
      types: {
        // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        // Not an EIP712Domain definition
        Group: [
          { name: 'name', type: 'string' },
          { name: 'members', type: 'Person[]' },
        ],
        // Refer to PrimaryType
        Mail: [
          { name: 'from', type: 'Person' },
          { name: 'to', type: 'Person[]' },
          { name: 'contents', type: 'string' },
        ],
        // Not an EIP712Domain definition
        Person: [
          { name: 'name', type: 'string' },
          { name: 'wallets', type: 'address[]' },
        ],
      },
    });
  
    var from = Aux.account;
  
    var params = [from, msgParams];
    var method = 'eth_signTypedData_v4';
  
    Aux.web3.currentProvider.sendAsync(
      {
        method,
        params,
        from,
      },
      function (err, result) {
        if (err) return console.dir(err);
        if (result.error) {
          alert(result.error.message);
        }
        if (result.error) return console.error('ERROR', result);
        console.log('TYPED SIGNED:' + JSON.stringify(result.result));
  
        const recovered = sigUtil.recoverTypedSignature_v4({
          data: JSON.parse(msgParams),
          sig: result.result,
        });
  
        if (
          ethUtil.toChecksumAddress(recovered) === ethUtil.toChecksumAddress(from)
        ) {
          alert('Successfully recovered signer as ' + from);
        } else {
          alert(
            'Failed to verify signer when comparing ' + result + ' to ' + from
          );
        }
      }
    );
  }
    
  
    render(){
        return (
          <div>
            <Form onSubmit={this.handleSignCertificate2} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address" 
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
                <Form.Control type="date" name="date" placeholder="date" 
                    value={this.state.date}
                    onChange={event => this.setState({ date: event.target.value })}/>
                <Form.Control type="time" name="time" placeholder="time"
                    value={this.state.time}
                    onChange={event => this.setState({ time: event.target.value })}/>
              </Form.Group>
                 <button type="submit" class="btn btn-primary">Sign Certificate</button> &nbsp;&nbsp;
            </Form>

            {(this.state.signatureDisplayed)? 
                <Container style={{margin: '10px 50px 50px 50px' }}>
                <Row>
                  <Col><b>Certificate Hash :</b></Col> 
                  <Col>{this.state.displayCertificateHash}</Col>
                </Row>
                <Row>
                  <Col><b>Holder Address :</b></Col> 
                  <Col>{this.state.displayHolder}</Col>
                </Row>
                <Row>
                  <Col><b>Provider Address :</b></Col> 
                  <Col>{this.state.displayProvider}</Col>
                </Row>
                <Row>
                  <Col><b>Dead line :</b></Col> 
                  <Col>{this.state.displayDeadline}</Col>
                </Row>
                <Row>
                  <Col><b>Signature :</b></Col> 
                  <Col>{this.state.displaySignature}</Col>
                </Row>
              </Container>
            : null}
            

            <Form onSubmit={this.handleSubmitSignature} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="text" name="certificateHash_2" placeholder="Hash" 
                      value={this.state.certificateHash_2}
                      onChange={event => this.setState({ certificateHash_2: event.target.value })}/>
                <Form.Control type="text" name="HolderAddress_2" placeholder="holder address" 
                      value={this.state.holderAddress_2}
                    onChange={event => this.setState({ holderAddress_2: event.target.value })}/>
                <Form.Control type="text" name="ProviderAddress_2" placeholder="provider address" 
                    value={this.state.providerAddress_2}
                    onChange={event => this.setState({ providerAddress_2: event.target.value })}/>
                <Form.Control type="date" name="date_2" placeholder="date" 
                    value={this.state.date_2}
                    onChange={event => this.setState({ date_2: event.target.value })}/>
                <Form.Control type="time" name="time_2" placeholder="time"
                    value={this.state.time_2}
                    onChange={event => this.setState({ time_2: event.target.value })}/>
                <Form.Control type="text" name="Signature_2" placeholder="signature" 
                    value={this.state.signature_2}
                    onChange={event => this.setState({ signature_2: event.target.value })}/>
              </Form.Group>
            
              <button type="submit" class="btn btn-primary" >Submit Signature</button> 
            </Form>

          </div>
        );
    }
  }

  export default SignCertificateComponent;