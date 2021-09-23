import React from 'react';
import ListPropositionConfigComponent from './ListPropositionConfigComponent.js';
import UpgradePropositionConfigComponent from './UpgradePropositionConfigComponent.js';
import ListPendingPropositionConfigComponent from './ListPendingPropositionConfigComponent.js';

const certFunc = require("../../../functions/CertisFunctions.js");

class PropositionConfigComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    this.props.refresh();
  }

       render(){
         return (
           <div>
            <ListPropositionConfigComponent contractType={this.props.contractType}/>
            <br/>
            {certFunc.isOwner ? (
              <UpgradePropositionConfigComponent contractType={this.props.contractType} refresh={this.refresh}/>): null}
            <br />
            {certFunc.isOwner ? (
              <ListPendingPropositionConfigComponent contractType={this.props.contractType} refresh={this.refresh}/>): null}
            <br />
           </div>
         );
       }
  }

export default PropositionConfigComponent;