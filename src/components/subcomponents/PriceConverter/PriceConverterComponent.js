import React from 'react';
import PriceConvertToWeiComponent from './PriceConvertToWeiComponent.js';

class PriceConverterComponent extends React.Component {

    render(){
      return (
        <div>
          <PriceConvertToWeiComponent contract={this.props.contract}/>
            <br />
        </div>
      );
    }
  }

export default PriceConverterComponent;