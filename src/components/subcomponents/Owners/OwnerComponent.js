import React from 'react';
import ListOwnersComponent from './ListOwnersComponent.js';
import ListPendingOwnersComponent from './ListPendingOwnersComponent.js';
import UpdateMinOwnerComponent from './UpdateMinOwnerComponent.js';
import ManageOwnerComponent from './ManageOwnerComponent.js';

class OwnerComponent extends React.Component{
    render(){
      return(
        <div>
          <br />
          <ListOwnersComponent contractType={this.props.contractType}/>
          <br />
          <ManageOwnerComponent contractType={this.props.contractType}/>
          <br/>
          <UpdateMinOwnerComponent contractType={this.props.contractType}/>
          <br/>
          <ListPendingOwnersComponent contractType={this.props.contractType}/>
        </div>
      );
    }
  }

  export default OwnerComponent;