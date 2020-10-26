export interface RecipientResItem extends CreateRecipientReqProps {
  id: number;
  currencyCode: string;
  countryCode: string;
}
export interface CreateRecipientReqProps {
  countryId?: number;
  name: string;
  bankName: string;
  bankCode?: string;
  accountNumber: string;
  tag?: string;
  sortCode?: string;
  swiftCode?: string;
}

export function CreateRecipientsRes(res): RecipientResItem {
  return {
    countryId: res.country_id,
    name: res.name,
    bankName: res.bank_name,
    bankCode: res.bank_code,
    accountNumber: res.account_number,
    sortCode: res.sortcode,
    countryCode: res.countrycode2,
    swiftCode: res.swift_code,
    id: res.id,
    currencyCode: res.currency_code,
  };
}

export function CreateRecipientReq(req: CreateRecipientReqProps, json = req) {
  const request = {
    country_id: json.countryId,
    name: json.name,
    bank_name: json.bankName,
    bank_code: null,
    account_number: json.accountNumber,
    sortcode: null,
    swift_code: null,
    tag: json.tag,
  };

  if (json.bankCode) request.bank_code = json.bankCode;
  if (json.sortCode) request.sortcode = json.sortCode;
  if (json.swiftCode) request.swift_code = json.swiftCode;

  return request;
}
export interface RecipientResProps {
  list: Array<RecipientResItem>;
  page: number;
  pageLength: number;
  pageSize: number;
  draw: number;
  total: number;
  pages: number;
}

export function RecipientsRes(resp: {
  records: Array<any>;
  page: number;
  pagesize: number;
  draw: number;
  total: number;
  pages: number;
}): RecipientResProps {
  return {
    page: resp.page,
    pageSize: resp.pagesize,
    draw: resp.draw,
    total: resp.total,
    pages: resp.pages,
    pageLength: resp?.records.length,
    list: resp?.records.map(
      (res): RecipientResItem => ({
        countryId: res.country_id,
        name: res.name,
        bankName: res.bank_name,
        accountNumber: res.account_number,
        bankCode: res.bank_code,
        sortCode: res.sortcode,
        countryCode: res.countrycode2,
        swiftCode: res.swift_code,
        currencyCode: res.currency_code,
        id: res.id,
        tag: res.tag,
      })
    ),
  };
}

export interface RecipientState {
  errors: any;
  myselfList: RecipientResProps;
  othersList: RecipientResProps;
  message: string;
  isLoading: boolean;
}
