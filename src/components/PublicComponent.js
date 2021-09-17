import React from 'react';
import CertificateComponent from './subcomponents/Certificates/CertificateComponent.js';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import ProviderPoolComponent from './subcomponents/ProvidersPools/ProviderPoolComponent.js';
import SendNewProposalComponent from './subcomponents/Public/SendNewProposalComponent.js';

const Certificatefunc = require("../functions/CertificateFunctions.js");

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
  
    
  
    render(){
      return (
        <div>
          <SendNewProposalComponent contractType={this.state.contractType}/>
          <br />
          <CertificateComponent contractType={this.state.contractType} privateEnv={this.state.privateEnv}/>
          <br />
          <OwnerComponent contractType={this.state.contractType}/>
          <br/>
          <ProviderPoolComponent contractType={this.state.contractType}/>
        </div>
      );
    }
  }

  export default PublicComponent;