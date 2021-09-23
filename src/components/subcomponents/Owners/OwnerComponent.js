import React from 'react';
import ListOwnersComponent from './ListOwnersComponent.js';
import ListPendingOwnersComponent from './ListPendingOwnersComponent.js';
import UpdateMinOwnerComponent from './UpdateMinOwnerComponent.js';
import ManageOwnerComponent from './ManageOwnerComponent.js';

class OwnerComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    this.props.refresh()
  }

    render(){
      return(
        <div>
          <br />
          <ListOwnersComponent contractType={this.props.contractType}/>
          <br />
          <ManageOwnerComponent contractType={this.props.contractType} refresh={this.refresh}/>
          <br/>
          <UpdateMinOwnerComponent contractType={this.props.contractType} refresh={this.refresh}/>
          <br/>
          <ListPendingOwnersComponent contractType={this.props.contractType} refresh={this.refresh}/>
          <hr class="bg-secondary"/>
        </div>
      );
    }
  }

  export default OwnerComponent;