import * as actions from '../actions/actionTypes';
import { recipient } from './initialState';

export default function (state = recipient, action) {
  switch (action.type) {
    case actions.EDIT_RECIPIENT:
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
