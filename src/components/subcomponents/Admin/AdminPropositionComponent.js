import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Proposition/VoteForPropositionComponent.js';

const func = require("../../../functions/AdminFunctions.js");
const ManagerFunc = require("../../../functions/ManagerFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";


class AdminPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
  }

    state = {
      NewManagerAddress : "",
      NewAdminAddress : "",

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
      var NMA = address_0;
      var NAA = address_0;

      if(this.state.NewManagerAddress != "") NMA = this.state.NewManagerAddress;
      if(this.state.NewAdminAddress != "") NAA = this.state.NewAdminAddress;


      await func.UpgradeAdminConfig(NMA, NAA, this.props.contract);
      this.setState({ NewManagerAddress: "",
      NewAdminAddress: ""})
      await this.refresh();
    };
    
    render(){
      return (
        <div>
          <div class="border border border-0">
            <h3>Admin Configuration</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Admin Address :</b></Col> 
                <Col>{ManagerFunc.ManagerAdminAddress}</Col>
              </Row>
              <Row>
                <Col><b>Manager Address :</b></Col> 
                <Col>{func.ManagerAddress}</Col>
              </Row>
              <Row>
                <Col><b>Manager Proxy Address :</b></Col> 
                <Col>{func.ManagerAddressProxy}</Col>
              </Row>
            </Container>
          </div>

          {certFunc.isOwner ? (
              <div>
                   <button
                      className="btn btn-lg btn-primary center modal-button"
                      onClick={this.toggleUpdate}>Manage Admin Config</button>

                    {this.state.isUpdateShown ? (
                      <div class="border border-primary border-5">
                        <Form onSubmit={this.handleUpgradeContracts} style={{margin: '50px 50px 50px 50px' }}>
                          <Form.Group  className="mb-3">
                          <Form.Control type="text" name="NewAdminAddress" placeholder="NewAdminAddress" 
                              value={this.state.NewAdminAddress}
                              onChange={event => this.setState({ NewAdminAddress: event.target.value })}/>
                            <Form.Control type="text" name="NewManagerAddress" placeholder="NewManagerAddress" 
                              value={this.state.NewManagerAddress}
                              onChange={event => this.setState({ NewManagerAddress: event.target.value })}/>
                          </Form.Group>
                          <button class="btn btn-primary">Upgrade Admin</button>
                        </Form>
                        <br/>
                      </div>) : null}

                  <br />
                  <br />

                  <button
                    className="btn btn-lg btn-warning center modal-button"
                    onClick={this.togglePending}>Check Pending Admin Config</button>

                  {this.state.isPendingShown ? (
                    <div class="border border-warning border-5">
                      <Container style={{margin: '10px 50px 50px 50px' }}>
                        <Row>
                          <Col><b>Pending Admin Address :</b></Col> 
                          <Col>{func.PendingAdminAddress}</Col>
                        </Row>
                        <Row>
                          <Col><b>Pending Manager Address :</b></Col> 
                          <Col>{func.PendingManagerAddress}</Col>
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
  
export default AdminPropositionComponent;