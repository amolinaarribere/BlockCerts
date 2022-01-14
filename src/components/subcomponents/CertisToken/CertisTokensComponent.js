import React from 'react';
import CertisBalancesComponents from './CertisBalancesComponents.js';
import CertisTransferComponent from './CertisTransferComponent.js';

const Contracts = require("../../../functions/Contracts.js");

class CertisTokensComponent extends React.Component {
  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await this.props.refresh();
  }

    render(){
      return (
        <div>
           <h3>Certis Tokens</h3>
          <CertisBalancesComponents contract={Contracts.CertisToken}/>
          <CertisTransferComponent contract={Contracts.CertisToken}
                refresh={this.refresh}/>
          <hr class="bg-secondary"/>
          <br />
          </div>
      );
    }
  }

export default CertisTokensComponent;