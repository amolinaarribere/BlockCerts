import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import PricePropositionComponent from './subcomponents/Treasury/PricePropositionComponent.js';
import AssignWithdrawComponent from './subcomponents/Treasury/AssignWithdrawComponent.js';

const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class TreasuryComponent extends React.Component {
    state = {
      contractType : 2
    };

    constructor(props) {
      super(props)
      loadFunc.LoadTreasuryFunc(Contracts.Treasury);
      this.refresh = this.refresh.bind(this)
    }
    
    async refresh() {
      await loadFunc.LoadTreasuryFunc(Contracts.Treasury);
      this.setState({})
    }
    
    render(){
      return (
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
      );
    }
  }
  
export default TreasuryComponent;