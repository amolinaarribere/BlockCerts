import React from 'react';
import { Form} from 'react-bootstrap';

const ProviderPoolFunc = require("../../../functions/ProviderPoolFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class SendNewProposalComponent extends React.Component {
    state = {
        newProvider : "",
        newProviderInfo : ""
    };

    handleNewProposal = async (event) => {
        event.preventDefault();
      await ProviderPoolFunc.AddProviderPool(this.state.newProvider, this.state.newProviderInfo, false, this.props.contractType)
      this.setState({ newProvider: "" })
      this.setState({ newProviderInfo: "" })
      await loadFunc.LoadProviderPoolFunc(this.props.contractType);
      this.props.refresh();
    };

    render(){
      return (
        <div>
         <h3>New Proposal</h3>
         <Form onSubmit={this.handleNewProposal} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group  className="mb-3">
               <Form.Control type="text" name="newProvider" placeholder="address" 
                    value={this.state.newProvider}
                    onChange={event => this.setState({ newProvider: event.target.value })}/>
                <Form.Control type="text" name="newProviderInfo" placeholder="Info" 
                    value={this.state.newProviderInfo}
                    onChange={event => this.setState({ newProviderInfo: event.target.value })}/>    
            </Form.Group>
            <button class="btn btn-secondary">Submit Proposal</button> 
          </Form>
        </div>
      );
    }
  }
  
export default SendNewProposalComponent;