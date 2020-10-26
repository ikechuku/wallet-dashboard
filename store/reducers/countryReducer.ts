import * as actions from '../actions/actionTypes';
import { countries } from './initialState';

export default function (state = countries, action) {
  switch (action.type) {
    case actions.EDIT_COUNTRY:
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
