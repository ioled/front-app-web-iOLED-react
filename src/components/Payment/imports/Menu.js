import React, {Component} from 'react';

import {withStyles, createStyles} from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import BarChartIcon from '@material-ui/icons/BarChart';
import CameraIcon from '@material-ui/icons/Camera';

import SvgIcon from '@material-ui/core/SvgIcon';

import {ReactComponent as HomeIcon} from '../../../images/HomeSVG.svg';

const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: '#222128',
      width: '100%',
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute', //Here is the trick
      bottom: 0, //Here is the trick
    },
  });

class Menu extends Component {
  render() {
    const {classes} = this.props;

    return (
      <BottomNavigation onChange={this.menuChange} className={classes.root}>
        <BottomNavigationAction icon={<BarChartIcon color="secondary" />} />
        <BottomNavigationAction icon={<SvgIcon component={HomeIcon} viewBox="0 0 39 38" />} />
        <BottomNavigationAction icon={<CameraIcon color="secondary" />} />
      </BottomNavigation>
    );
  }
}

export default withStyles(styles)(Menu);
