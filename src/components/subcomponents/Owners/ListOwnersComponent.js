import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const func = require("../../../functions/OwnerFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");

class ListOwnersComponent extends React.Component{
    render(){
      return(
          <div class="border border-0">
            <h3>Owners</h3>
            <Container style={{margin: '10px 50px 50px 50px' }}>
              {(this.props.contractType == 1) ? 
                      func.publicOwners.map(publicOwner => (
                        <Row key={publicOwner}>{Aux.Bytes32ToAddress(publicOwner)}</Row>
                        )) : 
                (this.props.contractType == 2) ? 
                      func.privateOwners.map(privateOwner => (
                        <Row class="border-0" key={privateOwner}>{Aux.Bytes32ToAddress(privateOwner)}</Row>
                        )) : 
                      func.providerOwners.map(providerOwner => (
                        <Row class="border-0" key={providerOwner}>{Aux.Bytes32ToAddress(providerOwner)}</Row>
                        ))}
                <br />
                 <Row>
                  <Col><b>Min Public Owners :</b></Col>
                  <Col>{(this.props.contractType == 1) ? func.publicMinOwners : 
                        (this.props.contractType == 2) ? func.privateMinOwners : 
                        func.providerMinOwners}</Col>
                </Row>
            </Container>
        </div>
      );
       
    }
    
  }

export default ListOwnersComponent;