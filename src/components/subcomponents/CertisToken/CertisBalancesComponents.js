import React from 'react';
import {  Container, Row, Col } from 'react-bootstrap';
const func = require("../../../functions/CertisFunctions.js");

class CertisBalancesComponents extends React.Component {
    render(){
      return (
        <div>
          <div class="border border-0">
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Total Token Supply :</b></Col> 
                <Col>{func.TokensTotalSupply}</Col>
              </Row>
              <Row>
                <Col><b>Your current Balance :</b></Col> 
                <Col>{func.TokensBalance}</Col>
              </Row>
            </Container>
          </div>
        </div>
      );
    }
  }

export default CertisBalancesComponents;