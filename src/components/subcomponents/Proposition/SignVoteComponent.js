import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/PropositionFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const SignatureFunc = require("../../../functions/SignatureFunctions.js");

class SignVoteComponent extends React.Component{

    state = {
        nonce: 0,
        date: "",
        time: "",
  
        voter_2 : "",
        propId_2: "",
        vote_2: "",
        nonce_2: 0,
        date_2: "",
        time_2: "",
        signature_2: "",
        
        signatureDisplayed : false,
        displayVoter: "",
        displayPropID: "",
        displayVote: "",
        displayNonce: 0,
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
      this.setState({ certificateHash: "",  holderAddress: "", date: "", time: "", nonce: 0,
        certificateHash_2: "",  holderAddress_2: "", providerAddress_2: "", signature_2: "",  date_2: "", time_2: "", nonce_2: 0})
    }

    handleSubmitSignature = async (event) => {
        event.preventDefault();
        let deadline = Math.ceil(new Date(this.state.date_2 + " " + this.state.time_2) / 1000);
      await func.VotePropositionOnBehalfOf(this.state.voter_2, 
          this.state.propId_2, 
          this.state.vote_2,
          this.state.nonce_2,
          deadline,
          this.state.signature_2,
          this.props.contract);
      this.resetState()
    };
  
    handleSignVote = async (event, vote) => {
      event.preventDefault();
  
      try{
        let from = Aux.account;
        let Deadline = Math.ceil(new Date(this.state.date + " " + this.state.time) / 1000);
        let Nonce = this.state.nonce;
  
        await SignatureFunc.retrieveContractConfig(this.props.contract);
        let Domain = await SignatureFunc.Domain(SignatureFunc.ContractName, this.props.contract._address, SignatureFunc.ContractVersion);
        let Message = SignatureFunc.VoteOnBehalfOfMessage(from, this.state.certificateHash, this.state.holderAddress, Nonce, Deadline)
      
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
      catch(e){
        window.alert("error : " + e)
      }
      
      this.resetState()
    
    }
    
  
    render(){
        return (
          <div>
            <Form onSubmit={this.handleSignVote(true)} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="integer" name="Nonce" placeholder="nonce" 
                    value={this.state.nonce}
                    onChange={event => this.setState({ nonce: event.target.value })}/>
                <Row>
                  <Col>
                    <Form.Control type="date" name="date" placeholder="date" 
                      value={this.state.date}
                      onChange={event => this.setState({ date: event.target.value })}/>
                  </Col>
                  <Col>
                    <Form.Control type="time" name="time" placeholder="time"
                      value={this.state.time}
                      onChange={event => this.setState({ time: event.target.value })}/>
                  </Col>
                </Row>
              </Form.Group>
                 <button type="submit" class="btn btn-primary">Sign Validation</button> &nbsp;&nbsp;
                 <button type="button" onClick="handleSignVote(false)" class="btn btn-primary">Sign Rejection</button> 
            </Form>

            {(this.state.signatureDisplayed)? 
                <Container style={{margin: '10px 50px 50px 50px' }}>
                <Row>
                  <Col><b>Voter :</b></Col> 
                  <Col>{this.state.displayVoter}</Col>
                </Row>
                <Row>
                  <Col><b>Proposition ID :</b></Col> 
                  <Col>{this.state.displayPropID}</Col>
                </Row>
                <Row>
                  <Col><b>Vote :</b></Col> 
                  <Col>{this.state.displayVote}</Col>
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
              <Form.Group className="mb-3">
                <Form.Control type="text" name="voter_2" placeholder="Voter" 
                      value={this.state.voter_2}
                      onChange={event => this.setState({ voter_2: event.target.value })}/>
                <Form.Control type="text" name="PropID_2" placeholder="Proposition ID" 
                      value={this.state.propId_2}
                    onChange={event => this.setState({ propId_2: event.target.value })}/>
                <Form.Control type="text" name="vote_2" placeholder="Vote" 
                    value={this.state.vote_2}
                    onChange={event => this.setState({ vote_2: event.target.value })}/>
                <Form.Control type="integer" name="nonce_2" placeholder="nonce" 
                    value={this.state.nonce_2}
                    onChange={event => this.setState({ nonce_2: event.target.value })}/>
                <Row>
                  <Col>
                      <Form.Control type="date"  name="date_2" placeholder="date" 
                          value={this.state.date_2}
                          onChange={event => this.setState({ date_2: event.target.value })}/>
                  </Col>
                  <Col>
                      <Form.Control type="time" name="time_2" placeholder="time"
                          value={this.state.time_2}
                          onChange={event => this.setState({ time_2: event.target.value })}/>
                  </Col>     
                </Row>
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

  export default SignVoteComponent;