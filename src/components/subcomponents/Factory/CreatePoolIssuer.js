import React from 'react';
import { Form} from 'react-bootstrap';

const func = require("../../../functions/FactoriesFunctions.js");
const LoadFunc = require("../../../functions/LoadFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");

class CreatePoolIssuer extends React.Component {
    constructor(props) {
        super(props)
        this.refresh = this.refresh.bind(this)
    }
    
    state = {
        minOwners : 0,
        listOfOwners : [],
        name : "",
        ensname : ""
      };

      async refresh() {
        await this.props.refresh()
      }
    
      handleNewPrivatePoolProvider = async (event) => {
        event.preventDefault();
        let OwnersAddresses = []
        for(let i=0; i < this.state.listOfOwners.length; i++){
            OwnersAddresses.push(await ENSFunc.Resolution(this.state.listOfOwners[i]));
        }
        await func.CreatenewPoolProvider(this.state.minOwners, OwnersAddresses, this.state.name, this.state.ensname, this.props.contract, this.props.price)
        this.setState({ minOwners: 0, listOfOwners: [], name : "", ensname: "" })
        await LoadFunc.LoadFactoriesFunc(this.props.contract);
        await this.refresh()
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
                        <Form.Control type="text" name="listOfOwners" placeholder="list Of Owners addresses or ENS names" 
                            value={this.state.listOfOwners}
                            onChange={event => this.setState({ listOfOwners: event.target.value.split(",") })}/>
                        <Form.Control type="text" name="name" placeholder="Name" 
                            value={this.state.name}
                            onChange={event => this.setState({ name: event.target.value })}/>
                        <Form.Control type="text" name="ensname" placeholder="ENSName" 
                            value={this.state.ensname}
                            onChange={event => this.setState({ ensname: event.target.value })}/>
                    </Form.Group>
                    <button  class="btn btn-secondary">Request New {text}</button>
                </Form>
                <hr class="bg-secondary"/>
            </div>
        );
        
    }
}

export default CreatePoolIssuer;