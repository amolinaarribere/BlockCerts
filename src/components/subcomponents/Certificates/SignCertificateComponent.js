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
      let from = Aux.account;
      let Deadline = Math.ceil(new Date(this.state.date + " " + this.state.time) / 1000);
      let Nonce = 0;

      let Domain = {
        chainId: await Aux.web3.eth.getChainId(),
        name: 'Public Certificate Pool',
        verifyingContract: Contracts.publicPool._address,
        version: '1.0',
      }

      let Message = {
        provider: from,
        CertificateHash: this.state.certificateHash,
        holder: this.state.holderAddress,
        nonce: Nonce,
        deadline: Deadline
      }

      const msgParams = JSON.stringify({
        domain: Domain,
        message: Message,
        primaryType: 'addCertificateOnBehalfOf',
        types: {
          // TODO: Clarify if EIP712Domain refers to the domain the contract is hosted on
          EIP712Domain: [
            { name: 'name', type: 'string' },
            { name: 'version', type: 'string' },
            { name: 'chainId', type: 'uint256' },
            { name: 'verifyingContract', type: 'address' },
          ],
          // Refer to PrimaryType
          addCertificateOnBehalfOf: [
            { name: 'provider', type: 'address' },
            { name: 'CertificateHash', type: 'bytes32' },
            { name: 'holder', type: 'address' },
            { name: 'nonce', type: 'uint256' },
            { name: 'deadline', type: 'uint256' }
          ]
        }
      });
    
      var params = [from, msgParams];
      var method = 'eth_signTypedData_v4';
    
      let signature = await Aux.web3.currentProvider.send({method,params,from}, 
        (err, result) => {
          if (err) window.alert("error " + err);
          else if (result.error)  window.alert("error " + result.error);
          else return result.result
        });

      if(signature != null && signature != "undefined"){
        this.state.displayCertificateHash = this.state.certificateHash;
        this.state.displayHolder = this.state.holderAddress;
        this.state.displayProvider = Aux.account;
        this.state.displayDeadline = (new Date(this.state.date + " " + this.state.time)).toString();
        this.state.displaySignature = signature;

        this.state.signatureDisplayed = true
      }
      
    }
    catch(e){
      window.alert("error : " + e)
    }
    
    this.resetState()
  
  }
    
  
    render(){
        return (
          <div>
            <Form onSubmit={this.handleSignCertificate} style={{margin: '50px 50px 50px 50px' }}>
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