import React from 'react';
import { USDDecimals, ETHDecimals } from '../../../config';
import { Form, Container, Row, Col } from 'react-bootstrap';
import VoteForPropositionComponent from '../Proposition/VoteForPropositionComponent.js';

const func = require("../../../functions/TreasuryFunctions.js");

class PricePropositionComponent extends React.Component {
    state = {
      NewPublicPriceUSD : "",
      NewPrivatePriceUSD : "",
      NewProviderPriceUSD : "",
      NewCertificatePriceUSD : "",
      NewOwnerRefundFeeUSD : "",

      isUpdatePricesShown: false,
      isPendingPricesShown: false
    };

    toggleUpdatePrices = () => {
      if(this.state.isUpdatePricesShown)this.setState({ isUpdatePricesShown: false })
      else this.setState({ isUpdatePricesShown: true })
    };

    togglePendingPrices = () => {
      if(this.state.isPendingPricesShown)this.setState({ isPendingPricesShown: false })
      else this.setState({ isPendingPricesShown: true })
    };

    handleUpgradePrices = async (event) => {
      event.preventDefault();

      var NPPUSD = 0;
      var NPPUSD2 = 0;
      var NPPUSD3 = 0;
      var NCPUSD = 0;
      var NORUSD = 0;

      if(this.state.NewPublicPriceUSD != "") NPPUSD = this.state.NewPublicPriceUSD;
      if(this.state.NewPrivatePriceUSD != "") NPPUSD2 = this.state.NewPrivatePriceUSD;
      if(this.state.NewProviderPriceUSD != "") NPPUSD3 = this.state.NewProviderPriceUSD;
      if(this.state.NewCertificatePriceUSD != "") NCPUSD = this.state.NewCertificatePriceUSD;
      if(this.state.NewOwnerRefundFeeUSD != "") NORUSD = this.state.NewOwnerRefundFeeUSD;

      await func.UpgradePricesTreasury(NPPUSD, NPPUSD2, NPPUSD3, NCPUSD, NORUSD);

      this.setState({ NewPublicPriceUSD: "",
      NewPrivatePriceUSD: "",
      NewProviderPriceUSD: "",
      NewCertificatePriceUSD: "",
      NewOwnerRefundFeeUSD: ""})
    };
    
    render(){
      return (
        <div>
          <div class="border border-0">
            <h3>Prices</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              <Row>
                <Col><b>Submit New Provider to Public Pool Price :</b></Col> 
                <Col>{func.PublicPriceUSD / USDDecimals} USD (approx. {func.PublicPriceWei / ETHDecimals} ETH)</Col>
              </Row>
              <Row>
                <Col><b>Create New Private Pool Price :</b></Col> 
                <Col>{func.PrivatePriceUSD / USDDecimals} USD (approx. {func.PrivatePriceWei / ETHDecimals} ETH)</Col>
              </Row>
              <Row>
                <Col><b>Create New Provider Price :</b></Col> 
                <Col>{func.ProviderPriceUSD / USDDecimals} USD (approx. {func.ProviderPriceWei / ETHDecimals} ETH)</Col>
              </Row>
              <Row>
                <Col><b>Send Certificate to Public Pool Price :</b></Col> 
                <Col>{func.CertificatePriceUSD / USDDecimals} USD (approx. {func.CertificatePriceWei / ETHDecimals} ETH)</Col>
              </Row>
              <Row>
                <Col><b>Refund Fee :</b></Col> 
                <Col>{func.OwnerRefundFeeUSD / USDDecimals} USD (approx. {func.OwnerRefundFeeWei / ETHDecimals} ETH)</Col>
              </Row>
            </Container>
          </div>
          <br />

          <button
              className="btn btn-lg btn-primary center modal-button"
              onClick={this.toggleUpdatePrices}>Manage Prices</button>

            {this.state.isUpdatePricesShown ? (
              <div class="border border-primary border-5">
                <Form onSubmit={this.handleUpgradePrices} style={{margin: '50px 50px 50px 50px' }}>
                  <Form.Group  className="mb-3">
                    <Form.Control type="integer" name="NewPublicPriceUSD" placeholder="NewPublicPrice in USD cents" 
                      value={this.state.NewPublicPriceUSD}
                      onChange={event => this.setState({ NewPublicPriceUSD: event.target.value })}/>
                    <Form.Control type="integer" name="NewPrivatePriceUSD" placeholder="NewPrivatePrice in USD cents" 
                      value={this.state.NewPrivatePriceUSD}
                      onChange={event => this.setState({ NewPrivatePriceUSD: event.target.value })}/>
                    <Form.Control type="integer" name="NewProviderPriceUSD" placeholder="NewProviderPrice in USD cents" 
                      value={this.state.NewProviderPriceUSD}
                      onChange={event => this.setState({ NewProviderPriceUSD: event.target.value })}/>
                    <Form.Control type="integer" name="NewCertificatePriceUSD" placeholder="NewCertificatePrice in USD cents" 
                      value={this.state.NewCertificatePriceUSD}
                      onChange={event => this.setState({ NewCertificatePriceUSD: event.target.value })}/>
                    <Form.Control type="integer" name="NewOwnerRefundFeeUSD" placeholder="NewOwnerRefundFee in USD cents" 
                      value={this.state.NewOwnerRefundFeeUSD}
                      onChange={event => this.setState({ NewOwnerRefundFeeUSD: event.target.value })}/>
                  </Form.Group>
                  <button class="btn btn-primary">Upgrade Prices</button>
                </Form>
                <br/>
              </div>
              ) : null}

          <br />
          <br />

          <button
                className="btn btn-lg btn-warning center modal-button"
                onClick={this.togglePendingPrices}>Check Pending Prices</button>

            {this.state.isPendingPricesShown ? (
              <div class="border border-warning border-5">
                <Container style={{margin: '10px 50px 50px 50px' }}>
                  <Row>
                    <Col><b>Pending Public Price :</b></Col> 
                    <Col>{func.PendingPublicPriceUSD / USDDecimals} USD</Col>
                  </Row>
                  <Row>
                    <Col><b>Pending Private Price :</b></Col> 
                    <Col>{func.PendingPrivatePriceUSD / USDDecimals} USD</Col>
                  </Row>
                  <Row>
                    <Col><b>Pending Provider Price :</b></Col> 
                    <Col>{func.PendingProviderPriceUSD / USDDecimals} USD</Col>
                  </Row>
                  <Row>
                    <Col><b>Pending Certificate Price :</b></Col> 
                    <Col>{func.PendingCertificatePriceUSD / USDDecimals} USD</Col>
                  </Row>
                  <Row>
                    <Col><b>Pending Refund Fee :</b></Col> 
                    <Col>{func.PendingOwnerRefundFeeUSD / USDDecimals} USD</Col>
                  </Row>
                  < br/>
                  <Row>
                    <VoteForPropositionComponent contractType={this.props.contractType}/>
                  </Row>
                </Container>
              </div>
                
            ) : null}
        </div>
      );
    }
  }
  
export default PricePropositionComponent;