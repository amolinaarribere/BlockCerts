import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const SignatureFunc = require("../../../functions/SignatureFunctions.js");
const ValFunc = require("../../../functions/ValidationFunctions.js");

class SignCertificateComponent extends React.Component{

    state = {
      errors: {
        certificateHash: true,
        nonce: true,
        deadline: true,
        certificateHash_2: true,
        nonce_2: true,
        deadline_2: true,
        signature_2: true
      },

      highlights: {
        certificateHash: '',
        nonce: '',
        deadline: '',
        certificateHash_2: '',
        nonce_2: '',
        deadline_2: '',
        signature_2: ''
      },

      certificateHash : "",
      holderAddress: "",
      nonce: "",
      date: "",
      time: "",

      certificateHash_2 : "",
      holderAddress_2: "",
      providerAddress_2: "",
      nonce_2: "",
      date_2: "",
      time_2: "",
      signature_2: "",
      
      signatureDisplayed : false,
      displayCertificateHash: "",
      displayHolder: "",
      displayProvider: "",
      displayNonce: "",
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
      this.setState({ certificateHash: "",  holderAddress: "", date: "", time: "", nonce: "",
        certificateHash_2: "",  holderAddress_2: "", providerAddress_2: "", signature_2: "",  date_2: "", time_2: "", nonce_2: ""})
    }

    handleSubmitSignature = async (event) => {
      event.preventDefault();
      let reset = true;
      [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
      this.setState({})

      try{
        let deadline = Math.ceil(new Date(this.state.date_2 + " " + this.state.time_2) / 1000);
        let Nonce = parseInt(this.state.nonce_2);

        this.state.errors.certificateHash_2 = ValFunc.validateHash(this.state.certificateHash_2);
        this.state.errors.nonce_2 = ValFunc.validateInteger(Nonce);
        this.state.errors.deadline_2 = ValFunc.validateInteger(deadline);
        this.state.errors.signature_2 = ValFunc.validateSignature(this.state.signature_2);

        if(ValFunc.validate(this.state.errors)){
          let deadline = Math.ceil(new Date(this.state.date_2 + " " + this.state.time_2) / 1000);
          await func.AddCertificateOnBehalfOf(this.state.providerAddress_2, 
              this.state.certificateHash_2, 
              this.state.holderAddress_2,
              Nonce,
              deadline,
              this.state.signature_2,
              this.props.contract,
              this.props.price);
        }
        else{
          this.state.highlights = ValFunc.HighlightsFields(this.state.errors)
          reset = false;
          this.setState({})
        }

      }
      catch(e){
        window.alert("error : " + e)
      }

      if(reset)this.resetState()
  };

  handleSignCertificate = async (event) => {
    event.preventDefault();
    let reset = true;
    [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
    this.setState({})

    try{
      let from = Aux.account;
      let Deadline = Math.ceil(new Date(this.state.date + " " + this.state.time) / 1000);
      let Nonce = parseInt(this.state.nonce);

      this.state.errors.certificateHash = ValFunc.validateHash(this.state.certificateHash);
      this.state.errors.nonce = ValFunc.validateInteger(Nonce);
      this.state.errors.deadline = ValFunc.validateInteger(Deadline);

      if(ValFunc.validate(this.state.errors)){
        await SignatureFunc.retrieveContractConfig(this.props.contract);
        let Domain = await SignatureFunc.Domain(SignatureFunc.ContractName, this.props.contract._address, SignatureFunc.ContractVersion);
        let Message = SignatureFunc.AddCertificateOnBehalfOfMessage(from, this.state.certificateHash, this.state.holderAddress, Nonce, Deadline)
      
        let params = [from, SignatureFunc.AddCertificatesMsgParams(Domain, Message)];
        let method = SignatureFunc.method;
        let signature = await Aux.web3.currentProvider.send({method,params,from}, 
          (err, result) => {
            if (err) window.alert("error " + err)
            else if (result.error)  window.alert("result error " + result.error)
            else return result.result
          });
                
        if(signature != null && signature != "undefined"){
          this.state.displayCertificateHash = this.state.certificateHash;
          this.state.displayHolder = this.state.holderAddress;
          this.state.displayProvider = Aux.account;
          this.state.displayNonce = this.state.nonce;
          this.state.displayDeadline = (new Date(this.state.date + " " + this.state.time)).toString();
          this.state.displaySignature = signature;
          this.state.signatureDisplayed = true
        }
      }
      else{
        this.state.highlights = ValFunc.HighlightsFields(this.state.errors)
        reset = false;
        this.setState({})
      }
      
    }
    catch(e){
      window.alert("error : " + e)
    }
    
    if(reset)this.resetState()
  
  }
  
    render(){
        return (
          <div>
            <Form onSubmit={this.handleSignCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile} className={this.state.highlights.certificateHash}/>
                <Form.Control type="text" name="holderAddress" placeholder="holder address" 
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
                <Form.Control type="integer" name="nonce" placeholder="nonce" className={this.state.highlights.nonce}
                    value={this.state.nonce}
                    onChange={event => this.setState({ nonce: event.target.value })}/>
                <Row>
                  <Col>
                    <Form.Control type="date" name="date" placeholder="date" className={this.state.highlights.deadline}
                      value={this.state.date}
                      onChange={event => this.setState({ date: event.target.value })}/>
                  </Col>
                  <Col>
                    <Form.Control type="time" name="time" placeholder="time" className={this.state.highlights.deadline}
                      value={this.state.time}
                      onChange={event => this.setState({ time: event.target.value })}/>
                  </Col>
                </Row>
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
                  <Col><b>Nonce :</b></Col> 
                  <Col>{this.state.displayNonce}</Col>
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
                <Form.Control type="text" name="certificateHash_2" placeholder="Hash" className={this.state.highlights.certificateHash_2}
                      value={this.state.certificateHash_2}
                      onChange={event => this.setState({ certificateHash_2: event.target.value })}/>
                <Form.Control type="text" name="HolderAddress_2" placeholder="holder address" 
                      value={this.state.holderAddress_2}
                    onChange={event => this.setState({ holderAddress_2: event.target.value })}/>
                <Form.Control type="text" name="ProviderAddress_2" placeholder="provider address" 
                    value={this.state.providerAddress_2}
                    onChange={event => this.setState({ providerAddress_2: event.target.value })}/>
                <Form.Control type="integer" name="nonce_2" placeholder="nonce" className={this.state.highlights.nonce_2}
                    value={this.state.nonce_2}
                    onChange={event => this.setState({ nonce_2: event.target.value })}/>
                <Row>
                  <Col>
                      <Form.Control type="date"  name="date_2" placeholder="date" className={this.state.highlights.deadline_2}
                          value={this.state.date_2}
                          onChange={event => this.setState({ date_2: event.target.value })}/>
                  </Col>
                  <Col>
                      <Form.Control type="time" name="time_2" placeholder="time" className={this.state.highlights.deadline_2}
                          value={this.state.time_2}
                          onChange={event => this.setState({ time_2: event.target.value })}/>
                  </Col>     
                </Row>
                <Form.Control type="text" name="Signature_2" placeholder="signature" className={this.state.highlights.signature_2}
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