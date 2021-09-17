import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/PropositionFunctions.js");
const certFunc = require("../../../functions/CertisFunctions.js");

class UpgradePropositionConfigComponent extends React.Component{
    state = {
        NewPropositionLifeTime: "",
        NewPropositionThresholdPercentage: "",
        NewMinWeightToProposePercentage: "",

        isUpdatePropositionConfigShown: false
       };

    toggleUpdatePropositionConfig = () => {
        if(this.state.isUpdatePropositionConfigShown)this.setState({ isUpdatePropositionConfigShown: false })
        else this.setState({ isUpdatePropositionConfigShown: true })
      };

    handleUpgradeProp = async (event) => {
         event.preventDefault();
         var NPLT = 0;
         var NPTP = 0;
         var NMWP = 0;
   
         if(this.state.NewPropositionLifeTime != "") NPLT = this.state.NewPropositionLifeTime;
         if(this.state.NewPropositionThresholdPercentage != "") NPTP = this.state.NewPropositionThresholdPercentage;
         if(this.state.NewMinWeightToProposePercentage != "") NMWP = this.state.NewMinWeightToProposePercentage;
   
         await func.UpgradeProposition(NPLT, NPTP, NMWP, this.props.contractType);
   
         this.setState({ NewPropositionLifeTime: "",
         NewPropositionThresholdPercentage: "",
         NewMinWeightToProposePercentage: ""})
       };
     
    render(){
         return (
           <div>
             <button
                    className="btn btn-lg btn-primary center modal-button"
                    onClick={this.toggleUpdatePropositionConfig}>Manage Proposition Configuration</button>

                  {this.state.isUpdatePropositionConfigShown ? (
                    <div class="border border-primary border-5">
                      <Form onSubmit={this.handleUpgradeProp} style={{margin: '50px 50px 50px 50px' }}>
                        <Form.Group  className="mb-3">
                          <Form.Control type="integer" name="NewPropositionLifeTime" placeholder="NewPropositionLifeTime" 
                            value={this.state.NewPropositionLifeTime}
                            onChange={event => this.setState({ NewPropositionLifeTime: event.target.value })}/>
                          <Form.Control type="integer" name="NewPropositionThresholdPercentage" placeholder="NewPropositionThresholdPercentage" 
                            value={this.state.NewPropositionThresholdPercentage}
                            onChange={event => this.setState({ NewPropositionThresholdPercentage: event.target.value })}/>
                          <Form.Control type="integer" name="NewMinWeightToProposePercentage" placeholder="NewMinWeightToProposePercentage" 
                            value={this.state.NewMinWeightToProposePercentage}
                            onChange={event => this.setState({ NewMinWeightToProposePercentage: event.target.value })}/>
                        </Form.Group>
                        <button class="btn btn-primary">Upgrade Proposition Configuration</button>
                      </Form>
                      <br/>
                    </div>) : null}    
           </div>
         );
       }
  }

export default UpgradePropositionConfigComponent;