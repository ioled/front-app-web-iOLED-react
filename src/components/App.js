import React, { Component, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { withStyles, createStyles } from "@material-ui/core/styles";

// Action Creators.
import { fetchUser } from "../actions";

// Components.
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Dashboard/Login";
import Payment from "./Payment/Payment";

import CssBaseline from "@material-ui/core/CssBaseline";

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

// Component style.
const styles = theme =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: "#00EAA6"
    }
  });

class App extends Component {
  /* This call fetch user on component first mount.
   * It is better location than componentWillMount,
   * since the last is called multiple times.
   */
  componentDidMount() {
    this.props.fetchUser();
  }

  // Render the navbar depending the auth state.
  authContentRender() {
    const { user, classes } = this.props;

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
      <BrowserRouter>
        <Fragment>
          <CssBaseline />
          {this.authContentRender()}
        </Fragment>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return { user };
};

// Connect this component to redux and the action creators.
export default connect(mapStateToProps, { fetchUser })(withStyles(styles)(App));
