import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Vote/VoteForPropositionComponent.js';

const func = require("../../../functions/ENSFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const emptyByte = "0x";

class ENSPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
  }

    state = {
      NewENSRegistryAddress : "",
      NewENSReverseRegistryAddress : "",
      NewPrivatePoolNode: "",
      NewProviderNode: "",

      isUpdateShown: false,
      isPendingShown: false
    };

    toggleUpdate = () => {
      if(this.state.isUpdateShown)this.setState({ isUpdateShown: false })
      else this.setState({ isUpdateShown: true })
    };

    togglePending = () => {
      if(this.state.isPendingShown)this.setState({ isPendingShown: false })
      else this.setState({ isPendingShown: true })
    };

    handleUpgradeContracts = async (event) => {
      event.preventDefault();
      var NERA = address_0;
      var NERRA = address_0;
      var PPN = emptyByte;
      var PN = emptyByte;

      if(this.state.NewENSRegistryAddress != "") NERA = this.state.NewENSRegistryAddress;
      if(this.state.NewENSReverseRegistryAddress != "") NERRA = this.state.NewENSReverseRegistryAddress;
      if(this.state.NewPrivatePoolNode != "") PPN = this.state.NewPrivatePoolNode;
      if(this.state.NewProviderNode != "") PN = this.state.NewProviderNode;


      await func.UpgradeENSConfig(NERA, NERRA, PPN, PN, this.props.contract);
      this.setState({ NewENSRegistryAddress: "",
      NewENSReverseRegistryAddress: "",
      NewPrivatePoolNode: "",
      NewProviderNode: "",})
      await this.refresh();
    };
    
    render(){
      return (
        <div>
          <div class="border border border-0">
            <h3>ENS Configuration</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>ENS Registry Address :</b></Col> 
                <Col>{func.ENSRegistryAddress}</Col>
              </Row>
              <Row>
                <Col><b>ENS Reverse Registry Address :</b></Col> 
                <Col>{func.ENSReverseRegistryAddress}</Col>
              </Row>
              <Row>
                <Col><b>Private Pool Node :</b></Col> 
                <Col>{func.PrivatePoolNode}</Col>
              </Row>
              <Row>
                <Col><b>Provider Node :</b></Col> 
                <Col>{func.ProviderNode}</Col>
              </Row>
            </Container>
          </div>

          {certFunc.isOwner ? (
              <div>
                   <button
                      className="btn btn-lg btn-primary center modal-button"
                      onClick={this.toggleUpdate}>Manage ENS Config</button>

                    {this.state.isUpdateShown ? (
                      <div class="border border-primary border-5">
                        <Form onSubmit={this.handleUpgradeContracts} style={{margin: '50px 50px 50px 50px' }}>
                          <Form.Group  className="mb-3">
                            <Form.Control type="text" name="NewENSRegistryAddress" placeholder="NewENSRegistryAddress" 
                              value={this.state.NewENSRegistryAddress}
                              onChange={event => this.setState({ NewENSRegistryAddress: event.target.value })}/>
                            <Form.Control type="text" name="NewENSReverseRegistryAddress" placeholder="NewENSReverseRegistryAddress" 
                              value={this.state.NewENSReverseRegistryAddress}
                              onChange={event => this.setState({ NewENSReverseRegistryAddress: event.target.value })}/>
                            <Form.Control type="text" name="NewPrivatePoolNode" placeholder="NewPrivatePoolNode" 
                              value={this.state.NewPrivatePoolNode}
                              onChange={event => this.setState({ NewPrivatePoolNode: event.target.value })}/>
                            <Form.Control type="text" name="NewProviderNode" placeholder="NewProviderNode" 
                              value={this.state.NewProviderNode}
                              onChange={event => this.setState({ NewProviderNode: event.target.value })}/>
                          </Form.Group>
                          <button class="btn btn-primary">Upgrade ENS</button>
                        </Form>
                        <br/>
                      </div>) : null}

                  <br />
                  <br />

                  <button
                    className="btn btn-lg btn-warning center modal-button"
                    onClick={this.togglePending}>Check Pending ENS Config</button>

                  {this.state.isPendingShown ? (
                    <div class="border border-warning border-5">
                      <Container style={{margin: '10px 50px 50px 50px' }}>
                        <Row>
                          <Col><b>Pending ENS Registry Address :</b></Col> 
                          <Col>{func.PendingENSRegistryAddress}</Col>
                        </Row>
                        <Row>
                          <Col><b>Pending ENS Reverse Registry Address :</b></Col> 
                          <Col>{func.PendingENSReverseRegistryAddress}</Col>
                        </Row>
                        <Row>
                          <Col><b>Pending Private Pool Node :</b></Col> 
                          <Col>{func.PendingPrivatePoolNode}</Col>
                        </Row>
                        <Row>
                          <Col><b>Pending Provider Node :</b></Col> 
                          <Col>{func.PendingProviderNode}</Col>
                        </Row>
                        < br/>
                        <Row>
                          <VoteForPropositionComponent contract={this.props.contract}
                            refresh={this.refresh}/>
                        </Row>
                      </Container>
                    </div>) : null}
              </div>):null}
              <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default ENSPropositionComponent;