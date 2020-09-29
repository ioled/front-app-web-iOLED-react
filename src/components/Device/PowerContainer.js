import React, {Component} from 'react';
import {connect} from 'react-redux';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ToysIcon from '@material-ui/icons/Toys';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

// Action creators.
import {updateDeviceConfig} from '../../actions';

// Component style.
const styles = (theme) =>
  createStyles({
    grid: {
      marginTop: '2em',
      color: 'white',
      fontSize: '16px', //'1em',
      textAlign: 'center',
    },
    box: {
      marginBottom: '1em',
      backgroundColor: '#474453',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
      paddingTop: '0.5em',
      paddingBottom: '0.5em',
      borderRadius: '10px', //'18px',
      display: 'flex',
      fontSize: '1.1em',
      width: '80%',
      height: '3em',
      justifyContent: 'space-around',
      alignItems: 'center',
      color: 'white',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
  });

class PowerContainer extends Component {
    // Component state.
    state = {
      snackMessage: '',
      gpio1: this.props.gpio1,
      gpio2: this.props.gpio2,
      gpio3: this.props.gpio3,
      gpio4: this.props.gpio4,
      trans: false,
      open: false,
    };

    // Map device state to configuration readable by the backend.
    stateToConfig = (duty, state, gpio1, gpio2, gpio3, gpio4, timerOn, timerOff, timerState, alias, deviceID) => {
      return {config: {duty, state, gpio1, gpio2, gpio3, gpio4, timerOn, timerOff, timerState, alias}, deviceID};
    };

  // Modify the state of GPIO 1.
  switchGPIO1 = async (event) => {
    console.log(event.target.checked);
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, gpio2, gpio3, gpio4, timerOn, timerOff, timerState, alias, deviceID, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, event.target.checked, gpio2, gpio3, gpio4, timerOn, timerOff, timerState, alias, deviceID);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
  };

  // Modify the state of GPIO 2.
  switchGPIO2 = async (event) => {
    console.log(event.target.checked);
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, gpio1, gpio3, gpio4, timerOn, timerOff, timerState, alias, deviceID, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, gpio1, event.target.checked, gpio3, gpio4, timerOn, timerOff, timerState, alias, deviceID);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
  };

  // Modify the state of GPIO 3.
  switchGPIO3 = async (event) => {
    console.log(event.target.checked);
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, gpio1, gpio2, gpio4, timerOn, timerOff, timerState, alias, deviceID, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, gpio1, gpio2, event.target.checked, gpio4, timerOn, timerOff, timerState, alias, deviceID);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
  };

  // Modify the state of GPIO 4.
  switchGPIO4 = async (event) => {
    console.log(event.target.checked);
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, gpio1, gpio2, gpio3, timerOn, timerOff, timerState, alias, deviceID, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, gpio1, gpio2, gpio3, event.target.checked, timerOn, timerOff, timerState, alias, deviceID);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
  };

  render() {

    // Get the styles classes from props.
    const {classes} = this.props;
    const {gpio1, gpio2, gpio3, gpio4} = this.props;
    const {snackOpen, snackMessage, trans} = this.state;

    
    return (
      <Grid container justify="center">
        <Typography className={classes.grid}>Dispositivos</Typography>
        
        <Box className={classes.box}><EmojiObjectsIcon></EmojiObjectsIcon>Plug 1 <Switch checked={gpio1} onChange={this.switchGPIO1} value="gpio1"/></Box>
        <Box className={classes.box}><ToysIcon></ToysIcon>Plug 2 <Switch checked={gpio2} onChange={this.switchGPIO2} value="gpio2"/></Box>
        <Box className={classes.box}><AcUnitIcon></AcUnitIcon>Plug 3 <Switch checked={gpio3} onChange={this.switchGPIO3} value="gpio3"/></Box>
        <Box className={classes.box}><AllInclusiveIcon></AllInclusiveIcon>Plug 4 <Switch checked={gpio4} onChange={this.switchGPIO4} value="gpio4"/></Box>

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
      </Grid>

      
    );
  }
}


const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {updateDeviceConfig})(withStyles(styles)(PowerContainer));
