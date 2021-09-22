import React from 'react';
import { Container} from 'react-bootstrap';
import Public from '../diagram/Public.PNG';
import Private from '../diagram/Private.PNG';
import Provider from '../diagram/Provider.PNG';
import Dividends from '../diagram/Owner2.PNG';
import Voting from '../diagram/Owner1.PNG';


class ManagerComponent extends React.Component {

  state = {
    isPublicShown: false,
    isPrivateShown: false,
    isProviderShown: false,
    isDividendsShown: false,
    isVotingShown: false
  };

  togglePublic = () => {
    if(this.state.isPublicShown)this.setState({ isPublicShown: false })
    else this.setState({ isPublicShown: true })
  };
  togglePrivate = () => {
    if(this.state.isPrivateShown)this.setState({ isPrivateShown: false })
    else this.setState({ isPrivateShown: true })
  };
  toggleProvider = () => {
    if(this.state.isProviderShown)this.setState({ isProviderShown: false })
    else this.setState({ isProviderShown: true })
  };
  toggleDividends = () => {
    if(this.state.isDividendsShown)this.setState({ isDividendsShown: false })
    else this.setState({ isDividendsShown: true })
  };
  toggleVoting = () => {
    if(this.state.isVotingShown)this.setState({ isVotingShown: false })
    else this.setState({ isVotingShown: true })
  };
  
    render(){
      return (
        <div>
          <h6>
          <span style={{ color: 'blue' }}><b>BlockCerts</b></span> is an application for delivering and checking certificates on the blockchain.
            <br />
            <br />
            Validated <span style={{ color: 'blue' }}><b>providers</b></span> are allowed to deliver certificates (PDF files for example) to the blockchain, more precisely to a <span style={{ color: 'blue' }}><b>Certificate Pool (Public or Private)</b></span> and assign them to a particular account, called the <span style={{ color: 'blue' }}><b>holder</b></span>.
            <br />
            <i>Certificates are never published to the blockchain, only the hash (keccak256) of the document is sent to the blockchain.</i>
            <br />
            <i>Published Certificates can never be removed from the Certificate Pool.</i>
            <br />
            Once certificates are deployed anyone having the certificate document (PDF file) can check whether or not it was issued by a provider and assigned to a particular holder.
            <br />
            <br />
            A set of predefined public <span style={{ color: 'blue' }}><b>owners</b></span> are in charge of adding and removing providers from the Public Certificate Pool. They can also add and remove other owners.
            <br />
            Every management operation performed by the owners requires a minimum number of signatures.
            <br />
            <br />
            <span style={{ color: 'blue' }}><b>Private Certificate Pools</b></span> can be created by anyone, providing the set of owner accounts that would be in charge of managing the pool, in the same way the predefined public owners manage the Public Certificate Pool.
            <br />
            <br />
            <span style={{ color: 'blue' }}><b>Providers</b></span> can be created by anyone too, providing them a multi signature smart contract that is able to communicate directly with the Public and Private Certificate Pools they subscribe to. 
            <br />
            Providers are not required to send certificates to the Certificate Pools but the multi signature feature offers extra security compared to using a simple account.
            <br />
            <br />
            Any change to the application logic must be validated by a majority of <span style={{ color: 'blue' }}><b>Certis Token</b></span> owners. 
            <br />
            <i>In fact anyone owning more than a pre-defined number of tokens can propose modification to the application logic.</i>
            <br />
            Certis Token Owners will receive a dividend for every payment received by the application.
            <br />
            In order to retreive his/her dividends a Certis Token owner must first assign them and then withdraw them himself/herself.
            <br />
            <br />
            <span style={{ color: 'blue' }}><b>Paid Application services</b></span> are :
            <ul>
              <li>Becoming a validated Provider in the Public Certificate Pool (<i>paid by the account making the request</i>)</li>
              <li>Delivering a certificate to the Public Certificate Pool (<i>paid by the provider issuing the certificate</i>)</li>
              <li>Creating a private certificate Pool (<i>paid by the account requesting the Private Pool. Once the Private Pool is created all certificate publications are free.</i>)</li>
              <li>Creating a multisig provider (<i>paid by the account requesting the multisig Provider. Not required to become a Pool provider but recommended.</i>)</li>
            </ul>
            <br />
            <span style={{ color: 'blue' }}><b>Free Application services</b></span> are :
            <ul>
              <li>Checking a Certificate validity against any Certificate Pool (Public or Private)</li>
              <li>Listing the Certificates hashes assigned to a particular holder in any Certificate Pool </li>
            </ul>
            <br />
            Application services prices are defined in USD, the actual amount being paid in ETH, the exchange rate is calculated for every transaction using the <span style={{ color: 'blue' }}><b>Chain Link (ETH-USD) Feed Registry</b></span>.
            <br />
            Prices and the Chain Link registry itself can be changed at any time if the proposition is validated by the Certis Token owners.
            <br />
            <br />
            <br />
          </h6>

          <button
            className="btn btn-lg btn-secondary center modal-button"
            onClick={this.togglePublic}>Public Certificate Pool</button>

          {(this.state.isPublicShown) ? (
             <div class="border border-secondary border-5">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                <img src={Public}/>
              </Container>
              </div>
            )
              :null}
          
          <br />
          <br />
          <br />

          <button
            className="btn btn-lg btn-secondary center modal-button"
            onClick={this.togglePrivate}>Private Certificate Pool</button>

          {(this.state.isPrivateShown) ? (
             <div class="border border-secondary border-5">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                <img src={Private}/>
              </Container>
              </div>
            )
              :null}

          <br />
          <br />
          <br />

          <button
            className="btn btn-lg btn-secondary center modal-button"
            onClick={this.toggleProvider}>Provider</button>

          {(this.state.isProviderShown) ? (
             <div class="border border-secondary border-5">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                <img src={Provider}/>
              </Container>
              </div>
            )
              :null}

          <br />
          <br />
          <br />

          <button
            className="btn btn-lg btn-secondary center modal-button"
            onClick={this.toggleDividends}>Dividends</button>

          {(this.state.isDividendsShown) ? (
             <div class="border border-secondary border-5">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                <img src={Dividends}/>
              </Container>
              </div>
            )
              :null}

          <br />
          <br />
          <br />

          <button
            className="btn btn-lg btn-secondary center modal-button"
            onClick={this.toggleVoting}>Voting</button>

          {(this.state.isVotingShown) ? (
             <div class="border border-secondary border-5">
              <Container style={{margin: '10px 50px 50px 50px' }}>
                <img src={Voting}/>
              </Container>
              </div>
            )
              :null}

          <br />
          <br />
          <br />

        </div>
      );
    }
  }

  export default ManagerComponent;

