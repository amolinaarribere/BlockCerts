import React from 'react';
const func = require("../../../functions/PropositionFunctions.js");

class VoteForPropositionComponent extends React.Component{

    handleValidatePropConfig = async (event) => {
      event.preventDefault();
      await func.VoteProposition(true, this.props.contractType);
    };

    handleRejectPropConfig = async (event) => {
        event.preventDefault();
        await func.VoteProposition(false, this.props.contractType);
      };
  
    render(){
      return(
        <div>
          <button type="submit" class="btn btn-success" onClick={this.handleValidatePropConfig}>Validate Proposition</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-danger" onClick={this.handleRejectPropConfig}>Reject Proposition</button>
        </div>
      );
    }
  }

  export default VoteForPropositionComponent;