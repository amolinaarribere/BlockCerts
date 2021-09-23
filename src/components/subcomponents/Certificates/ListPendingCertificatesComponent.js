import React from 'react';
import { Container, Row } from 'react-bootstrap';

const func = require("../../../functions/CertificateFunctions.js");

class ListPendingCertificatesComponent extends React.Component{
  state = {
    isPendingCertificatesShown: false
  };

  togglePendingCertificates = () => {
    if(this.state.isPendingCertificatesShown)this.setState({ isPendingCertificatesShown: false })
    else this.setState({ isPendingCertificatesShown: true })
  };

  render(){
      return(
        <div>
          <button
              className="btn btn-lg btn-warning center modal-button"
              onClick={this.togglePendingCertificates}>Check Pending Certificates</button>

           {this.state.isPendingCertificatesShown ? (
                  <div class="border border-warning border-5">
                    <br />
                    <Container style={{margin: '10px 50px 50px 50px' }}>
                        {func.pendingCertificates.map(pendingCertificate => (
                        <Row key={pendingCertificate[0] + pendingCertificate[1] + pendingCertificate[2]}>pool : {pendingCertificate[0]}- holder : {pendingCertificate[1]}- certificate : {pendingCertificate[2]}</Row>
                        ))}
                    </Container>
                  </div>) : null}
        </div>
      );
    }
  }

export default ListPendingCertificatesComponent;