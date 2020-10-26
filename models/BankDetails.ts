import { AccountValidationResProps } from './AccountDetails';
import { bvnValidationMock } from '../utils';

export interface BankListResProps {
  name: string;
  code: string;
  id: number;
}
export function BankListRes(resp: Array<any>): BankListResProps[] {
  return resp
    ? resp.map((res) => ({
        name: res.name,
        code: res.code,
        id: res.id,
      }))
    : [];
}
export function BVNValidationRes(res): BVNValidationResProps {
  return {
    firstName: res.first_name,
    lastName: res.last_name,
    dob: res.dob,
    mobile: res.mobile,
    bvn: res.bvn,
  };
}

export interface BankState {
  banks: BankListResProps[];
  accountDetails: AccountValidationResProps;
  errors: any;
  message: string;
  isLoading: boolean;
}

export interface BVNValidationResProps {
  firstName: string;
  lastName: string;
  dob: string;
  mobile: string;
  bvn: string;
}
