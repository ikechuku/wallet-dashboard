import * as actions from '../actions/actionTypes';
import { auth } from './initialState';

export default function (state = auth, action) {
  switch (action.type) {
    case actions.EDIT_AUTH:
      return {
        ...state,
        isLoading: false,
        errors: null,
        message: null,
        ...action.payload,
      };
    default:
      return state;
  }
}
