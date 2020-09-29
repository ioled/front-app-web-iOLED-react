import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig, changeMenu, changeID} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Switch from '@material-ui/core/Switch';

import TextField from '@material-ui/core/TextField';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

import PowerIcon from '@material-ui/icons/Power';

import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';

// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import FormLabel from '@material-ui/core/FormLabel';

// import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

// Component style.
const styles = (theme) =>
  createStyles({
    timerContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: theme.spacing(1),
      borderRadius: '12px',
    },
    nameContainer: {
      fontSize: '12px',
      color: '#FFFFFF',
      marginTop: '30px',
    },
    hourContainer: {
      marginTop: '10px',
      color: 'white',
      border: '1px solid #323039',
      borderRadius: '5px',
    },
    inputForm: {
      display: 'flex',
    },
    inputFormName: {
      color: 'white',
      margin: '20px 20px',
      display: 'block',
      minWidth: '80px',
      // fontSize: '16px',
    },
    inputFormValue: {
      color: 'white',
      display: 'block',
      fontSize: '20px',
      margin: '14px 0',
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
    powerInput: {
      background: "#323039",
      borderRadius: "3px",
      height: "48px",
      width: "120px",
      color: "white",
      marginLeft:"30px", 
    }
  });


  const TimerSwitch = withStyles((theme) => ({
    root: {
      width: 42, //42, 202
      height: 26, //26, 122
      padding: 0,
      margin: theme.spacing(1),
    },
    switchBase: {
      padding: 0,
      color: '#323039', //'#d2edf9',
      '&$checked': {
        transform: 'translateX(16px)', //16px
        color: theme.palette.common.white,
        textShadow: 'none',
        '& + $track': { 
          backgroundImage: 'linear-gradient(180deg, #29ABE2 0%, #00EAA6 100%)',
          opacity: 0.5,
          border: 'none',
        },
      },
      '&$focusVisible $thumb': {
        // backgroundImage: 'linear-gradient(180deg, #29ABE2 0%, #00EAA6 100%)',
        border: '6px solid #888fff',
      },
    },
    thumb: {
      width: 24, //24, 120, 110
      height: 24, //24
      margin: 1,
      // boxShadow: '0px 0px 15px #ccfff1', //#ffff00', //#ccff66',
    },
    track: {
      borderRadius: 26 / 2, // 26/2, 130/2
      backgroundColor: '#000', //theme.palette.grey[150],
      transition: theme.transitions.create(['background-color', 'border']),
    },
    checked: {},
  }))(Switch);

  // background: linear-gradient(180deg, #29abe2 0%, #00eaa6 100%);
const StyledButton = styled(Button)`
  background: #323039;
  border-radius: 3px;
  padding: 0 30px;
  height: 48px;
  width: 120px;
  color: white;
`;

const TimerDialog = withStyles((theme) => ({
  paper: {
    backgroundColor: '#1A191E',
    color: 'white',
    textAlign: 'center',
    justifyItems: 'center',
    margin: 'auto',
    padding: '20px'
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
      timerDuty,
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

  alphaRender() {
    const {alpha} = this.props;
    const {classes} = this.props;
    if (alpha === true) {
      return (
      <Fragment>
        <Button className={classes.powerInput}
            onClick={() => {
              this.setState({menu: 2});
              this.props.changeMenu(2);
              this.props.changeID(this.props.index);
            }}>
        <PowerIcon />
        </Button>
      </Fragment>
      );
    }
  }

  render() {
    const {classes} = this.props;
    const {timerState} = this.props;

    const {snackOpen, snackMessage, timerOn, timerOff, trans} = this.state;
    const {timerDuty} = this.state;

    return (
      <Box>
        {/* <Typography className={classes.nameContainer}>Ciclo: Encendido/Apagado</Typography> */}
        
        <br></br>
        <br></br>

        <Box width="100%" className={classes.timerContainer}>

          <StyledButton
            onClick={() => {
              this.setState({open: true});
            }}
            type="submit"
          >
            
            Timer
          </StyledButton>
          
          {this.alphaRender()}
          
        </Box>

        <TimerDialog
          open={this.state.open}
          onClose={() => this.setState({open: false})}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Configuración Timer</DialogTitle>

          <TimerSwitch checked={timerState} value="timerState" onChange={this.switchOnTimer} color="secondary" />

          <Box className={classes.hourContainer}>
            <form noValidate className={classes.inputForm}>
              <div className={classes.inputFormName}>Encendido</div>
              <TextField 
                InputProps={{className: classes.inputFormValue}} 
                // autoFocus= 'true'
                // InputLabelProps={{className: classes.timer}} 
                id="timeOn" 
                type="time" 
                value={timerOn} 
                onChange={this.timerOnChange} />
            </form>
          </Box>

          <Box className={classes.hourContainer}>
            <form noValidate className={classes.inputForm}>
              <div className={classes.inputFormName}>Apagado</div>
              <TextField
                InputProps={{className: classes.inputFormValue}}  
                id="timeOff" 
                type="time" 
                value={timerOff} 
                onChange={this.timerOffChange} />
            </form>
          </Box>

          <Box className={classes.hourContainer}>
            <form className={classes.inputForm}>
          
              <div className={classes.inputFormName}>Porcentaje</div>
              {/* <InputLabel className={classes.inputFormName}>Porcentaje</InputLabel> */}
              {/* <div className={classes.inputFormName}>Porcentaje</div> */}
              <Select value={timerDuty} onChange={this.timerDutyChange} className={classes.inputFormValue}>
                <MenuItem value={0}>0 %</MenuItem>
                <MenuItem value={0.1}>10 %</MenuItem>
                <MenuItem value={0.2}>20 %</MenuItem>
                <MenuItem value={0.3}>30 %</MenuItem>
                <MenuItem value={0.4}>40 %</MenuItem>
                <MenuItem value={0.5}>50 %</MenuItem>
                <MenuItem value={0.6}>60 %</MenuItem>
                <MenuItem value={0.7}>70 %</MenuItem>
                <MenuItem value={0.8}>80 %</MenuItem>
                <MenuItem value={0.9}>90 %</MenuItem>
                <MenuItem value={1}>100 %</MenuItem>
              </Select>
            </form>
          </Box>
          <br></br>
          <br></br>

          <DialogActions>
            <Button
              style={{
                color: 'white',
              }}
              onClick={() => this.setState({open: false})}
            >
              Cancelar
            </Button>
            <StyledButton onClick={this.updateTimerConfig}>Confirmar</StyledButton>
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

export default connect(mapStateToProps, {updateDeviceConfig, changeMenu, changeID})(withStyles(styles)(TimerContainer));
