import {ProviderContractType} from '../../../config.js';
import React from 'react';
import { Form, Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/FactoriesFunctions.js");
const ProviderPoolFunctions = require("../../../functions/ProviderPoolFunctions.js");
const BrowserStorageFunctions = require("../../../functions/BrowserStorageFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");


class FundProviderComponent extends React.Component{
    constructor(props) {
        super(props)
        this.refresh = this.refresh.bind(this)
    }

    state = {
      Amount : 0
    };
  
    handleFundProvider = async (event) => {
      event.preventDefault();
      await ProviderPoolFunctions.FundProvider(this.state.Amount, this.props.contract);
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
        let Address = await ENSFunc.Resolution(this.state.ProviderPool);
        BrowserStorageFunctions.WriteKey(this.props.Key, this.state.ProviderPool);
        await ProviderPoolFunctions.SelectProviderPool(Address, this.props.contractType);
        this.setState({ ProviderPool: "" })
        await this.props.refresh();
      };
      
      render(){
        var text = "Pool";
        if (this.props.contractType == ProviderContractType)text = "Provider";
        return (
            <div>
                <h3>Select {text}</h3>
                <Form onSubmit={this.handleSelectProviderPool} style={{margin: '50px 50px 50px 50px' }}>
                <Form.Group  className="mb-3">
                    <Form.Control type="text" name="SelectProviderPool" placeholder="address or ENS name" 
                        value={this.state.ProviderPool}
                        onChange={event => this.setState({ ProviderPool: event.target.value })}/>
                </Form.Group>
                <button type="submit" class="btn btn-secondary">Select {text}</button>
                </Form>
            </div>
        );
      }
}

class UnSelectPoolIssuerComponent extends React.Component{
  
    handleUnSelectProviderPool = async (event) => {
        event.preventDefault();
        BrowserStorageFunctions.WriteKey(this.props.Key, "");
        await ProviderPoolFunctions.UnSelectProviderPool(this.props.contractType);
        this.setState({})
        await this.props.refresh();
      };
    
    render(){
      var text = "Pool";
      if (this.props.contractType == ProviderContractType)text = "Provider";
      return (
          <div>
              <Form onSubmit={this.handleUnSelectProviderPool} style={{margin: '50px 50px 50px 50px' }}>
                <button type="submit" class="btn btn-secondary">UnSelect {text}</button>
              </Form>
          </div>
      );
    }
}

class ListPoolsIssuers extends React.Component {

    render(){
        let text = (this.props.contractType == ProviderContractType) ? "Provider" : "Private Pool";
        let addresses = (this.props.contractType == ProviderContractType) ? func.ProviderAddresses : func.PrivatePoolAddresses;
        let selectedUnresolvedAddress = (this.props.contractType == ProviderContractType) ? ProviderPoolFunctions.ProviderUnResolvedAddress : ProviderPoolFunctions.PrivatePoolUnResolvedAddress;
        let selectedAddress = (this.props.contractType == ProviderContractType) ? ProviderPoolFunctions.ProviderAddress : ProviderPoolFunctions.PrivatePoolAddress;
        selectedAddress = (selectedUnresolvedAddress == selectedAddress)?" ":selectedAddress;
        let Provider = false;

        return(
            <div>
                <h3>{text} Addresses :</h3> 
                <Container style={{margin: '10px 50px 50px 50px' }}>
                        {addresses.map(address => (
                        <Row key={address[1]}>
                            <Col><i><b>creator </b></i>{address[0]}</Col>
                            <Col><i><b>name </b></i>{address[2]}</Col>
                            <Col><i><b>addr </b></i>{address[1]}</Col></Row>
                        ))}
                </Container>
                <br />
                <SelectPoolIssuerComponent contract={this.props.contract}
                    contractType={this.props.contractType} 
                    Key={this.props.Key} 
                    refresh={this.props.refresh}/>
                <hr class="bg-secondary"/>
                <br />
                <h3 class="text-primary"> Selected {text} : {selectedUnresolvedAddress} <i>{selectedAddress}</i></h3>
                <UnSelectPoolIssuerComponent contractType={this.props.contractType} 
                    Key={this.props.Key} 
                    refresh={this.props.refresh}/>
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
                        <FundProviderComponent contract={this.props.contract}/>
                    </div>): null}
            </div>
        );
        
    }
}

export default ListPoolsIssuers;