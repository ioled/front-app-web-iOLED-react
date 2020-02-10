import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const styles = makeStyles((theme) => ({
  subscribedplans: {
    marginTop: '3em',
  },
  subscribedtitle: {
    color: 'white',
    fontSize: '1em',
    textAlign: 'center',
  },
  subscribedbox: {
    backgroundColor: '#323039',
    marginLeft: '1.1em',
    marginRight: '1.1em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    borderRadius: '18px',
    display: 'flex',
    fontSize: '0.9em',
  },
  subbox1: {
    width: '50%',
    textAlign: 'left',
    paddingLeft: '1.2em',
    color: 'white',
  },
  subbox2: {
    width: '50%',
    textAlign: 'right',
    paddingRight: '1.2em',
    color: 'white',
  },
  priceplan: {
    color: '#2ca35c',
  },
}));

function SubscribedPlans() {
  const classes = styles();

  return (
    <div className={classes.subscribedplans}>
      <Typography className={classes.subscribedtitle}>Planes Suscritos</Typography>
      <Box className={classes.subscribedbox}>
        <Box className={classes.subbox1}>Leasing equipo 80x80</Box>
        <Box className={classes.subbox2}>
          <span className={classes.priceplan}>$36.990</span> al mes
        </Box>
      </Box>
    </div>
  );
}

export default withStyles(styles)(SubscribedPlans);
