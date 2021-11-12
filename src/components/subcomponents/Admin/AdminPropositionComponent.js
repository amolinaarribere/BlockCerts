import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';


const func = require("../../../functions/AdminFunctions.js");
const ManagerFunc = require("../../../functions/ManagerFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const Constants = require("../../../functions/Constants.js");


class AdminPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
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
                  dataType={[Constants.addressDataType,Constants.bytesDataType,Constants.addressDataType]}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Config"
                  headers={["Pending Manager Address", "Manager Init", "Pending Admin Address "]}
                  values={[func.PendingManagerAddress, func.PendingManagerInit, func.PendingAdminAddress]}
                  PropStatus={this.props.PropStatus}
                  RemainingVotes={this.props.RemainingVotes}/>

              </div>):null}
              <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default AdminPropositionComponent;