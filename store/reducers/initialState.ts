import { AuthState } from '../../models/Auth';
import { ResetPassState } from '../../models/PasswordReset';
import { OtpState } from '../../models/Otp';
import { DashBoardState } from '../../models/Helpers';
import { TransferState, TransferForm } from '../../models/Transfer';
import { CvtrState } from '../../models/CurrenctCvtr';
import { BankState } from '../../models/BankDetails';
import { CardState } from '../../models/CardDetails';
import { AccountValidationResProps } from '../../models/AccountDetails';
import { RecipientState } from '../../models/RecipientDetails';
import { CountriesState } from '../../models/Countries';

export const auth: AuthState = {
  user: null,
  profile: null,
  isAuthenticated: false,
  isEmailVerifySent: false,
  isEmailVerified: false,
  errors: null,
  message: null,
  isSettingAuth: true,
  isLoading: false,
};

export const resetPass: ResetPassState = {
  resetToken: null,
  isPasswordReset: false,
  errors: null,
  message: null,
  isResetLinkSent: false,
  isLoading: false,
};

export const otp: OtpState = {
  errors: null,
  message: null,
  isLoading: false,
  sentOtp: false,
};

export const recipient: RecipientState = {
  errors: null,
  message: null,
  isLoading: false,
  myselfList: null,
  othersList: null,
};

export const dashboard: DashBoardState = {
  selected: 'wallet',
  transactions: null,
  message: null,
  isLoading: false,
  errors: null,
  isDrawerOpen: false,
};

export const countries: CountriesState = {
  countries: null,
  currencies: null,
  errors: null,
  message: null,
  isLoading: false,
};

export const currencycvtr: CvtrState = {
  currencyConversion: null,
  cryptoCurrencyConversion: null,
  abokiConversion: null,
  errors: null,
  message: null,
  isLoading: false,
};

export const banks: BankState = {
  banks: null,
  accountDetails: {} as AccountValidationResProps,
  errors: null,
  message: null,
  isLoading: false,
};

export const cards: CardState = {
  cardValidation: null,
  errors: null,
  message: null,
  isLoading: false,
};

export const transfer: TransferState = {
  cryptoCharge: null,
  stripeIntent: null,
  stripeMethod: null,
  createdCharge: null,
  cryptoChargeReq: null,
  validatedCharge: null,
  verifyTransaction: null,
  accountDetails: null,
  form: {} as TransferForm,
  errors: null,
  message: null,
  isLoading: false,
};
