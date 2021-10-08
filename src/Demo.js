import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import HomeComponent from './components/HomeComponent.js';
import PublicComponent from './components/PublicComponent.js';
import PrivateComponent from './components/PrivateComponent.js';
import CertisTokensComponent from './components/CertisTokensComponent.js';
import IssuerComponent from './components/IssuerComponent.js';
import TreasuryComponent from './components/TreasuryComponent.js';
import ManagerComponent from './components/ManagerComponent.js';
import PriceConverterComponent from './components/PriceConverterComponent.js';
import CurrentAddressComponent from './components/CurrentAddressComponent.js';
import EventsComponent from './components/EventsComponent.js';
import LoadingComponent from './components/subcomponents/LoadingComponent.js';


const certFunc = require("./functions/CertisFunctions.js");
const loadFunc = require("./functions/LoadFunctions.js");

const Home = "Home";
const Manager = "Manager";
const Public = "Public";
const Private = "Private";
const Provider = "Provider";
const PriceConverter = "Price Converter";
const Treasury = "Treasury";
const CertisToken = "Certis Token";
const Event = "Events";



class Demo extends React.Component {
  async componentWillMount() {
    this.state.loading = true;
    await loadFunc.LoadBlockchain();
    this.state.loading = false;
    this.refresh();
 }

  state = {
    value : 0,
    loading : false,
    Component : "Home"
  };

  refresh(){
    this.setState({});
  }

  toggleMenu(newValue){
    this.setState({Component: newValue});
  };

  
  render(){
    return (
      <div style={{backgroundColor: 'White'}}>
        <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand onClick={() => this.toggleMenu(Home)}>Blockcerts <i>({loadFunc.Network})</i></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => this.toggleMenu(Manager)}>{Manager}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Public)}>{Public}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Private)}>{Private}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Provider)}>{Provider}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(PriceConverter)}>{PriceConverter}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Treasury)}>{Treasury}</Nav.Link>
                {certFunc.isOwner ? (<Nav.Link onClick={() => this.toggleMenu(CertisToken)}>{CertisToken}</Nav.Link>) : null}
                <Nav.Link onClick={() => this.toggleMenu(Event)}>{Event}</Nav.Link>
              </Nav>
              <CurrentAddressComponent />
            </Container>
        </Navbar>
        <br />
        <div class="mx-auto w-75">
          {(() => {
              switch (this.state.Component) {
                case Manager:
                    return (
                      ((false == this.state.loading) ? <ManagerComponent /> : <LoadingComponent />)
                    )
                case Public:
                    return (
                      ((false == this.state.loading) ? <PublicComponent /> : <LoadingComponent />)
                    )
                case Private:
                    return (
                      ((false == this.state.loading) ? <PrivateComponent /> : <LoadingComponent />)
                    )
                case Provider:
                    return (
                      ((false == this.state.loading) ? <IssuerComponent /> : <LoadingComponent />)
                    )
                case PriceConverter:
                    return (
                      ((false == this.state.loading) ? <PriceConverterComponent /> : <LoadingComponent />)
                    )
                case Treasury:
                    return (
                      ((false == this.state.loading) ? <TreasuryComponent /> : <LoadingComponent />)
                    )
                case CertisToken:
                    return (
                      ((false == this.state.loading) ? <CertisTokensComponent /> : <LoadingComponent />)
                    )
                case Event:
                    return (
                      ((false == this.state.loading) ? <EventsComponent /> : <LoadingComponent />)
                    )
                default:
                    return (
                      <HomeComponent />
                    )
              }
          })()}
      </div>
        
      </div>
    );

  };
  
  
}

export default Demo;
