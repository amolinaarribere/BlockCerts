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
        this.setState({ listingManagerEvents: true });
      }
      this.setState({ ManagerEvents: EventsFunc.eventlogs[EventsFunc.ManagerId] });
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
                      <Col><h2>New Contracts</h2></Col>
                    </Row>

                    {(this.state.ManagerEvents[EventsFunc.NewContractsId].length > 0 && 
                          EventsFunc.ManagerNewContractsConnected) ? (
                      <div>
                          {(this.state.ManagerEvents[EventsFunc.NewContractsId]).map(NewContracts => (
                               <div>
                                  <Row>
                                    <p>
                                      <b>Public </b>{NewContracts[0]} &nbsp;
                                      <b>Certis</b> {NewContracts[1]} &nbsp;
                                      <b>Treasury</b> {NewContracts[2]} &nbsp;
                                      <b>Private Factory : </b>{NewContracts[3]} &nbsp;
                                      <b>Private : </b>{NewContracts[4]} &nbsp;
                                      <b>Provider Factory : </b>{NewContracts[5]} &nbsp;
                                      <b>Provider : </b>{NewContracts[6]} &nbsp;
                                      <b>Price Converter : </b>{NewContracts[7]}
                                    </p>
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
                          EventsFunc.ManagerAddedPropositionConnected) ? (
                      <div>
    
                        {(this.state.ManagerEvents[EventsFunc.AddedPropositionId]).map(AddedProposition => (
                              <div>
                                <Row>
                                  <p>
                                      <b>ID </b>{AddedProposition[0]} &nbsp;
                                      <b>Proposer</b> {AddedProposition[1]} &nbsp;
                                      <b>DeadLine</b> {AddedProposition[2]} &nbsp;
                                      <b>Threshold : </b>{AddedProposition[3]} 
                                  </p>
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