import React from 'react';
import CertificateComponent from './subcomponents/Certificates/CertificateComponent.js';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import ProviderPoolComponent from './subcomponents/ProvidersPools/ProviderPoolComponent.js';
import SendNewProposalComponent from './subcomponents/Public/SendNewProposalComponent.js';
import LoadingComponent from './subcomponents/LoadingComponent.js';

const Certificatefunc = require("../functions/CertificateFunctions.js");
const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");
const Treasury = require("../functions/TreasuryFunctions.js");
const LoadFunc = require("../functions/LoadFunctions.js");


class PublicComponent extends React.Component {
    async componentWillMount() {
      Certificatefunc.SwitchContext()
      await this.refresh();
   }

   constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }

    state = {
      loading : false,
      newProvider : "",
      newProviderInfo : "",
      privateEnv : false,
      contractType : 1
    };
    
    async refresh() {
      this.state.loading = true;
      await LoadFunc.LoadProviderPoolFunc(this.state.contractType, Contracts.publicPool);
      await LoadFunc.LoadOwnersFunc(Contracts.publicPool);
      await LoadFunc.LoadProviderPoolFunc(this.state.ContractType, Contracts.publicPool);
      this.state.loading = false;
      this.setState({})
    }
  
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <SendNewProposalComponent contract={Contracts.publicPool}  
                price={Treasury.PublicPriceWei}
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
              (Ownerfunc.isOwner)?(
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
          :
            <div>
              <LoadingComponent />
            </div>
          }

        </div>
      );
    }
  }

  export default PublicComponent;