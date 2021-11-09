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
      await this.refresh();
    }
   
   constructor(props) {
    super(props)
    this.refresh = this.refresh.bind(this)
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

  async refresh() {
    ProviderPoolFunc.ReadKeys(BrowserStorageFunctions.providerKey);
    await LoadFunc.LoadFactoriesFunc(Contracts.providerFactory); 
    Ownerfunc.resetOwners();    
    if(this.NotEmpty(ProviderPoolFunc.Address)){
      await ProviderPoolFunc.SelectProviderPool(ProviderPoolFunc.Address, this.state.contractType);
    }
    this.setState({})
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