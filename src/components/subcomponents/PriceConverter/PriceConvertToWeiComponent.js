import React from 'react';
import { USDDecimals, ETHDecimals } from '../../../config';
const func = require("../../../functions/PriceConverterFunctions.js");

class PriceConvertToWeiComponent extends React.Component {
    state = {
      AmountUSDText : "",
      AmountUSD : 0,
      AmountWei : 0
    };

    Convert = async (event) => {
      event.preventDefault();

      if(this.state.AmountUSDText != "") this.state.AmountUSD = this.state.AmountUSDText;

      this.state.AmountWei = await func.USDToEther(this.state.AmountUSD);

      this.setState({ AmountUSDText: ""})
    };
    
    render(){
      return (
        <div>
          <br />
          <form onSubmit={this.Convert}>
            <p>
              <input type="integer" name="AmountUSD" placeholder="Amount in USD cents" 
                  value={this.state.AmountUSDText}
                  onChange={event => this.setState({ AmountUSDText: event.target.value })}/>
            </p>
              <button>Convert</button>
          </form>
          <br />
          <p><b>Amount In ETH :</b> {this.state.AmountWei / ETHDecimals} ({this.state.AmountUSD}USD)</p>
        </div>
      );
    }
  }
  
export default PriceConvertToWeiComponent;