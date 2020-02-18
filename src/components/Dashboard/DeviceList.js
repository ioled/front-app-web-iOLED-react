import React, { Component } from "react";
import { connect } from "react-redux";

// Action creators.
import { fetchDevices } from "../../actions";

// material-ui components.
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

import greenCircle from "./icons/green-circle.png";
import grayCircle from "./icons/gray-circle.png";

import plusSymbol from "./icons/plus-symbol.png";

// Component style.
const styles = theme => ({
  grid: {
    marginTop: 20,
    margin: `0 ${theme.spacing(0)}px`
  },
  deviceListTitle: {
    marginTop: "2em",
    color: "white",
    fontSize: "1em",
    textAlign: "center"
  },
  deviceBoxEnabled: {
    marginBottom: "1em",
    backgroundColor: "#474453",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    borderRadius: "18px",
    display: "flex",
    fontSize: "1.1em",
    width: "80%",
    height: "3em",
    justifyContent: "space-around",
    alignItems: "center"
  },
  deviceBoxDisabled: {
    marginBottom: "1em",
    backgroundColor: "#323039",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    borderRadius: "18px",
    display: "flex",
    fontSize: "1.1em",
    width: "80%",
    height: "3em",
    justifyContent: "space-around",
    alignItems: "center"
  },
  leftSubBox: {
    paddingLeft: "1em",
    width: "50%",
    textAlign: "left",
    color: "white"
  },
  rightSubBox: {
    background: "#1A191E",
    width: "40%",
    height: "2em",
    textAlign: "center",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: "1em"
  },
  flexSpanEnabled: {
    color: "#00EAA6"
  },
  flexSpanDisabled: {
    color: "#AAAAAA"
  },
  deviceButton: {
    background: "red",
    height: "3px",
    width: "3px",
    borderRadius: "20px"
  },
  addDevice: {
    border: "2px solid #474453",
    background: "transparent",
    width: "80%",
    height: "3em",
    borderRadius: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "3px"
  }
});

class DeviceList extends Component {
  // Get the list of devices on component mount.
  componentDidMount() {
    this.props.fetchDevices();
  }

  capitalizeFLetter = word => {
    let string = word;
    return string[0].toUpperCase() + string.slice(1);
  };

  // Map every device in the list to a Device component.
  renderComponentList = () => {
    const { devices, classes } = this.props;

    return devices.map((device, key) => {
      if (device.state === true) {
        return (
          <Box
            key={device.deviceId}
            index={key}
            className={classes.deviceBoxEnabled}
          >
            <Box className={classes.leftSubBox}>
              {this.capitalizeFLetter(device.alias)}
            </Box>
            <Box className={classes.rightSubBox}>
              <span className={classes.flexSpanEnabled}>{device.duty}%</span>
              <span className={classes.flexSpanEnabled}>|</span>
              <span className={classes.flexSpanEnabled}>
                {" "}
                {device.duty * 600}W{" "}
              </span>
              <img
                src={greenCircle}
                height="30px"
                width="30px"
                alt="green-circle"
              />
            </Box>
          </Box>
        );
      } else {
        return (
          <Box
            key={device.deviceId}
            index={key}
            className={classes.deviceBoxDisabled}
          >
            <Box className={classes.leftSubBox}>
              {this.capitalizeFLetter(device.alias)}
            </Box>
            <Box className={classes.rightSubBox}>
              <span className={classes.flexSpanDisabled}>{device.duty}%</span>
              <span className={classes.flexSpanDisabled}>|</span>
              <span className={classes.flexSpanDisabled}>
                {" "}
                {device.duty * 600}W{" "}
              </span>
              <img
                src={grayCircle}
                height="18px"
                width="18px"
                alt="gray-circle"
              />
            </Box>
          </Box>
        );
      }
    });
  };

  // Render the component.
  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center">
        <Typography className={classes.deviceListTitle}>Mis Equipos</Typography>
        <Grid
          spacing={10}
          alignItems="center"
          justify="center"
          container
          className={classes.grid}
        >
          {this.renderComponentList()}

          {/* Add an event to 'addDevice' box */}
          <Box className={classes.addDevice}>
            <img
              src={plusSymbol}
              height="30px"
              width="30px"
              alt="plus-symbol"
            />
          </Box>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = ({ devices }) => {
  return { devices };
};

export default connect(mapStateToProps, { fetchDevices })(
  withStyles(styles)(DeviceList)
);
