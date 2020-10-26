export interface CountryListResProps {
  name: string;
  countryCode?: string;
  longCode?: string;
  dialCode?: string;
  flag: string;
  currencyName: string;
  currencyCode: string;
  id: number;
}

export function CountriesListRes(resp: {
  records: Array<any>;
}): CountryListResProps[] {
  return resp
    ? resp.records.map((res) => ({
        name: res.Name,
        countryCode: res.CountryCode2,
        longCode: res.CountryCode3,
        dialCode: res.DialCode,
        flag: res.FlagIcon,
        currencyName: res.Currency,
        currencyCode: res.CurrencyCode,
        id: res.Id,
      }))
    : [];
}

export function CurrencyListRes(resp: {
  records: Array<any>;
}): CountryListResProps[] {
  return resp
    ? resp.records.map((res) => ({
        name: res.name,
        countryCode: 'CRYPTO',
        longCode: 'CRYPTO',
        dialCode: '000',
        flag: res.flagIcon,
        currencyName: res.currency,
        currencyCode: res.currencyCode,
        id: res.id,
      }))
    : [];
}
export interface CountriesState {
  countries: CountryListResProps[];
  currencies: CountryListResProps[];
  errors: any;
  message: string;
  isLoading: boolean;
}
