import {PublicContractType, ProviderContractType} from '../../../config.js';
import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/ProviderPoolFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");
const ENSFunc = require("../../../functions/ENSFunctions.js");

class ManageProvidersPoolsComponent extends React.Component{
    state = {
      ProviderPool : "",
      addProviderPoolInfo : "",
      subscribe : false,
      isManageProvidersPoolsShown: false
    };

    handleAddProvider = async (event) => {
      event.preventDefault();
      let Address = await ENSFunc.Resolution(this.state.ProviderPool);
      await func.AddProviderPool(Address, this.state.addProviderPoolInfo, this.state.subscribe, this.props.contractType, 0, this.props.contract)
      await this.refresh();
    };
    handleRemoveProviderPool = async (event) => {
      event.preventDefault();
      let Address = await ENSFunc.Resolution(this.state.ProviderPool);
      await func.RemoveProviderPool(Address, this.props.contractType, this.props.contract)
      await this.refresh();
    };
    handleValidateProviderPool = async (event) => {
      event.preventDefault();
      let Address = await ENSFunc.Resolution(this.state.ProviderPool);
      await func.ValidateProviderPool(Address, this.props.contractType, this.props.contract)
      await this.refresh();
    };
    handleRejectProviderPool = async (event) => {
      event.preventDefault();
      let Address = await ENSFunc.Resolution(this.state.ProviderPool);
      await func.RejectProviderPool(Address, this.props.contractType, this.props.contract)
      await this.refresh();
    };

    async refresh() {
      this.setState({ ProviderPool: "", addProviderPoolInfo: "", subscribe: false })
      await loadFunc.LoadProviderPoolFunc(this.props.contractType, this.props.contract);
      await this.props.refresh();
    }

    toggleManageProvidersPools = () => {
      if(this.state.isManageProvidersPoolsShown)this.setState({ isManageProvidersPoolsShown: false })
      else this.setState({ isManageProvidersPoolsShown: true })
    };
  
    render(){
        var text = "Provider"
        if(this.props.contractType == ProviderContractType)text = "Pool"
        return(
            <div>
            <button
                className="btn btn-lg btn-primary center modal-button"
                onClick={this.toggleManageProvidersPools}>Manage {text}</button>
            
            {this.state.isManageProvidersPoolsShown ? (
                        <div class="border border-primary border-5">
                          <Form onSubmit={this.handleValidateProviderPool} style={{margin: '50px 50px 50px 50px' }}>
                            <Form.Group  className="mb-3">
                                      <Form.Control type="text" name="ProviderPool" placeholder="address or ENS name" 
                                          value={this.state.ProviderPool}
                                          onChange={event => this.setState({ ProviderPool: event.target.value })}/>  
                                      <Form.Control type="text" name="addProviderInfo" placeholder="Info" 
                                          value={this.state.addProviderPoolInfo}
                                          onChange={event => this.setState({ addProviderPoolInfo: event.target.value })}/>
                                  </Form.Group>
                                {(this.props.contractType == ProviderContractType) ? 
                                <Form.Group  className="mb-3">
                                    <Form.Check type="checkbox" name="subscribe" label="Automatically Subscribe"
                                        checked={this.state.subscribe}
                                        onChange={event => this.setState({ subscribe: event.target.checked })} />
                                </Form.Group>: null} 
                            {(this.props.contractType != PublicContractType) ? (
                                <span>
                                  <button type="button" class="btn btn-primary" onClick={this.handleAddProvider}>Add {text}</button>  &nbsp;&nbsp;
                                </span>
                              )
                            :null} 
                            <button type="button" class="btn btn-primary" onClick={this.handleRemoveProviderPool}>Remove {text}</button> &nbsp;&nbsp;
                            <button type="submit" class="btn btn-success">Validate {text}</button> &nbsp;&nbsp;
                            <button type="button" class="btn btn-danger" onClick={this.handleRejectProviderPool}>Reject {text}</button>
                        </Form>
                        <br/>
                        </div>) : null}
            </div>
        );
    }
  }

  export default ManageProvidersPoolsComponent;