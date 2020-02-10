import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';
import {Box} from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

const styles = makeStyles((theme) => ({
  paymentbill: {
    marginTop: '2em',
  },

  billtitle: {
    color: 'white',
    fontSize: '1em',
    textAlign: 'center',
  },

  containerbox: {
    backgroundColor: '#323039',
    marginLeft: '1.1em',
    marginRight: '1.1em',
    paddingTop: '0.5em',
    paddingBottom: '0.5em',
    borderRadius: '18px',
    fontSize: '0.9em',
    color: 'white',
  },
  datebox: {
    backgroundColor: '#1a191e',
    marginLeft: '1.1em',
    marginRight: '1.1em',
    paddingTop: '0.3em',
    paddingBottom: '0.3em',
    borderRadius: '18px',
    textAlign: 'center',
  },
  titlebox: {
    padding: '0.7em',
    marginBottom: '0.05em',
  },
  titlebox1: {
    display: 'inline-block',
    backgroundColor: '#484453',
    borderRadius: '18px',
    width: '50%',
    textAlign: 'center',
    padding: '0.3em 0 0.3em 0',
  },
  titlebox2: {
    display: 'inline-block',
    backgroundColor: '#484453',
    borderRadius: '18px',
    width: '20%',
    textAlign: 'center',
    padding: '0.3em 0 0.3em 0',
    float: 'right',
  },
  detailsbox: {
    padding: '0.7em 0 0.7em 0',
    marginBottom: '4em',
  },
  detailsbox1: {
    display: 'inline-block',
    width: '50%',
    textAlign: 'center',
  },
  detailsbox2: {
    display: 'inline-block',
    width: '20%',
    marginRight: '0.5em',
    textAlign: 'center',
    float: 'right',
  },
  totalbox: {
    padding: '0.7em 0 0.7em 0',
    backgroundColor: '#1a191e',
    marginLeft: '1.1em',
    marginRight: '1.1em',
    paddingTop: '0.4em',
    paddingBottom: '0.4em',
    borderRadius: '18px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  totalbox1: {
    display: 'inline-block',
    width: '50%',
    textAlign: 'left',
    marginLeft: '1em',
  },
  totalbox2: {
    display: 'inline-block',
    width: '20%',
    marginRight: '1em',
  },
  buttonbox: {
    display: 'flex',
    justifyContent: 'center',
    padding: '1em',
  },

  paybutton: {
    background: 'linear-gradient(90deg, #00eaab 0%, #29ade2 100%)',
    borderRadius: '30px',
    border: 0,
    color: 'black',
    padding: '1em 2.4em',
    fontSize: '0.8em',
  },
}));

function PaymentBill() {
  const classes = styles();

  return (
    <div className={classes.paymentbill}>
      <Typography className={classes.billtitle}>Tu Boleta de este Mes</Typography>
      <Box class={classes.containerbox}>
        <Box class={classes.datebox}>7 de enero - 8 de febrero del 2020</Box>
        <Box class={classes.titlebox}>
          <Box class={classes.titlebox1}>Item a pagar</Box>
          <Box class={classes.titlebox2}>Total</Box>
        </Box>
        <Divider />
        <Box class={classes.detailsbox}>
          <Box class={classes.detailsbox1}>Leasing equipo 80x80</Box>
          <Box class={classes.detailsbox2}>$36.990</Box>
          <Divider />
        </Box>

        <Box class={classes.totalbox}>
          <Box class={classes.totalbox1}>Total a pagar:</Box>
          <Box class={classes.totalbox2}>$36.990</Box>
        </Box>
      </Box>
      <Box class={classes.buttonbox}>
        <Button class={classes.paybutton}>PAGAR AHORA</Button>
      </Box>
    </div>
  );
}

export default withStyles(styles)(PaymentBill);
