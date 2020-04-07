import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

// Action creators.
import {changeAlias} from '../../actions';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

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
const options = ['Editar'];

class DeviceMenu extends Component {
  // The DOM element used to set the position of the menu.
  state = {
    anchorEl: null,
    open: false,
    alias: '',
  };

  // Menu button open handler.
  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget});
  };

  // Menu button close handler.
  handleClose = () => {
    this.setState({anchorEl: null});
  };

  updateHandler = () => {
    this.props.changeAlias(this.props.deviceID, this.state.alias);
    this.setState({open: false});
    this.setState({anchorEl: null});
    this.props.action(this.state.alias);
  };

  // Render the menu items.
  renderMenuItems() {
    const {classes} = this.props;
    return options.map((option) => {
      if (option === 'Editar') {
        return (
          <MenuItem
            key={option}
            onClick={() => {
              this.setState({open: true});
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

        <Dialog open={this.state.open} onClose={() => this.setState({open: false})} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edita el nombre de tu equipo iOLED</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              type="string"
              onChange={(text) => this.setState({alias: text.target.value})}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.setState({open: false})}>Cancelar</Button>
            <Button onClick={this.updateHandler}>Editar</Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

export default connect(null, {changeAlias})(withStyles(styles)(DeviceMenu));
