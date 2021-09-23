import React from 'react';

const func = require("../../../functions/PropositionFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class VoteForPropositionComponent extends React.Component{

    handleValidatePropConfig = async (event) => {
      event.preventDefault();
      await func.VoteProposition(true, this.props.contractType);
      await this.reset();
    };

    handleRejectPropConfig = async (event) => {
        event.preventDefault();
        await func.VoteProposition(false, this.props.contractType);
        await this.reset();
      };
    
      reset = async () =>{
        await loadFunc.LoadPropositionFunc();
        this.props.refresh();
      }
  
    render(){
      return(
        <div>
          <button type="button" class="btn btn-success" onClick={this.handleValidatePropConfig}>Validate Proposition</button> &nbsp;&nbsp;
          <button type="button" class="btn btn-danger" onClick={this.handleRejectPropConfig}>Reject Proposition</button>
        </div>
      );
    }
  }

  export default VoteForPropositionComponent;