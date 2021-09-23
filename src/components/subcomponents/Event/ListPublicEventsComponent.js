import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const EventsFunc = require("../../../functions/EventsFunctions.js");



class ListPublicEventsComponent extends React.Component {
    state = {
     isPublicEventsShown: false,
     PublicEventBlock : 0,
     listingPublicEvents: false,
     PublicEvents: []
    };

    togglePublicEvents = () => {
      if(this.state.isPublicEventsShown)this.setState({ isPublicEventsShown: false })
      else this.setState({ isPublicEventsShown: true })
    };


    handlePublicEvents = async (event) => {
      event.preventDefault();
      if(!this.state.listingPublicEvents){
        this.setState({ listingPublicEvents: true });
      }
      this.setState({ PublicEvents: EventsFunc.eventlogs[EventsFunc.PublicId] });
    }


    render(){
      return (
        <div>
         <button
            className="btn btn-lg btn-primary center modal-button"
            onClick={this.togglePublicEvents}>Public Events</button>

          {(this.state.isPublicEventsShown) ? (

                  <div class="border border-primary border-5">
                  <Form onSubmit={this.handlePublicEvents} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                      <Form.Control type="integer" name="PublicEventBlock" placeholder="PublicEventBlock" 
                          value={this.state.PublicEventBlock}
                          onChange={event => this.setState({ PublicEventBlock: event.target.value })}/>
                    </Form.Group>
                      <button class="btn btn-secondary">{(this.state.listingPublicEvents) ? "Refresh" : "List Events"}</button>
                  </Form>
                
                  <br />

                  {(this.state.listingPublicEvents  && 
                        this.state.PublicEvents.length > 0) ? (
                  <Container style={{margin: '10px 50px 50px 50px' }}>
                    <Row>
                      <Col><h2>New Proposals</h2></Col>
                    </Row>

                    {(this.state.PublicEvents[EventsFunc.NewProposalId].length > 0 && 
                          EventsFunc.PublicNewProposalConnected) ? (
                      <div>
                        
                        {(this.state.PublicEvents[EventsFunc.NewProposalId]).map(NewProposal => (
                              <div>
                                  <Row>
                                    <p>
                                      <b>Account </b>{NewProposal[0]} &nbsp;
                                      <b>Info</b> {NewProposal[1]}
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
                      <Col><h2>Add Certificates</h2></Col>
                    </Row>

                    {(this.state.PublicEvents[EventsFunc.AddCertificateId].length > 0 && 
                          EventsFunc.PublicAddCertificatesConnected) ? (
                      <div>
    
                        {(this.state.PublicEvents[EventsFunc.AddCertificateId]).map(AddCertificateId => (
                              <div>
                                <Row>
                                    <p>
                                      <b>Provider </b>{AddCertificateId[0]} &nbsp;
                                      <b>Holder</b> {AddCertificateId[1]} &nbsp;
                                      <b>Certificate</b> {AddCertificateId[2]}
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
  
export default ListPublicEventsComponent;