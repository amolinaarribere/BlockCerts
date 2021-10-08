import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import AddressPropositionComponent from './subcomponents/PriceConverter/AddressPropositionComponent.js';
import PriceConvertToWeiComponent from './subcomponents/PriceConverter/PriceConvertToWeiComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

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
      this.state.loading = true;
      await loadFunc.LoadPriceConverterFunc(Contracts.PriceConverter);
      this.state.loading = false;
      this.setState({})
    }
    
    render(){
      return (
        <div>
           {(false == this.state.loading)? 
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
          :
            <div>
              <LoadingComponent />
            </div>
          }
        </div>
      );
    }
  }

export default PriceConverterComponent;