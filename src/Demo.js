import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';


import PublicComponent from './components/PublicComponent.js';
import PrivateComponent from './components/PrivateComponent.js';
import CertisTokensComponent from './components/CertisTokensComponent.js';
import IssuerComponent from './components/IssuerComponent.js';
import TreasuryComponent from './components/TreasuryComponent.js';
import ManagerComponent from './components/ManagerComponent.js';
import PriceConverterComponent from './components/PriceConverterComponent.js';
import CurrentAddressComponent from './components/CurrentAddressComponent.js';


const certFunc = require("./functions/CertisFunctions.js");
const loadFunc = require("./functions/LoadFunctions.js");



class Demo extends React.Component {
  componentWillMount() {
    loadFunc.LoadBlockchain();
 }

  state = {
    value : 0,
    Component : "Home"
  };

  toggleMenu(newValue){
    this.setState({Component: newValue});
  };

  renderSwitch() {
    window.alert("hello")
    switch(this.state.Component) {
      case "Manager":
        return <ManagerComponent />;
      case "Public":
        return <PublicComponent />;
    }
  }

  
  render(){
    return (
      <div style={{backgroundColor: 'White'}}>

        <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand onClick={() => this.toggleMenu("Home")}>Blockcerts <i>({loadFunc.Network})</i></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => this.toggleMenu("Manager")}>Manager</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu("Public")}>Public</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu("Private")}>Private</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu("Provider")}>Provider</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu("PriceConverter")}>Price Converter</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu("Treasury")}>Treasury</Nav.Link>
                {certFunc.isOwner ? (<Nav.Link onClick={() => this.toggleMenu("CertisToken")}>Certis Token</Nav.Link>) : null}
              </Nav>
            </Container>
        </Navbar>
        <br />
        <CurrentAddressComponent />
        <div class="mx-auto w-75">
          {(() => {
              switch (this.state.Component) {
                case 'Manager':
                    return (
                      <ManagerComponent />
                    )
                case 'Public':
                    return (
                      <PublicComponent />
                    )
                case 'Private':
                    return (
                        <PrivateComponent />
                      )
                case 'Provider':
                    return (
                      <IssuerComponent />
                    )
                case 'PriceConverter':
                    return (
                      <PriceConverterComponent />
                    )
                case 'Treasury':
                    return (
                      <TreasuryComponent />
                    )
                case 'CertisToken':
                    return (
                      <CertisTokensComponent />
                    )
                default:
                    return (
                      <div>You are a User.</div>
                    )
              }
          })()}
        </div>
        
      </div>
    );

  };
  
  
}

export default Demo;
