import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { bindActionCreators } from 'redux';
import { Button,
  TextField,
} from '@material-ui/core';

import { loginWatcher } from '../../store/actionCreators/session';

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    flexDirection: 'column',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  submitButton: {
    margin: theme.spacing.unit,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: 3 * theme.spacing.unit,
    width: 200,
  },
});

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {
      email: '',
      password: ''
    },
    isSubmitting: false
  };

  validate = () => {
    let { email, password } = this.state;

    return new Promise((resolve, reject) => {
      let errors = {};

      if (!email) errors.email = 'Please enter your email address';
      if (!password) errors.password = 'Please enter your password';

      let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (email && !emailRegex.test(email)) errors.email = 'Please enter a valid email address';
      if (password && password.length < 8) errors.password = 'Password must be greater that or equalt to 8 characters';
      if (Object.keys(errors).length > 0) {
        reject(errors);
      } else {
        resolve();
      }
    });
  };

  onSubmit = event => {
    event.preventDefault();
    const payload = {
      username: this.state.email,
      password: this.state.password,
      grant_type: "password",
    }
    // this.validate()
    //   .then(() => {
        this.setState({
          errors: {},
          isSubmitting: true
        });
        new Promise((resolve, reject) => {
          this.props.loginWatcher(payload, resolve, reject);
        }).catch(e => {
          alert('Login failed, please try again');
          this.setState({
            isSubmitting: false
          });
        });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.row}>
          <TextField
            id="filled-email-input"
            label="Email"
            className={classes.textField}
            type="email"
            name="email"
            autoComplete="email"
            margin="normal"
            variant="filled"
            onChange={this.handleChange('email')}
          />
          <TextField
            id="filled-password-input"
            label="Password"
            className={classes.textField}
            type="password"
            autoComplete="current-password"
            margin="normal"
            variant="filled"
            name="password"
            onChange={this.handleChange('password')}
          />
        </div>
        <Button variant="contained" className={classes.submitButton} color="primary" onClick={this.onSubmit}>Submit</Button>
      </div>
    );
  }
}

Login.propTypes = {
  loginWatcher: PropTypes.func,
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => bindActionCreators({ loginWatcher }, dispatch);
export default connect(null, mapDispatchToProps)(withStyles(styles)(Login));
