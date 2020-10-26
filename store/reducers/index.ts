import { combineReducers } from 'redux';
import auth from './authReducer';
import dashboard from './dashboardReducer';
import banks from './bankReducer';
import countries from './countryReducer';
import cards from './cardReducer';
import cvtr from './cvtrReducer';
import resetPass from './resetPassReducer';
import transfer from './transferReducer';
import otp from './otpReducer';
import recipients from './RecipientReducer';

const reducers = combineReducers({
  auth,
  dashboard,
  transfer,
  cvtr,
  resetPass,
  banks,
  countries,
  cards,
  otp,
  recipients,
});

export default reducers;
