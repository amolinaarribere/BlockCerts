import React from 'react';
import { Form} from 'react-bootstrap';

const func = require("../../../functions/FactoriesFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class CreatePoolIssuer extends React.Component {
    state = {
        minOwners : 0,
        listOfOwners : [],
        name : ""
      };
    
      handleNewPrivatePoolProvider = async (event) => {
          event.preventDefault();
        await func.CreatenewPoolProvider(this.state.minOwners, this.state.listOfOwners, this.state.name, this.props.contractType)
        this.setState({ minOwners: 0, listOfOwners: [], name : "" })
        await loadFunc.LoadFactoriesFunc();
        this.props.refresh();
      };

    render(){
        var text = "Private Pool";
        if(this.props.contractType == 3)text = "Provider";
        return(
            <div>
                 <h3>Create {text}</h3>
                <Form onSubmit={this.handleNewPrivatePoolProvider} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group className="mb-3">
                        <Form.Control type="integer" name="minOwners" placeholder="min Owners" 
                            value={this.state.minOwners}
                            onChange={event => this.setState({ minOwners: event.target.value })}/>
                        <Form.Control type="text" name="listOfOwners" placeholder="list Of Owners" 
                            value={this.state.listOfOwners}
                            onChange={event => this.setState({ listOfOwners: event.target.value.split(",") })}/>
                        <Form.Control type="text" name="name" placeholder="Name" 
                            value={this.state.name}
                            onChange={event => this.setState({ name: event.target.value })}/>
                    </Form.Group>
                    <button  class="btn btn-secondary">Request New {text}</button>
                </Form>
            </div>
        );
        
    }
}

export default CreatePoolIssuer;