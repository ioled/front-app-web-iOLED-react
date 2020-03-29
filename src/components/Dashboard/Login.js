import React, {Component} from 'react';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {withStyles} from '@material-ui/core/styles';

import styled from 'styled-components';

import SvgIcon from '@material-ui/core/SvgIcon';

import {ReactComponent as IoledName} from '../../images/IoledName.svg';
import {ReactComponent as IoledIcon} from '../../images/IoledIcon.svg';

const styles = (theme) => ({
  root: {
    backgroundColor: '#1A191E',
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    fontSize: '150px',
  },
  name: {
    fontSize: '110px',
  },
  version: {
    color: 'white',
    textAlign: 'center',
    marginBottom: '0px',
  },
});

const StyledButton = styled(Button)`
  background: linear-gradient(180deg, #29abe2 0%, #00eaa6 100%);
  border-radius: 3px;
  padding: 0 30px;
  height: 48px;
  width: 120px;
`;

class Login extends Component {
  responseGoogle = async (res) => {
    console.log('responseGoogle');
    await this.props.oauthGoogle(res.token);
  };

  render() {
    const {classes} = this.props;

    return (
      <Box component="main" className={classes.root} position="fixed" height="100%" width="100%">
        <div className={classes.paper}>
          <SvgIcon component={IoledIcon} viewBox="0 0 126 150" fontSize="inherit" className={classes.icon} />
          <SvgIcon component={IoledName} viewBox="0 0 111 27" fontSize="inherit" className={classes.name} />
          <StyledButton href="/auth/google" type="submit">
            Login
          </StyledButton>
        </div>
        <Box mt={8} className={classes.version}>
          iOLED 1.0.2 2020
        </Box>
      </Box>
    );
  }
}

export default withStyles(styles)(Login);
