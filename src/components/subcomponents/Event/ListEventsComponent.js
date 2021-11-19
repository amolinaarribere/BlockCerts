import React from 'react';
import ListBaseEventsComponentTemplate from './ListBaseEventsComponentTemplate.js';

const EventsFunc = require("../../../functions/EventsFunctions.js");

class ListEventsComponent extends React.Component {
    state = {
     EventsActivated: false
    };

    handleStopEvents = async (event) => {
      event.preventDefault();
      await EventsFunc.StopEvents();
      this.setState({ EventsActivated: false });
    }

    handleStartEvents = async (event) => {
      event.preventDefault();
      await EventsFunc.StartEvents();
      this.setState({ EventsActivated: true });
    }

    render(){
      return (
        <div>
          <h3>Events</h3> 
          <button
                disabled={this.state.EventsActivated}
                className="btn btn-lg btn-secondary center modal-button"
                onClick={this.handleStartEvents}>Start Events</button> &nbsp;&nbsp;
          <button
                disabled={! this.state.EventsActivated}
                className="btn btn-lg btn-secondary center modal-button"
                onClick={this.handleStopEvents}>Stop Events</button>
          <br/>
          <br/>
          <br/>
          <ListBaseEventsComponentTemplate 
            SCName="Admin"
            ContractId={0}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Manager"
            ContractId={1}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Public Pool"
            ContractId={2}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Private Pool Factory"
            ContractId={3}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Provider Factory"
            ContractId={4}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Treasury"
            ContractId={5}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Certis Token"
            ContractId={6}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Price Converter"
            ContractId={7}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Proposition"
            ContractId={8}
            />
          <ListBaseEventsComponentTemplate 
            SCName="ENS"
            ContractId={9}
            />
        </div>
      );
    }
  }
  
export default ListEventsComponent;