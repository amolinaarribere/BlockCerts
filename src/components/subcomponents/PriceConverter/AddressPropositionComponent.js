import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const func = require("../../../functions/PriceConverterFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000";
const Constants = require("../../../functions/Constants.js");
const VoteFunc = require("../../../functions/VoteFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class AddressPropositionComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  state = {
    PropStatus: [],
    RemainingVotes: ""
  }

  async refresh() {
    await loadFunc.LoadPriceConverterFunc(this.props.contract);

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
                  text="ChainLink Feed Registry"
                  names={["Registry Address"]}
                  values={[func.RegistryAddress]}/>

          {certFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Chain Link Feed Registry"
                  textButton="Upgrade Registry"
                  names={["NewRegistryAddress"]}
                  types={["text"]}
                  dataType={[Constants.addressDataType]}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Registry"
                  headers={["Pending Registry Address"]}
                  values={[func.PendingRegistryAddress]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}/>

              </div>):null}
              <hr class="bg-secondary"/>
        </div>
      );
    }
  }
  
export default AddressPropositionComponent;