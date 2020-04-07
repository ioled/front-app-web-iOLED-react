// ----- Action Creators -----
import axios from 'axios';
//@ts-check

const {GATEWAY_URL} = require('../config');

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
      /**@type {{data: {name: string, email: string, photo: string, asd: string}}} */

      const res = await axios.get(`${GATEWAY_URL}${query}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      dispatch({type: 'FETCH_USER', payload: res.data.currentUser});
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
      /** @type {{data: {devices: array}}} */
      const res = await axios.get(`${GATEWAY_URL}${query}`, {
        headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
      });
      dispatch({type: 'LIST_DEVICES', payload: res.data.userDevices});
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
 * @param {{config: {duty: number, state: boolean, timerOn: number, timeOff: number, timerState: boolean, alias: string, }}} device Device config blob.
 * @param {number} index The index of the device in the list.
 */
export const updateDeviceConfig = (device, index) => async (dispatch) => {
  const query = '/deviceControl/device/';
  console.log('Update device config...');
  try {
    // Add await here to wait for the response to update the state of the switch component.
    await axios.put(
      `${GATEWAY_URL}${query}${device.deviceID}/config`,
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
 * Delete a device from the dashboard.
 * @param {{deviceId: string}} device The device object
 * @param {number} index Device index in the list.
 */
// export const deleteDevice = (device, index) => async (dispatch) => {
//   try {
//     await axios.delete(`/devices/${device.deviceId}`);
//     dispatch(fetchDevices());
//   } catch (err) {
//     console.log(err);
//   }
// };

/**
 * Get the device state.
 * @param {{deviceId: string}} device The device object
 * @param {number} index Device index in the list.
 */
export const getDeviceState = (device, index) => async (dispatch) => {
  const query = '/deviceControl/device/';
  console.log('Getting device state: ' + device.deviceID);
  try {
    const res = await axios.get(`${GATEWAY_URL}${query}${device.deviceID}/state`, {
      headers: {Authorization: `Bearer ${localStorage.getItem('token')}`},
    });
    const state = res.data.deviceState;
    dispatch({type: 'GET_STATE', payload: {state, index}});
  } catch (err) {
    console.log(err);
  }
  await sleep(5000);
};

function stateToConfig(alias, deviceId) {
  return {config: {alias}, deviceId};
}

/**
 * Change alias ID
 * @param {string} deviceId The id of the device.
 */
export const changeAlias = (deviceId, alias) => async (dispatch) => {
  const query = '/user/changeDevice';

  const deviceConfig = stateToConfig(alias, deviceId);

  try {
    // Add await here to wait for the response to update firestore DB
    await axios.post(`${GATEWAY_URL}${query}`, deviceConfig);
    dispatch({type: 'UPDATE_ALIAS', payload: {deviceConfig}});
  } catch (err) {
    console.log('Error actualizando alias:', err.response);
  }
};

/**
 * Change alias ID
 * @param {string} inputForm image form
 */
export const uploadImage = (formdata) => async (dispatch) => {
  try {
    const res = await axios({
      method: 'post',
      url: '/add',
      data: formdata,
      config: {headers: {'Content-Type': 'multipart/form-data'}},
    });
    dispatch({type: 'UPLOAD_IMAGE'});
    return res.data.imageURL;
  } catch (err) {
    console.log('Error upload image:', err.response);
  }
};

// /**
//  * Predict with images
//  * @param {string} Image The path of the images to predict
//  */
// export const predictWithImage = (imagePath) => async dispatch => {
// 	try {
// 		await axios.post('/predict', {imagePath});
// 		dispatch({type: 'PREDICT_IMAGE'});
// 	} catch (err) {
// 		console.log('Error predict image', err.response);
// 	}
// };

/**
 * Get the data history of devices
 * @param {string} deviceId The id of the device.
 */
const URL_H = 'https://us-central1-ioled-dev-262215.cloudfunctions.net/historyApi';

/*
 * day: 1, week: 2, month: 3
 *
 */
export const getHistory = async (device, time) => {
  try {
    var res = 1;
    if (time === 1) {
      // console.log(device);
      res = await axios.get(`${URL_H}/day/${device.deviceID}`);
    }
    if (time === 2) {
      res = await axios.get(`${URL_H}/week/${device.deviceID}`);
    }
    if (time === 3) {
      res = await axios.get(`${URL_H}/month/${device.deviceID}`);
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
