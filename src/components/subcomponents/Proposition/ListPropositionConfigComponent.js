import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const func = require("../../../functions/PropositionFunctions.js");

class ListPropositionConfigComponent extends React.Component{
       render(){
         return(
          <div class="border border-0">
            <h3>Proposition Configuration Parameters</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Proposition Life Time :</b></Col> 
                <Col>{func.PropositionLifeTime}</Col>
              </Row>
              <Row>
                <Col><b>Proposition Threshold Percentage :</b></Col> 
                <Col>{func.PropositionThresholdPercentage}</Col>
              </Row>
              <Row>
                <Col><b>Min Weight To Propose Percentage :</b></Col> 
                <Col>{func.MinWeightToProposePercentage}</Col>
              </Row>
            </Container>
          </div>
         ); 
       }
  }

export default ListPropositionConfigComponent;