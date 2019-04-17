
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { logoutWatcher } from '../store/actionCreators/session';

class AppRoot extends Component {
  logout = () => {
    new Promise((resolve, reject) => {
      this.props.logoutWatcher(resolve, reject);
    }).catch(e => {
      console.log(e);
    });
  }
  render() {
    const accessToken = localStorage.getItem('accessToken');
    
    if(accessToken) {
      return (
        <Fragment>
          <NavBar logout={this.logout}/>
          <Footer />
        </Fragment>
      );
    } 
    return (
      <div>You have to login first.</div>
    );
  }
}

const mapStateToProps = ({ session }) => ({
  session,
});

const mapDispatchToProps = dispatch => bindActionCreators({ logoutWatcher }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);

