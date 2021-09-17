import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Container, Row, Col } from 'react-bootstrap';


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


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box class="mx-auto w-75" p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


class Demo extends React.Component {
  componentWillMount() {
    loadFunc.LoadBlockchain();
 }

  state = {
    value : 0,
    isMenuShown : true
  };

  
  render(){
    const handleChange = (event, newValue) => {
      this.setState({value: newValue});
    };
    const toggleMenu = () => {
      if(this.state.isMenuShown)this.setState({ isMenuShown: false })
      else this.setState({ isMenuShown: true })
    };

    return (
      <div style={{backgroundColor: 'White'}}>
        <AppBar position="static">
          <Container>
            <Row>
              <Col class="mx-auto w-25">
                <button class="nav-brand" onClick={toggleMenu}>
                  <img class="img-responsive" src="https://cdn2.iconfinder.com/data/icons/camping-outline-flat-pt-2/100/069_-_snowboard_snowboarding_board_1-128.png"  alt="logo"/>
                </button>
              </Col>
              <Col class="mx-auto w-75">
                <h1>BLOCKCERTS {loadFunc.Network}</h1>
              </Col>
            </Row>
          </Container>  
          {(this.state.isMenuShown) ? (
            <Tabs value={this.state.value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Manager" {...a11yProps(0)} />
              <Tab label="Public" {...a11yProps(1)} />
              <Tab label="Private" {...a11yProps(2)} />
              <Tab label="Provider" {...a11yProps(3)} />
              <Tab label="Price Converter" {...a11yProps(4)} />
              {certFunc.isOwner ? (<Tab label="Treasury" {...a11yProps(5)} />) : null}
              {certFunc.isOwner ? (<Tab label="Certis Tokens" {...a11yProps(6)} />) : null}
            </Tabs>
        ) : null}
        </AppBar>
        <CurrentAddressComponent />
        <br />
        <TabPanel value={this.state.value} index={0}>
          <ManagerComponent />
        </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          <PublicComponent />
        </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          <PrivateComponent />
        </TabPanel>
        <TabPanel value={this.state.value} index={3}>
          <IssuerComponent />
        </TabPanel>
        <TabPanel value={this.state.value} index={4}>
          <PriceConverterComponent />
        </TabPanel>
        {certFunc.isOwner ? (<TabPanel value={this.state.value} index={5}>
          <TreasuryComponent />
        </TabPanel>) : null}
        {certFunc.isOwner ? (<TabPanel value={this.state.value} index={6}>
          <CertisTokensComponent />
        </TabPanel>) : null}
        
      </div>
    );

  };
  
  
}

export default Demo;
