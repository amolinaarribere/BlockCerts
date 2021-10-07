import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from './VoteForPropositionComponent.js';

const func = require("../../../functions/PropositionFunctions.js");

class ListPendingPropositionConfigComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  refresh() {
    this.props.refresh();
  }

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
                      <Col>{func.PendingPropositionLifeTime}</Col>
                    </Row>
                    <Row>
                      <Col><b>Pending Proposition Threshold Percentage :</b></Col> 
                      <Col>{func.PendingPropositionThresholdPercentage}</Col>
                    </Row>
                    <Row>
                      <Col><b>Pending Min Weight To Propose Percentage :</b></Col> 
                      <Col>{func.PendingMinWeightToProposePercentage}</Col>
                    </Row>
                    < br/>
                    <Row>
                      <VoteForPropositionComponent contract={this.props.contract}
                        contractType={this.props.contractType} 
                        refresh={this.refresh}/>
                    </Row>
                  </Container>
                </div>) : null}      
        </div>
    
    );
    }
    
  }

  export default ListPendingPropositionConfigComponent;