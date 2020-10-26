import Router from 'next/router';
import { emptyObj, updateToLocalStorage } from '.';
import { TransferState } from '../models/Transfer';
import { EDIT_TRANSFER } from '../store/actions/actionTypes';

/* eslint-disable import/prefer-default-export */
export const TransferRoutes = {
  TRANFER_TYPE: 'tranfer-type',

  SENDER_DETAILS: 'sender-details',

  ENTER_BUSINESS: 'business-details',

  ENTER_PERSONAL: 'personal-details',

  CONFIRM_BUSINESS: 'confirm-business',

  RECIPIENT: 'recipient',

  PAYMENT_METHOD: 'payment-method',

  ENTER_PAYMENT: 'enter-payment',

  CONFIRM_PAYMENT: 'confirm-payment',

  CASH_PAYMENT_METHODS: 'cash-payment-methods',

  CRYPTO_PAYMENT_METHODS: 'crypto-payment-methods',

  CRYPTO_PAYMENT: 'crypto-payment',

  CARD_DETAILS: 'card-details',

  VALIDATE_CHARGE: 'validate-charge',

  CRYPTO_TRANFER_PAGE: 'crypto-transfer-page',
};

export const transferNavigate = ({ route, obj = {}, navigate = true }) => {
  if (!emptyObj((obj as TransferState)?.form ?? {})) {
    updateToLocalStorage({
      obj: { state: obj, action: EDIT_TRANSFER },
      parent: 'user',
      key: 'form',
    });
  }
  if (navigate) {
    Router.push(`/transfer?page=${route}`, undefined, {
      shallow: true,
    });
  }
};

export const FeatureType = {
  VERIFY_EMAIL: 1,
  PASS_RESET: 2,
};
