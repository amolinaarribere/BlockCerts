import React from 'react';
const func = require("../functions/AuxiliaryFunctions.js");
const Loadfunc = require("../functions/LoadFunctions.js");

class CurrentAddressComponent extends React.Component{

  connectToBlockchain = async (event) => {
    event.preventDefault();
    await Loadfunc.LoadBlockchain();    
  };

    render(){
      return(
        <div>
          {(Loadfunc.connected) ? <h6 class="text-white">Your Address : {func.account}</h6>
          : <button type="button"  class="btn btn-secondary" onClick={this.connectToBlockchain}>Connect</button>}
        </div>
      );
    }
  }

export default CurrentAddressComponent;