import * as actions from '../actions/actionTypes';
import { banks } from './initialState';

export default function (state = banks, action) {
  switch (action.type) {
    case actions.EDIT_BANK:
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
