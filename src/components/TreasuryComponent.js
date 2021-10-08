import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import PricePropositionComponent from './subcomponents/Treasury/PricePropositionComponent.js';
import AssignWithdrawComponent from './subcomponents/Treasury/AssignWithdrawComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class TreasuryComponent extends React.Component {
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
      this.state.loading = true;
      await loadFunc.LoadTreasuryFunc(Contracts.Treasury);
      this.state.loading = false;
      this.setState({})
    }
    
    render(){
      return (
        <div>
           {(false == this.state.loading)? 
            <div>
              <AssignWithdrawComponent contract={Contracts.Treasury} 
                refresh={this.refresh}/>
              <br />
              <PricePropositionComponent contract={Contracts.Treasury}
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
              <br />
              <PropositionConfigComponent contract={Contracts.Treasury}
                contractType={this.state.contractType} 
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
  
export default TreasuryComponent;