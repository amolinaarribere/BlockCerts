import React from 'react';
import CertisBalancesComponents from './subcomponents/CertisToken/CertisBalancesComponents.js';
import CertisTransferComponent from './subcomponents/CertisToken/CertisTransferComponent.js';

const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class CertisTokensComponent extends React.Component {
  constructor(props) {
    super(props)
    loadFunc.LoadCertisFunc(Contracts.CertisToken);
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    await loadFunc.LoadCertisFunc(Contracts.CertisToken);
    this.setState({})
  }

    render(){
      return (
        <div>
          <CertisBalancesComponents contract={Contracts.CertisToken}/>
          <br />
          <CertisTransferComponent contract={Contracts.CertisToken}
            refresh={this.refresh}/>
          <br />
        </div>
      );
    }
  }

export default CertisTokensComponent;