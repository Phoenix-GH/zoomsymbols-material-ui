import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { getUserProfileWatcher, logoutWatcher } from '../store/actionCreators/session';

class AppRoot extends Component {
  componentDidMount() {
    this.props.getUserProfileWatcher();
  }

  logout = () => {
    this.props.logoutWatcher();
  }

  render() {
    const { session } = this.props;
    console.log('session----', session);
    if(session.user) {
      return (
        <Fragment>
          <NavBar />
          <Footer />
        </Fragment>
      );
    } 
    return (
      <div>You have to login first.</div>
    );
  }
}

AppRoot.propTypes = {
  session: PropTypes.object,
  getUserProfileWatcher: PropTypes.func,
  logoutWatcher: PropTypes.func
};

const mapStateToProps = ({ session }) => ({
  session
});

const mapDispatchToProps = dispatch => bindActionCreators({ getUserProfileWatcher, logoutWatcher }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
