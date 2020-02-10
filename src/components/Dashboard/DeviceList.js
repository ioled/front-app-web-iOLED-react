import React, {Component} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {fetchDevices} from '../../actions';

// material-ui components.
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// React componenets.
import Device from '../Device/Device';

// Component style.
const styles = (theme) => ({
  grid: {
    marginTop: 20,
    margin: `0 ${theme.spacing(0)}px`,
  },
});

class DeviceList extends Component {
  // Get the list of devices on component mount.
  componentDidMount() {
    this.props.fetchDevices();
  }

  // Map every device in the list to a Device component.
  renderComponentList = () => {
    const {devices} = this.props;
    return devices.map((device, key) => {
      return <Device key={device.deviceId} index={key} />;
    });
  };

  // Render the component.
  render() {
    const {classes} = this.props;
    return (
      <Grid container justify="center">
        <Grid spacing={10} alignItems="center" justify="center" container className={classes.grid}>
          {this.renderComponentList()}
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({devices}) => {
  return {devices};
};

export default connect(mapStateToProps, {fetchDevices})(withStyles(styles)(DeviceList));
