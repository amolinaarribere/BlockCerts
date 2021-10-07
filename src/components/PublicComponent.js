import React from 'react';
import CertificateComponent from './subcomponents/Certificates/CertificateComponent.js';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import ProviderPoolComponent from './subcomponents/ProvidersPools/ProviderPoolComponent.js';
import SendNewProposalComponent from './subcomponents/Public/SendNewProposalComponent.js';

const Certificatefunc = require("../functions/CertificateFunctions.js");
const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");
const Treasury = require("../functions/TreasuryFunctions.js");

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
          <SendNewProposalComponent contract={Contracts.publicPool}  
            contractType={this.state.contractType} 
            refresh={this.refresh}/>
          <br />
          <CertificateComponent contract={Contracts.publicPool} 
            contractType={this.state.contractType}
            privateEnv={this.state.privateEnv} 
            refresh={this.refresh}
            price={Treasury.CertificatePriceWei}/>
          <br />
          {
           (Ownerfunc.isPublicOwner)?(
             <div>
              <OwnerComponent contract={Contracts.publicPool} 
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
              <br/>
              <ProviderPoolComponent contract={Contracts.publicPool} 
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
            </div>
           ):null}

          
        </div>
      );
    }
  }

  export default PublicComponent;