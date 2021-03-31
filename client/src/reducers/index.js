import { combineReducers } from 'redux';
import auth from './auth';
import note from './note';

export default combineReducers({
  auth,
  note,
});
