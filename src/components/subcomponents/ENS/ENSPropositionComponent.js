import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const func = require("../../../functions/ENSFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const emptyByte = "0x";
const Constants = require("../../../functions/Constants.js");
const VoteFunc = require("../../../functions/VoteFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class ENSPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }


    state = {
      PropStatus: [],
      RemainingVotes: ""
    };

    async refresh() {
      await loadFunc.LoadENSFunc(this.props.contract);
  
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
                  text="ENS Configuration"
                  names={["ENS Registry Address",
                   "ENS Reverse Registry Address",
                    "Private Pool Node",
                    "Provider Node"]}
                  values={[func.ENSRegistryAddress,
                    func.ENSReverseRegistryAddress,
                    func.PrivatePoolNode,
                    func.ProviderNode]}/>

          {certFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage ENS Config"
                  textButton="Upgrade ENS"
                  names={["NewENSRegistryAddress",
                   "NewENSReverseRegistryAddress",
                   "NewPrivatePoolNode",
                   "NewProviderNode"]}
                  types={["text",
                   "text",
                   "text",
                   "text"]}
                  dataType={[Constants.addressDataType,
                    Constants.addressDataType,
                    Constants.bytesDataType,
                    Constants.bytesDataType]}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending ENS Config"
                  headers={["Pending ENS Registry Address",
                   "Pending ENS Reverse Registry Address",
                   "Pending Private Pool Node",
                   "Pending Provider Node"]}
                  values={[func.PendingENSRegistryAddress,
                     func.PendingENSReverseRegistryAddress,
                     func.PendingPrivatePoolNode,
                     func.PendingProviderNode]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}/>

              </div>):null}
              <hr class="bg-secondary"/>

        </div>
      );
    }
  }
  
export default ENSPropositionComponent;