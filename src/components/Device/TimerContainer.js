import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

// Component style.
const styles = (theme) =>
  createStyles({
    timerContainer: {
      textAlign: 'center',
      backgroundColor: '#323039',
      padding: theme.spacing(1),
      marginTop: '0px',
      display: 'flex',
    },
    nameContainer: {
      fontSize: '12px',
      color: '#FFFFFF',
      marginTop: '30px',
    },
    hourContainer: {
      backgroundColor: '#474453',
      color: 'white',
    },
    arrowIcon: {
      marginTop: '10px',
    },
    timer: {
      color: 'white',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
  });

class TimerContainer extends Component {
  // Component state.
  state = {
    snackMessage: '',
    trans: false,
    timerState: true,
    timerOn: this.props.timerOn,
    timerOff: this.props.timerOff,
  };

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceId) => {
    return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceId};
  };

  // Modify the state of timer state to on to off.
  switchOnTimer = async (event) => {
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, timerOn, timerOff, deviceId, alias, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, timerOn, timerOff, event.target.checked, alias, deviceId);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
  };

  timerOnChange = async (event) => {
    this.setState({timerOn: event.target.value});
  };

  timerOnRelease = async (event) => {
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, timerOff, timerState, deviceId, alias, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, this.state.timerOn, timerOff, timerState, alias, deviceId);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
  };

  timerOffChange = async (event) => {
    this.setState({timerOff: event.target.value});
  };

  timerOffRelease = async (event) => {
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, timerOn, timerState, deviceId, alias, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, state, timerOn, this.state.timerOff, timerState, alias, deviceId);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Timer actualizado'});
  };

  render() {
    const {classes} = this.props;
    const {timerState} = this.props;

    const {snackOpen, snackMessage, timerOn, timerOff, trans} = this.state;

    return (
      <Box>
        <Typography className={classes.nameContainer}>Ciclo: Encendido/Apagado</Typography>
        <Box width="100%" className={classes.timerContainer} borderRadius={12}>
          <Box width="45%" className={classes.hourContainer} borderRadius={12}>
            <div className={classes.timer}>
              <form noValidate>
                <TextField
                  id="timeOn"
                  label="Encendido"
                  type="time"
                  value={timerOn}
                  onChange={this.timerOnChange}
                  onBlur={this.timerOnRelease}
                />
              </form>
            </div>
          </Box>
          <ArrowRightIcon className={classes.arrowIcon} color="secondary" />
          <Box width="45%" className={classes.hourContainer} borderRadius={12}>
            <div className={classes.timer}>
              <form noValidate>
                <TextField
                  id="timeOff"
                  label="Apagado"
                  type="time"
                  value={timerOff}
                  onChange={this.timerOffChange}
                  onBlur={this.timerOffRelease}
                />
              </form>
            </div>
          </Box>
          <Switch checked={timerState} value="state" onChange={this.switchOnTimer} color="primary" />
        </Box>

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

export default connect(mapStateToProps, {updateDeviceConfig})(withStyles(styles)(TimerContainer));
