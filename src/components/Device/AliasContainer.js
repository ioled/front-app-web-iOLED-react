import React, {Component} from 'react';
import {connect} from 'react-redux';

import DeviceMenu from './DeviceMenu';

// Action creators.
import {updateDeviceConfig} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';

import {Box} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import WifiIcon from '@material-ui/icons/Wifi';
import WifiOffIcon from '@material-ui/icons/WifiOff';

// Component style.
const styles = (theme) =>
  createStyles({
    aliasContainer: {
      padding: '3px', //  theme.spacing(1),
      backgroundColor: '#323039',
      marginTop: '10px',
      borderRadius: '12px'
    },
    firstline: {
      display: 'flex',
    },
    alias: {
      color: 'white',
      fontSize: '14px',
      display: 'flex',
      backgroundColor: '#1A191E',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '10px',
    },
    menu: {
      marginLeft: '90px',
    },
    name: {
      textAlign: 'center',
      fontSize: '14px',
    },
    onSwitch: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5px',
    },
    weekContainer: {
      textAlign: 'center',
      backgroundColor: '#1A191E',
      color: 'white',
      marginTop: '5px',
      display: 'flex',
      fontSize: '12px',
    },
    triangleIcon: {
      marginTop: '0px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
    online: {
      fontSize: '14px',
      color: '#00EAA6',
      textAlign: 'center'
    },
    offline: {
      fontSize: '14px',
      color: 'white', // '#afacb9',
      textAlign: 'center',
      opacity: '0.4'
    }
  });

class AliasContainer extends Component {
  // Component state.
  state = {
    state: this.props.state,
    snackOpen: false,
    snackMessage: '',
    trans: false,
    alias: this.props.alias,
    online: this.props.online,
  };

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceID) => {
    return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceID};
  };

  changeAlias = (alias) => {
    this.setState({
      alias: alias,
    });
  };

  // Render the component.
  render() {
    const {classes} = this.props;
    const {state} = this.props;

    const {snackOpen, snackMessage, alias, trans, online} = this.state;

    return (
      
      <Box className={classes.aliasContainer} width="100%">
        <div className={classes.firstline}>
          <Box className={classes.alias} width="100%">
            <Box width="70%" className={classes.name}>
              <Typography>{alias.toUpperCase()}</Typography>
            </Box>
            <Box width="10%">
              <DeviceMenu deviceID={this.props.deviceID} action={this.changeAlias} />
            </Box>
            <Box width="20%" className={online? classes.online: classes.offline}>
              {online?<WifiIcon/>:<WifiOffIcon/>}
            </Box> 
          </Box>
          
        </div>

        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
          onClose={() => {
            this.setState({snackOpen: false});
          }}
          open={snackOpen}
          autoHideDuration={2000}
        >
          <SnackbarContent
            style={{
              backgroundColor: '#00EAA6',
              color: 'white',
            }}
            message={snackMessage}
          />
        </Snackbar>

        <Backdrop className={classes.backdrop} open={trans}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {updateDeviceConfig})(withStyles(styles)(AliasContainer));
