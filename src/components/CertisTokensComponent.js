import React from 'react';
import CertisBalancesComponents from './subcomponents/CertisToken/CertisBalancesComponents.js';
import CertisTransferComponent from './subcomponents/CertisToken/CertisTransferComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';


const Contracts = require("../functions/Contracts.js");
const loadFunc = require("../functions/LoadFunctions.js");

class CertisTokensComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

  state = {
    loading : false
  }
  
  async refresh() {
    //this.state.loading = true;
    await loadFunc.LoadCertisFunc(Contracts.CertisToken);
    //this.state.loading = false;
    this.setState({})
  }

    render(){
      return (
        <div>
           {(false == this.state.loading)? 
            <div>
              <CertisBalancesComponents contract={Contracts.CertisToken}/>
              <br />
              <CertisTransferComponent contract={Contracts.CertisToken}
                refresh={this.refresh}/>
              <br />
          </div>
          :
            <div>
              <LoadingComponent />
            </div>
          }
        </div>
      );
    }
  }

export default CertisTokensComponent;