import * as actions from '../actions/actionTypes';
import { transfer } from './initialState';

export default function (state = transfer, action) {
  switch (action.type) {
    case actions.EDIT_TRANSFER:
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
