import { CountryListResProps } from './Countries';

export interface ProfileResProps {
  userId: string;
  userProfileType: string;
  address: string;
  city: string;
  country?: CountryListResProps;
  countryId: number;
  postalCode: string;
  dialCode: string;
  phoneNumber: string;
  mobileVerified: string;
  isEmailVerified: boolean;
  name: string;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
  website: string;
  companyTypeName: string;
  registrationNumber: string;
  categoryId: string;
  subCategoryId: string;
  id: string;
  isTransferProfile: boolean;
}

export interface UpdateProfileReqProps {
  Address?: string;
  id: string;
  City?: string;
  PostalCode?: string;
  DialCode?: string;
  MobileNumber?: string;
  Website?: string;
  CompanyTypeName?: string;
  RegistrationNumber?: string;
  CategoryId?: number;
  SubCategoryId?: number;
  Firstname?: string;
  Lastname?: string;
  DateOfBirth?: string /* '2020-08-09T22:14:34.842Z' */;
}

export function UpdateProfileReq(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  { id, ...rest }: UpdateProfileReqProps,
  json = rest
) {
  if (json.DateOfBirth) {
    json.DateOfBirth = new Date(json.DateOfBirth).toISOString();
  }
  return json;
}

export function ProfileRes(resp: { records: Array<any> }): ProfileResProps[] {
  return resp.records.map((res) => ({
    userId: res.UserId,
    userProfileType: res.UserProfileTypeId === 1 ? 'PERSONAL' : 'BUSINESS',
    address: res.Address,
    city: res.City,
    countryId: res.CountryId,
    postalCode: res.PostalCode,
    dateOfBirth: res.DateOfBirth,
    firstName: res.Firstname,
    lastName: res.Lastname,
    dialCode: res.DialCode,
    phoneNumber: res.MobileNumber,
    mobileVerified: res.MobileVerified,
    isEmailVerified: res.EmailVerified,
    name: res.Name,
    website: res.Website,
    companyTypeName: res.CompanyTypeName,
    registrationNumber: res.RegistrationNumber,
    categoryId: res.CategoryId,
    subCategoryId: res.SubCategoryId,
    id: res.Id,
    isTransferProfile:
      res.Firstname &&
      res.Lastname &&
      res.MobileNumber &&
      res.DialCode &&
      res.Address &&
      res.City &&
      res.DateOfBirth &&
      res.PostalCode,
  }));
}

export function UpdateProfileRes(res): ProfileResProps {
  return {
    userId: res.UserId,
    userProfileType: res.UserProfileTypeId === 1 ? 'PERSONAL' : 'BUSINESS',
    address: res.Address,
    city: res.City,
    countryId: res.CountryId,
    postalCode: res.PostalCode,
    firstName: res.Firstname,
    dateOfBirth: res.DateOfBirth,
    lastName: res.Lastname,
    dialCode: res.DialCode,
    phoneNumber: res.MobileNumber,
    mobileVerified: res.MobileVerified,
    isEmailVerified: res.EmailVerified,
    name: res.Name,
    website: res.Website,
    companyTypeName: res.CompanyTypeName,
    registrationNumber: res.RegistrationNumber,
    categoryId: res.CategoryId,
    subCategoryId: res.SubCategoryId,
    id: res.Id,
    isTransferProfile:
      res.Firstname &&
      res.Lastname &&
      res.MobileNumber &&
      res.DialCode &&
      res.Address &&
      res.City &&
      res.DateOfBirth &&
      res.PostalCode,
  };
}
