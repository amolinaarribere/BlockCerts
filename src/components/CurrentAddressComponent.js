import React from 'react';
const func = require("../functions/AuxiliaryFunctions.js");

class CurrentAddressComponent extends React.Component{
    render(){
      return(
        <div>
          <h2 class="text-primary">Current Address : {func.account}</h2>
          <br />
        </div>
      );
    }
  }

export default CurrentAddressComponent;