import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {connect} from 'react-redux';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import CssBaseline from '@material-ui/core/CssBaseline';

// Action Creators.
import {fetchUser} from '../actions';

// Components.
import Dashboard from './Dashboard/Dashboard';
import Login from './Dashboard/Login';

// Component style.
const styles = (theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
  });

class App extends Component {
  componentDidMount() {
    let token = window.location.search;
    if (token !== '') {
      token = token.replace('?token=', '');
      window.localStorage.setItem('token', token);
      window.history.pushState({}, document.title, '/');
    }
    this.props.fetchUser();
  }

  // Render the navbar depending the auth state.
  authContentRender() {
    const {user, classes} = this.props;

    switch (user) {
      case null:
        return (
          <Fragment>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Fragment>
        );
      case false:
        return (
          <Fragment>
            <Login />
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <Dashboard />
          </Fragment>
        );
    }
  }

  // Render the component.
  render() {
    return (
      <Router>
        <CssBaseline />
        {this.authContentRender()}
      </Router>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {user};
};

// Connect this component to redux and the action creators.
export default connect(mapStateToProps, {fetchUser})(withStyles(styles)(App));
