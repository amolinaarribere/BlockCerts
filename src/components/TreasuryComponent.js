import React from 'react';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import PricePropositionComponent from './subcomponents/Treasury/PricePropositionComponent.js';
import AssignWithdrawComponent from './subcomponents/Treasury/AssignWithdrawComponent.js';

class TreasuryComponent extends React.Component {
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