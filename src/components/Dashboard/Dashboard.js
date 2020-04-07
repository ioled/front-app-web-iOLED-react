import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

// material-ui components.
import {withStyles} from '@material-ui/core/styles';

// React components.
import Navbar from './Navbar';
import DeviceList from './DeviceList';
import Device from '../Device/Device';
import PlotContainer from '../Device/PlotContainer';
import SimpleBottomNavigation from './SimpleBottom';

// Dashboard component styles.
const styles = (theme) => ({
  root: {
    backgroundColor: '#1A191E',
    height: '100vh',
  },
});

class DashBoard extends Component {
  // Render the navbar depending the auth state.
  deviceRender() {
    const {id = null} = this.props.ux;
    const {menu = 0} = this.props.ux;

    switch (id) {
      case null:
        return (
          <Fragment>
            <Navbar />
            <DeviceList />
            <SimpleBottomNavigation index={0} />
          </Fragment>
        );
      default:
        return <Fragment></Fragment>;
      case id:
        if (menu === 0) {
          return (
            <Fragment>
              <Navbar />
              <Device index={id} />
              <SimpleBottomNavigation index={0} />
            </Fragment>
          );
        }
        if (menu === 1) {
          return (
            <Fragment>
              <Navbar />
              <PlotContainer index={id} />
              <SimpleBottomNavigation index={0} />
            </Fragment>
          );
        }
    }
  }

  render() {
    // Get the styles classes from props.
    const {classes} = this.props;

    return <div className={classes.root}>{this.deviceRender()}</div>;
  }
}

const mapStateToProps = ({ux}) => {
  return {ux};
};

export default connect(mapStateToProps)(withStyles(styles)(DashBoard));
