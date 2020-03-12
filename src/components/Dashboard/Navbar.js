//@ts-nocheck
import React, {Component} from 'react';
import {connect} from 'react-redux';
import ioledLogo from '../../images/logo.png';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';

import CreditCardIcon from '@material-ui/icons/CreditCard';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import styled from 'styled-components';

// Material-ui component styles.
const styles = (theme) =>
  createStyles({
    root: {
      position: 'relative',
    },
    appbar: {
      backgroundColor: '#1A191E',
      display: 'grid',
    },
    logo: {
      width: '51px',
      margin: '-10px',
    },
    avatar: {
      margin: '0 10px',
    },
    circular: {
      color: '#00EAA6',
    },
    drawer: {
      height: '100%',
      color: 'white',
      backgroundColor: '#1A191E',
    },
    user: {
      margin: '0 20px',
      marginTop: '20px',
    },
    drawerup: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(0),
    },
    drawercard: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(3),
    },
    plan: {
      marginLeft: '10px',
    },
    drawerdown: {
      display: 'grid',
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing(3),
    },
    ioledDashboard: {
      display: 'grid',
      color: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: '10vh',
    },
    ioledTittle: {
      fontSize: '16px',
      marginTop: '10px',
      fontWeight: 'bold',
      marginLeft: '13px',
    },
    dashboard: {
      fontSize: '14px',
      marginTop: '-5px',
      fontWeight: 'ligthter',
    },
  });

const StyledDivider = styled(Divider)`
  background: linear-gradient(180deg, #323039 100%, #323039 100%);
`;

class Navbar extends Component {
  // Component state.
  state = {
    rigth: false,
  };

  capitalize = (str) => {
    if (typeof str !== 'string') return '';
    str = str.split(' ');

    for (var i = 0, x = str.length; i < x; i++) {
      str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(' ');
  };

  toggleDrawer = (open) => (event) => {
    this.setState({rigth: open});
  };

  sideList = () => {
    const {classes, user} = this.props;

    return (
      <div
        className={classes.drawer}
        role="presentation"
        onClick={this.toggleDrawer(false)}
        onKeyDown={this.toggleDrawer(false)}
      >
        <Box className={classes.drawerup}>
          <Box width="20%">
            <Avatar className={classes.avatar} alt={user.name} src={user.photo} onClick={this.toggleDrawer(true)} />
          </Box>
          <Box width="80%" className={classes.user}>
            <b>{this.capitalize(this.props.user.name + ' ' + this.props.user.lastName)}</b>
            <p>{this.props.user.email}</p>
          </Box>
        </Box>
        <StyledDivider />

        <Box className={classes.drawercard}>
          <CreditCardIcon color="secondary" />
          <p className={classes.plan}>Plan</p>
        </Box>
        <StyledDivider />

        <Box className={classes.drawerdown}>
          <p>Términos y Condiciones</p>
          <Button
            href="/"
            onClick={() => {
              localStorage.clear();
            }}
            variant="contained"
            color="primary"
          >
            Logout
          </Button>
        </Box>

        <StyledDivider />
      </div>
    );
  };

  // Render the component.
  render() {
    const {classes, user} = this.props;
    const {rigth} = this.state;

    return (
      <div className={classes.root}>
        <AppBar className={classes.appbar} position="static">
          <Toolbar>
            <a href={'/'} style={{flexGrow: 1}}>
              <img className={classes.logo} src={ioledLogo} alt="ioled" />
            </a>

            <Box className={classes.ioledDashboard}>
              <b className={classes.ioledTittle}> iOLED</b>
              <p className={classes.dashboard}>DASHBOARD</p>
            </Box>

            <Avatar className={classes.avatar} alt={user.name} src={user.photo} onClick={this.toggleDrawer(true)} />
          </Toolbar>
        </AppBar>

        <Drawer anchor="right" open={rigth} onClose={this.toggleDrawer(false)}>
          {this.sideList()}
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {user};
};

export default connect(mapStateToProps)(withStyles(styles)(Navbar));
