import React from 'react';
import {makeStyles} from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';

import ioledLogo from '../../../images/logo.png';
import {Box} from '@material-ui/core';

import {withStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  appbar: {
    backgroundColor: '#1A191E',
    display: 'grid',
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
  avatar: {
    margin: '0 10px',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = styles();

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
          <Avatar className={classes.avatar} />
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Navbar);
