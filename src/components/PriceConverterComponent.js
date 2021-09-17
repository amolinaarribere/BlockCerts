import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import AddressPropositionComponent from './subcomponents/PriceConverter/AddressPropositionComponent.js';
import PriceConvertToWeiComponent from './subcomponents/PriceConverter/PriceConvertToWeiComponent.js';

class PriceConverterComponent extends React.Component {
    state = {
        contractType : 3
    };

    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }
    
    refresh() {
      this.setState({})
    }
    
    render(){
      return (
        <div>
          <PriceConvertToWeiComponent />
          <br/>
          <AddressPropositionComponent contractType={this.state.contractType} refresh={this.refresh}/>
          <br />
          <PropositionConfigComponent contractType={this.state.contractType} refresh={this.refresh}/>
          <br />
        </div>
      );
    }
  }

export default PriceConverterComponent;