import React from 'react';
import CertisBalancesComponents from './subcomponents/CertisToken/CertisBalancesComponents.js';
import CertisTransferComponent from './subcomponents/CertisToken/CertisTransferComponent.js';
const func = require("../functions/LoadFunctions.js");

class CertisTokensComponent extends React.Component {
    componentWillMount() {
      //func.LoadBlockchain()
      //func.SwitchContext()
   }
    state = {
      
    };
    
    render(){
      return (
        <div>
          <CertisBalancesComponents />
          <br />
          <CertisTransferComponent />
          <br />
        </div>
      );
    }
  }

export default CertisTokensComponent;