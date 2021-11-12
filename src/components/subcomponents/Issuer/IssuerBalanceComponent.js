import React from 'react';
import {  Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/ProviderPoolFunctions.js");

class IssuerBalanceComponent extends React.Component {
    render(){
      return (
        <div>
          <div class="border border-0">
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Issuer's Balance :</b></Col> 
                <Col>{func.Balance} ETH</Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    }
  }

export default IssuerBalanceComponent;