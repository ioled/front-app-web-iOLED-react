// ----- Action Creators -----
import axios from 'axios';
//@ts-check

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
  for (let i = 0; i < 5; i++) {
    try {
      /**@type {{data: {name: string, email: string, photo: string, asd: string}}} */
      const res = await axios.get('/user');
      dispatch({type: 'FETCH_USER', payload: res.data});
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
  for (let i = 0; i < 5; i++) {
    try {
      /** @type {{data: {devices: array}}} */
      const res = await axios.get('/devices');
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
 * @param {{config: {duty: number, state: boolean, timerOn: number, timeOff: number, timerState: boolean, alias: string, }}} device Device config blob.
 * @param {number} index The index of the device in the list.
 */
export const updateDeviceConfig = (device, index) => async (dispatch) => {
  try {
    // Add await here to wait for the response to update the state of the switch component.
    await axios.put(`/devices/${device.deviceId}`, {device});
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
export const deleteDevice = (device, index) => async (dispatch) => {
  try {
    await axios.delete(`/devices/${device.deviceId}`);
    dispatch(fetchDevices());
  } catch (err) {
    console.log(err);
  }
};

/**
 * Get the device state.
 * @param {{deviceId: string}} device The device object
 * @param {number} index Device index in the list.
 */
export const getDeviceState = (device, index) => async (dispatch) => {
  while (true) {
    console.log('Getting device state...');

    try {
      const res = await axios.get(`/devices/${device.deviceId}`);
      const {state} = res.data;
      dispatch({type: 'GET_STATE', payload: {state, index}});
    } catch (err) {
      console.log(err);
    }
    await sleep(5000);
  }
};

/**
 * Change alias ID
 * @param {string} deviceId The id of the device.
 */
export const changeAlias = (device) => async (dispatch) => {
  try {
    await axios.post(`/devices/${device.deviceId}`, {device});
    dispatch({type: 'UPDATE_ALIAS'});
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
      res = await axios.get(`${URL_H}/day/${device.deviceId}`);
    }
    if (time === 2) {
      res = await axios.get(`${URL_H}/week/${device.deviceId}`);
    }
    if (time === 3) {
      res = await axios.get(`${URL_H}/month/${device.deviceId}`);
    }
    return res.data.data;
  } catch (err) {
    console.log(err.response);
    await sleep(3000);
  }
};

export const changeMenu = (menu) => async (dispatch) => {
  dispatch({type: 'CHANGE_MENU', payload: {menu}});
  return;
};
