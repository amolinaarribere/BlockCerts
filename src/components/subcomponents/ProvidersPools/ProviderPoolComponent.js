import React from 'react';
import ListProvidersPoolsComponent from './ListProvidersPoolsComponent.js';
import ListPendingProvidersPoolsComponent from './ListPendingProvidersPoolsComponent.js';
import ManageProvidersPoolsComponent from './ManageProvidersPoolsComponent.js';

const LoadFunc = require('../../../functions/LoadFunctions.js');

class ProviderPoolComponent extends React.Component{
  constructor(props) {
    super(props)
    await LoadFunc.LoadProviderPoolFunc(this.props.ContractType, this.props.contract);
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    await LoadFunc.LoadProviderPoolFunc(this.props.ContractType, this.props.contract);
    this.props.refresh()
  }

    render(){
        return(
          <div>
            <br />
            <ListProvidersPoolsComponent contract={this.props.contract}
              contractType={this.props.contractType} />
            <br/>
            <ManageProvidersPoolsComponent contract={this.props.contract}
              contractType={this.props.contractType} 
              refresh={this.refresh}/>
            <br/>
            <ListPendingProvidersPoolsComponent contract={this.props.contract}
              contractType={this.props.contractType} />
            <br/>
          </div>
        );
    }
  }

export default ProviderPoolComponent;