import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Switch from '@material-ui/core/Switch';

import Typography from '@material-ui/core/Typography';

import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

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
      marginTop: '10px',
      backgroundColor: '#474453',
      color: 'white',
    },
    arrowIcon: {
      marginTop: '10px',
    },
    timer: {
      color: 'white',
    },
    timerDialog: {
      textAlign: 'center',
      backgroundColor: 'red',
    },
    transitionBox: {
      marginTop: '20px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
  });

const StyledButton = styled(Button)`
  background: linear-gradient(180deg, #29abe2 0%, #00eaa6 100%);
  border-radius: 3px;
  padding: 0 30px;
  height: 48px;
  width: 120px;
`;

const TimerDialog = withStyles((theme) => ({
  paper: {
    backgroundColor: '#1A191E',
    color: 'white',
    textAlign: 'center',
    justifyItems: 'center',
  },
}))(Dialog);

class TimerContainer extends Component {
  // Component state.
  state = {
    snackMessage: '',
    trans: false,
    timerState: this.props.timerState,
    timerOn: this.props.timerOn,
    timerOff: this.props.timerOff,
    open: false,
    onTime: this.props.onTime,
    timerDuty: this.props.timerDuty,
    rampState: this.props.rampState,
  };

  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, timerDuty, onTime, rampState, deviceID) => {
    return {config: {duty, state, timerOn, timerOff, timerState, timerDuty, onTime, rampState}, deviceID};
  };

  // Modify the state of timer state to on to off.
  switchOnTimer = async (event) => {
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, state, timerOn, timerOff, deviceID, index} = this.props;
    const {timerDuty, onTime, rampState} = this.state;
    const deviceConfig = this.stateToConfig(
      duty,
      state,
      timerOn,
      timerOff,
      event.target.checked,
      timerDuty / 100,
      parseInt(onTime),
      rampState,
      deviceID,
    );
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Timer activado'});
  };

  timerOnChange = async (event) => {
    this.setState({timerOn: event.target.value});
  };

  timerOffChange = async (event) => {
    this.setState({timerOff: event.target.value});
  };

  timerDutyChange = async (event) => {
    this.setState({timerDuty: event.target.value});
  };

  onTimeChange = async (event) => {
    if (event.target.value === 0) {
      this.setState({rampState: false});
      this.setState({onTime: 0});
    } else {
      this.setState({rampState: true});
      this.setState({onTime: parseInt(event.target.value)});
    }
  };

  updateTimerConfig = async (event) => {
    this.setState({trans: true});
    this.setState({open: false});
    const {duty, state, timerState, deviceID, index} = this.props;
    const {timerOn, timerOff, timerDuty, onTime, rampState} = this.state;
    const deviceConfig = this.stateToConfig(
      duty,
      state,
      timerOn,
      timerOff,
      timerState,
      timerDuty,
      parseInt(onTime),
      rampState,
      deviceID,
    );
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Timer configurado'});
  };

  render() {
    const {classes} = this.props;
    const {timerState} = this.props;

    const {snackOpen, snackMessage, timerOn, timerOff, trans} = this.state;
    const {timerDuty, onTime} = this.state;
    return (
      <Box>
        <Typography className={classes.nameContainer}>Ciclo: Encendido/Apagado</Typography>
        <Box width="100%" className={classes.timerContainer} borderRadius={12}>
          <Switch checked={timerState} value="timerState" onChange={this.switchOnTimer} color="secondary" />

          <StyledButton
            onClick={() => {
              this.setState({open: true});
            }}
            type="submit"
          >
            Configurar
          </StyledButton>
        </Box>

        <TimerDialog
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Configuración Timer</DialogTitle>

          <Box className={classes.hourContainer} borderRadius={12}>
            <div className={classes.timer}>
              <form noValidate>
                <TextField id="timeOn" label="Encendido" type="time" value={timerOn} onChange={this.timerOnChange} />
              </form>
            </div>
          </Box>

          <Box className={classes.hourContainer} borderRadius={12}>
            <div className={classes.timer}>
              <form noValidate>
                <TextField id="timeOff" label="Apagado" type="time" value={timerOff} onChange={this.timerOffChange} />
              </form>
            </div>
          </Box>

          <FormControl className={classes.hourContainer}>
            <InputLabel>Porcentaje</InputLabel>
            <Select value={timerDuty} onChange={this.timerDutyChange}>
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={0.1}>10</MenuItem>
              <MenuItem value={0.2}>20</MenuItem>
              <MenuItem value={0.3}>30</MenuItem>
              <MenuItem value={0.4}>40</MenuItem>
              <MenuItem value={0.5}>50</MenuItem>
              <MenuItem value={0.6}>60</MenuItem>
              <MenuItem value={0.7}>70</MenuItem>
              <MenuItem value={0.8}>80</MenuItem>
              <MenuItem value={0.9}>90</MenuItem>
              <MenuItem value={1}>100</MenuItem>
            </Select>
          </FormControl>

          <Box className={classes.transitionBox}>
            <FormControl>
              <FormLabel
                component="legend"
                style={{
                  color: 'white',
                }}
              >
                Tiempo de encendido
              </FormLabel>
              <RadioGroup  value={onTime} onChange={this.onTimeChange}>
                <FormControlLabel value={1} control={<Radio />} label="1 min" />
                <FormControlLabel value={5} control={<Radio />} label="5 min" />
                <FormControlLabel value={10} control={<Radio />} label="10 min" />
                <FormControlLabel value={0} control={<Radio />} label="(No habilitar)" />
              </RadioGroup>
            </FormControl>
          </Box>

          <DialogActions>
            <StyledButton onClick={this.updateTimerConfig}>Editar</StyledButton>
            <Button
              style={{
                color: 'white',
              }}
              onClick={() => this.setState({open: false})}
            >
              Cancelar
            </Button>
          </DialogActions>
        </TimerDialog>

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
