import React from 'react';
import ListPublicEventsComponent from './ListPublicEventsComponent.js';
import ListManagerEventsComponent from './ListManagerEventsComponent.js';

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
          <ListPublicEventsComponent />
          <ListManagerEventsComponent />
        </div>
      );
    }
  }
  
export default ListEventsComponent;