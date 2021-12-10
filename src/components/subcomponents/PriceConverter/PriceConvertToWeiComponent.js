import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import { USDFactor, ETHDecimals, ETHFactor } from '../../../config';

const func = require("../../../functions/PriceConverterFunctions.js");

class PriceConvertToWeiComponent extends React.Component {
    state = {
      AmountUSDText : "",
      AmountUSD : 0,
      AmountETH : 0
    };

    Convert = async (event) => {
      event.preventDefault();
      if(this.state.AmountUSDText != "") this.state.AmountUSD = this.state.AmountUSDText;
      this.state.AmountETH = (await func.CentsToWeis(USDFactor.multipliedBy(this.state.AmountUSD), this.props.contract)).dividedBy(ETHFactor).dp(ETHDecimals, 0).toString();
      this.setState({ AmountUSDText: ""})
    };
    
    render(){
      return (
        <div>
         <h3>Check USD/ETH Exchange Rate</h3>
         <Form onSubmit={this.Convert} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group  className="mb-3">
              <Form.Control type="number" step="0.01" name="AmountUSD" placeholder="Amount in USD" 
                  value={this.state.AmountUSDText}
                  onChange={event => this.setState({ AmountUSDText: event.target.value })}/>
            </Form.Group>
            <button class="btn btn-secondary">Convert</button> 
          </Form>
          <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Amount In ETH :</b></Col> 
                <Col>{this.state.AmountETH} ({this.state.AmountUSD}USD)</Col>
              </Row>
          </Container>
          <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default PriceConvertToWeiComponent;