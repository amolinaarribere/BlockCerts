import React from 'react';
import ListProvidersPoolsComponent from './ListProvidersPoolsComponent.js';
import ListPendingProvidersPoolsComponent from './ListPendingProvidersPoolsComponent.js';
import ManageProvidersPoolsComponent from './ManageProvidersPoolsComponent.js';

class ProviderPoolComponent extends React.Component{
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh()
  }


    render(){
        return(
          <div>
            <br />
            <ListProvidersPoolsComponent contract={this.props.contract}
              contractType={this.props.contractType} />
            <br/>
            {
            (this.props.isOwner)?(
              <div>
                  <ManageProvidersPoolsComponent contract={this.props.contract}
                    contractType={this.props.contractType} 
                    refresh={this.refresh}/>
                  <br/>
                  <ListPendingProvidersPoolsComponent contract={this.props.contract}
                    contractType={this.props.contractType} />
                  <br/>
              </div>
              ):null}
          </div>
        );
    }
  }

export default ProviderPoolComponent;