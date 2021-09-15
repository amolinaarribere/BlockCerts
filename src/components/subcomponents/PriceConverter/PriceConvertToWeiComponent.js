import React from 'react';
import {  ETHDecimals } from '../../../config';
import { Form, Container, Row, Col } from 'react-bootstrap';
const func = require("../../../functions/PriceConverterFunctions.js");

class PriceConvertToWeiComponent extends React.Component {
    state = {
      AmountUSDText : "",
      AmountUSD : 0,
      AmountWei : 0
    };

    Convert = async (event) => {
      event.preventDefault();

      if(this.state.AmountUSDText != "") this.state.AmountUSD = this.state.AmountUSDText;

      this.state.AmountWei = await func.USDToEther(this.state.AmountUSD);

      this.setState({ AmountUSDText: ""})
    };
    
    render(){
      return (
        <div>
         <Form onSubmit={this.Convert} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group  className="mb-3">
              <Form.Control type="integer" name="AmountUSD" placeholder="Amount in USD cents" 
                  value={this.state.AmountUSDText}
                  onChange={event => this.setState({ AmountUSDText: event.target.value })}/>
            </Form.Group>
            <button>Convert</button> 
          </Form>
          <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Amount In ETH :</b></Col> 
                <Col>{this.state.AmountWei / ETHDecimals} ({this.state.AmountUSD}USD)</Col>
              </Row>
          </Container>
        </div>
      );
    }
  }
  
export default PriceConvertToWeiComponent;