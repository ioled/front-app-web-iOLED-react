import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
// Action creators.
import {deleteDevice} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// Component style.
const styles = (theme) =>
  createStyles({
    moreButton: {
      marginRight: '-16px',
    },
    menu: {
      maxHeight: 200 * 4.5,
      width: 200,
    },
    item: {
      fontSize: '12px',
    },
  });

// Menu items.
// const options = ['editar','Eliminar'];
const options = ['Eliminar'];

class DeviceMenu extends Component {
  // The DOM element used to set the position of the menu.

  state = {
    anchorEl: null,
  };

  // Menu button open handler.
  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget});
  };

  // Menu button close handler.
  handleClose = () => {
    this.setState({anchorEl: null});
  };

  // Render the menu items.
  renderMenuItems() {
    const {classes, deviceId} = this.props;
    return options.map((option) => {
      if (option === 'Eliminar') {
        return (
          <MenuItem
            key={option}
            onClick={() => {
              this.props.deleteDevice({deviceId});
            }}
            className={classes.item}
          >
            {option}
          </MenuItem>
        );
      } else {
        return (
          <MenuItem key={option} onClick={this.handleClose} className={classes.item}>
            {option}
          </MenuItem>
        );
      }
    });
  }

  // Render the component.
  render() {
    const {classes} = this.props;
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);

    return (
      <Fragment>
        <IconButton className={classes.moreButton} onClick={this.handleClick}>
          <MoreVertIcon color="secondary" />
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={this.handleClose} className={classes.menu}>
          {this.renderMenuItems()}
        </Menu>
      </Fragment>
    );
  }
}

export default connect(null, {deleteDevice})(withStyles(styles)(DeviceMenu));
