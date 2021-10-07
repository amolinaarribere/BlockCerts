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
const LoadFunc = require("../functions/LoadFunctions.js");
const TreasuryFunc = require("../functions/TreasuryFunctions.js");



class PrivateComponent extends React.Component {
  async componentWillMount() {
    this.state.loading = true;
    await LoadFunc.LoadFactoriesFunc(Contracts.privatePoolFactory);
    await LoadFunc.LoadProviderPoolFunc(this.state.contractType, Contracts.privatePool);
    await LoadFunc.LoadOwnersFunc(Contracts.privatePool);
    await LoadFunc.LoadProviderPoolFunc(this.state.ContractType, Contracts.privatePool);
    ProviderPoolFunc.ReadKeys(BrowserStorageFunctions.privatePoolKey);
    if(this.NotEmpty(ProviderPoolFunc.Address)){
      ProviderPoolFunc.SelectProviderPool(ProviderPoolFunc.Address, this.state.contractType);
    }
    this.state.loading = false;
    this.refresh();
 }

  constructor(props) {
    super(props)
    Certificatefunc.SwitchContext()
    this.refresh = this.refresh.bind(this)
  }

    state = {
      loading : false,
      privateEnv : true,
      contractType : 2
    };

    NotEmpty(value){
      if(value != null && value !== "" && value !== "undefined"){
        return true
      }
      return false;
    }
      
    async refresh() {
      ProviderPoolFunc.ReadKeys(BrowserStorageFunctions.privatePoolKey);
      await LoadFunc.LoadFactoriesFunc(Contracts.privatePoolFactory);
      await LoadFunc.LoadProviderPoolFunc(this.state.contractType, Contracts.privatePool);
      await LoadFunc.LoadOwnersFunc(Contracts.privatePool);
      await LoadFunc.LoadProviderPoolFunc(this.state.ContractType, Contracts.privatePool);
      this.setState({})
    }
  
    render(){
      return (
        <div>
          {(false == this.state.loading)? 
            <div>
              <CreatePoolIssuer contract={Contracts.privatePoolFactory}
                price={TreasuryFunc.PrivatePriceWei}
                contractType={this.state.contractType} 
                refresh={this.refresh}/>
              <br />
              <br />
              <ListPoolsIssuers contract={Contracts.privatePoolFactory}
                contractType={this.state.contractType} 
                Key={BrowserStorageFunctions.privatePoolKey} 
                refresh={this.refresh}/>
              <br />
              {(this.NotEmpty(ProviderPoolFunc.Address))?
                <div>
                  <CertificateComponent contract={Contracts.privatePool}  
                    contractType={this.state.contractType}
                    privateEnv={this.state.privateEnv} 
                    refresh={this.refresh}
                    price={0}/>
                  <br />
                </div>
              :null}
              
              {
              (Ownerfunc.isOwner)?(
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
          : 
            <div>
              Loading....
            </div>
          }

        </div>
        
      );
    }
  }

  
  export default PrivateComponent;