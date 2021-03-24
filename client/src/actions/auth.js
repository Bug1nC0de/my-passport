import { FETCH_USER, TRASH_USER, LOGIN_USER } from './types';
import axios from 'axios';

export const fetchUser = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
  } catch (error) {
    dispatch({ type: TRASH_USER });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/auth/register', body, config);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};

export const login = ({ username, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ username, password });
  try {
    const res = await axios.post('/auth/login', body, config);

    dispatch({ type: LOGIN_USER, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const trashUser = () => async (dispatch) => {
  await axios.get('/auth/logout');
  dispatch({ type: TRASH_USER });
};
