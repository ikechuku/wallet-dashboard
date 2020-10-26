import * as actions from '../actions/actionTypes';
import { otp } from './initialState';

export default function (state = otp, action) {
  switch (action.type) {
    case actions.EDIT_OTP:
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
