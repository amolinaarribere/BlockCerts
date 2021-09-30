import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const Contracts = require("../../../functions/Contracts.js");

class SignCertificateComponent extends React.Component{

    state = {
      certificateHash : "",
      holderAddress: "",
      deadLine : 0,

      certificateHash_2 : "",
      holderAddress_2: "",
      providerAddress_2: "",
      deadLine_2 : 0,
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
      this.setState({ certificateHash: "",  holderAddress: "", deadLine: 0, 
        certificateHash_2: "",  holderAddress_2: "", providerAddress_2: "",  deadLine_2: 0, signature_2: ""})
    }

    handleSubmitSignature = async (event) => {
      event.preventDefault();
    await func.AddCertificateOnBehalfOf(this.state.providerAddress_2, 
        this.state.certificateHash_2, 
        this.state.holderAddress_2,
        this.state.deadline_2,
        this.state.signature_2,
        this.props.privateEnv);
    this.resetState()
  };
  

    handleSignCertificate = async (event) => {
      event.preventDefault();

      try{
        //let deadline = Math.ceil(Date.now() / 1000) + 120;
        let deadline = this.state.deadLine
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
        this.state.displayDeadline = deadline;
        this.state.displaySignature = signature;

        this.state.signatureDisplayed = true;
      }
      catch(e){
        window.alert("error : " + e)
      }
      
      this.resetState()
  };
  
    render(){
        return (
          <div>
            <Form onSubmit={this.handleSignCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address" 
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
                <Form.Control type="integer" name="deadLine" placeholder="deadLine" 
                    value={this.state.deadLine}
                    onChange={event => this.setState({ deadLine: event.target.value })}/>
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
                <Form.Control type="integer" name="deadLine_2" placeholder="deadLine" 
                    value={this.state.deadLine_2}
                    onChange={event => this.setState({ deadLine_2: event.target.value })}/>
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