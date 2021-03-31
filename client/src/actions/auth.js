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
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
    }
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
    dispatch(fetchUser());
  } catch (error) {
    console.log(error.response.data);
    const errors = error.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};

export const trashUser = () => async (dispatch) => {
  await axios.get('/auth/logout');
  dispatch({ type: TRASH_USER });
};
