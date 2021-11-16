import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';


const func = require("../../../functions/AdminFunctions.js");
const ManagerFunc = require("../../../functions/ManagerFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const Constants = require("../../../functions/Constants.js");
const VoteFunc = require("../../../functions/VoteFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VarDataType=[Constants.addressDataType,Constants.bytesDataType,Constants.addressDataType]


class AdminPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  async componentWillMount() {
    await this.LoadPropStatus();
 }

  state = {
    PropStatus: [],
    RemainingVotes: ""
  }
  
  async refresh() {
    await loadFunc.LoadAdminFunc(this.props.contract);
    await this.LoadPropStatus();
  }

  async LoadPropStatus(){
    if(certFunc.isOwner){
      var Status = await VoteFunc.PropositionStatus(this.props.contract);
      var Votes = ((Status[0] != address_0)?
        await VoteFunc.PropositionRemainingVotes(this.props.contract)
        : 0);
        this.setState({PropStatus: Status,
          RemainingVotes: Votes})
    }
  }
    
    render(){
      return (
        <div>
          <ConfigurationComponent refresh={this.refresh}
                  text="Admin Configuration"
                  names={["Admin Address", "Manager Address", "Manager Proxy Address"]}
                  values={[ManagerFunc.ManagerAdminAddress,func.ManagerAddress,func.ManagerAddressProxy]}/>

          {certFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Admin Config"
                  textButton="Upgrade Admin"
                  names={["NewManagerAddress", "ManagerInit", "NewAdminAddress"]}
                  types={["text", "text", "text"]}
                  dataType={VarDataType}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Config"
                  headers={["Pending Manager Address", "Manager Init", "Pending Admin Address "]}
                  values={[func.PendingManagerAddress, func.PendingManagerInit, func.PendingAdminAddress]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}
                  dataType={VarDataType}/>

              </div>):null}
              <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default AdminPropositionComponent;