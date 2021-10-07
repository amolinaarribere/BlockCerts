import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/CertisFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class CertisTransferComponent extends React.Component {
    state = {
      amount : 0,
      recipient : ""
    };

    handleTransfer = async (event) => {
      event.preventDefault();
      await func.transfer(this.state.recipient, this.state.amount, this.props.contract);
      this.setState({amount: 0, recipient: ""});
      //await loadFunc.LoadCertisFunc(this.props.contract);
      await this.props.refresh();
    };
    
    render(){
      return (
        <div class="border border-0">
                <Form onSubmit={this.handleTransfer} style={{margin: '50px 50px 50px 50px' }}>
                  <Form.Group  className="mb-3">
                    <Form.Control type="integer" name="Amount" placeholder="amount" 
                          value={this.state.amount}
                          onChange={event => this.setState({ amount: event.target.value })}/>
                    <Form.Control type="text" name="Recipient" placeholder="recipient" 
                          value={this.state.recipient}
                          onChange={event => this.setState({ recipient: event.target.value })}/>
                  </Form.Group>
                  <button class="btn btn-secondary">Transfer Amount</button>
                </Form>
                <br/>
          </div>
      );
    }
  }

export default CertisTransferComponent;