import React from 'react';
import CertificateComponent from './subcomponents/Certificates/CertificateComponent.js';
import OwnerComponent from './subcomponents/Owners/OwnerComponent.js';
import ProviderPoolComponent from './subcomponents/ProvidersPools/ProviderPoolComponent.js';
import ListPoolsIssuers from './subcomponents/Factory/ListPoolsIssuers.js';
import CreatePoolIssuer from './subcomponents/Factory/CreatePoolIssuer.js';

const ProviderPoolFunc = require("../functions/ProviderPoolFunctions.js");
const BrowserStorageFunctions = require("../functions/BrowserStorageFunctions.js");
const Ownerfunc = require("../functions/OwnerFunctions.js");
const Contracts = require("../functions/Contracts.js");
const LoadFunc = require("../functions/LoadFunctions.js");
const TreasuryFunc = require("../functions/TreasuryFunctions.js");



  class IssuerComponent extends React.Component {
    async componentWillMount() {
      this.state.loading = true;
      await LoadFunc.LoadFactoriesFunc(Contracts.providerFactory);
      await LoadFunc.LoadProviderPoolFunc(this.state.contractType, Contracts.provider);
      await LoadFunc.LoadOwnersFunc(Contracts.provider);
      await LoadFunc.LoadProviderPoolFunc(this.state.ContractType, Contracts.provider);
      ProviderPoolFunc.ReadKeys(BrowserStorageFunctions.providerKey);
      if(this.NotEmpty(ProviderPoolFunc.Address)){
        ProviderPoolFunc.SelectProviderPool(ProviderPoolFunc.Address, this.state.contractType);
      }
      this.state.loading = false;
      this.refresh();
   }

   
   constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
  }
  
  async refresh() {
    ProviderPoolFunc.ReadKeys(BrowserStorageFunctions.providerKey);
    await LoadFunc.LoadFactoriesFunc(Contracts.providerFactory);
    await LoadFunc.LoadProviderPoolFunc(this.state.contractType, Contracts.provider);
    await LoadFunc.LoadOwnersFunc(Contracts.provider);
    await LoadFunc.LoadProviderPoolFunc(this.state.ContractType, Contracts.provider);
    this.setState({})
  }

    state = {
      loading : false,
      contractType : 3
    };

    NotEmpty(value){
      if(value != null && value !== "" && value !== "undefined"){
        return true
      }
      return false;
    }
    
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <CreatePoolIssuer contract={Contracts.providerFactory}
                price={TreasuryFunc.ProviderPriceWei}
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
              <br />
              <br />
              <ListPoolsIssuers contract={Contracts.providerFactory}
                contractType={this.state.contractType} 
                Key={BrowserStorageFunctions.providerKey} 
                refresh={this.refresh}/>
              <br />
              {
              (Ownerfunc.isOwner)?(
                <div>
                  <CertificateComponent contract={Contracts.provider}
                    contractType={this.state.contractType} 
                    refresh={this.refresh}
                    price={0}/>
                  <br />
                  <OwnerComponent contract={Contracts.provider}
                    contractType={this.state.contractType} 
                    refresh={this.refresh}/>
                  <br/>
                  <ProviderPoolComponent contract={Contracts.provider}
                    contractType={this.state.contractType} 
                    refresh={this.refresh}/>
                </div>
              ):null}
            </div>
           :
            <div>
            Loading....
            </div>
          }
        </div>
      );
    }
  }
  

export default IssuerComponent;