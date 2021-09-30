import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/FactoriesFunctions.js");
const ProviderPoolFunctions = require("../../../functions/ProviderPoolFunctions.js");
const BrowserStorageFunction = require("../../../functions/BrowserStorageFunction.js");

class FundProviderComponent extends React.Component{
    state = {
      Amount : 0
    };
  
    handleFundProvider = async (event) => {
      event.preventDefault();
      await ProviderPoolFunctions.FundProvider(this.state.Amount);
      this.setState({ Amount: 0 })
    };
    
    render(){
      return (
          <div>
              <h3>Fund Provider</h3>
                <Form onSubmit={this.handleFundProvider} style={{margin: '50px 50px 50px 50px' }}>
                    <Form.Group  className="mb-3">
                        <Form.Control type="integer" name="Amount" placeholder="amount" 
                            value={this.state.Amount}
                            onChange={event => this.setState({ Amount: event.target.value })}/>
                    </Form.Group>
                    <button type="submit" class="btn btn-secondary">Fund</button>
                </Form>
          </div>
      );
    }
}

class SelectPoolIssuerComponent extends React.Component{
      state = {
        ProviderPool : ""
      };
    
      handleSelectProviderPool = async (event) => {
        event.preventDefault();
        BrowserStorageFunction.WriteKey(this.props.Key, this.state.ProviderPool);

        await ProviderPoolFunctions.SelectProviderPool(this.state.ProviderPool, this.props.contractType);
        this.setState({ ProviderPool: "" })
        this.props.refresh();
      };
      
      render(){
        var text = "Pool";
        if (this.props.contractType == 3)text = "Provider";
        return (
            <div>
                <h3>Select {text}</h3>
                <Form onSubmit={this.handleSelectProviderPool} style={{margin: '50px 50px 50px 50px' }}>
                <Form.Group  className="mb-3">
                    <Form.Control type="text" name="SelectProviderPool" placeholder="address" 
                        value={this.state.ProviderPool}
                        onChange={event => this.setState({ ProviderPool: event.target.value })}/>
                </Form.Group>
                <button type="submit" class="btn btn-secondary">Select {text}</button>
                </Form>
            </div>
        );
      }
}

class ListPoolsIssuers extends React.Component {
    render(){
        var text = "Private Pool";
        var addresses = func.privatePoolAddresses;
        var selectedAddress = ProviderPoolFunctions.privatePoolAddress;
        var Provider = false;
        if (this.props.contractType == 3) {
            text = "Provider";
            addresses = func.providerAddresses;
            selectedAddress = ProviderPoolFunctions.providerAddress;
            Provider = true;
        }
        return(
            <div>
                <h3>{text} Addresses :</h3> 
                <Container style={{margin: '10px 50px 50px 50px' }}>
                        {addresses.map(address => (
                        <Row key={address[1]}>
                            <Col><i><b>creator </b></i>{address[0]}</Col> 
                            <Col><i><b>address </b></i>{address[1]}</Col></Row>
                        ))}
                </Container>
                <br />
                <SelectPoolIssuerComponent contractType={this.props.contractType} Key={this.props.Key} refresh={this.props.refresh}/>
                <hr class="bg-secondary"/>
                <br />
                <h2 class="text-primary"> Selected {text} : {selectedAddress}</h2>
                <br />
                {Provider ? (
                    <div>
                        <Container style={{margin: '10px 50px 50px 50px' }}>
                            <Row>
                                <Col><b>Contract Balance :</b></Col>
                                <Col>{ProviderPoolFunctions.providerBalance}</Col>
                            </Row>
                        </Container>
                        <br />
                        <FundProviderComponent />
                    </div>): null}
            </div>
        );
        
    }
}

export default ListPoolsIssuers;