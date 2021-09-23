import React from 'react';
import AddressPropositionComponent from './subcomponents/Manager/AddressPropositionComponent.js';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';

class ManagerComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
   state = {
     contractType : 1
    };
    
    refresh() {
      this.setState({})
    }
  
    render(){
      return (
        <div>
          <AddressPropositionComponent contractType={this.state.contractType} refresh={this.refresh}/>
          <br />
          <PropositionConfigComponent contractType={this.state.contractType} refresh={this.refresh}/>
          <br/>
        </div>
      );
    }
  }

  export default ManagerComponent;

