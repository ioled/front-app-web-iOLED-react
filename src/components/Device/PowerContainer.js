import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ToysIcon from '@material-ui/icons/Toys';
import AllInclusiveIcon from '@material-ui/icons/AllInclusive';

// Component style.
const styles = (theme) =>
  createStyles({
    grid: {
      marginTop: '2em',
      color: 'white',
      fontSize: '16px', //'1em',
      textAlign: 'center',
    },
    box: {
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
      color: 'white',
    }
  });

class PowerContainer extends Component {


  render() {

    // Get the styles classes from props.
    const {classes} = this.props;
    
    return (
      <Grid container justify="center">
        <Typography className={classes.grid}>Dispositivos</Typography>
        
        <Box className={classes.box}><EmojiObjectsIcon></EmojiObjectsIcon>Plug 1 <Switch /></Box>
        <Box className={classes.box}><ToysIcon></ToysIcon>Plug 2 <Switch /></Box>
        <Box className={classes.box}><AcUnitIcon></AcUnitIcon>Plug 3 <Switch /></Box>
        <Box className={classes.box}><AllInclusiveIcon></AllInclusiveIcon>Plug 4 <Switch /></Box>

      </Grid>
    );
  }
}


export default withStyles(styles)(PowerContainer);
