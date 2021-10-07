import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/ProviderPoolFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class ManageProvidersPoolsComponent extends React.Component{
    state = {
      ProviderPool : "",
      addProviderPoolInfo : "",
      subscribe : false,
      isManageProvidersPoolsShown: false
    };

    handleAddProvider = async (event) => {
        event.preventDefault();
      await func.AddProviderPool(this.state.ProviderPool, this.state.addProviderPoolInfo, this.state.subscribe, this.props.contractType, this.props.contract)
      await this.reset();
    };
    handleRemoveProviderPool = async (event) => {
        event.preventDefault();
      await func.RemoveProviderPool(this.state.ProviderPool, this.props.contractType, this.props.contract)
      await this.reset();
    };
    handleValidateProviderPool = async (event) => {
        event.preventDefault();
      await func.ValidateProviderPool(this.state.ProviderPool, this.props.contractType, this.props.contract)
      await this.reset();
    };
    handleRejectProviderPool = async (event) => {
        event.preventDefault();
      await func.RejectProviderPool(this.state.ProviderPool, this.props.contractType, this.props.contract)
      await this.reset();
    };

    reset = async () =>{
      this.setState({ ProviderPool: "", addProviderPoolInfo: "", subscribe: false })
      await loadFunc.LoadProviderPoolFunc(this.props.contractType, this.props.contract);
      this.props.refresh();
    }

    toggleManageProvidersPools = () => {
      if(this.state.isManageProvidersPoolsShown)this.setState({ isManageProvidersPoolsShown: false })
      else this.setState({ isManageProvidersPoolsShown: true })
    };
  
    render(){
        var text = "Provider"
        if(this.props.contractType == 3)text = "Pool"
        return(
            <div>
            <button
                className="btn btn-lg btn-primary center modal-button"
                onClick={this.toggleManageProvidersPools}>Manage {text}</button>
            
            {this.state.isManageProvidersPoolsShown ? (
                        <div class="border border-primary border-5">
                          <Form onSubmit={this.handleValidateProviderPool} style={{margin: '50px 50px 50px 50px' }}>
                            <Form.Group  className="mb-3">
                                      <Form.Control type="text" name="ProviderPool" placeholder="address" 
                                          value={this.state.ProviderPool}
                                          onChange={event => this.setState({ ProviderPool: event.target.value })}/>  
                                      <Form.Control type="text" name="addProviderInfo" placeholder="Info" 
                                          value={this.state.addProviderPoolInfo}
                                          onChange={event => this.setState({ addProviderPoolInfo: event.target.value })}/>
                                  </Form.Group>
                                {(this.props.contractType == 3) ? 
                                <Form.Group  className="mb-3">
                                    <Form.Check type="checkbox" name="subscribe" label="Automatically Subscribe"
                                        checked={this.state.subscribe}
                                        onChange={event => this.setState({ subscribe: event.target.checked })} />
                                </Form.Group>: null} 
                            <button type="submit" class="btn btn-primary">Validate {text}</button> &nbsp;&nbsp;
                            <button type="button" class="btn btn-primary" onClick={this.handleRejectProviderPool}>Reject {text}</button> &nbsp;&nbsp;
                              {(this.props.contractType != 1) ? (
                                    <button type="button" class="btn btn-primary" onClick={this.handleAddProvider}>Add {text}</button>
                              )
                              :null}  &nbsp;&nbsp;
                            <button type="button" class="btn btn-primary" onClick={this.handleRemoveProviderPool}>Remove {text}</button> 
                        </Form>
                        <br/>
                        </div>) : null}
            </div>
        );
    }
  }

  export default ManageProvidersPoolsComponent;