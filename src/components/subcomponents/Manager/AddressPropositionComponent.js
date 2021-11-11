import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Vote/VoteForPropositionComponent.js';

const AdminFunc = require("../../../functions/AdminFunctions.js");
const ManagerFunc = require("../../../functions/ManagerFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const loadFunc = require("../../../functions/LoadFunctions.js");

class AddressPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    loadFunc.LoadManagerFunc(this.props.contract);
    this.refresh = this.refresh.bind(this)
  }
  
  refresh = async (event) => {
    this.props.refresh()
  }

    state = {
      NewPublicPoolAddress : "",
      NewTreasuryAddress : "",
      NewCertisTokenAddress : "",
      NewPrivatePoolFactoryAddress : "",
      NewPrivatePoolAddress : "",
      NewProviderFactoryAddress : "",
      NewProviderAddress : "",
      NewPriceConverterAddress : "",
      NewPropositionSettingsAddress : "",
      NewENSAddress : "",

      isUpdateContractsShown: false,
      isPendingContractsShown: false
    };

    toggleUpdateContracts = () => {
      if(this.state.isUpdateContractsShown)this.setState({ isUpdateContractsShown: false })
      else this.setState({ isUpdateContractsShown: true })
    };

    togglePendingContracts = () => {
      if(this.state.isPendingContractsShown)this.setState({ isPendingContractsShown: false })
      else this.setState({ isPendingContractsShown: true })
    };


    handleUpgradeContracts = async (event) => {
      event.preventDefault();
      var NPPA = address_0;
      var NTA = address_0;
      var NCTA = address_0;
      var NPPFA = address_0;
      var NPPA2 = address_0;
      var NPFA = address_0;
      var NPA = address_0;
      var NPCA = address_0;
      var NPSA = address_0;
      var NEA = address_0;

      if(this.state.NewPublicPoolAddress != "") NPPA = this.state.NewPublicPoolAddress;
      if(this.state.NewTreasuryAddress != "") NTA = this.state.NewTreasuryAddress;
      if(this.state.NewCertisTokenAddress != "") NCTA = this.state.NewCertisTokenAddress;
      if(this.state.NewPrivatePoolFactoryAddress != "") NPPFA = this.state.NewPrivatePoolFactoryAddress;
      if(this.state.NewPrivatePoolAddress != "") NPPA2 = this.state.NewPrivatePoolAddress;
      if(this.state.NewProviderFactoryAddress != "") NPFA = this.state.NewProviderFactoryAddress;
      if(this.state.NewProviderAddress != "") NPA = this.state.NewProviderAddress;
      if(this.state.NewPriceConverterAddress != "") NPCA = this.state.NewPriceConverterAddress;
      if(this.state.NewPropositionSettingsAddress != "") NPSA = this.state.NewPropositionSettingsAddress;
      if(this.state.NewENSAddress != "") NEA = this.state.NewENSAddress;

      await ManagerFunc.UpgradeContracts(NPPA, NTA, NCTA, NPPFA, NPPA2, NPFA, NPA, NPCA, NPSA, NEA, this.props.contract);

      this.setState({ NewPublicPoolAddress: "",
        NewTreasuryAddress: "",
        NewCertisTokenAddress: "",
        NewPrivatePoolFactoryAddress: "",
        NewPrivatePoolAddress: "",
        NewProviderFactoryAddress: "",
        NewProviderAddress: "",
        NewPriceConverterAddress: "",
        NewPropositionSettingsAddress: "",
        NewENSAddress: ""})

      await this.refresh()
      };

    
    
    render(){
      return (
        <div>
          <div class="border border-0">
          <h3>Contract Proxies Addresses</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Public Address :</b></Col> 
                <Col>{ManagerFunc.publicPoolAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>Private Factory Address :</b></Col> 
                <Col>{ManagerFunc.privatePoolFactoryAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>Provider Factory Address  :</b></Col> 
                <Col>{ManagerFunc.providerFactoryAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>Treasury Address :</b></Col> 
                <Col>{ManagerFunc.TreasuryAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>Certis Token Address :</b></Col> 
                <Col>{ManagerFunc.CertisTokenAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>Price Converter Address :</b></Col> 
                <Col>{ManagerFunc.PriceConverterAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>Proposition Settings Address :</b></Col> 
                <Col>{ManagerFunc.PropositionSettingsAddressProxy}</Col>
              </Row>
              <Row>
                <Col><b>ENS Address :</b></Col> 
                <Col>{ManagerFunc.ENSAddressProxy}</Col>
              </Row>
            </Container>
          </div>

          <div class="border border-0">
          <h3>Contract Implementation Addresses</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Public Address :</b></Col> 
                <Col>{ManagerFunc.publicPoolAddress}</Col>
              </Row>
              <Row>
                <Col><b>Private Factory Address :</b></Col> 
                <Col>{ManagerFunc.privatePoolFactoryAddress}</Col>
              </Row>
              <Row>
                <Col><b>Private Address :</b></Col> 
                <Col>{ManagerFunc.privatePoolImplAddress}</Col>
              </Row>
              <Row>
                <Col><b>Provider Factory Address  :</b></Col> 
                <Col>{ManagerFunc.providerFactoryAddress}</Col>
              </Row>
              <Row>
                <Col><b>Provider Address  :</b></Col> 
                <Col>{ManagerFunc.providerImplAddress}</Col>
              </Row>
              <Row>
                <Col><b>Treasury Address :</b></Col> 
                <Col>{ManagerFunc.TreasuryAddress}</Col>
              </Row>
              <Row>
                <Col><b>Certis Token Address :</b></Col> 
                <Col>{ManagerFunc.CertisTokenAddress}</Col>
              </Row>
              <Row>
                <Col><b>Price Converter Address :</b></Col> 
                <Col>{ManagerFunc.PriceConverterAddress}</Col>
              </Row>
              <Row>
                <Col><b>Proposition Settings Address :</b></Col> 
                <Col>{ManagerFunc.PropositionSettingsAddress}</Col>
              </Row>
              <Row>
                <Col><b>ENS Address :</b></Col> 
                <Col>{ManagerFunc.ENSAddress}</Col>
              </Row>
            </Container>
          </div>
          
          {certFunc.isOwner ? (
            <div>
               <button
                  className="btn btn-lg btn-primary center modal-button"
                  onClick={this.toggleUpdateContracts}>Manage Contracts</button>

              {this.state.isUpdateContractsShown ? (
                <div class="border border-primary border-5">
                  <Form onSubmit={this.handleUpgradeContracts} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                      <Form.Control type="text" name="NewPublicPoolAddress" placeholder="NewPublicPoolAddress" 
                          value={this.state.NewPublicPoolAddress}
                          onChange={event => this.setState({ NewPublicPoolAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewTreasuryAddress" placeholder="NewTreasuryAddress" 
                          value={this.state.NewTreasuryAddress}
                          onChange={event => this.setState({ NewTreasuryAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewCertisTokenAddress" placeholder="NewCertisTokenAddress" 
                          value={this.state.NewCertisTokenAddress}
                          onChange={event => this.setState({ NewCertisTokenAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewPrivatePoolFactoryAddress" placeholder="NewPrivatePoolFactoryAddress" 
                          value={this.state.NewPrivatePoolFactoryAddress}
                          onChange={event => this.setState({ NewPrivatePoolFactoryAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewPrivatePoolAddress" placeholder="NewPrivatePoolAddress" 
                          value={this.state.NewPrivatePoolAddress}
                          onChange={event => this.setState({ NewPrivatePoolAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewProviderFactoryAddress" placeholder="NewProviderFactoryAddress" 
                          value={this.state.NewProviderFactoryAddress}
                          onChange={event => this.setState({ NewProviderFactoryAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewProviderAddress" placeholder="NewProviderAddress" 
                          value={this.state.NewProviderAddress}
                          onChange={event => this.setState({ NewProviderAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewPriceConverterAddress" placeholder="NewPriceConverterAddress" 
                          value={this.state.NewPriceConverterAddress}
                          onChange={event => this.setState({ NewPriceConverterAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewPropositionSettingsAddress" placeholder="NewPropositionSettingsAddress" 
                          value={this.state.NewPropositionSettingsAddress}
                          onChange={event => this.setState({ NewPropositionSettingsAddress: event.target.value })}/>
                      <Form.Control type="text" name="NewENSAddress" placeholder="NewENSAddress" 
                          value={this.state.NewENSAddress}
                          onChange={event => this.setState({ NewENSAddress: event.target.value })}/>
                    </Form.Group>
                      <button class="btn btn-primary">Submit Contracts</button>
                  </Form>
                </div>) : null}

                <br />
                <br />

                <button
                    className="btn btn-lg btn-warning center modal-button"
                    onClick={this.togglePendingContracts}>Check Pending Contracts</button>

                {this.state.isPendingContractsShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                      <Row>
                        <Col><b>Pending Public Pool Address :</b></Col> 
                        <Col>{ManagerFunc.PendingPublicPoolAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Treasury Address :</b></Col> 
                        <Col>{ManagerFunc.PendingTreasuryAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Certis Token Address :</b></Col> 
                        <Col>{ManagerFunc.PendingCertisTokenAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Private Factory Address :</b></Col> 
                        <Col>{ManagerFunc.PendingPrivatePoolFactoryAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Private Pool Impl Address :</b></Col> 
                        <Col>{ManagerFunc.PendingPrivatePoolImplAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Provider Factory Address :</b></Col> 
                        <Col>{ManagerFunc.PendingProviderFactoryAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Provider Impl Address :</b></Col> 
                        <Col>{ManagerFunc.PendingProviderImplAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Price Converter Address :</b></Col> 
                        <Col>{ManagerFunc.PendingPriceConverterAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending Proposition Settings Address :</b></Col> 
                        <Col>{ManagerFunc.PendingPropositionSettingsAddress}</Col>
                      </Row>
                      <Row>
                        <Col><b>Pending ENS Address :</b></Col> 
                        <Col>{ManagerFunc.PendingENSAddress}</Col>
                      </Row>
                      < br/>
                      <Row>
                        <VoteForPropositionComponent contract={this.props.contract}
                          refresh={this.refresh}/>
                      </Row>
                    </Container> 
                  </div>) : null}

            </div>) : null}
          
            <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default AddressPropositionComponent;