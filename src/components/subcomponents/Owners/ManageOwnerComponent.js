import React from 'react';
import { Form } from 'react-bootstrap';

const func = require("../../../functions/OwnerFunctions.js");
const loadFunc = require("../../../functions/LoadFunctions.js");

class ManageOwnerComponent extends React.Component{
    state = {
      Owner : "",
      isManageOwnersShown: false
    };

    handleAddOwner = async (event) => {
        event.preventDefault();
      await func.AddOwner(this.state.Owner, "", this.props.contractType)
      await this.reset();
    };
    handleRemoveOwner = async (event) => {
        event.preventDefault();
      await func.RemoveOwner(this.state.Owner, this.props.contractType)
      await this.reset();
    };
    handleValidateOwner = async (event) => {
        event.preventDefault();
      await func.ValidateOwner(this.state.Owner, this.props.contractType)
      await this.reset();
    };
    handleRejectOwner = async (event) => {
        event.preventDefault();
      await func.RejectOwner(this.state.Owner, this.props.contractType)
      await this.reset();
    };
    
    reset = async() =>{
      this.setState({ Owner: "" })
      await loadFunc.LoadOwnersFunc(this.props.contractType);
      this.props.refresh();
    }

    toggleManageOwners = () => {
      if(this.state.isManageOwnersShown)this.setState({ isManageOwnersShown: false })
      else this.setState({ isManageOwnersShown: true })
    };
  
    render(){
      return(
        <div>
          <button
              className="btn btn-lg btn-primary center modal-button"
              onClick={this.toggleManageOwners}>Manage Owners</button>
          
          {this.state.isManageOwnersShown ? (
                    <div class="border border-primary border-5">
                       <Form onSubmit={this.handleAddOwner} style={{margin: '50px 50px 50px 50px' }}>
                        <Form.Group  className="mb-3">
                          <Form.Control type="text" name="Owner" placeholder="address" 
                              value={this.state.Owner}
                              onChange={event => this.setState({ Owner: event.target.value })}/>  
                        </Form.Group>
                        <button type="submit" class="btn btn-primary">Add Owner</button> &nbsp;&nbsp;
                        <button type="button" class="btn btn-primary" onClick={this.handleRemoveOwner}>Remove Owner</button> &nbsp;&nbsp;
                        <button type="button" class="btn btn-primary" onClick={this.handleValidateOwner}>Validate Owner</button> &nbsp;&nbsp;
                        <button type="button" class="btn btn-primary" onClick={this.handleRejectOwner}>Reject Owner</button> 
                      </Form>
                      <br/>
                    </div>) : null}
        </div>
      );
    }
  }

  export default ManageOwnerComponent;