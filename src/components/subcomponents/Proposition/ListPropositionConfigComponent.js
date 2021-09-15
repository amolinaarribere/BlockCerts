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
                <Col>{(this.props.contractType == 1)? func.ManagerPropositionLifeTime : 
                      (this.props.contractType == 2)? func.TreasuryPropositionLifeTime :
                      func.PCPropositionLifeTime}</Col>
              </Row>
              <Row>
                <Col><b>Proposition Threshold Percentage :</b></Col> 
                <Col>{(this.props.contractType == 1)? func.ManagerPropositionThresholdPercentage :
                      (this.props.contractType == 2)? func.TreasuryPropositionThresholdPercentage :
                      func.PCPropositionThresholdPercentage}</Col>
              </Row>
              <Row>
                <Col><b>Min Weight To Propose Percentage :</b></Col> 
                <Col>{(this.props.contractType == 1)? func.ManagerMinWeightToProposePercentage :
                      (this.props.contractType == 2)? func.TreasuryMinWeightToProposePercentage :
                      func.PCMinWeightToProposePercentage}</Col>
              </Row>
            </Container>
          </div>
         ); 
       }
  }

export default ListPropositionConfigComponent;