import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {connect} from 'react-redux';

// Material-ui components.
import {withStyles} from '@material-ui/core/styles';
import {Box, Divider} from '@material-ui/core';

// Circular progress
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';


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
  timeScaleTemp: {
    color: '#00EAA6',
  },
  temperature: {
    color: 'yellow',
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
          maxTicksLimit: 12,
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
          fontColor: 'yellow',
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
    trans: false,
    time: 1,
    open: false,
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  async componentDidMount() {
    this.setState({trans: true});
    this.setState({trans: false});

    const newData_temp = {
      labels:[0 ,1 ,2 ,3 ,4 ,5 ,6 ,7 ,8 ,9 ,10 ,11 ,12 ,13 ,14 ,15 ,16 ,17 ,18 ,19 ,20 ,21 ,22 , 23] ,
      datasets: [
        {
          data: [0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 ,0 , 100,  100, 100 , 100 , 100 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ] ,
          borderColor: 'yellow',
          lineTension: 0,
          borderWidth: 2,
          pointRadius: 2,
          pointHitRadius: 10,
          // steppedLine: true,
        },
      ],
    };

    this.setState({chartData_temp: newData_temp});

  }

  render() {
    const {classes} = this.props;
    const {trans} = this.state;

    return (
      <div className={classes.root}>
        <Box className={classes.plot1Container} borderRadius={12} boxShadow={3}>
          <Box className={classes.topPlotContainer}>
            <Box width="52%" className={classes.temperature}>
              Timer
            </Box>
          </Box>
          <Divider className={classes.divider} />
          <Line id="temperature" data={this.state.chartData_temp} options={options_temp} />
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
