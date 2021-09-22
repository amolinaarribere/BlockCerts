import React from 'react';
import ListPublicEventsComponent from './ListPublicEventsComponent.js';
import ListManagerEventsComponent from './ListManagerEventsComponent.js';

const EventsFunc = require("../../../functions/EventsFunctions.js");
const Aux = require("../../../functions/AuxiliaryFunctions.js");
const ManagerFunc = require("../../../functions/ManagerFunctions.js");


class ListEventsComponent extends React.Component {
    state = {
     isPublicEventsShown: false,
     PublicEventBlock : 0,
     listingPublicEvents: false,
     PublicEvents: []
    };

    

    togglePublicEvents = () => {
      if(this.state.isPublicEventsShown)this.setState({ isPublicEventsShown: false })
      else this.setState({ isPublicEventsShown: true })
    };


    handlePublicEvents = async (event) => {
      event.preventDefault();
      if(!this.state.listingPublicEvents){
        await EventsFunc.GetPublicEvents(this.state.PublicEventBlock);
        this.setState({ listingPublicEvents: true });
      }
      this.setState({ PublicEvents: EventsFunc.eventlogs[EventsFunc.PublicId] });
    }

    handleStopEvents = async (event) => {
      event.preventDefault();
      this.setState({ listingPublicEvents: false })
      await EventsFunc.StopEvents();
    }

    render(){
      return (
        <div>
          <h3>Events</h3>
          <br/>
          <ListPublicEventsComponent />
          <ListManagerEventsComponent />
        </div>
      );
    }
  }
  
export default ListEventsComponent;