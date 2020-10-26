import { takeLatest, all } from 'redux-saga/effects';
import * as actions from '../actions/actionTypes';
import {
  GetUserSaga,
  SignUpSaga,
  LogInSaga,
  SignOutSaga,
  VerifyEmailSaga,
} from '../actions/authActions';
import {
  GetUserProfileSaga,
  UpdateProfileSaga,
} from '../actions/profileActions';

import {
  ForgotPasswordSaga,
  ResetPasswordSaga,
} from '../actions/passResetActions';
import {
  GetCountriesSaga,
  GetCryptoCurrencySaga,
} from '../actions/countryActions';
import {
  CreateChargeSaga,
  ValidateChargeSaga,
  CreatePaymentIntentSaga,
  VerifyTransactionSaga,
  CryptoPaymentSaga,
} from '../actions/tranferActions';
import {
  GetBanksSaga,
  AccountDetailsSaga,
  GetBVNDetailsSaga,
} from '../actions/bankActions';
import { ValidateCardSaga } from '../actions/cardActions';
import {
  CurrencyConverterSaga,
  GetAbokiRatesSaga,
  CryptoCurrencyConverterSaga,
} from '../actions/currencyCvtrActions';
import {
  SetUpDashboardSaga,
  GetTransactionsSaga,
} from '../actions/dashBoardActions';
import { RequestOTPSaga, ValidateTokenSaga } from '../actions/otpActions';
import {
  CreatePinSaga,
  UpdatePinSaga,
  ValidatePinSaga,
} from '../actions/tranxPinAction';
import { safe } from '../../utils';
import {
  CreateRecipientsSaga,
  GetMyselfRecipientsSaga,
  DeleteRecipientsSaga,
  GetOthersRecipientsSaga,
} from '../actions/recipientActions';
/* 
function* safe(effect) {
  try {
    yield effect;
  } catch (err) {
    return { err };
  }
}
 */
function* rootSaga() {
  yield all([
    takeLatest(actions.SIGN_UP_ASYNC, (arg) => safe(SignUpSaga(arg))),
    takeLatest(actions.GET_USER_ASYNC, (arg) => safe(GetUserSaga(arg))),
    takeLatest(actions.LOG_IN_ASYNC, (arg) => safe(LogInSaga(arg))),
    takeLatest(actions.SIGN_OUT_ASYNC, (arg) => safe(SignOutSaga(arg))),
    takeLatest(actions.FORGOT_PASSWORD_ASYNC, (arg) =>
      safe(ForgotPasswordSaga(arg))
    ),
    takeLatest(actions.VERIFY_EMAIL_TOKEN_ASYNC, (arg) =>
      safe(VerifyEmailSaga(arg))
    ),
    takeLatest(actions.RESET_PASSWORD_ASYNC, (arg) =>
      safe(ResetPasswordSaga(arg))
    ),
    takeLatest(actions.VALIDATE_RESET_TOKEN_ASYNC, (arg) =>
      safe(ValidateTokenSaga(arg))
    ),
    takeLatest(actions.GET_PROFILE_ASYNC, (arg) =>
      safe(GetUserProfileSaga(arg))
    ),
    takeLatest(actions.GET_COUNTRIES_ASYNC, (arg) =>
      safe(GetCountriesSaga(arg))
    ),
    takeLatest(actions.GET_BANKS_ASYNC, (arg) => safe(GetBanksSaga(arg))),
    takeLatest(actions.CREATE_CHARGE_ASYNC, (arg) =>
      safe(CreateChargeSaga(arg))
    ),
    takeLatest(actions.VALIDATE_CHARGE_ASYNC, (arg) =>
      safe(ValidateChargeSaga(arg))
    ),
    takeLatest(actions.VALIDATE_CARD_ASYNC, (arg) =>
      safe(ValidateCardSaga(arg))
    ),
    takeLatest(actions.CONVERT_CURRENCY_ASYNC, (arg) =>
      safe(CurrencyConverterSaga(arg))
    ),
    takeLatest(actions.CREATE_PAYMENT_INTENT_ASYNC, (arg) =>
      safe(CreatePaymentIntentSaga(arg))
    ),
    takeLatest(actions.ACCOUNT_DETAILS_ASYNC, (arg) =>
      safe(AccountDetailsSaga(arg))
    ),
    takeLatest(actions.SETUP_DASHBOARD_ASYNC, (arg) =>
      safe(SetUpDashboardSaga(arg))
    ),
    takeLatest(actions.GET_TRANS_ASYNC, (arg) =>
      safe(GetTransactionsSaga(arg))
    ),
    takeLatest(actions.REQUEST_OTP, (arg) => safe(RequestOTPSaga(arg))),
    takeLatest(actions.VERIFY_TRANX_ASYNC, (arg) =>
      safe(VerifyTransactionSaga(arg))
    ),
    takeLatest(actions.CREATE_PIN_ASYNC, (arg) => safe(CreatePinSaga(arg))),
    takeLatest(actions.CONVERT_CRYPTO_CURRENCY_ASYNC, (arg) =>
      safe(CryptoCurrencyConverterSaga(arg))
    ),
    takeLatest(actions.UPDATE_PIN_ASYNC, (arg) => safe(UpdatePinSaga(arg))),
    takeLatest(actions.VALIDATE_PIN_ASYNC, (arg) => safe(ValidatePinSaga(arg))),
    takeLatest(actions.UPDATE_PROFILE_ASYNC, (arg) =>
      safe(UpdateProfileSaga(arg))
    ),
    takeLatest(actions.GET_ABOKI_RATES_ASYNC, (arg) =>
      safe(GetAbokiRatesSaga(arg))
    ),
    takeLatest(actions.GET_MYSELF_RECIPIENT_ASYNC, (arg) =>
      safe(GetMyselfRecipientsSaga(arg))
    ),
    takeLatest(actions.GET_OTHERS_RECIPIENT_ASYNC, (arg) =>
      safe(GetOthersRecipientsSaga(arg))
    ),
    takeLatest(actions.CREATE_RECIPIENT_ASYNC, (arg) =>
      safe(CreateRecipientsSaga(arg))
    ),
    takeLatest(actions.DELETE_RECIPIENT_ASYNC, (arg) =>
      safe(DeleteRecipientsSaga(arg))
    ),
    takeLatest(actions.BVN_DETAILS_ASYNC, (arg) =>
      safe(GetBVNDetailsSaga(arg))
    ),
    takeLatest(actions.GET_CRYPTO_CURRENCY_ASYNC, (arg) =>
      safe(GetCryptoCurrencySaga(arg))
    ),
    takeLatest(actions.CRYPTO_PAYMENT_ASYNC, (arg) =>
      safe(CryptoPaymentSaga(arg))
    ),
  ]);
}

export default rootSaga;
