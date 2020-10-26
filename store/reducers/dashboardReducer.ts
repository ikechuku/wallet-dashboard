import * as actions from '../actions/actionTypes';
import { dashboard } from './initialState';

export default function (state = dashboard, action) {
  switch (action.type) {
    case actions.TOGGLE_DRAWER:
      return {
        ...state,
        ...action.payload,
      };
    case actions.EDIT_DASHBOARD:
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
