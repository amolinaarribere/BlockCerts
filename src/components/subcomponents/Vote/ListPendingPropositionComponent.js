import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Vote/VoteForPropositionComponent.js';

class ListPendingPropositionComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  async refresh() {
    await this.props.refresh();
  }

  state = {
    isPendingPropositionShown: false
  };

  togglePendingPropositionConfig = () => {
    if(this.state.isPendingPropositionShown)this.setState({ isPendingPropositionShown: false })
    else this.setState({ isPendingPropositionShown: true })
  };

  render(){
    return(
        <div>
          <button
                  className="btn btn-lg btn-warning center modal-button"
                  onClick={this.togglePendingPropositionConfig}>{this.props.text}</button>
          {this.state.isPendingPropositionShown ? (
                <div class="border border-warning border-5">
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                      {this.props.headers.map(
                          (header, index) => (
                            <Row>
                                <Col><b>{header}</b></Col> 
                                <Col>{this.props.values[index]}</Col>
                            </Row>
                          )
                      )}
                    < br/>
                    <Row>
                      <VoteForPropositionComponent contract={this.props.contract}
                        refresh={this.refresh}/>
                    </Row>
                  </Container>
                </div>) : null}      
        </div>
    
    );
    }
    
  }

  export default ListPendingPropositionComponent;