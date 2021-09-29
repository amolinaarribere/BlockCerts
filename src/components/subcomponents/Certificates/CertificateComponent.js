import React from 'react';
import ListPendingCertificatesComponent from './ListPendingCertificatesComponent';
import VoteCertificateComponent from './VoteCertificateComponent';
import { Form, Container, Row, Col } from 'react-bootstrap';


const func = require("../../../functions/CertificateFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const Contracts = require("../../../functions/Contracts.js");


class CertificateComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    this.props.refresh();
  }

    state = {
      certificateHash : "",
      holderAddress: "",
      poolAddress: "",
      retrieveholderAddress: "",
      providerAddress: "",
      deadLine : 0,
      signature: ""
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
      this.setState({ certificateHash: "",  holderAddress: "", poolAddress: "", providerAddress:"", signature: "", deadLine: 0})
    }
  
    handleAddCertificate = async (event) => {
        event.preventDefault();
      await func.AddCertificate(this.state.certificateHash, this.state.holderAddress, this.props.privateEnv, this.props.contractType, this.state.poolAddress);
      this.resetState()
    };

    handleSubmitSignature = async (event) => {
      event.preventDefault();
    await func.AddCertificateOnBehalfOf(this.state.providerAddress, 
      this.state.certificateHash, 
      this.state.holderAddress,
      this.state.deadline,
      this.state.signature,
      this.props.privateEnv);
      this.resetState()
  };
  
    handleCheckCertificate = async (event) => {
        event.preventDefault();
      await func.CheckCertificate(this.state.certificateHash, this.state.holderAddress, this.props.privateEnv);
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

        window.alert("save this signature so that you cna send it later : " + signature)
      }
      catch(e){
        window.alert("error : " + e)
      }
      
      this.resetState()
  };
  
    handleRetrieveByHolder = async (event) => {
        event.preventDefault();
      await func.retrieveCertificatesByHolder(this.state.retrieveholderAddress, 0, 99, this.props.privateEnv)
      this.setState({ retrieveholderAddress: ""})
    };
  
    render(){
      if(3 != this.props.contractType){
        return (
          <div>
            <h3>Certificates</h3>
            <Form onSubmit={this.handleAddCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address" 
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
              </Form.Group>
              <br />
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="ProviderAddress" placeholder="provider address" 
                    value={this.state.providerAddress}
                    onChange={event => this.setState({ providerAddress: event.target.value })}/>
                <Form.Control type="integer" name="deadLine" placeholder="deadLine" 
                    value={this.state.deadLine}
                    onChange={event => this.setState({ deadLine: event.target.value })}/>
                <Form.Control type="text" name="Signature" placeholder="signature" 
                    value={this.state.signature}
                    onChange={event => this.setState({ signature: event.target.value })}/>
              </Form.Group>
              <button type="submit" class="btn btn-secondary">Add Certificate</button> &nbsp;&nbsp;
              <button type="button" class="btn btn-secondary" onClick={this.handleCheckCertificate}>Check Certificate</button> &nbsp;&nbsp;
              <button type="button" class="btn btn-secondary" onClick={this.handleSignCertificate}>Sign Certificate</button> &nbsp;&nbsp;
              <button type="button" class="btn btn-secondary" onClick={this.handleSubmitSignature}>Submit Signature</button> 
            </Form>

            <Container>
              <Row>
                <Col>{func.certificateProvider}</Col>
              </Row>
            </Container>

            <Form onSubmit={this.handleRetrieveByHolder} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="RetreiveByHolder" placeholder="holder address" 
                    value={this.state.retrieveholderAddress}
                    onChange={event => this.setState({ retrieveholderAddress: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-secondary">Retrieve By Holder</button>
            </Form>

            <Container>
              {(func.certificatesByHolder.length > 0)? (<Row><Col><b>Certificates for Holder :</b></Col> <Col>{func.currentHolder}</Col></Row>):null}
              {(func.certificatesByHolder.length == 0 && func.currentHolder != "")? (<Row><Col><b>No Certificates for Holder :</b></Col>  <Col>{func.currentHolder}</Col></Row>):null}
              {func.certificatesByHolder.map(certificateByHolder => (
                <Row key={certificateByHolder}>{certificateByHolder}</Row>
              ))}
            </Container>
            <hr class="bg-secondary"/>

          </div>
        );
      }
      else{
        return (
          <div>
            <h3>Certificates</h3>
            <Form onSubmit={this.handleAddCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address" 
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
                <Form.Control type="text" name="PoolAddress" placeholder="pool address" 
                    value={this.state.poolAddress}
                    onChange={event => this.setState({ poolAddress: event.target.value })}/>
              </Form.Group>
              <button type="submit" class="btn btn-secondary">Add Certificate</button> &nbsp;&nbsp;
            </Form>
            <VoteCertificateComponent refresh={this.refresh}/>
            <br />
            <ListPendingCertificatesComponent />
            <hr class="bg-secondary"/>
          </div>
        );
      }
      
    }
  }

  export default CertificateComponent;