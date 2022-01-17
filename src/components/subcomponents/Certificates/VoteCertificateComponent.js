import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const ValFunc = require("../../../functions/ValidationFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");

class VoteCertificateComponent extends React.Component{
    state = {
      errors: {
        pool: true,
        hash: true,
        holder: true
      },

      highlights: {
        pool: '',
        hash: '',
        holder: ''
      },

      pool : "",
      hash : "",
      holder: ""
    };

    handleValidateCertificate = async (event) => {
      event.preventDefault();
      await this.handleCertificate(1)
    };

    handleRejectCertificate = async (event) => {
      event.preventDefault();
      await this.handleCertificate(2)
    };

    handleCertificate = async (option) => {
      let reset = true;
      [this.state.highlights, this.state.errors] = ValFunc.resetHighlightsFields(this.state.errors)
      this.setState({})

      let HolderAddress = await ENSFunc.Resolution(this.state.holder);
      let PoolAddress = await ENSFunc.Resolution(this.state.pool);

      this.state.errors.holder = ValFunc.validateAddress(HolderAddress);
      this.state.errors.pool = ValFunc.validateAddress(PoolAddress);
      this.state.errors.certificateHash = ValFunc.validateHash(this.state.hash);

      if(ValFunc.validate(this.state.errors)){
        if(option == 1)await func.ValidateCertificate(PoolAddress, this.state.hash, HolderAddress, this.props.contract)
        else await func.RejectCertificate(PoolAddress, this.state.hash, HolderAddress, this.props.contract)
      }
      else{
        this.state.highlights = ValFunc.HighlightsFields(this.state.errors)
        reset = false;
        this.setState({})
      } 
     
      if(reset)this.reset()
    };

    reset = async () => {
      this.setState({ pool: "",  hash : "", holder: ""})
      await loadFunc.LoadCertificateFunc()
      await this.props.refresh();
    };
  
    render(){
      return(
        <div>
            <Form onSubmit={this.handleValidateCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="Pool" placeholder="pool address or ENS name" 
                  value={this.state.pool}
                  onChange={event => this.setState({ pool: event.target.value })}/>
                <Form.Control type="text" name="Hash" placeholder="hash" 
                  value={this.state.hash}
                  onChange={event => this.setState({ hash: event.target.value })}/>
                <Form.Control type="text" name="Holder" placeholder="holder address or ENS name" 
                  value={this.state.holder}
                  onChange={event => this.setState({ holder: event.target.value })}/>
              </Form.Group>
              <button type="submit" class="btn btn-secondary">Add Certificate</button> &nbsp;&nbsp;
              <button type="button" class="btn btn-secondary" onClick={this.handleRejectCertificate}>Reject Certificate</button> &nbsp;&nbsp;
            </Form>
        </div>
      );
    }
  }

  export default VoteCertificateComponent;