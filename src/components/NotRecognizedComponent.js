import React from 'react';

class NotRecognizedComponent extends React.Component {
  
    render(){
      return (
        <div>
          <h6>
           BlockCerts Smart contracts are not deployed on the currently selected network, please switch to either Rinkeby, Ropsten, Kovan or Mumbai.
          </h6>
        </div>
      );
    }
  }

  export default NotRecognizedComponent;

