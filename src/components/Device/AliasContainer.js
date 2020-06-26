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

// Component style.
const styles = (theme) =>
  createStyles({
    aliasContainer: {
      padding: theme.spacing(1),
      backgroundColor: '#323039',
      marginTop: '10px',
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
  });

const IoledSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundImage: 'linear-gradient(180deg, #29ABE2 0%, #00EAA6 100%)',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      backgroundImage: 'linear-gradient(180deg, #29ABE2 0%, #00EAA6 100%)',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
}))(Switch);

class AliasContainer extends Component {
  // Component state.
  state = {
    state: this.props.state,
    snackOpen: false,
    snackMessage: '',
    trans: false,
    alias: this.props.alias,
  };

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceID) => {
    return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceID};
  };

  // Modify the state of LED.
  switchOn = async (event) => {
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, timerOn, timerOff, timerState, alias, deviceID, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, event.target.checked, timerOn, timerOff, timerState, alias, deviceID);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
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

    const {snackOpen, snackMessage, alias, trans} = this.state;

    return (
      <Box className={classes.aliasContainer} borderRadius={12} width="100%">
        <div className={classes.firstline}>
          <Box className={classes.alias} borderRadius={5} width="90%">
            <Box width="80%" className={classes.name}>
              <Typography>{alias.toUpperCase()}</Typography>
            </Box>
            <Box width="20%">
              <DeviceMenu deviceID={this.props.deviceID} action={this.changeAlias} />
            </Box>
          </Box>

          <div className={classes.onSwitch}>
            <IoledSwitch checked={state} onChange={this.switchOn} value="state" color="primary" />
          </div>
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
