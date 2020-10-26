export interface AccountValidationReqProps {
  accountNumber?: string;
  sortCode?: string;
  code?: string;
  country: string;
}

export function AccountValidationReq(
  req: AccountValidationReqProps,
  json = req
) {
  switch (json.country) {
    case 'GB':
      return {
        AccountNumber: json.accountNumber,
        SortCode: json.sortCode,
      };
    case 'NG':
      return {
        account_number: json.accountNumber,
        account_bank: json.code,
      };
    default:
      break;
  }
}

export interface AccountValidationResProps {
  accountNumber: string;
}

export interface NGAccountValidationResProps extends AccountValidationResProps {
  accountName: string;
}

export interface UKAccountValidationResProps extends AccountValidationResProps {
  sortCode: string;
  iban: string;
  bank: string;
  bankBIC: string;
  branchBIC: string;
  contactPostTown: string;
  branch: string;
  isDirectDebitCapable: string;
  contactPhone: string;
}

export function AccountDetailsRes(res, extra): AccountValidationResProps {
  switch (extra.country) {
    case 'GB':
      return {
        sortCode: res.correctedSortCode,
        iban: res.iban,
        bank: res.bank,
        bankBIC: res.bankBIC,
        branchBIC: res.branchBIC,
        contactPostTown: res.contactPostTown,
        branch: res.branch,
        isDirectDebitCapable: res.isDirectDebitCapable,
        contactPhone: res.contactPhone,
        accountNumber: res.correctedAccountNumber,
      } as UKAccountValidationResProps;
    case 'NG':
      return {
        accountNumber: res.account_number,
        accountName: res.account_name,
      } as NGAccountValidationResProps;
    default:
      break;
  }
}
