import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

// React components.
import StateContainer from './StateContainer';
import AliasContainer from './AliasContainer';
import SliderContainer from './SliderContainer';
// import TimerContainer from './TimerContainer';
// import PlotContainer from './PlotContainer';

// material-ui components.
import {withStyles, createStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

// Component style.
const styles = (theme) =>
  createStyles({
    cardHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: '#1A191E',
    },
    nameContainer: {
      margin: 'auto 0',
      textAlign: 'rigth',
      color: '#FFFFFF',
    },
    aliasContainer: {
      padding: theme.spacing(1),
      textAlign: 'center',
      backgroundColor: '#323039',
    },
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#00EAA6',
    },
  });

class Device extends Component {
  // Render the navbar depending the auth state.
  plotRender() {
    const {menu = 0} = this.props.ux;
    const {classes} = this.props;

    switch (menu) {
      case null:
        return (
          <Fragment>
            <Backdrop className={classes.backdrop} open={true}>
              <CircularProgress color="inherit" />
            </Backdrop>
          </Fragment>
        );
      default:
        return (
          <Fragment>
            <AliasContainer index={this.props.index} />
            <StateContainer index={this.props.index} />
            <SliderContainer index={this.props.index} />
            {/* <TimerContainer index={this.props.index} /> */}
          </Fragment>
        );
      case 1:
        return <Fragment></Fragment>;
    }
  }

  // Render the component.
  render() {
    return (
      <Container component="main" maxWidth="sm">
        {this.plotRender()}
      </Container>
    );
  }
}

const mapStateToProps = ({ux}) => {
  return {ux};
};

export default connect(mapStateToProps)(withStyles(styles)(Device));
