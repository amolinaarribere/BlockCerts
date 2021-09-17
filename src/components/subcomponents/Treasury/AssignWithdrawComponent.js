import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { ETHDecimals } from '../../../config';
const func = require("../../../functions/TreasuryFunctions.js");

class AssignWithdrawComponent extends React.Component {
    state = {
        amount : 0
      };
    
    handleAssignDividends = async (event) => {
        event.preventDefault();
      await func.AssignDividends();
    };

    handleWithdraw = async (event) => {
        event.preventDefault();
      await func.WithdrawAmount(this.state.amount);
      this.setState({amount: 0});
    };

    render(){
      return (
        <div>
          <div class="border border-0">
            <h3>Treasury Balances</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Aggregated Balance (ETH) :</b></Col> 
                <Col>{func.TreasuryAggregatedBalance / ETHDecimals}</Col>
              </Row>
              <Row>
                <Col><b>Contract Balance (ETH) :</b></Col> 
                <Col>{func.TreasuryBalance / ETHDecimals}</Col>
              </Row>
              <Row>
                <Col><b>Your Last Assigned (ETH) :</b></Col> 
                <Col>{func.LastAssigned / ETHDecimals}</Col>
              </Row>
              <Row>
                <Col><b>Your current Balance (ETH) :</b></Col> 
                <Col>{func.AccountBalance / ETHDecimals}</Col>
              </Row>
            </Container>
          </div>
          <div class="border border border-0">
            <Form onSubmit={this.handleWithdraw} style={{margin: '50px 50px 50px 50px' }}>
              <Form.Group  className="mb-3">
                <Form.Control type="integer" name="Amount" placeholder="Amount in Wei" 
                  value={this.state.amount}
                  onChange={event => this.setState({ amount: event.target.value })}/>
              </Form.Group>
              <button class="btn btn-secondary">Withdraw Amount</button>
            </Form>
          </div>
        </div>

      );
    }
  }
  
export default AssignWithdrawComponent;