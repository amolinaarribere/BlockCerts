import React from 'react';
import ListPropositionConfigComponent from './ListPropositionConfigComponent.js';
import UpgradePropositionConfigComponent from './UpgradePropositionConfigComponent.js';
import ListPendingPropositionConfigComponent from './ListPendingPropositionConfigComponent.js';

const certFunc = require("../../../functions/CertisFunctions.js");

class PropositionConfigComponent extends React.Component{
       render(){
         return (
           <div>
            <ListPropositionConfigComponent contractType={this.props.contractType}/>
            <br/>
            {certFunc.isOwner ? (
              <UpgradePropositionConfigComponent contractType={this.props.contractType}/>): null}
            <br />
            {certFunc.isOwner ? (
              <ListPendingPropositionConfigComponent contractType={this.props.contractType}/>): null}
            <br />
           </div>
         );
       }
  }

export default PropositionConfigComponent;