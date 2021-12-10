import React from 'react';
import ListBaseEventsComponentTemplate from './ListBaseEventsComponentTemplate.js';
import { Form } from 'react-bootstrap';


const EventsFunc = require("../../../functions/EventsFunctions.js");
const Contracts = require("../../../functions/Contracts.js");

class ListEventsComponent extends React.Component {
  async componentWillMount() {
    await this.refresh();
  }

  async refresh() {
    this.setState({block : this.props.block})
  }

    state = {
      block: this.props.block,
      blockChecked: 0,
      EventsActivated: false
    };

    handleStopEvents = async (event) => {
      event.preventDefault();
      await EventsFunc.StopEvents();
      this.setState({ EventsActivated: false });
    }

    handleStartEvents = async (event) => {
      event.preventDefault();
      await EventsFunc.StartEvents(this.state.block);
      this.setState({ EventsActivated: true,  blockChecked: this.state.block});
    }

    render(){
      return (
        <div>
          <h3>Events</h3> 
          <Form onSubmit={this.handleStartEvents} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="integer" name="Block" placeholder="block for events"
                    onChange={event => this.setState({ block: event.target.value })}/>
            </Form.Group>
              <button
                  type="submit"
                  disabled={this.state.EventsActivated}
                  className="btn btn-lg btn-secondary center modal-button">Start Events</button> &nbsp;&nbsp;
              <button
                  type="button"
                  disabled={! this.state.EventsActivated}
                  className="btn btn-lg btn-secondary center modal-button"
                  onClick={this.handleStopEvents}>Stop Events</button>
            </Form>

            {(this.state.EventsActivated)?(
              <div>
                <b>Block <i>{this.state.blockChecked}</i></b>
              </div>
            )
            :null}
          
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
          {(Contracts.privatePool == "")?
            <div></div> :
            <ListBaseEventsComponentTemplate 
              SCName={"Private Provider " + Contracts.privatePool._address}
              ContractId={10}
            />
          }
          {(Contracts.provider == "")?
            <div></div> :
            <ListBaseEventsComponentTemplate 
              SCName={"Provider " + Contracts.provider._address}
              ContractId={11}
            />
          }
          

        </div>
      );
    }
  }
  
export default ListEventsComponent;