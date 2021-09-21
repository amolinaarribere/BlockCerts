import React from 'react';
import CertificateComponent from './subcomponents/Certificates/CertificateComponent.js';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import ProviderPoolComponent from './subcomponents/ProvidersPools/ProviderPoolComponent.js';
import SendNewProposalComponent from './subcomponents/Public/SendNewProposalComponent.js';

const Certificatefunc = require("../functions/CertificateFunctions.js");
const Ownerfunc = require("../functions/OwnerFunctions.js");

class PublicComponent extends React.Component {
    componentWillMount() {
      Certificatefunc.SwitchContext()
   }

    state = {
      newProvider : "",
      newProviderInfo : "",
      privateEnv : false,
      contractType : 1
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
          <SendNewProposalComponent contractType={this.state.contractType} refresh={this.refresh}/>
          <br />
          <CertificateComponent contractType={this.state.contractType} privateEnv={this.state.privateEnv} refresh={this.refresh}/>
          <br />
          {
           (Ownerfunc.isPublicOwner)?(
             <div>
              <OwnerComponent contractType={this.state.contractType} refresh={this.refresh}/>
              <br/>
              <ProviderPoolComponent contractType={this.state.contractType} refresh={this.refresh}/>
            </div>
           ):null}

          
        </div>
      );
    }
  }

  export default PublicComponent;