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
      let success = await EventsFunc.StartEvents(this.state.block);
      if(true == success)this.setState({ EventsActivated: true,  blockChecked: this.state.block});
      else this.setState({ EventsActivated: false,  blockChecked: 0});
    }

    render(){
      return (
        <div>
          <h3>Events</h3> 
          <Form onSubmit={this.handleStartEvents} style={{margin: '50px 50px 50px 50px' }}>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control type="number" min="0" name="Block" placeholder="block for events"
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
            SCName="Manager"
            ContractId={EventsFunc.certificatePoolManagerId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Public Pool"
            ContractId={EventsFunc.publicPoolId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Private Pool Factory"
            ContractId={EventsFunc.privatePoolFactoryId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Provider Factory"
            ContractId={EventsFunc.providerFactoryId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Treasury"
            ContractId={EventsFunc.TreasuryId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Certis Token"
            ContractId={EventsFunc.CertisTokenId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Price Converter"
            ContractId={EventsFunc.PriceConverterId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="Proposition"
            ContractId={EventsFunc.PropositionSettingsId}
            />
          <ListBaseEventsComponentTemplate 
            SCName="ENS"
            ContractId={EventsFunc.ENSId}
            />
          {(Contracts.privatePool == "")?
            <div></div> :
            <ListBaseEventsComponentTemplate 
              SCName={"Private Pool " + Contracts.privatePool._address}
              ContractId={EventsFunc.privatePoolId}
            />
          }
          {(Contracts.provider == "")?
            <div></div> :
            <ListBaseEventsComponentTemplate 
              SCName={"Provider " + Contracts.provider._address}
              ContractId={EventsFunc.providerId}
            />
          }
          

        </div>
      );
    }
  }
  
export default ListEventsComponent;