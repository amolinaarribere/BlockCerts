import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import PricePropositionComponent from './subcomponents/Treasury/PricePropositionComponent.js';
import AssignWithdrawComponent from './subcomponents/Treasury/AssignWithdrawComponent.js';
const func = require("../functions/LoadFunctions.js");

class TreasuryComponent extends React.Component {
    componentWillMount() {
      //func.LoadBlockchain()
      //func.SwitchContext()
   }
    state = {
      contractType : 2
    };
    
    render(){
      return (
        <div>
          <AssignWithdrawComponent />
          <br />
          <PricePropositionComponent contractType={this.state.contractType}/>
          <br />
          <PropositionConfigComponent contractType={this.state.contractType}/>
        </div>
      );
    }
  }
  
export default TreasuryComponent;