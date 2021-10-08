import React from 'react';
import SignVoteComponent from './SignVoteComponent.js';

const func = require("../../../functions/PropositionFunctions.js");

class VoteForPropositionComponent extends React.Component{

    handleValidatePropConfig = async (event) => {
      event.preventDefault();
      await func.VoteProposition(true, this.props.contract);
      await this.reset();
    };

    handleRejectPropConfig = async (event) => {
        event.preventDefault();
        await func.VoteProposition(false, this.props.contract);
        await this.reset();
      };
    
     async reset(){
        await this.props.refresh();
      }
  
    render(){
      return(
        <div>
          <button type="button" class="btn btn-success" onClick={this.handleValidatePropConfig}>Validate Proposition</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-danger" onClick={this.handleRejectPropConfig}>Reject Proposition</button>
          <SignVoteComponent />
        </div>
      );
    }
  }

  export default VoteForPropositionComponent;