import React from 'react';
import { USDDecimals, ETHDecimals } from '../../../config';
const func = require("../../../functions/TreasuryFunctions.js");

class PricePropositionComponent extends React.Component {
    state = {
      NewPublicPriceUSD : "",
      NewPrivatePriceUSD : "",
      NewProviderPriceUSD : "",
      NewCertificatePriceUSD : "",
      NewOwnerRefundFeeUSD : ""
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
          <p><b>Submit New Provider to Public Pool Price :</b> {func.PublicPriceUSD / USDDecimals} USD (approx. {func.PublicPriceWei / ETHDecimals} ETH)</p>
          <p><b>Create New Private Pool Price :</b> {func.PrivatePriceUSD / USDDecimals} USD (approx. {func.PrivatePriceWei / ETHDecimals} ETH)</p>
          <p><b>Create New Provider Price :</b> {func.ProviderPriceUSD / USDDecimals} USD (approx. {func.ProviderPriceWei / ETHDecimals} ETH)</p>
          <p><b>Send Certificate to Public Pool Price :</b> {func.CertificatePriceUSD / USDDecimals} USD (approx. {func.CertificatePriceWei / ETHDecimals} ETH)</p>
          <p><b>Refund Fee :</b> {func.OwnerRefundFeeUSD / USDDecimals} USD (approx. {func.OwnerRefundFeeWei / ETHDecimals} ETH)</p>
          <br />
          <form onSubmit={this.handleUpgradePrices}>
            <p>
              <input type="integer" name="NewPublicPriceUSD" placeholder="NewPublicPrice in USD cents" 
                  value={this.state.NewPublicPriceUSD}
                  onChange={event => this.setState({ NewPublicPriceUSD: event.target.value })}/>
            </p>
            <p>
              <input type="integer" name="NewPrivatePriceUSD" placeholder="NewPrivatePrice in USD cents" 
                  value={this.state.NewPrivatePriceUSD}
                  onChange={event => this.setState({ NewPrivatePriceUSD: event.target.value })}/>
            </p>
            <p>
              <input type="integer" name="NewProviderPriceUSD" placeholder="NewProviderPrice in USD cents" 
                  value={this.state.NewProviderPriceUSD}
                  onChange={event => this.setState({ NewProviderPriceUSD: event.target.value })}/>
            </p>
            <p>
              <input type="integer" name="NewCertificatePriceUSD" placeholder="NewCertificatePrice in USD cents" 
                  value={this.state.NewCertificatePriceUSD}
                  onChange={event => this.setState({ NewCertificatePriceUSD: event.target.value })}/>
            </p>
            <p>
              <input type="integer" name="NewOwnerRefundFeeUSD" placeholder="NewOwnerRefundFee in USD cents" 
                  value={this.state.NewOwnerRefundFeeUSD}
                  onChange={event => this.setState({ NewOwnerRefundFeeUSD: event.target.value })}/>
            </p>
              <button>Upgrade Prices</button>
          </form>
          <br />
          <p class="text-warning"><b>Pending Public Price :</b> {func.PendingPublicPriceUSD / USDDecimals} USD</p>
          <p class="text-warning"><b>Pending Private Price :</b> {func.PendingPrivatePriceUSD / USDDecimals} USD</p>
          <p class="text-warning"><b>Pending Provider Price :</b> {func.PendingProviderPriceUSD / USDDecimals} USD</p>
          <p class="text-warning"><b>Pending Certificate Price :</b> {func.PendingCertificatePriceUSD / USDDecimals} USD</p>
          <p class="text-warning"><b>Pending Refund Fee :</b> {func.PendingOwnerRefundFeeUSD / USDDecimals} USD</p>
        </div>
      );
    }
  }
  
export default PricePropositionComponent;