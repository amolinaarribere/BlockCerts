import React from 'react';
import ListEventsComponent from './subcomponents/Event/ListEventsComponent.js';


class EventsComponent extends React.Component {
    state = {
        contractType : 3
    };

    constructor(props) {
      super(props)
      this.refresh = this.refresh.bind(this)
    }
    
    refresh() {
      this.setState({})
    }
    
    render(){
      return (
        <div>
          <ListEventsComponent refresh={this.refresh}/>
          <br />
        </div>
      );
    }
  }

export default EventsComponent;