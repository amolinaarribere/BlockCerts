import React from 'react';
import AssignWithdrawComponent from './subcomponents/Treasury/AssignWithdrawComponent.js';
import CertisTokensComponent from './subcomponents/CertisToken/CertisTokensComponent.js';
import PriceConverterComponent from './subcomponents/PriceConverter/PriceConverterComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Contracts = require("../functions/Contracts.js");
const LoadFunc = require("../functions/LoadFunctions.js");

class DividendsComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

    state = {
      loading : false,
      contractType : 2
    };

    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }
    
    async refresh() {
      this.setState({loading: true})
      await LoadFunc.LoadTreasuryStateFunc(Contracts.Treasury);
      await LoadFunc.LoadCertisFunc(Contracts.CertisToken);
      this.setState({loading: false})
    }
    
    render(){
      return (
        <div>
           {(false == this.state.loading)? 
            <div>
              <AssignWithdrawComponent contract={Contracts.Treasury} 
                refresh={this.refresh}/>
              <CertisTokensComponent contract={Contracts.CertisToken} 
                refresh={this.refresh}/>
              <PriceConverterComponent contract={Contracts.PriceConverter} 
                refresh={this.refresh}/>
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
  
export default DividendsComponent;