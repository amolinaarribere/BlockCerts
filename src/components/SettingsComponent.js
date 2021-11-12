import React from 'react';
import AdminPropositionComponent from './subcomponents/Admin/AdminPropositionComponent.js';
import ManagerAddressPropositionComponent from './subcomponents/Manager/AddressPropositionComponent.js';
import PriceConverterAddressPropositionComponent from './subcomponents/PriceConverter/AddressPropositionComponent.js';
import PropositionConfigComponent from './subcomponents/Proposition/PropositionConfigComponent.js';
import PricePropositionComponent from './subcomponents/Treasury/PricePropositionComponent.js';
import ENSPropositionComponent from './subcomponents/ENS/ENSPropositionComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class SettingsComponent extends React.Component {
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
      await loadFunc.LoadManagerFunc(Contracts.certificatePoolManager);
      await loadFunc.LoadPropositionFunc(Contracts.PropositionSettings);
      await loadFunc.LoadTreasuryConfigFunc(Contracts.Treasury);
      await loadFunc.LoadPriceConverterFunc(Contracts.PriceConverter);
      await loadFunc.LoadENSFunc(Contracts.ENS);
    }
  
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <AdminPropositionComponent contract={Contracts.admin}/>
              <br />
              <ManagerAddressPropositionComponent contract={Contracts.certificatePoolManager}/>
              <br />
              <PropositionConfigComponent contract={Contracts.PropositionSettings}
                refresh={this.refresh}/>
              <br/>
              <PricePropositionComponent contract={Contracts.Treasury}
                refresh={this.refresh}/>
              <br/>
              <PriceConverterAddressPropositionComponent contract={Contracts.PriceConverter} 
                refresh={this.refresh}/>
              <br />
              <ENSPropositionComponent contract={Contracts.ENS} 
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

  export default SettingsComponent;

