import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {updateDeviceConfig} from '../../actions';

import ioledLogo from '../../images/logoButton.png';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

import Switch from '@material-ui/core/Switch';

import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

// Component style.
const styles = (theme) =>
  createStyles({
    sliderContainer: {
      textAlign: 'center',
      // backgroundColor: '#323039',
      padding: theme.spacing(1),
      // marginTop: '0px',
      // margin: '10px',
      display: 'flex',
    },
    nameContainer: {
      fontSize: '12px',
      color: '#FFFFFF',
      marginTop: '30px',
    },
    rangeElement: {
      display: 'block',
      color: 'white',
      marginTop: '20px',
      // padding: '10px',
    },
    rangeLabel: {
      // display: 'flex',
      justifyContent: 'space-between',
      color: 'white',
      fontSize: '12px',
    },
    dutyContainer: {
      marginTop: '-10px',
      padding: '0 20px',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
    buttonContainer: {
      textAlign: 'center',
      // backgroundColor: '#323039',
      borderRadius: '12px',
    },
    onSwitch: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '5px',
    },
    
  });

const IoledSwitch = withStyles((theme) => ({
  root: {
    width: 120, //42, 202
    height: 120, //26, 122
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 0,
    color: '#323039', //'#d2edf9',
    '&$checked': {
      transform: 'translateX(0px)', //16px
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
    width: 70, //24, 120, 110
    height: 70, //24
    margin: 25,
    boxShadow: '0px 0px 15px #ccfff1', //#ffff00', //#ccff66',
    backgroundImage:  `url(${ioledLogo})`,
  },
  track: {
    borderRadius: 130 / 2, // 26/2, 130/2
    backgroundColor: '#000', //theme.palette.grey[150],
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
}))(Switch);


const IoledSlider = withStyles({
  root: {
    height: 10, //10,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: 'white', 
    boxShadow: '0px 0px 4px #ccfff1',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  disabled: {
    '&$thumb': {
      backgroundColor: '#323039', 
      marginTop: -8,
      marginLeft: -12,
      height: 20,
      width: 20,
      boxShadow: '0px 0px 6px #ccfff1',
    },
    '& + $track': {
      opacity: 0.1,
    }
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  markLabel: {
    color: 'white',
    fontSize: '14px',
  },
  rail: {
    backgroundImage: 'linear-gradient(90deg, #29ABE2 0%, #00EAA6 100%)',
    height: 5, //8
    borderRadius: 4,
  },
  track: {
    backgroundImage: 'linear-gradient(90deg, #29ABE2 0%, #00EAA6 100%)',
    height: 5, //
    borderRadius: 4,
  },
})(Slider);

class SliderContainer extends Component {
  // Component state.
  state = {
    tempDuty: this.props.duty,
    trans: false,
    state: this.props.state,
    snackOpen: false,
    snackMessage: '',
    alias: this.props.alias,
  };


  // Map device state to configuration readable by the backend.
  stateToConfig = (duty, state, timerOn, timerOff, timerState, alias, deviceID) => {
    return {config: {duty, state, timerOn, timerOff, timerState, alias}, deviceID};
  };

  
  // Modify the state of LED.
  switchOn = async (event) => {
    console.log(event.target.checked);
    this.setState({snackOpen: false});
    this.setState({trans: true});
    const {duty, timerOn, timerOff, timerState, alias, deviceID, index} = this.props;
    const deviceConfig = this.stateToConfig(duty, event.target.checked, timerOn, timerOff, timerState, alias, deviceID);
    await this.props.updateDeviceConfig(deviceConfig, index);
    this.setState({trans: false});
    this.setState({snackOpen: true, snackMessage: 'Actualizado'});
  };

  /* Change the intensity of the led.
   * Triggers on release inside the slider element and clicking the slider.
   */
  sliderOnChangeHandler = (event, value) => {
    if (event.type === 'click') {
      this.setState({tempDuty: parseFloat(value.toFixed(2))}, this.sliderOnReleaseHandler);
    }
    this.setState({tempDuty: parseFloat(value.toFixed(2))});
  };

  sliderOnReleaseHandler = async () => {
    if (this.state.tempDuty !== this.props.duty) {
      this.setState({trans: true});
      this.setState({snackOpen: false});
      const {state, timerOn, timerOff, timerState, deviceID, alias, index} = this.props;
      const deviceConfig = this.stateToConfig(
        this.state.tempDuty,
        state,
        timerOn,
        timerOff,
        timerState,
        alias,
        deviceID,
      );
      await this.props.updateDeviceConfig(deviceConfig, index);
      if (this.state.tempDuty !== this.props.duty) {
        this.setState({tempDuty: this.props.duty});
      }
      this.setState({trans: false});
      this.setState({snackOpen: true, snackMessage: 'Dispositivo actualizado'});
    }
  };

  render() {
    const {classes} = this.props;
    const {state} = this.props;
    const {snackOpen, snackMessage, tempDuty, trans} = this.state;

    const marks = [{
        value: tempDuty,
        label: Math.round(tempDuty*100) + '%',
      }]

    return (
      <Box width="100%">
        <br></br>
        
        <Box width="100%" className={classes.buttonContainer}>
          <div className={classes.onSwitch}>
            <IoledSwitch checked={state} onChange={this.switchOn} value="state" color="primary" />
          </div>
        </Box>

        <Box width="100%" className={classes.sliderContainer}>
          <Box width="10%" className={classes.rangeElement}>
            <div><Typography>0%</Typography></div>
          </Box>
          <Box width="80%" className={classes.rangeElement}>
            <div className={classes.dutyContainer}>
              <IoledSlider
                disabled={!state}
                value={tempDuty}
                min={0}
                max={1}
                step={0.05}
                onChange={this.sliderOnChangeHandler}
                onChangeCommitted={this.sliderOnReleaseHandler}
                marks={marks}
              />
            </div>
          </Box>
          <Box width="10%" className={classes.rangeElement}>
            <div><Typography>100%</Typography></div>
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
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {updateDeviceConfig})(withStyles(styles)(SliderContainer));
