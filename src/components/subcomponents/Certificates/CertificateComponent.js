import {ProviderContractType} from '../../../config.js';
import React from 'react';
import ListPendingCertificatesComponent from './ListPendingCertificatesComponent';
import VoteCertificateComponent from './VoteCertificateComponent';
import { Form, Container, Row, Col } from 'react-bootstrap';
import SignCertificateComponent from './SignCertificateComponent';

const func = require("../../../functions/CertificateFunctions.js");
const AuxFunc = require("../../../functions/AuxiliaryFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");

class CertificateComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
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
      this.setState({certificateHash: AuxFunc.web3.utils.keccak256(buffer)});
    };

    resetState() {
      this.setState({ certificateHash: "",  holderAddress: "", poolAddress: ""})
    }
  
    handleAddCertificate = async (event) => {
      event.preventDefault();

      let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress.trim());
      let PoolAddress = await ENSFunc.Resolution(this.state.poolAddress.trim());

      await func.AddCertificate(this.state.certificateHash.trim(), HolderAddress, this.props.price, this.props.contractType, this.props.contract, PoolAddress);

      this.resetState()
    };

    handleTransferCertificate = async (event) => {
      event.preventDefault();

      let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress.trim());

      await func.TransferCertificate(this.state.certificateHash.trim(), HolderAddress, this.props.contract);

      this.resetState()
    };
  
    handleCheckCertificate = async (event) => {
      event.preventDefault();

      let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress.trim());

      await func.CheckCertificate(this.state.certificateHash.trim(), HolderAddress, this.props.contract);
  
      this.resetState()
    };
  
    handleRetrieveByHolder = async (event) => {
      event.preventDefault();

      let HolderAddress = await ENSFunc.Resolution(this.state.retrieveholderAddress.trim());
      
      await func.retrieveCertificatesByHolder(HolderAddress, 0, 99, this.props.contract)

      this.setState({ retrieveholderAddress: ""})
    };
  
    render(){
      if(ProviderContractType != this.props.contractType){
        return (
          <div>
            <h3>Certificates</h3>
            <Form onSubmit={this.handleCheckCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address or ENS name"
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
              </Form.Group>
                 <button type="submit" class="btn btn-secondary">Check Certificate</button> &nbsp;&nbsp;
                 {(AuxFunc.account)?
                      <button type="button" class="btn btn-primary" onClick={this.handleAddCertificate}>Add Certificate</button>                 :
                    null} &nbsp;&nbsp;   
                {(AuxFunc.account)?
                      <button type="button" class="btn btn-primary" onClick={this.handleTransferCertificate}>Transfer Certificate</button>
                    :
                    null}
            </Form>

            <Container>
              <Row>
                <Col>{func.certificateProvider}</Col>
              </Row>
            </Container>

            {(AuxFunc.account)?
                <SignCertificateComponent contract={this.props.contract} 
                  price={this.props.price}/>
                  :
                null
            }

            <Form onSubmit={this.handleRetrieveByHolder} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="RetreiveByHolder" placeholder="holder address or ENS name"
                    value={this.state.retrieveholderAddress}
                    onChange={event => this.setState({ retrieveholderAddress: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-secondary">Retrieve By Holder</button>
            </Form>

            <Container>
              {(func.certificatesByHolder.length > 0)? (<Row><Col><b>{func.certificatesByHolder.length} Certificate(s) for Holder :</b></Col> <Col>{func.currentHolder}</Col></Row>):null}
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
                <Form.Control type="text" name="HolderAddress" placeholder="holder address or ENS name"
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
                <Form.Control type="text" name="PoolAddress" placeholder="pool address or ENS name"
                    value={this.state.poolAddress}
                    onChange={event => this.setState({ poolAddress: event.target.value })}/>
              </Form.Group>
              <button type="submit" class="btn btn-primary">Add Certificate</button> &nbsp;&nbsp;
            </Form>
            <VoteCertificateComponent contract={this.props.contract}
              refresh={this.refresh} />
            <br />
            <ListPendingCertificatesComponent contract={this.props.contract}/>
            <hr class="bg-secondary"/>
          </div>
        );
      }
      
    }
  }

  export default CertificateComponent;