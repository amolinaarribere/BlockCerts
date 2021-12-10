import React from 'react';
import { Form } from 'react-bootstrap';
import { ETHFactor } from '../../../config';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/ProviderPoolFunctions.js");

class FundIssuerComponent extends React.Component {
    state = {
      amount : 0
    };

    handleTransfer = async (event) => {
      event.preventDefault();
      await func.FundProvider((new BigNumber(this.state.amount).multipliedBy(ETHFactor)).dp(0, 1).toString());
      this.setState({amount: 0});
      await this.props.refresh();
    };
    
    render(){
      return (
        <div class="border border-0">
          <h3>Fund Issuer</h3>
                <Form onSubmit={this.handleTransfer} style={{margin: '50px 50px 50px 50px' }}>
                  <Form.Group  className="mb-3">
                    <Form.Control type="string" name="Amount" placeholder="amount" 
                          value={this.state.amount}
                          onChange={event => this.setState({ amount: event.target.value })}/>
                  </Form.Group>
                  <button class="btn btn-secondary">Transfer Amount</button>
                </Form>
                <br/>
          </div>
      );
    }
  }

export default FundIssuerComponent;