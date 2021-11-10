import React from 'react';
import ListPropositionConfigComponent from './ListPropositionConfigComponent.js';
import UpgradePropositionConfigComponent from './UpgradePropositionConfigComponent.js';
import ListPendingPropositionConfigComponent from './ListPendingPropositionConfigComponent.js';

const certFunc = require("../../../functions/CertisFunctions.js");
const LoadFunc = require('../../../functions/LoadFunctions.js');

class PropositionConfigComponent extends React.Component{
  constructor(props) {
    super(props)
    LoadFunc.LoadPropositionFunc(this.props.contract);
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await LoadFunc.LoadPropositionFunc(this.props.contract);
    await this.props.refresh();
  }

       render(){
         return (
           <div>
            <ListPropositionConfigComponent contract={this.props.contract}/>
            {certFunc.isOwner ? (
              <UpgradePropositionConfigComponent contract={this.props.contract} 
                refresh={this.refresh}/>): null}
            <br />
            {certFunc.isOwner ? (
              <ListPendingPropositionConfigComponent contract={this.props.contract}
                contractType={this.props.contractType} 
                refresh={this.refresh}/>): null}
            <hr class="bg-secondary"/>
           </div>
         );
       }
  }

export default PropositionConfigComponent;