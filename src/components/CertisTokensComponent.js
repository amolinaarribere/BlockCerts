import React from 'react';
import CertisBalancesComponents from './subcomponents/CertisToken/CertisBalancesComponents.js';
import CertisTransferComponent from './subcomponents/CertisToken/CertisTransferComponent.js';

class CertisTokensComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  refresh() {
    this.setState({})
  }

    render(){
      return (
        <div>
          <CertisBalancesComponents />
          <br />
          <CertisTransferComponent refresh={this.refresh}/>
          <br />
        </div>
      );
    }
  }

export default CertisTokensComponent;