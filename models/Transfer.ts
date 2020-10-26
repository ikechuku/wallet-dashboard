import { formatPhone } from '../utils';
import { AccountValidationResProps } from './AccountDetails';
import { CreateRecipientReqProps } from './RecipientDetails';

export interface CryptoPaymentReqProps {
  paymentMethodId?: string;
  fromAmount: number;
  tranxId: string;
  toAmount: number;
  toCurrency: string;
  fromCurrency: string;
  bankCode: string;
  bankName: string;
  narration: string;
  accountNumber: string;
  accountName: string;
}

interface CreateChargeReqProps {
  cardNumber: string;
  cvv: string;
  fromCurrency: string;
  amount: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dialCode: string;
}

export interface CreatePaymentIntentReqProps extends StripeMethodResProps {
  saveCard: boolean;
  recipient: CreateRecipientReqProps;
}

interface ValidateChargeReqProps {
  token: string;
  flwRef: string;
}

export function ValidateChargeReq(req: ValidateChargeReqProps, json = req) {
  return {
    otp: json.token,
    flw_ref: json.flwRef,
  };
}

export function CryptoPaymentReq(req: CryptoPaymentReqProps, json = req) {
  return {
    payment_method_id: 'CRYPTO',
    crypto_currency_amount: json.fromAmount,
    fiat_currency_amount: json.toAmount,
    currency_pair: `${json.fromCurrency}/${json.toCurrency}`,
    beneficiary_bank_name: json.bankName,
    beneficiary_bank_code: json.bankCode,
    beneficiary_account_number: json.accountNumber,
    narration: json.narration,
    beneficiary_account_name: json.accountName,
    correlation_id: json.tranxId,
  };
}

export function CreateChargeReq(req: CreateChargeReqProps, json = req) {
  return {
    card_number: json.cardNumber,
    cvv: json.cvv,
    expiry_month: '9',
    expiry_year: '32',
    currency: json.fromCurrency,
    amount: json.amount,
    fullname: `${json.firstName} ${json.lastName}`,
    email: json.email,
    phone_number: formatPhone(json.phoneNumber, json.dialCode),
  };
}

export function CreatePaymentIntentReq(
  req: CreatePaymentIntentReqProps,
  json = req
) {
  return {
    payment_method_id: json.paymentMethodId,
    payment_intent_id: json.paymentIntentId,
    account_name: json.accountName,
    amount: Number(json.amount),
    currency_pair: json.currencyPair,
    bank_name: json.bank,
    bank_code: json.recipient.bankCode,
    account_number: json.accountNumber,
    narration: '',
    tokenize_card: json.saveCard,
    recipient: {
      country_id: json.recipient.countryId,
      name: json.recipient.name,
      bank_name: json.recipient.bankName,
      account_number: json.recipient.accountNumber,
      sortcode: json.recipient.sortCode,
      swift_code: json.recipient.swiftCode,
      bank_code: json.recipient.bankCode,
      tag: json.recipient.tag,
    },
  };
}

export function VerifyTransactionReq(
  req: VerifyTransactionReqProps,
  json = req
) {
  return {
    transaction_id: json.tranxRef,
    bank_bic: json.bankBIC,
    branch_bic: json.branchBIC,
    beneficiary_bank_name: json.bankName,
    beneficiary_bank_code: json.recipient.sortCode,
    currency_pair: json.currencyPair,
    beneficiary_name: json.recipientName,
    narration: json.narration,
    beneficiary_account_number: json.recipient.accountNumber,
    validate_charge: {
      otp: json.otp,
      flw_ref: json.flwRef,
    },
    tokenize_card: json.saveCard,
    recipient: {
      country_id: json.recipient.countryId,
      name: json.recipient.name,
      bank_name: json.recipient.bankName,
      account_number: json.recipient.accountNumber,
      sortcode: json.recipient.sortCode,
      swift_code: json.bankBIC,
      bank_code: json.recipient.bankCode,
      tag: json.recipient.tag,
    },
  };
}

export interface PayIntentSuccessResProps {
  success: boolean;
}
export interface PayIntentActionResProps {
  requiresAction: boolean;
  paymentIntentClientSecret: string;
}

export function CreatePaymentIntentRes(
  res
): PayIntentSuccessResProps | PayIntentActionResProps {
  return res.success
    ? {
        success: res.success,
      }
    : {
        requiresAction: res.requires_action,
        paymentIntentClientSecret: res.payment_intent_client_secret,
      };
}

export interface CreateChargeResProps extends ChargeRes {
  authModel: string;
  ip: string;
  fraudStatus: string;
  card: ChargedCustomerCardProps;
}
export interface CryptoPaymentResProps {
  url: string;
}

export interface VerifyTransactionReqProps {
  tranxRef: string;
  bankBIC: string;
  branchBIC: string;
  bankName: string;
  currencyPair: string;
  recipientName: string;
  narration: string;
  iban: string;
  otp: string;
  flwRef: string;
  saveCard: boolean;
  recipient: CreateRecipientReqProps;
}

export interface ChargeRes {
  id: string;
  txRef: string;
  flwRef: string;
  amount: string;
  chargedAmount: string;
  appFee: string;
  merchantFee: string;
  currency: string;
  processorResponse: string;
  narration: string;
  status: string;
  paymentType: string;
  accountId: string;
  customer: ChargedCustomerProps;
}

export interface ValidateChargeResProps extends ChargeRes {
  authUrl: string;
}

export interface ChargedCustomerProps {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
}

export interface ChargedCustomerCardProps {
  first6digits: string;
  last4digits: string;
  issuer: string;
  country: string;
  type: string;
  expiry: string;
}

export function CreateChargeRes(res): CreateChargeResProps {
  return {
    id: res.id,
    txRef: res.tx_ref,
    flwRef: res.flw_ref,
    amount: res.amount,
    chargedAmount: res.charged_amount,
    appFee: res.app_fee,
    merchantFee: res.merchant_fee,
    processorResponse: res.processor_response,
    authModel: res.auth_model,
    currency: res.currency,
    ip: res.ip,
    narration: res.narration,
    status: res.status,
    paymentType: res.payment_type,
    fraudStatus: res.fraud_status,
    accountId: res.account_id,
    customer: {
      id: res?.customer?.id,
      phoneNumber: res?.customer?.phone_number,
      name: res?.customer?.phone_number,
      email: res?.customer?.phone_number,
    } as ChargedCustomerProps,
    card: {
      first6digits: res?.card?.first_6digits,
      last4digits: res?.card?.last_4digits,
      issuer: res?.card?.issuer,
      country: res?.card?.country,
      type: res?.card?.type,
      expiry: res?.card?.expiry,
    } as ChargedCustomerCardProps,
  };
}

export function CryptoPaymentRes(
  res,
  extra: CryptoPaymentReqProps
): CryptoPaymentResProps {
  let url = '';
  switch (extra.fromCurrency) {
    case 'BCH':
      url = res.data.addresses.bitcoincash;
      break;
    case 'LTC':
      url = res.data.addresses.litecoin;
      break;
    case 'BTC':
      url = res.data.addresses.bitcoin;
      break;
    case 'ETH':
      url = res.data.addresses.ethereum;
      break;
    case 'DAI':
      url = res.data.addresses.dai;
      break;
    case 'USDC':
      url = res.data.addresses.usdc;
      break;
    default:
      break;
  }
  return { url };
}

export function ValidateChargeRes(res): ValidateChargeResProps {
  return {
    id: res.id,
    txRef: res,
    flwRef: res,
    amount: res,
    chargedAmount: res,
    appFee: res,
    merchantFee: res,
    processorResponse: res,
    currency: res,
    narration: res,
    status: res,
    authUrl: res.auth_url,
    paymentType: res.payment_type,
    accountId: res.account_id,
    customer: {
      id: res?.customer?.id,
      phoneNumber: res?.customer?.phone_number,
      name: res?.customer?.name,
      email: res?.customer?.email,
    } as ChargedCustomerProps,
  };
}

export function VerifyTransactionRes(res): VerifyTransactionResProps {
  return {
    success: res.success,
  };
}

export interface VerifyTransactionResProps {
  success: boolean;
}
export interface TransferState {
  stripeIntent: PayIntentSuccessResProps | PayIntentActionResProps;
  createdCharge: CreateChargeResProps;
  cryptoCharge: CryptoPaymentResProps;
  cryptoChargeReq: CryptoPaymentReqProps;
  validatedCharge: ValidateChargeResProps;
  verifyTransaction: VerifyTransactionResProps;
  stripeMethod: StripeMethodResProps;
  accountDetails: AccountValidationResProps;
  form: TransferForm;
  errors: any;
  message: string;
  isLoading: boolean;
}

export interface TransferForm {
  postalCode: string;
  frequency: string;
  firstPayment: string;
  untilPayment: string;
  recipientTag: string;
  recipientCountryId: number;
  address: string;
  fromFlag: string;
  toFlag: string;
  email: string;
  narration: string;
  chargeAmt: string;
  city: string;
  firstName: string;
  totalAmount: string;
  senderCountry: string;
  lastName: string;
  dialCode: string;
  phoneNumber: string;
  birthDate: string;
  fromCurrency: string;
  fromCountry: string;
  amount: string;
  newRecipientName: string;
  convertedAmount: string;
  cardHolderName: string;
  cardNumber: string;
  paymentRef: string;
  expiry: string;
  cvv: string;
  rate: string;
  fromDailCode: string;
  bank: string;
  bankName: string;
  sortCode: string;
  swiftCode: string;
  accountNumber: string;
  existingRecipient: string;
  newRecipientEmail: string;
  recipientCountry: string;
  toCurrency: string;
  makeReoccuringPayment: boolean;
  saveCard: boolean;
  cryptoPayPage?: boolean;
  sendEmail: boolean;
  sendRecipient: SendRecipient;
}

export interface SendRecipient {
  toCurrency: string;
  recipientCountry: string;
  recipientCountryId: number;
  accountDetails: AccountValidationResProps;
  sendEmail: boolean;
  newRecipientName: string;
  accountNumber: string;
  bank: string;
  bankName: string;
  sortCode: string;
  recipientTag: string;
}

export interface StripeMethodResProps {
  paymentMethodId: string;
  bank: string;
  accountName: string;
  accountNumber: string;
  amount: string;
  paymentIntentId: string;
  currencyPair: string;
}
