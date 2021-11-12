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
const VoteFunc = require("../functions/VoteFunctions.js");
const certFunc = require("../functions/CertisFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"

class SettingsComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
   state = {
      adminPropStatus: [],
      adminPropRemainingVotes: "",
      loading : false,
      contractType : 1
    };
    
    async refresh() {
      await loadFunc.LoadAdminFunc(Contracts.admin);

      if(certFunc.isOwner){
        var adminStatus = await VoteFunc.PropositionStatus(Contracts.admin);
        var adminRemainingVotes = ((adminStatus[0] != address_0)?
          await VoteFunc.PropositionRemainingVotes(Contracts.admin)
          : 0);
          this.setState({adminPropStatus: adminStatus,
            adminPropRemainingVotes: adminRemainingVotes})
      }
     

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
              <AdminPropositionComponent contract={Contracts.admin} 
                refresh={this.refresh}
                PropStatus={this.state.adminPropStatus}
                RemainingVotes={this.state.adminPropRemainingVotes}/>
              <br />
              <ManagerAddressPropositionComponent contract={Contracts.certificatePoolManager}
                refresh={this.refresh}/>
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

