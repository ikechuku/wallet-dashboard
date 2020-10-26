import * as actions from '../actions/actionTypes';
import { currencycvtr } from './initialState';

export default function (state = currencycvtr, action) {
  switch (action.type) {
    case actions.EDIT_CTVR:
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
