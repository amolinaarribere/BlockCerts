import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const SignatureFunc = require("../../../functions/SignatureFunctions.js");
const ValFunc = require("../../../functions/ValidationFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");

class SignCertificateComponent extends React.Component{

    state = {
      errors: {
        certificateHash: true,
        holderAddress: true,
        nonce: true,
        deadline: true,
        certificateHash_2: true,
        holderAddress_2: true,
        providerAddress_2: true,
        nonce_2: true,
        deadline_2: true,
        signature_2: true
      },

      highlights: {
        certificateHash: '',
        holderAddress: '',
        nonce: '',
        deadline: '',
        certificateHash_2: '',
        holderAddress_2: '',
        providerAddress_2: '',
        nonce_2: '',
        deadline_2: '',
        signature_2: ''
      },

      nonceToCheck: "",
      nonceValid: "",
      nonceChecked: "",

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
  
    convertToBufferCertificate = async (reader) => {
      const buffer = await Buffer.from(reader.result);
      this.setState({certificateHash: Aux.web3.utils.keccak256(buffer)});
    };

    convertToBufferSignature = async (reader) => {
      const buffer = await Buffer.from(reader.result);
      let content = buffer.toString().split("\r\n")

      let d = new Date(content[4].split("Deadline : ")[1]);

      let day = d.getDate();
      let month = d.getMonth() + 1;
      let year = d.getFullYear();
      let hour = d.getHours();
      let minutes = d.getMinutes();

      let ExtractedDate = year + "-" + ((10 > month) ? "0" : "") + month + "-" + ((10 > day) ? "0" : "") + day;
      let ExtractedTime = ((10 > hour) ? "0" : "") + hour + ":" + ((10 > minutes) ? "0" : "") + minutes;

      this.setState({ certificateHash_2: content[0].split(":")[1].trim(), 
        holderAddress_2: content[1].split(":")[1].trim(),  
        providerAddress_2: content[2].split(":")[1].trim(),
        nonce_2: content[3].split(":")[1].trim(), 
        date_2: ExtractedDate, 
        time_2: ExtractedTime, 
        signature_2: content[5].split(":")[1].trim()})
    };

    captureFileCertificate = (event) => {
      this.captureFile(event, 1)
    };

    captureFileSignature = (event) => {
      this.captureFile(event, 2)
    };
  
    captureFile(event, type){
      event.stopPropagation();
      event.preventDefault();
      const file = event.target.files[0];
      let reader = new window.FileReader();
      reader.readAsArrayBuffer(file);
      if(1 == type) reader.onloadend = () => this.convertToBufferCertificate(reader);
      else reader.onloadend = () => this.convertToBufferSignature(reader);
    };

    resetState() {
      this.setState({ certificateHash: "",  holderAddress: "", date: "", time: "", nonceToCheck: "", nonce: "",
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
        let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress_2);
        let ProviderAddress = await ENSFunc.Resolution(this.state.providerAddress_2);

        this.state.errors.certificateHash_2 = ValFunc.validateHash(this.state.certificateHash_2);
        this.state.errors.nonce_2 = ValFunc.validateInteger(Nonce);
        this.state.errors.deadline_2 = ValFunc.validateInteger(deadline);
        this.state.errors.signature_2 = ValFunc.validateSignature(this.state.signature_2);
        this.state.errors.holderAddress_2 = ValFunc.validateAddress(HolderAddress);
        this.state.errors.providerAddress_2 = ValFunc.validateAddress(ProviderAddress);

        if(ValFunc.validate(this.state.errors)){
          let deadline = Math.ceil(new Date(this.state.date_2 + " " + this.state.time_2) / 1000);
          await func.AddCertificateOnBehalfOf(ProviderAddress, 
              this.state.certificateHash_2, 
              HolderAddress,
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

  checkNonce = async (event) => {
    event.preventDefault();
    let result = await SignatureFunc.retrieveNonce(this.props.contract, Aux.account, this.state.nonceToCheck);
    this.setState({nonceValid: result, nonceChecked: this.state.nonceToCheck});
  }

  ExportFile = (event) => {
    event.preventDefault();
    const element = document.createElement("a");
    const content = "Hash : " + this.state.displayCertificateHash + "\r\n" +
            "Holder : " + this.state.displayHolder + "\r\n" +
            "Provider : " + this.state.displayProvider + "\r\n" +
            "Nonce : " + this.state.displayNonce + "\r\n" +
            "Deadline : " + this.state.displayDeadline + "\r\n" +
            "Signature : " + this.state.displaySignature;

    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "Signature_" + this.props.contract._address + ".txt";
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  }

  handleSignCertificate = async (event) => {
    event.preventDefault();
    let reset = true;
    [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
    this.setState({})

    try{
      let from = Aux.account;
      let Deadline = Math.ceil(new Date(this.state.date + " " + this.state.time) / 1000);
      let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress);
      let Nonce = parseInt(this.state.nonce);

      this.state.errors.certificateHash = ValFunc.validateHash(this.state.certificateHash);
      this.state.errors.nonce = ValFunc.validateInteger(Nonce);
      this.state.errors.deadline = ValFunc.validateInteger(Deadline);
      this.state.errors.holderAddress = ValFunc.validateAddress(HolderAddress);

      if(ValFunc.validate(this.state.errors)){
        let config = await SignatureFunc.retrieveContractConfig(this.props.contract);
        let Domain = await SignatureFunc.Domain(config[0], this.props.contract._address, config[1]);
        let Message = SignatureFunc.AddCertificateOnBehalfOfMessage(from, this.state.certificateHash, HolderAddress, Nonce, Deadline)
      
        let params = [from, SignatureFunc.AddCertificatesMsgParams(Domain, Message)];
        let method = SignatureFunc.method;
        let signature = await Aux.web3.currentProvider.send({method,params,from}, 
          (err, result) => {
            if (err) window.alert("error " + JSON.stringify(err))
            else if (result.error)  window.alert("result error " + result.error)
            else return result.result
          });
                
        if(signature != null && signature != "undefined"){
          this.state.displayCertificateHash = this.state.certificateHash;
          this.state.displayHolder = HolderAddress;
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
             <Form onSubmit={this.checkNonce} style={{margin: '50px 50px 50px 50px' }}>
                <Form.Group  className="mb-3">
                  <Form.Control type="integer" name="Nonce" placeholder="nonce" 
                      value={this.state.nonceToCheck}
                      onChange={event => this.setState({ nonceToCheck: event.target.value })}/>
                </Form.Group>
                  <button type="submit" class="btn btn-secondary">Check Nonce</button> &nbsp;&nbsp;
            </Form>

            {("" != this.state.nonceChecked)?(
              <div style={{margin: '50px 50px 50px 50px' }}>
                <b>Nonce <i>{this.state.nonceChecked}</i> {(false == this.state.nonceValid)? "is valid" : "is NOT valid !!!!"} </b>
              </div>
            )
            :null}

            <Form onSubmit={this.handleSignCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFileCertificate} className={this.state.highlights.certificateHash}/>
                <Form.Control type="text" name="holderAddress" placeholder="holder address or ENS name" className={this.state.highlights.holderAddress}
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
                <Form onSubmit={this.ExportFile} style={{margin: '50px 0px 50px 0px' }}>
                    <button type="submit" class="btn btn-secondary">Extract File</button> &nbsp;&nbsp;
                </Form>
              </Container>
            : null}
            

            <Form onSubmit={this.handleSubmitSignature} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Control type="file" onChange={this.captureFileSignature} />
              <Form.Group className="mb-3">
                <Form.Control type="text" name="certificateHash_2" placeholder="Hash" className={this.state.highlights.certificateHash_2}
                      value={this.state.certificateHash_2}
                      onChange={event => this.setState({ certificateHash_2: event.target.value })}/>
                <Form.Control type="text" name="HolderAddress_2" placeholder="holder address or ENS name" className={this.state.highlights.holderAddress_2}
                      value={this.state.holderAddress_2}
                    onChange={event => this.setState({ holderAddress_2: event.target.value })}/>
                <Form.Control type="text" name="ProviderAddress_2" placeholder="provider address or ENS name" className={this.state.highlights.providerAddress_2}
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