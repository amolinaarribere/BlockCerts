import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/ProviderPoolFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

class ListProvidersPoolsComponent extends React.Component{
    render(){
      var text = (this.props.contractType == 3)? "Pools" : "Providers";
      var ProvidersPools = func.Items;

      return(
        <div class="border border-0">
          <h3>{text}</h3>
          <Container style={{margin: '10px 50px 50px 50px' }}>
            {ProvidersPools.map(ProviderPool => (
                <Row>
                    <Col key={ProviderPool[0]}> {ProviderPool[0]} <i>({ProviderPool[1]})</i></Col>
                    <Col><i><b>{ProviderPool[3]}</b></i></Col>
                </Row>
                ))}
          </Container>
      </div>
    );
    }
  }

export default ListProvidersPoolsComponent;