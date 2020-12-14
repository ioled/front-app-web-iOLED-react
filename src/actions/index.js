// ----- Action Creators -----
import axios from 'axios';
//@ts-check

const {IOLED_URL} = require('../config');

/**
 * Sleep function. Must be called inside async function.
 * @param {number} ms Time in milliseconds.
 * @returns {Promise} Return promise to use await.
 */
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get the current authenticated user.
 */
export const fetchUser = () => async (dispatch) => {
  const query = '/user/currentUser';

  for (let i = 0; i < 5; i++) {
    try {
      const res = await axios.get(`${IOLED_URL}${query}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      // console.log(res.data[0]);
      dispatch({type: 'FETCH_USER', payload: res.data[0]});
      return;
    } catch (err) {
      console.log(err.response);
      await sleep(3000);
    }
  }
};

/**
 * Get the list of all devices for an user.
 */
export const fetchDevices = () => async (dispatch) => {
  const query = '/user/devices';

  for (let i = 0; i < 5; i++) {
    try {
      const res = await axios.get(`${IOLED_URL}${query}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      // console.log(res.data.devices);
      dispatch({type: 'LIST_DEVICES', payload: res.data.devices});
      return;
    } catch (err) {
      console.log(err.response);
      await sleep(1000);
    }
  }
};

/**
 * Register a new device.
 * @param {string} deviceId The id of the device.
 */
export const registerDevice = (deviceId) => async (dispatch) => {
  try {
    /** @type {{status: number}} */
    const res = await axios.post('/devices', {deviceId});
    if (res.status === 201) {
      dispatch({type: 'REGISTER_DEVICE'});
      dispatch(fetchDevices());
    }
  } catch (err) {
    console.log(err.response);
  }
};

/**
 * Update a device configuration.
 * @param {{config: {duty: number, state: boolean, timerOn: number, timeOff: number, timerState: boolean, timerDuty: number, rampState: boolean, onTime: number}}} device Device config blob.
 * @param {number} index The index of the device in the list.
 */

export const updateDeviceConfig = (device, index) => async (dispatch) => {
  const query = '/device/';
  console.log('Update device config...');
  try {
    // Add await here to wait for the response to update the state of the switch component.
    await axios.put(
      `${IOLED_URL}${query}${device.deviceID}`,
      {device},
      {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      },
    );
    dispatch({type: 'UPDATE_DEVICE', payload: {device, index}});
  } catch (err) {
    console.log('Error actualizando dispositivo:', err.response);
  }
};

/**
 * Get the device state.
 * @param {{deviceId: string}} device The device object
 * @param {number} index Device index in the list.
 */
export const getDeviceState = (device, index) => async (dispatch) => {
  const query = '/device/';
  console.log('Getting device state: ' + device.deviceID);
  try {
    const res = await axios.get(`${IOLED_URL}${query}${device.deviceID}/state`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    });
    const state = res.data.deviceState;
    dispatch({type: 'GET_STATE', payload: {state, index}});
  } catch (err) {
    console.log(err);
  }
  await sleep(5000);
};

/**
 * Change alias ID
 * @param {string} deviceId The id of the device.
 */

function stateToConfig(alias, deviceId) {
  return {config: {alias}, deviceId};
}

export const changeAlias = (deviceId, alias) => async (dispatch) => {
  const query = '/user/changeDevice';

  const deviceConfig = stateToConfig(alias, deviceId);

  try {
    // Add await here to wait for the response to update firestore DB
    await axios.post(`${IOLED_URL}${query}`, deviceConfig);
    dispatch({type: 'UPDATE_ALIAS', payload: {deviceConfig}});
  } catch (err) {
    console.log('Error actualizando alias:', err.response);
  }
};

/**
 * Get the data history of devices
 * @param {string} deviceId The id of the device.
 * day: 1, week: 2, month: 3
 *
 */
export const getHistory = async (device, time) => {
  const query = '/history';

  try {
    var res = 1;
    if (time === 1) {
      res = await axios.get(`${IOLED_URL}${query}/day/${device.deviceID}`);
    }
    if (time === 2) {
      res = await axios.get(`${IOLED_URL}${query}/week/${device.deviceID}`);
    }
    if (time === 3) {
      res = await axios.get(`${IOLED_URL}${query}/month/${device.deviceID}`);
    }
    return res.data.data;
  } catch (err) {
    console.log(err.response);
    await sleep(3000);
  }
};

// UX actions
export const changeMenu = (menu) => async (dispatch) => {
  dispatch({type: 'CHANGE_MENU', payload: {menu}});
  return;
};

export const changeID = (id) => async (dispatch) => {
  dispatch({type: 'CHANGE_ID', payload: {id}});
  return;
};
