import React from 'react';
import ListProvidersPoolsComponent from './ListProvidersPoolsComponent.js';
import ListPendingProvidersPoolsComponent from './ListPendingProvidersPoolsComponent.js';
import ManageProvidersPoolsComponent from './ManageProvidersPoolsComponent.js';

class ProviderPoolComponent extends React.Component{
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
            <ListProvidersPoolsComponent contractType={this.props.contractType} />
            <br/>
            <ManageProvidersPoolsComponent contractType={this.props.contractType} refresh={this.refresh}/>
            <br/>
            <ListPendingProvidersPoolsComponent contractType={this.props.contractType} />
            <br/>
          </div>
        );
    }
  }

export default ProviderPoolComponent;