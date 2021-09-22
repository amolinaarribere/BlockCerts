import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Proposition/VoteForPropositionComponent.js';

const func = require("../../../functions/PriceConverterFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";

class AddressPropositionComponent extends React.Component {
    state = {
      NewRegistryAddress : "",
      isUpdateRegistryShown: false,
      isPendingRegistryShown: false
    };

    toggleUpdateRegistry = () => {
      if(this.state.isUpdateRegistryShown)this.setState({ isUpdateRegistryShown: false })
      else this.setState({ isUpdateRegistryShown: true })
    };

    togglePendingRegistry = () => {
      if(this.state.isPendingRegistryShown)this.setState({ isPendingRegistryShown: false })
      else this.setState({ isPendingRegistryShown: true })
    };

    handleUpgradeContracts = async (event) => {
      event.preventDefault();
      var NRA = address_0;

      if(this.state.NewRegistryAddress != "") NRA = this.state.NewRegistryAddress;
      await func.UpgradeRegistryAddress(NRA);
      this.setState({ NewRegistryAddress: ""})
      await loadFunc.LoadPriceConverterFunc();
      this.props.refresh();
    };
    
    render(){
      return (
        <div>
          <div class="border border border-0">
            <h3>ChainLink Feed Registry</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Registry Address :</b></Col> 
                <Col>{func.RegistryAddress}</Col>
              </Row>
            </Container>
          </div>

          {certFunc.isOwner ? (
              <div>
                   <button
                      className="btn btn-lg btn-primary center modal-button"
                      onClick={this.toggleUpdateRegistry}>Manage Chain Link Feed Registry</button>

                    {this.state.isUpdateRegistryShown ? (
                      <div class="border border-primary border-5">
                        <Form onSubmit={this.handleUpgradeContracts} style={{margin: '50px 50px 50px 50px' }}>
                          <Form.Group  className="mb-3">
                            <Form.Control type="text" name="NewRegistryAddress" placeholder="NewRegistryAddress" 
                              value={this.state.NewRegistryAddress}
                              onChange={event => this.setState({ NewRegistryAddress: event.target.value })}/>
                          </Form.Group>
                          <button class="btn btn-primary">Upgrade Registry</button>
                        </Form>
                        <br/>
                      </div>) : null}

                  <br />
                  <br />

                  <button
                    className="btn btn-lg btn-warning center modal-button"
                    onClick={this.togglePendingRegistry}>Check Pending Registry</button>

                  {this.state.isPendingRegistryShown ? (
                    <div class="border border-warning border-5">
                      <Container style={{margin: '10px 50px 50px 50px' }}>
                        <Row>
                          <Col><b>Pending Registry Address :</b></Col> 
                          <Col>{Aux.Bytes32ToAddress(func.PendingRegistryAddress)}</Col>
                        </Row>
                        < br/>
                        <Row>
                          <VoteForPropositionComponent contractType={this.props.contractType}/>
                        </Row>
                      </Container>
                    </div>) : null}
              </div>):null}
              <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default AddressPropositionComponent;