import { SET_NOTE, REMOVE_NOTE } from '../actions/types';
const initialState = [];

// eslint-disable-next-line
export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_NOTE:
      return [...state, payload];
    case REMOVE_NOTE:
      return state.filter((note) => note.id !== payload);
    default:
      return state;
  }
}
