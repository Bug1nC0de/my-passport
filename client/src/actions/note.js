import { v4 as uuidv4 } from 'uuid';
import { SET_NOTE, REMOVE_NOTE } from './types';

export const setNote = (msg, noteType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({ type: SET_NOTE, payload: { msg, noteType, id } });
  setTimeout(() => dispatch({ type: REMOVE_NOTE, payload: id }), timeout);
};
