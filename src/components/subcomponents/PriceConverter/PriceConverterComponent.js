import React from 'react';
import PriceConvertToWeiComponent from './PriceConvertToWeiComponent.js';

class PriceConverterComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

    state = {
      loading : false,
      contractType : 3
    };

    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }
    
    async refresh() {
      await this.props.refresh();
    }
    
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