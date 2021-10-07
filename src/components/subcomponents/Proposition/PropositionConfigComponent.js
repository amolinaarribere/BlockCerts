import React from 'react';
import ListPropositionConfigComponent from './ListPropositionConfigComponent.js';
import UpgradePropositionConfigComponent from './UpgradePropositionConfigComponent.js';
import ListPendingPropositionConfigComponent from './ListPendingPropositionConfigComponent.js';

const certFunc = require("../../../functions/CertisFunctions.js");
const LoadFunc = require('../../../functions/LoadFunctions.js');

class PropositionConfigComponent extends React.Component{
  constructor(props) {
    super(props)
    await LoadFunc.LoadPropositionFunc(this.props.contract);
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    await LoadFunc.LoadPropositionFunc(this.props.contract);
    this.props.refresh();
  }

       render(){
         return (
           <div>
            <ListPropositionConfigComponent contract={this.props.contract}
              contractType={this.props.contractType}/>
            <br/>
            {certFunc.isOwner ? (
              <UpgradePropositionConfigComponent contract={this.props.contract}
                contractType={this.props.contractType} 
                refresh={this.refresh}/>): null}
            <br />
            {certFunc.isOwner ? (
              <ListPendingPropositionConfigComponent contract={this.props.contract}
                contractType={this.props.contractType} 
                refresh={this.refresh}/>): null}
            <br />
           </div>
         );
       }
  }

export default PropositionConfigComponent;