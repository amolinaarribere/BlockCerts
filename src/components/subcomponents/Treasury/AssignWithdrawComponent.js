import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { ETHDecimals } from '../../../config';

const BigNumber = require('bignumber.js');
const func = require("../../../functions/TreasuryFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class AssignWithdrawComponent extends React.Component {
    state = {
        amount : ""
      };
    
    handleAssignDividends = async (event) => {
        event.preventDefault();
      await func.AssignDividends();
      await loadFunc.LoadTreasuryFunc();
      this.props.refresh();
    };

    handleWithdraw = async (event) => {
      event.preventDefault();
      await func.WithdrawAmount((new BigNumber(this.state.amount)).toString());
      this.setState({amount: ""});
      await loadFunc.LoadTreasuryFunc();
      this.props.refresh();
    };

    render(){
      return (
        <div>
          <div class="border border-0">
            <h3>Treasury Balances</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Aggregated Balance (ETH) :</b></Col> 
                <Col>{func.TreasuryAggregatedBalance.dividedBy(ETHDecimals).toString()}</Col>
              </Row>
              <Row>
                <Col><b>Contract Balance (ETH) :</b></Col> 
                <Col>{func.TreasuryBalance.dividedBy(ETHDecimals).toString()}</Col>
              </Row>
              <Row>
                <Col><b>Your Last Assigned (ETH) :</b></Col> 
                <Col>{func.LastAssigned.dividedBy(ETHDecimals).toString()}</Col>
              </Row>
              <Row>
                <Col><b>Your current Balance (ETH) :</b></Col> 
                <Col>{func.AccountBalance.dividedBy(ETHDecimals).toString()}</Col>
              </Row>
              <br />
              <button type="button" class="btn btn-secondary" onClick={this.handleAssignDividends}>Assign</button>
            </Container>
          </div>
          <div class="border border border-0">
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="string" name="Amount" placeholder="Amount in Wei" 
                  value={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-secondary">Withdraw Amount</button>
            </Form>
          </div>
          <hr class="bg-secondary"/>
        </div>

      );
    }
  }
  
export default AssignWithdrawComponent;