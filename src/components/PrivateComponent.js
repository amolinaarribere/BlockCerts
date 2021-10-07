import React from 'react';
import CertificateComponent from './subcomponents/Certificates/CertificateComponent.js';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import ProviderPoolComponent from './subcomponents/ProvidersPools/ProviderPoolComponent.js';
import ListPoolsIssuers from './subcomponents/Factory/ListPoolsIssuers.js';
import CreatePoolIssuer from './subcomponents/Factory/CreatePoolIssuer.js';

const ProviderPoolFunc = require("../functions/ProviderPoolFunctions.js");
const BrowserStorageFunctions = require("../functions/BrowserStorageFunctions.js");
const Certificatefunc = require("../functions/CertificateFunctions.js");
const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");

class PrivateComponent extends React.Component {
    componentWillMount() {
      Certificatefunc.SwitchContext()
      if(ProviderPoolFunc.privatePoolAddress != null && ProviderPoolFunc.privatePoolAddress !== "" && ProviderPoolFunc.privatePoolAddress !== "undefined"){
        ProviderPoolFunc.SelectProviderPool(ProviderPoolFunc.privatePoolAddress, this.state.contractType);
      }
   }

    state = {
      privateEnv : true,
      contractType : 2
    };

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
          <CreatePoolIssuer contract={Contracts.privatePool}
            contractType={this.state.contractType} 
            refresh={this.refresh}/>
          <br />
          <br />
          <ListPoolsIssuers contract={Contracts.privatePool}
            contractType={this.state.contractType} Key={BrowserStorageFunctions.privatePoolKey} refresh={this.refresh}/>
          <br />
          <CertificateComponent contract={Contracts.privatePool}  
            contractType={this.state.contractType}
            privateEnv={this.state.privateEnv} 
            refresh={this.refresh}
            price={0}/>
          <br />
          {
           (Ownerfunc.isPrivateOwner)?(
             <div>
              <OwnerComponent contract={Contracts.privatePool} 
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
              <br/>
              <ProviderPoolComponent contract={Contracts.privatePool} 
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
            </div>
           ):null}
        </div>
      );
    }
  }

  
  export default PrivateComponent;