import React from 'react';
import ListOwnersComponent from './ListOwnersComponent.js';
import ListPendingOwnersComponent from './ListPendingOwnersComponent.js';
import UpdateMinOwnerComponent from './UpdateMinOwnerComponent.js';
import ManageOwnerComponent from './ManageOwnerComponent.js';

const LoadFunc = require('../../../functions/LoadFunctions.js');


class OwnerComponent extends React.Component{
  constructor(props) {
    super(props)
    await LoadFunc.LoadOwnersFunc(this.props.contract);
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    await LoadFunc.LoadOwnersFunc(this.props.contract);
    this.props.refresh()
  }

    render(){
      return(
        <div>
          <br />
          <ListOwnersComponent contract={this.props.contract}
            contractType={this.props.contractType}/>
          <br />
          <ManageOwnerComponent contract={this.props.contract}
            contractType={this.props.contractType} 
            refresh={this.refresh}/>
          <br/>
          <UpdateMinOwnerComponent contract={this.props.contract}
            contractType={this.props.contractType} 
            refresh={this.refresh}/>
          <br/>
          <ListPendingOwnersComponent contract={this.props.contract}
            contractType={this.props.contractType} 
            refresh={this.refresh}/>
          <hr class="bg-secondary"/>
        </div>
      );
    }
  }

  export default OwnerComponent;