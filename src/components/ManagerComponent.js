import React from 'react';
import AddressPropositionComponent from './subcomponents/Manager/AddressPropositionComponent.js';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
const func = require("../functions/LoadFunctions.js");

class ManagerComponent extends React.Component {
    componentWillMount() {
      //func.LoadBlockchain()
      //Certificatefunc.SwitchContext()
   }
   state = {
     contractType : 1
    };
    
  
    render(){
      return (
        <div>
          <AddressPropositionComponent contractType={this.state.contractType}/>
          <br />
          <PropositionConfigComponent contractType={this.state.contractType}/>
          <br/>
        </div>
      );
    }
  }

  export default ManagerComponent;

