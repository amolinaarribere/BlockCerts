import React from 'react';
import ListEventsComponent from './subcomponents/Event/ListEventsComponent.js';


class EventsComponent extends React.Component {
    state = {
        contractType : 3
    };
    
    render(){
      return (
        <div>
          <ListEventsComponent />
          <br />
        </div>
      );
    }
  }

export default EventsComponent;