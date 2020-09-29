import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {fetchDevices, changeID} from '../../actions';

// material-ui components.
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {Box} from '@material-ui/core';
import {Button} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

// Icons
import greenCircle from './icons/green-circle.png';
import grayCircle from './icons/gray-circle.png';

// import plusSymbol from './icons/plus-symbol.png';

// Component style.
const styles = (theme) => ({
  grid: {
    marginTop: 20,
    margin: `0 ${theme.spacing(0)}px`,
  },
  deviceListTitle: {
    marginTop: '2em',
    color: 'white',
    fontSize: '16px', //'1em',
    textAlign: 'center',
  },
  deviceBoxEnabled: {
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
  },
  deviceBoxDisabled: {
    marginBottom: '1em',
    backgroundColor: '#323039',
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
  },
  leftSubBox: {
    paddingLeft: '1em',
    width: '50%',
    textAlign: 'left',
    color: 'white',
  },
  rightSubBox: {
    background: '#1A191E',
    width: '45%',
    height: '2em',
    textAlign: 'center',
    borderRadius: '5px', // '12px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingLeft: '1em',
  },
  flexSpanEnabled: {
    color: '#00EAA6',
  },
  flexSpanDisabled: {
    color: '#AAAAAA',
  },
  deviceButton: {
    background: 'red',
    height: '3px',
    width: '3px',
    borderRadius: '5px', // '12px',
  },
  addDevice: {
    border: '2px solid #474453',
    background: 'transparent',
    width: '80%',
    height: '3em',
    borderRadius: '5px', //'12px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '3px',
  },
});

class DeviceList extends Component {
  // Get the list of devices on component mount.
  componentDidMount() {
    this.props.fetchDevices();
  }

  // Map every device in the list to a button component.
  renderComponentList = () => {
    const {devices, classes} = this.props;

    return devices.map((device, key) => {
      if (device.online === true) {
        return (
          <Button
            key={device.deviceID}
            index={key}
            className={classes.deviceBoxEnabled}
            onClick={() => {
              this.setState({id: key});
              this.props.changeID(key);
            }}
          >
            <Box className={classes.leftSubBox}>{device.alias}</Box>
            <Box className={classes.rightSubBox}>
              <span className={classes.flexSpanEnabled}>{device.duty * 100}%</span>
              <span className={classes.flexSpanEnabled}>|</span>
              <span className={classes.flexSpanEnabled}> {device.duty * device.power * device.state}W </span>
              <img src={greenCircle} height="30px" width="30px" alt="green-circle" />
            </Box>
          </Button>
        );
      } else {
        return (
          <Button
            key={device.deviceID}
            index={key}
            className={classes.deviceBoxEnabled}
            onClick={() => {
              this.setState({id: key});
              this.props.changeID(key);
            }}
          >
            <Box className={classes.leftSubBox}>{device.alias}</Box>
            <Box className={classes.rightSubBox}>
              <span className={classes.flexSpanDisabled}>{ Math.round(device.duty * 100) }%</span>
              <span className={classes.flexSpanDisabled}>|</span>
              <span className={classes.flexSpanDisabled}> {device.duty * device.power * device.state}W </span>
              <img src={grayCircle} height="18px" width="18px" alt="gray-circle" />
            </Box>
          </Button>
        );
      }
    });
  };

  // Render the component.
  render() {
    const {classes} = this.props;
    return (
      <Grid container justify="center">
        <Typography className={classes.deviceListTitle}>Mis Equipos</Typography>

        <Grid spacing={10} alignItems="center" justify="center" container className={classes.grid}>
          {this.renderComponentList()}
          {/* <Box className={classes.addDevice}>
            <img src={plusSymbol} height="30px" width="30px" alt="plus-symbol" />
          </Box> */}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({devices}) => {
  return {devices};
};

export default connect(mapStateToProps, {fetchDevices, changeID})(withStyles(styles)(DeviceList));
