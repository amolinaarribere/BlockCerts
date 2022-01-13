import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';

import HomeComponent from './components/HomeComponent.js';
import PublicComponent from './components/PublicComponent.js';
import PrivateComponent from './components/PrivateComponent.js';
import IssuerComponent from './components/IssuerComponent.js';
import DividendsComponent from './components/DividendsComponent.js';
import SettingsComponent from './components/SettingsComponent.js';
import CurrentAddressComponent from './components/CurrentAddressComponent.js';
import ConnectDisconnectComponent from './components/ConnectDisconnectComponent.js';
import EventsComponent from './components/EventsComponent.js';
import LoadingComponent from './components/subcomponents/LoadingComponent.js';


const certFunc = require("./functions/CertisFunctions.js");
const loadFunc = require("./functions/LoadFunctions.js");
const BrowserStorageFunctions = require("./functions/BrowserStorageFunctions.js");


const Home = "Home";
const Settings = "Settings";
const Public = "Public";
const Private = "Private";
const Provider = "Provider";
const Dividends = "Dividends";
const Event = "Events";



class Demo extends React.Component {
  async componentWillMount() {
    let currentTab = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.currentTabKey);
    if(currentTab){
      this.state.Component = currentTab
    }
    
    this.state.loading = true;
    await loadFunc.LoadBlockchain();

    let account = BrowserStorageFunctions.ReadKey(BrowserStorageFunctions.accountConnectedKey);
    if(account){
      await loadFunc.ConnectNewAccount(account)
    }

    this.state.loading = false;
    this.refresh = this.refresh.bind(this)
    this.refresh();
 }

  state = {
    value : 0,
    loading : false,
    Component : "",
    address : ""
  };

  refresh(){
    this.setState({});
  }

  toggleMenu(newValue){
    BrowserStorageFunctions.WriteKey(BrowserStorageFunctions.currentTabKey, newValue);
    this.setState({Component: newValue});
  };

  
  render(){
    return (
      <div style={{backgroundColor: 'White'}}>
        <Navbar bg="dark" variant="dark" class="w-75">
            <Container>
              <Navbar.Brand onClick={() => this.toggleMenu(Home)}>Blockcerts <i>({loadFunc.Network})</i></Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link onClick={() => this.toggleMenu(Settings)}>{Settings}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Public)}>{Public}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Private)}>{Private}</Nav.Link>
                <Nav.Link onClick={() => this.toggleMenu(Provider)}>{Provider}</Nav.Link>
                {certFunc.isOwner ? (<Nav.Link onClick={() => this.toggleMenu(Dividends)}>{Dividends}</Nav.Link>) : null}
                <Nav.Link onClick={() => this.toggleMenu(Event)}>{Event}</Nav.Link>
              </Nav>
              {
                  (false == this.state.loading) ? <CurrentAddressComponent /> : <LoadingComponent />
              }&nbsp;&nbsp;
              {
                  (false == this.state.loading) ? <ConnectDisconnectComponent refresh={this.refresh} /> : <LoadingComponent />
              }
            </Container>
        </Navbar>
        <br />
        <div class="mx-auto w-75">
          {(() => {
              switch (this.state.Component) {
                case Settings:
                    return (
                      ((false == this.state.loading) ? <SettingsComponent /> : <LoadingComponent />)
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
                case Dividends:
                    return (
                      ((false == this.state.loading) ? <DividendsComponent /> : <LoadingComponent />)
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
