import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {getDeviceState, changeMenu, changeID} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';

import SvgIcon from '@material-ui/core/SvgIcon';

import {ReactComponent as HumIcon} from '../../images/CloudSVG.svg';
import {ReactComponent as TempIcon} from '../../images/TempSVG.svg';
import {ReactComponent as ThunderIcon} from '../../images/ThunderSVG.svg';

// Component style.
const styles = (theme) =>
  createStyles({
    stateContainer: {
      textAlign: 'center',
      backgroundColor: '#1A191E',
      marginTop: '0px',
      display: 'flex',
    },
    nameContainer: {
      fontSize: '12px',
      color: '#FFFFFF',
      marginTop: '30px',
    },
    powerContainer: {
      backgroundColor: '#323039',
    },
    tempContainer: {
      backgroundColor: '#323039',
      marginRight: '5px',
      marginLeft: '5px',
      width: '33%',
      borderRadius: '12px',
      display: 'block',
      textTransform: 'none',
    },
    humContainer: {
      backgroundColor: '#323039',
      width: '33%',
      borderRadius: '12px',
      display: 'block',
      textTransform: 'none',
    },
    stateIcon: {
      marginTop: '11px',
    },
    state: {
      color: 'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    stateNumber: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    stateUnity: {
      fontSize: '14px',
    },
    stateText: {
      color: 'white',
      fontSize: '11px',
    },
    boxState: {
      marginBottom: '4px',
    },
  });

const defaultProps = {
  borderColor: '#00EAA6',
};

class StateContainer extends Component {
  // Component state.
  state = {
    menu: 0,
  };

  componentDidMount() {
    const {deviceID, index} = this.props;
    this.props.getDeviceState({deviceID}, index, true);
  }

  render() {
    const {classes} = this.props;
    const {temp = 0, hum = 0} = this.props;
    const {state, duty, power} = this.props;

    return (
      <Box>
        {/* <Typography className={classes.nameContainer}>Estados</Typography> */}
        <br></br>
        <br></br>
        <Box width="100%" className={classes.stateContainer}>
          <Box width="33%" className={classes.powerContainer} borderRadius={12} border={0} {...defaultProps}>
            <SvgIcon component={ThunderIcon} viewBox="0 0 11 23" className={classes.stateIcon} />            
            <div className={classes.state}>
              <Typography className={classes.stateNumber} variant="h6">
                {(duty * power).toFixed() * state}
              </Typography>
              <Typography className={classes.stateUnity}> W</Typography>
            </div>
            <Box className={classes.boxState} borderRadius={12} width="100%">
              <Typography className={classes.stateText}>Al {(duty * 100).toFixed()} %</Typography>
            </Box>
          </Box>

          <Button
            className={classes.tempContainer}
            onClick={() => {
              this.setState({menu: 1});
              this.props.changeMenu(1);
              this.props.changeID(this.props.index);
            }}
          >
            <SvgIcon component={TempIcon} viewBox="0 0 14 33" className={classes.stateIcon} />

            <div className={classes.state}>
              <Typography className={classes.stateNumber} fontWeight="fontWeightBold">
                {temp.toFixed(1)}
              </Typography>
              <Typography className={classes.stateUnity}> ºC</Typography>
            </div>
            <Typography className={classes.stateText}>Temperatura</Typography>
          </Button>

          <Button
            className={classes.tempContainer}
            onClick={() => {
              this.setState({menu: 1});
              this.props.changeMenu(1);
              this.props.changeID(this.props.index);
            }}
          >
            <SvgIcon component={HumIcon} viewBox="0 0 41 28" className={classes.stateIcon} />

            <div className={classes.state}>
              <Typography className={classes.stateNumber}> {hum.toFixed(1)}</Typography>
              <Typography className={classes.stateUnity}> %</Typography>
            </div>
            <Typography className={classes.stateText}>Humedad</Typography>
          </Button>
        </Box>
      </Box>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, {getDeviceState, changeMenu, changeID})(withStyles(styles)(StateContainer));
