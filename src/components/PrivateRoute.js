import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { push } from 'react-router-redux';


import store from '../store';

/**
 * Component to authenticate routes.
 */
class PrivateRoute extends Component {
  state = {
    isLoggedIn: false
  };

  setLogin(bool) {
    this.setState({ isLoggedIn: bool });
  }

  componentDidMount() {
    if (!localStorage.getItem('accessToken')) {
      this.setLogin(false);
      store.dispatch(push('/login'));
    } else {
      this.setLogin(true);
    }
  }

  render() {
    let { isLoggedIn } = this.state;

    return isLoggedIn ? <Route {...this.props} /> : null;
  }
}

export default PrivateRoute;