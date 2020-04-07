import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';

// Action creators.
import {getHistory} from '../../actions';

// Material-ui components.
import {withStyles} from '@material-ui/core/styles';
import {Box, Divider} from '@material-ui/core';

// Import icon
import SvgIcon from '@material-ui/core/SvgIcon';
import {ReactComponent as TempIcon} from '../../images/TempSVG.svg';
import {ReactComponent as HumIcon} from '../../images/CloudSVG.svg';

// Circular progress
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';

// Menu select (day, week, month)
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

// Component style.
const styles = (theme) => ({
  root: {
    display: 'grid',
    justifyContent: 'center',
  },
  plot1Container: {
    backgroundColor: '#323039',
    width: '90vw',
    height: '35vh',
    padding: theme.spacing(1),
  },
  plot2Container: {
    backgroundColor: '#323039',
    width: '90vw',
    height: '35vh',
    padding: theme.spacing(1),
    marginTop: '40px',
  },
  topPlotContainer: {
    display: 'flex',
  },
  icon: {
    backgroundColor: '#222128',
    marginRight: '20px',
  },
  stateIcon: {
    marginLeft: '2px',
    marginTop: '2px',
  },
  show: {
    backgroundColor: '#474453',
    color: 'white',
    display: 'flex',
    fontSize: '12px',
    justifyContent: 'center',
  },
  tempformColor: {
    color: '#00EAA6',
  },
  humformColor: {
    color: '#29ABE2',
  },
  timeScaleTemp: {
    color: '#00EAA6',
  },
  timeScaleHum: {
    color: '#29ABE2',
  },
  temperature: {
    color: '#00EAA6',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  humidity: {
    color: '#29ABE2',
    fontSize: '15px',
    fontWeight: 'bold',
  },
  divider: {
    marginTop: '5px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#00EAA6',
  },
});

const options_temp = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 9,
          maxTicksLimit: 4,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: '#AAAAAA',
          borderDash: [1, 10],
        },
        ticks: {
          fontColor: '#00EAA6',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 9,
          min: 0,
          max: 40,
          maxTicksLimit: 6,
        },
      },
    ],
  },
};

const options_hum = {
  maintainAspectRatio: false,
  legend: {
    display: false,
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          fontColor: 'white',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 9,
          maxTicksLimit: 4,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          color: '#AAAAAA',
          borderDash: [1, 10],
        },
        ticks: {
          fontColor: '#29ABE2',
          fontFamily: 'Montserrat, sans-serif',
          fontSize: 9,
          min: 0,
          max: 100,
          maxTicksLimit: 6,
        },
      },
    ],
  },
};

class LineChart extends Component {
  state = {
    chartData_temp: {},
    chartData_hum: {},
    trans: false,
    time: 1,
    open: false,
  };

  handleChange = async (event, value) => {
    const {deviceID} = this.props;

    this.setState({time: event.target.value});

    this.setState({trans: true});
    const data = await getHistory({deviceID}, event.target.value);
    this.setState({trans: false});

    const ctx_temp = document.getElementById('temperature').getContext('2d');
    const gradient_temp = ctx_temp.createLinearGradient(0, 0, 0, 180);
    gradient_temp.addColorStop(0, '#00EAA6');
    gradient_temp.addColorStop(1, 'rgba(16, 156, 241, 0)');
    const newData_temp = {
      labels: data.temperature.labels,
      datasets: [
        {
          data: data.temperature.datasets[0].data,
          borderColor: '#00EAA6',
          lineTension: 0.5,
          backgroundColor: gradient_temp,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
        },
      ],
    };

    this.setState({chartData_temp: newData_temp});

    const ctx_hum = document.getElementById('humidity').getContext('2d');
    const gradient_hum = ctx_hum.createLinearGradient(0, 0, 0, 200);
    gradient_hum.addColorStop(0, '#29ABE2');
    gradient_hum.addColorStop(1, 'rgba(16, 156, 241, 0)');
    const newData_hum = {
      labels: data.humidity.labels,
      datasets: [
        {
          data: data.humidity.datasets[0].data,
          borderColor: '#29ABE2',
          lineTension: 0.5,
          backgroundColor: gradient_hum,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
        },
      ],
    };
    this.setState({chartData_hum: newData_hum});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  async componentDidMount() {
    const {deviceID} = this.props;
    const {time} = this.state;

    this.setState({trans: true});
    const data = await getHistory({deviceID}, time);
    this.setState({trans: false});

    const ctx_temp = document.getElementById('temperature').getContext('2d');
    const gradient_temp = ctx_temp.createLinearGradient(0, 0, 0, 180);
    gradient_temp.addColorStop(0, '#00EAA6');
    gradient_temp.addColorStop(1, 'rgba(16, 156, 241, 0)');
    const newData_temp = {
      labels: data.temperature.labels,
      datasets: [
        {
          data: data.temperature.datasets[0].data,
          borderColor: '#00EAA6',
          lineTension: 0.5,
          backgroundColor: gradient_temp,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
        },
      ],
    };

    this.setState({chartData_temp: newData_temp});

    const ctx_hum = document.getElementById('humidity').getContext('2d');
    const gradient_hum = ctx_hum.createLinearGradient(0, 0, 0, 200);
    gradient_hum.addColorStop(0, '#29ABE2');
    gradient_hum.addColorStop(1, 'rgba(16, 156, 241, 0)');
    const newData_hum = {
      labels: data.humidity.labels,
      datasets: [
        {
          data: data.humidity.datasets[0].data,
          borderColor: '#29ABE2',
          lineTension: 0.5,
          backgroundColor: gradient_hum,
          borderWidth: 2,
          pointRadius: 0,
          pointHitRadius: 10,
        },
      ],
    };
    this.setState({chartData_hum: newData_hum});
  }

  render() {
    const {classes} = this.props;
    const {trans, time, open} = this.state;

    return (
      <div className={classes.root}>
        <Box className={classes.plot1Container} borderRadius={12} boxShadow={3}>
          <Box className={classes.topPlotContainer}>
            <Box className={classes.icon} borderRadius={56} width="8%">
              <SvgIcon component={TempIcon} viewBox="0 0 14 33" className={classes.stateIcon} />
            </Box>
            <Box width="52%" className={classes.temperature}>
              Temperatura ºC
            </Box>
            <Box className={classes.show} borderRadius={12} width="40%">
              <FormControl color="secondary">
                <Select
                  classes={{
                    root: classes.tempformColor,
                    icon: classes.tempformColor,
                  }}
                  open={open}
                  onClose={this.handleClose}
                  onOpen={this.handleOpen}
                  onChange={this.handleChange}
                  value={time}
                >
                  <MenuItem value={1}>Día</MenuItem>
                  <MenuItem value={2}>Semana</MenuItem>
                  <MenuItem value={3}>Mensual</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Line id="temperature" data={this.state.chartData_temp} options={options_temp} />
        </Box>

        <Box className={classes.plot2Container} borderRadius={12}>
          <Box className={classes.topPlotContainer}>
            <Box className={classes.icon} borderRadius={56} width="8%">
              <SvgIcon component={HumIcon} viewBox="0 0 41 28" className={classes.stateIcon} />
            </Box>
            <Box width="52%" className={classes.humidity}>
              Humedad %
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Line id="humidity" data={this.state.chartData_hum} options={options_hum} />
        </Box>

        <Backdrop className={classes.backdrop} open={trans}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return state.devices[ownProps.index];
};

export default connect(mapStateToProps, null)(withStyles(styles)(LineChart));
