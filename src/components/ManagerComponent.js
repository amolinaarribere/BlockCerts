import React from 'react';
import AddressPropositionComponent from './subcomponents/Manager/AddressPropositionComponent.js';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';


const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class ManagerComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
   state = {
      loading : false,
     contractType : 1
    };
    
    async refresh() {
      this.state.loading = true;
      await loadFunc.LoadManagerFunc(Contracts.certificatePoolManager);
      this.state.loading = false;
      this.setState({})
    }
  
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <AddressPropositionComponent contract={Contracts.certificatePoolManager}
              contractType={this.state.contractType} refresh={this.refresh}/>
              <br />
              <PropositionConfigComponent contract={Contracts.certificatePoolManager}
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
              <br/>
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

  export default ManagerComponent;

