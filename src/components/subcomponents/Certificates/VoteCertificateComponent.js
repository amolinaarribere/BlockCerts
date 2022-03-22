import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");

class VoteCertificateComponent extends React.Component{
    state = {
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
      let HolderAddress = await ENSFunc.Resolution(this.state.holder.trim());
      let PoolAddress = await ENSFunc.Resolution(this.state.pool.trim());

      if(option == 1)await func.ValidateCertificate(PoolAddress, this.state.hash.trim(), HolderAddress, this.props.contract)
      else await func.RejectCertificate(PoolAddress, this.state.hash.trim(), HolderAddress, this.props.contract)
     
      await this.reset()
    };

    reset = async () => {
      this.setState({ pool: "",  hash : "", holder: ""})
      await loadFunc.LoadCertificateFunc(this.props.contract)
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
              <button type="submit" class="btn btn-success">Validate Certificate</button> &nbsp;&nbsp;
              <button type="button" class="btn btn-danger" onClick={this.handleRejectCertificate}>Reject Certificate</button> &nbsp;&nbsp;
            </Form>
        </div>
      );
    }
  }

  export default VoteCertificateComponent;