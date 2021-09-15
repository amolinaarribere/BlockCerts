import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
const func = require("../../../functions/PropositionFunctions.js");

class ListPendingPropositionConfigComponent extends React.Component{

  state = {
    isPendingPropositionConfigShown: false
  };

  togglePendingPropositionConfig = () => {
    if(this.state.isPendingPropositionConfigShown)this.setState({ isPendingPropositionConfigShown: false })
    else this.setState({ isPendingPropositionConfigShown: true })
  };

  render(){
    return(
      <div>
        <button
          className="btn btn-lg btn-warning center modal-button"
          onClick={this.togglePendingPropositionConfig}>Check Pending Proposition Config</button>

      {this.state.isPendingPropositionConfigShown ? (
        <div class="border border-warning border-5">
          <Container style={{margin: '10px 50px 50px 50px' }}>
            <Row>
              <Col><b>Pending Proposition Life Time :</b></Col> 
              <Col>{(this.props.contractType == 1)? func.PendingManagerPropositionLifeTime : 
                    (this.props.contractType == 2)? func.PendingTreasuryPropositionLifeTime :
                    func.PendingPCPropositionLifeTime}</Col>
            </Row>
            <Row>
              <Col><b>Pending Proposition Threshold Percentage :</b></Col> 
              <Col>{(this.props.contractType == 1)? func.PendingManagerPropositionThresholdPercentage :
                    (this.props.contractType == 2)? func.PendingTreasuryPropositionThresholdPercentage :
                    func.PendingPCPropositionThresholdPercentage}</Col>
            </Row>
            <Row>
              <Col><b>Pending Min Weight To Propose Percentage :</b></Col> 
              <Col>{(this.props.contractType == 1)? func.PendingManagerMinWeightToProposePercentage :
                    (this.props.contractType == 2)? func.PendingTreasuryMinWeightToProposePercentage :
                    func.PendingPCMinWeightToProposePercentage}</Col>
            </Row>
          </Container>
        </div>
          
      ) : null}
        
      </div>
    );
    }
    
  }

  export default ListPendingPropositionConfigComponent;