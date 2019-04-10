import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logoutWatcher } from '../../store/actionCreators/session';

class Logout extends Component {
  componentDidMount() {
    new Promise((resolve, reject) => {
      this.props.logoutWatcher();
    }).catch(e => {
      console.log(e);
    });
  }
  render() {
    return (
      <div>
      </div>
    );
  }
}

Logout.propTypes = {
  logoutWatcher: PropTypes.func,
};

const mapDispatchToProps = dispatch => bindActionCreators({ logoutWatcher }, dispatch);
export default connect(null, mapDispatchToProps)(Logout);
