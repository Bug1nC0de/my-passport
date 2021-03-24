import { FETCH_USER, TRASH_USER, LOGIN_USER } from '../actions/types';

const initState = {
  isAuth: null,
  loading: true,
  user: null,
};

// eslint-disable-next-line
export default function (state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER:
    case LOGIN_USER:
      return {
        ...state,
        isAuth: true,
        user: payload,
        loading: false,
      };
    case TRASH_USER:
      return {
        ...state,
        isAuth: null,
        user: null,
        loading: false,
      };
    default:
      return state;
  }
}
