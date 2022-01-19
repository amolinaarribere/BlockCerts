import {PublicContractType, PrivateContractType, ProviderContractType} from '../../../config.js';
import React from 'react';
import ListPendingCertificatesComponent from './ListPendingCertificatesComponent';
import VoteCertificateComponent from './VoteCertificateComponent';
import { Form, Container, Row, Col } from 'react-bootstrap';
import SignCertificateComponent from './SignCertificateComponent';

const func = require("../../../functions/CertificateFunctions.js");
const AuxFunc = require("../../../functions/AuxiliaryFunctions.js");
const ValFunc = require("../../../functions/ValidationFunctions.js");
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
      errors: {
        certificateHash: true,
        holderAddress: true,
        poolAddress: true,
        retrieveholderAddress: true
      },

      highlights: {
        certificateHash: '',
        holderAddress: '',
        poolAddress: '',
        retrieveholderAddress: ''
      },

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
      let reset = true;
      [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
      this.setState({})

      let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress);
      let PoolAddress = await ENSFunc.Resolution(this.state.poolAddress);

      this.state.errors.holderAddress = ValFunc.validateAddress(HolderAddress);
      if(ProviderContractType == this.props.contractType)this.state.errors.poolAddress = ValFunc.validateAddress(PoolAddress);
      else this.state.errors.poolAddress = true;
      this.state.errors.certificateHash = ValFunc.validateHash(this.state.certificateHash);

      if(ValFunc.validate(this.state.errors)){
        await func.AddCertificate(this.state.certificateHash, HolderAddress, this.props.price, this.props.contractType, this.props.contract, PoolAddress);
      }
      else{
        this.state.highlights = ValFunc.HighlightsFields(this.state.errors)
        reset = false;
        this.setState({})
      } 

      if(reset)this.resetState()

    };
  
    handleCheckCertificate = async (event) => {
        event.preventDefault();
      let reset = true;
      [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
      this.setState({})

      let HolderAddress = await ENSFunc.Resolution(this.state.holderAddress);

      this.state.errors.holderAddress = ValFunc.validateAddress(HolderAddress);
      this.state.errors.certificateHash = ValFunc.validateHash(this.state.certificateHash);

      if(ValFunc.validate(this.state.errors)){
        await func.CheckCertificate(this.state.certificateHash, HolderAddress, this.props.contract);
      }
      else{
        this.state.highlights = ValFunc.HighlightsFields(this.state.errors)
        reset = false;
        this.setState({})
      } 
     
      if(reset)this.resetState()
    };
  
    handleRetrieveByHolder = async (event) => {
        event.preventDefault();
      let reset = true;
      [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
      this.setState({})

      let HolderAddress = await ENSFunc.Resolution(this.state.retrieveholderAddress);
      
      this.state.errors.retrieveholderAddress = ValFunc.validateAddress(HolderAddress);

      if(ValFunc.validate(this.state.errors)){
        await func.retrieveCertificatesByHolder(HolderAddress, 0, 99, this.props.contract)
      }
      else{
        this.state.highlights = ValFunc.HighlightsFields(this.state.errors)
        reset = false;
        this.setState({})
      } 

      if(reset)this.setState({ retrieveholderAddress: ""})
    };
  
    render(){
      if(ProviderContractType != this.props.contractType){
        return (
          <div>
            <h3>Certificates</h3>
            <Form onSubmit={this.handleCheckCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control type="file" onChange={this.captureFile} className={this.state.highlights.certificateHash}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address or ENS name" className={this.state.highlights.holderAddress}
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
              </Form.Group>
                 <button type="submit" class="btn btn-secondary">Check Certificate</button> &nbsp;&nbsp;
                 {(AuxFunc.account)?<button type="button" class="btn btn-primary" onClick={this.handleAddCertificate}>Add Certificate</button>:null}
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
                <Form.Control type="text" name="RetreiveByHolder" placeholder="holder address or ENS name" className={this.state.highlights.retrieveholderAddress}
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
                <Form.Control type="file" onChange={this.captureFile} className={this.state.highlights.certificateHash}/>
                <Form.Control type="text" name="HolderAddress" placeholder="holder address or ENS name" className={this.state.highlights.holderAddress}
                    value={this.state.holderAddress}
                    onChange={event => this.setState({ holderAddress: event.target.value })}/>
                <Form.Control type="text" name="PoolAddress" placeholder="pool address or ENS name" className={this.state.highlights.poolAddress}
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