import React from 'react';
import ListProvidersPoolsComponent from './ListProvidersPoolsComponent.js';
import ListPendingProvidersPoolsComponent from './ListPendingProvidersPoolsComponent.js';
import ManageProvidersPoolsComponent from './ManageProvidersPoolsComponent.js';

class ProviderPoolComponent extends React.Component{
    render(){
        return(
          <div>
            <br />
            <ListProvidersPoolsComponent contractType={this.props.contractType} />
            <br/>
            <ManageProvidersPoolsComponent contractType={this.props.contractType} />
            <br/>
            <ListPendingProvidersPoolsComponent contractType={this.props.contractType} />
            <br/>
          </div>
        );
    }
  }

export default ProviderPoolComponent;