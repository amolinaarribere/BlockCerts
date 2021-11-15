import React from 'react';
import ListPendingPropositionComponent from '../Vote/ListPendingPropositionComponent.js';
import UpgradePropositionComponent from '../Vote/UpgradePropositionComponent.js';
import ConfigurationComponent from '../Configuration/ConfigurationComponent.js';

const certFunc = require("../../../functions/CertisFunctions.js");
const LoadFunc = require('../../../functions/LoadFunctions.js');
const Constants = require("../../../functions/Constants.js");
const func = require("../../../functions/PropositionFunctions.js");
const address_0 = "0x0000000000000000000000000000000000000000"
const VoteFunc = require("../../../functions/VoteFunctions.js");


class PropositionConfigComponent extends React.Component{
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
    await LoadFunc.LoadPropositionFunc(this.props.contract);
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
                  text="Proposition Configuration Parameters"
                  names={["Proposition Life Time", "Proposition Threshold Percentage", "Min Weight To Propose Percentage"]}
                  values={[func.PropositionLifeTime,func.PropositionThresholdPercentage,func.MinWeightToProposePercentage]}/>

          {certFunc.isOwner ? (
              <div>
                <UpgradePropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Manage Proposition Configuration"
                  textButton="Upgrade Proposition Configuration"
                  names={["NewPropositionLifeTime", "NewPropositionThresholdPercentage", "NewMinWeightToProposePercentage"]}
                  types={["integer", "integer", "integer"]}
                  dataType={[Constants.intDataType,Constants.intDataType,Constants.intDataType]}/>

                  <br />

                <ListPendingPropositionComponent contract={this.props.contract}
                  refresh={this.refresh}
                  text="Check Pending Proposition Config"
                  headers={["Pending Proposition Life Time", "Pending Proposition Threshold Percentage", "Pending Min Weight To Propose Percentage"]}
                  values={[func.PendingPropositionLifeTime, func.PendingPropositionThresholdPercentage, func.PendingMinWeightToProposePercentage]}
                  PropStatus={this.state.PropStatus}
                  RemainingVotes={this.state.RemainingVotes}/>

              </div>):null}
              <hr class="bg-secondary"/>
           </div>
         );
       }
  }

export default PropositionConfigComponent;