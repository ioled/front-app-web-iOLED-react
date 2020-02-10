import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';

const styles = makeStyles((theme) => ({
  paydate: {
    backgroundColor: '#00EAA6',
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    height: '2.5em',
    borderRadius: '0% 0% 12px 12px',
  },
  p: {
    // fontSize: '14px',
    marginTop: '4px',
    textAlign: 'center',
    fontWeight: 'ligthter',
  },
}));

function PayDate() {
  const classes = styles();

  return (
    <Box className={classes.paydate}>
      <p className={classes.p}>Su pago vence hoy 8 de enero</p>
    </Box>
  );
}

export default withStyles(styles)(PayDate);
