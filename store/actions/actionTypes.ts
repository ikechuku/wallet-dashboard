export const GET_USER_ASYNC = 'GET_USER_ASYNC';

export const LOG_IN_ASYNC = 'LOG_IN_ASYNC';
export const BVN_DETAILS_ASYNC = 'BVN_DETAILS_ASYNC';
export const REQUEST_OTP = 'REQUEST_OTP';
export const GET_CRYPTO_CURRENCY_ASYNC = 'GET_CRYPTO_CURRENCY_ASYNC';
export const EDIT_OTP = 'EDIT_OTP';
export const CRYPTO_PAYMENT_ASYNC = 'CRYPTO_PAYMENT_ASYNC';
export const CONVERT_CRYPTO_CURRENCY_ASYNC = 'CONVERT_CRYPTO_CURRENCY_ASYNC';
export const SIGN_UP_ASYNC = 'SIGN_UP_ASYNC';
export const GET_ABOKI_RATES_ASYNC = 'GET_ABOKI_RATES_ASYNC';
export const CREATE_PIN_ASYNC = 'CREATE_PIN_ASYNC';
export const CREATE_RECIPIENT_ASYNC = 'CREATE_RECIPIENT_ASYNC';
export const UPDATE_PIN_ASYNC = 'UPDATE_PIN_ASYNC';
export const VALIDATE_PIN_ASYNC = 'VALIDATE_PIN_ASYNC';
export const EDIT_DASHBOARD = 'EDIT_DASHBOARD';
export const SETUP_DASHBOARD_ASYNC = 'SETUP_DASHBOARD_ASYNC';
export const VERIFY_EMAIL_TOKEN_ASYNC = 'VERIFY_EMAIL_TOKEN_ASYNC';

export const SIGN_OUT_ASYNC = 'SIGN_OUT_ASYNC';
export const ACCOUNT_DETAILS_ASYNC = 'ACCOUNT_DETAILS_ASYNC';

export const FORGOT_PASSWORD_ASYNC = 'FORGOT_PASSWORD_ASYNC';
export const RESET_PASSWORD_ASYNC = 'RESET_PASSWORD_ASYNC';
export const VALIDATE_RESET_TOKEN_ASYNC = 'VALIDATE_RESET_TOKEN_ASYNC';

export const SETUP_USER = 'SETUP_USER';
export const EDIT_RESET = 'EDIT_RESET';
export const EDIT_RECIPIENT = 'EDIT_RECIPIENT';

export const EDIT_AUTH = 'EDIT_AUTH';
export const AUTH_REQUEST = 'AUTH_REQUEST';

export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const EDIT_PROFILE = 'EDIT_PROFILE';
export const GET_PROFILE_ASYNC = 'GET_PROFILE_ASYNC';

export const GET_COUNTRIES_ASYNC = 'GET_COUNTRIES_ASYNC';
export const UPDATE_PROFILE_ASYNC = 'UPDATE_PROFILE_ASYNC';
export const GET_BANKS_ASYNC = 'GET_BANKS_ASYNC';
export const CONVERT_CURRENCY_ASYNC = 'CONVERT_CURRENCY_ASYNC';
export const EDIT_HELPERS = 'EDIT_HELPERS';

export const EDIT_TRANSFER = 'EDIT_TRANSFER';
export const TRANSFER_REQUEST = 'TRANSFER_REQUEST';
export const CREATE_CHARGE_ASYNC = 'CREATE_CHARGE_ASYNC';
export const VALIDATE_CHARGE_ASYNC = 'VALIDATE_CHARGE_ASYNC';
export const VALIDATE_CARD_ASYNC = 'VALIDATE_CARD_ASYNC';

export const CLEAR_CTVR_ERRORS = 'CLEAR_CTVR_ERRORS';
export const EDIT_CTVR = 'EDIT_CTVR';
export const CLEAR_COUNTRY_ERRORS = 'CLEAR_COUNTRY_ERRORS';
export const EDIT_COUNTRY = 'EDIT_COUNTRY';
export const CLEAR_CARD_ERRORS = 'CLEAR_CARD_ERRORS';
export const EDIT_CARD = 'EDIT_CARD';
export const VERIFY_TRANX_ASYNC = 'VERIFY_TRANX_ASYNC';
export const EDIT_BANK = 'EDIT_BANK';
export const GET_TRANS_ASYNC = 'GET_TRANS_ASYNC';
export const GET_OTHERS_RECIPIENT_ASYNC = 'GET_OTHERS_RECIPIENT_ASYNC';
export const GET_MYSELF_RECIPIENT_ASYNC = 'GET_MYSELF_RECIPIENT_ASYNC';
export const FETCH_COUNTRY_ERROR = 'FETCH_COUNTRY_ERROR';
export const DELETE_RECIPIENT_ASYNC = 'DELETE_RECIPIENT_ASYNC';
export const CREATE_PAYMENT_INTENT_ASYNC = 'CREATE_PAYMENT_INTENT_ASYNC';
export const EDIT_TRANSACTION = 'EDIT_TRANSACTION';

export interface ActionParam {
  params?: any;
  cb?: Function;
}
export function makeAsyncActionCreator(type) {
  return (
    payload: ActionParam = {
      cb: (_) => _,
    }
  ) => ({
    type,
    payload: payload.params,
    cb: payload.cb,
  });
}
export function makeActionCreator(type) {
  return (payload = {}) => ({ type, payload });
}