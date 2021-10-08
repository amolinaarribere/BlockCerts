import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import AddressPropositionComponent from './subcomponents/PriceConverter/AddressPropositionComponent.js';
import PriceConvertToWeiComponent from './subcomponents/PriceConverter/PriceConvertToWeiComponent.js';

const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class PriceConverterComponent extends React.Component {
    state = {
      loading : false,
      contractType : 3
    };

    constructor(props) {
      super(props)
      loadFunc.LoadPriceConverterFunc(Contracts.PriceConverter);
      this.refresh = this.refresh.bind(this)
    }
    
    async refresh() {
      await loadFunc.LoadPriceConverterFunc(Contracts.PriceConverter);
      this.setState({})
    }
    
    render(){
      return (
        <div>
          <PriceConvertToWeiComponent />
          <br/>
          <AddressPropositionComponent contract={Contracts.PriceConverter} 
          contractType={this.state.contractType} refresh={this.refresh}/>
          <br />
          <PropositionConfigComponent contract={Contracts.PriceConverter}
            contractType={this.state.contractType} 
            refresh={this.refresh}/>
          <br />
        </div>
      );
    }
  }

export default PriceConverterComponent;