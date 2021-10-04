import React from 'react';
import ListPendingCertificatesComponent from './ListPendingCertificatesComponent';
import VoteCertificateComponent from './VoteCertificateComponent';
import { Form, Container, Row, Col } from 'react-bootstrap';
import SignCertificateComponent from './SignCertificateComponent';

const func = require("../../../functions/CertificateFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

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

      retrieveholderAddress: "" 
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
      this.setState({ certificateHash: "",  holderAddress: "", poolAddress: ""})
    }
  
    handleAddCertificate = async (event) => {
        event.preventDefault();
      await func.AddCertificate(this.state.certificateHash, this.state.holderAddress, this.props.privateEnv, this.props.contractType, this.state.poolAddress);
      this.resetState()
    };
  
    handleCheckCertificate = async (event) => {
        event.preventDefault();
      await func.CheckCertificate(this.state.certificateHash, this.state.holderAddress, this.props.privateEnv);
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
                 <button type="submit" class="btn btn-success">Add Certificate</button> &nbsp;&nbsp;
                 <button type="button" class="btn btn-secondary" onClick={this.handleCheckCertificate}>Check Certificate</button>
            </Form>

            <Container>
              <Row>
                <Col>{func.certificateProvider}</Col>
              </Row>
            </Container>

           <SignCertificateComponent privateEnv={this.props.privateEnv} />

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