import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/ProviderPoolFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

class ListProvidersPoolsComponent extends React.Component{
    render(){
      var text = "Providers";
      var ProvidersPools = func.publicProviders;

      if(this.props.contractType == 2){
        ProvidersPools = func.privateProviders;
      }
      else if(this.props.contractType == 3){
        text = "Pools";
        ProvidersPools = func.providerPools;
      }

      return(
        <div class="border border-0">
          <h3>{text}</h3>
          <Container style={{margin: '10px 50px 50px 50px' }}>
            {ProvidersPools.map(ProviderPool => (
                <Row>
                    <Col key={ProviderPool[0]}> {Aux.Bytes32ToAddress(ProviderPool[0])}</Col>
                    <Col><i><b>{ProviderPool[1]}</b></i></Col>
                </Row>
                ))}
          </Container>
      </div>
    );
    }
  }

export default ListProvidersPoolsComponent;