import {combineReducers} from 'redux';
import userReducer from './userReducer';
import devicesReducer from './devicesReducer';
import uxReducer from './uxReducer';

/* Note for reducers:
 * 1. Must return any value besides 'undefined'.
 * 2. Produces state only using previous states and actions.
 * 3. Reducers are pure: must not reach out of it self to process data.
 * 		e.g. make an api call inside de reducer.
 * 4. Must not mutate its input state argument
 */
export default combineReducers({
  user: userReducer,
  devices: devicesReducer,
  ux: uxReducer,
});
