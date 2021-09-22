import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const EventsFunc = require("../../../functions/EventsFunctions.js");



class ListManagerEventsComponent extends React.Component {
    state = {
     isManagerEventsShown: false,
     ManagerEventBlock : 0,
     listingManagerEvents: false,
     ManagerEvents: []
    };

    toggleManagerEvents = () => {
      if(this.state.isManagerEventsShown)this.setState({ isManagerEventsShown: false })
      else this.setState({ isManagerEventsShown: true })
    };


    handleManagerEvents = async (event) => {
      event.preventDefault();
      if(!this.state.listingManagerEvents){
        await EventsFunc.GetManagerEvents(this.state.ManagerEventBlock);
        this.setState({ listingManagerEvents: true });
      }
      this.setState({ ManagerEvents: EventsFunc.eventlogs[EventsFunc.ManagerId] });
    }

    handleStopEvents = async (event) => {
      event.preventDefault();
      this.setState({ listingManagerEvents: false })
      await EventsFunc.StopEvents();
    }

    render(){
      return (
        <div>
         <button
            className="btn btn-lg btn-primary center modal-button"
            onClick={this.toggleManagerEvents}>Manager Events</button>

          {(this.state.isManagerEventsShown) ? (

                  <div class="border border-primary border-5">
                  <Form onSubmit={this.handleManagerEvents} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                      <Form.Control type="integer" name="ManagerEventBlock" placeholder="ManagerEventBlock" 
                          value={this.state.ManagerEventBlock}
                          onChange={event => this.setState({ ManagerEventBlock: event.target.value })}/>
                    </Form.Group>
                      <button class="btn btn-secondary">{(this.state.listingManagerEvents) ? "Refresh" : "List Events"}</button>
                  </Form>
                
                  <br />

                  {(this.state.listingManagerEvents  && 
                        this.state.ManagerEvents.length > 0) ? (
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                    <Row>
                      <button
                          className="btn btn-lg btn-secondary center modal-button"
                          onClick={this.handleStopEvents}>Stop Events</button>
                    </Row>

                    <br />
                    <br />

                    <Row>
                      <Col><h2>New Contracts</h2></Col>
                    </Row>

                    {(this.state.ManagerEvents[EventsFunc.NewContractsId].length > 0 && 
                          EventsFunc.ManagerNewProposalConnected) ? (
                      <div>

                        {(this.state.ManagerEvents[EventsFunc.NewContractsId]).map(NewContracts => (
                              <div>
                                <Row>
                                    <Col><b>Public : </b>{NewContracts[0]}</Col>
                                    <Col><b>Treasury : </b>{NewContracts[1]}</Col>
                                    <Col><b>Certis : </b>{NewContracts[2]}</Col>
                                    <Col><b>Private Factory : </b>{NewContracts[3]}</Col>
                                    <Col><b>Private : </b>{NewContracts[4]}</Col>
                                    <Col><b>Provider Factory : </b>{NewContracts[5]}</Col>
                                    <Col><b>Provider : </b>{NewContracts[6]}</Col>
                                    <Col><b>Price Converter : </b>{NewContracts[7]}</Col>
                                </Row>
                                <br />
                              </div>
                        ))}
                        
                        </div>
                      ):null}

                    <br />  
                    <hr class="bg-secondary"/>
                    <br />

                    <Row>
                      <Col><h2>Added Proposition</h2></Col>
                    </Row>

                    {(this.state.ManagerEvents[EventsFunc.AddedPropositionId].length > 0 && 
                          EventsFunc.ManagerAddedProposition) ? (
                      <div>
    
                        {(this.state.ManagerEvents[EventsFunc.AddedPropositionId]).map(AddedProposition => (
                              <div>
                                <Row>
                                    <Col><b>ID : </b>{AddedProposition[0]}</Col>
                                    <Col><b>Proposer : </b>{AddedProposition[1]}</Col>
                                    <Col><b>DeadLine : </b>{AddedProposition[2]}</Col>
                                    <Col><b>Threshold : </b>{AddedProposition[3]}</Col>
                                </Row>
                                <br />
                              </div>
                        ))}
                        
                        </div>
                      ):null}

                    <br />  
                    <hr class="bg-secondary"/>
                    <br />

                  </Container>) : null}
                  </div>

              ) : null}

          <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default ListManagerEventsComponent;