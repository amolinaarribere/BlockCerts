import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");

class VoteCertificateComponent extends React.Component{
    state = {
      pool : "",
      hash : "",
      holder: ""
    };

    handleValidateCertificate = async (event) => {
        event.preventDefault();
      await func.ValidateCertificate(this.state.pool, this.state.hash, this.state.holder)
      this.setState({ pool: "",  hash : "", holder: ""})
    };
    handleRejectCertificate = async (event) => {
        event.preventDefault();
      await func.RejectCertificate(this.state.pool, this.state.hash, this.state.holder)
      this.setState({ pool: "",  hash : "", holder: ""})
    };
  
    render(){
      return(
        <div>
            <Form onSubmit={this.handleValidateCertificate} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="text" name="Pool" placeholder="pool" 
                  value={this.state.pool}
                  onChange={event => this.setState({ pool: event.target.value })}/>
                <Form.Control type="text" name="Hash" placeholder="hash" 
                  value={this.state.hash}
                  onChange={event => this.setState({ hash: event.target.value })}/>
                <Form.Control type="text" name="Holder" placeholder="holder" 
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