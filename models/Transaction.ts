import { getDate } from '../utils';

export interface TransactionItemResProps {
  transId: string;
  transRef: string;
  chargeAmount: string;
  currencyPair: string;
  paymentType: string;
  senderId: string;
  senderName: string;
  beneficiaryName: string;
  narration: string;
  paymentGateway: string;
  chargeStatus: string;
  transferStatus: string;
  chargeDate: string;
  transferDate: string;
  chargePercentage: string;
  transferAmount: string;
  transferAmountCurrency: string;
  transferRate: string;
  beneficiaryAccountBank: string;
  beneficiaryAccountNumber: string;
  transferRefId: string;
  transferId: string;
  transferStatusMessage: string;
  id: string;
}

export interface TransactionsResProps {
  list: Array<TransactionItemResProps>;
  page: number;
  pageSize: number;
  draw: number;
  total: number;
  pages: number;
}

export function TransactionsRes(resp: {
  records: Array<any>;
  page: number;
  pagesize: number;
  draw: number;
  total: number;
  pages: number;
}): TransactionsResProps {
  return {
    page: resp.page,
    pageSize: resp.pagesize,
    draw: resp.draw,
    total: resp.total,
    pages: resp.pages,
    list: (resp
      ? resp.records.map((res) => ({
          transId: res.trans_id,
          transRef: res.trans_ref,
          chargeAmount: res.charge_amount,
          currencyPair: res.currency_pair,
          paymentType: res.payment_type,
          senderId: res.sender_id,
          senderName: res.sender_name,
          beneficiaryName: res.beneficiary_name,
          narration: res.narration,
          paymentGateway: res.payment_gateway,
          chargeStatus: res.charge_status,
          transferStatus: res.transfer_status,
          chargeDate: getDate(res.charge_date),
          transferDate: getDate(res.transfer_date),
          chargePercentage: res.charge_percentage,
          transferAmount: res.transfer_amount,
          transferAmountCurrency: res.transfer_amount_currency,
          transferRate: res.transfer_rate,
          beneficiaryAccountBank: res.beneficiary_account_bank,
          beneficiaryAccountNumber: res.beneficiary_account_number,
          transferRefId: res.transfer_ref_id,
          transferId: res.transfer_id,
          transferStatusMessage: res.transfer_status_message,
          id: res.id,
        }))
      : []) as TransactionItemResProps[],
  };
}
