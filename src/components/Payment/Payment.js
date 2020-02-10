import React from 'react';
import Navbar from './imports/Navbar';
import PayDate from './imports/PayDate';
import SubscribedPlans from './imports/SubscribedPlans';
import PaymentBill from './imports/PaymentBill';
import Menu from './imports/Menu';

import {makeStyles} from '@material-ui/core/styles';
import {withStyles} from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
  paydate: {
    backgroundColor: '#1A191E',
  },
}));

function Payment() {
  const classes = styles();

  return (
    <React.Fragment>
      <div className={classes.paydate}>
        <Navbar />
        <PayDate />
        <SubscribedPlans />
        <PaymentBill />
        <Menu />
      </div>
    </React.Fragment>
  );
}

export default withStyles(styles)(Payment);
