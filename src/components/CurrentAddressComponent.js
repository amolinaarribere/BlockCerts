import React from 'react';

const func = require("../functions/AuxiliaryFunctions.js");

class CurrentAddressComponent extends React.Component{


    render(){
      return(
        <div>
          <h6 class="text-white">Your Address : {func.accountResolved}</h6>
        </div>
      );
    }
  }

export default CurrentAddressComponent;