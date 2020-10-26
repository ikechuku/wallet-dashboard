export interface CurrencyCvtrResponseProps {
  rate: string;
  fromCurrency: string;
  fromAmount: string;
  toCurrency: string;
  toAmount: string;
  chargeAmount: string;
}
export interface CryptoCurrencyCvtrResponseProps {
  currency: string;
  rates: {
    ngn: string;
    usd: string;
    gbp: string;
    btc: string;
    eth: string;
    ltc: string;
    bch: string;
    usdc: string;
    dai: string;
  };
  charges: {
    chargePercentage: number;
    toCurrency: string;
  }[];
}

export function CryptoCurrencyConvertRes(res): CryptoCurrencyCvtrResponseProps {
  return {
    charges: res.charges?.map?.((val) => {
      const currencyPair = val.currency_pair.split('/');
      return {
        chargePercentage: val.charge_percentage,
        toCurrency: currencyPair[1],
      };
    }),
    currency: res.currency,
    rates: res.rates,
  };
}

export function CurrencyConvertRes(res): CurrencyCvtrResponseProps {
  return {
    rate: res.rate,
    fromCurrency: res.from.currency,
    fromAmount: res.from.amount,
    toCurrency: res.to.currency,
    toAmount: res.to.amount,
    chargeAmount: res.chargeAmount,
  };
}
export interface AbokiRatesResponseProps {
  rate: number;
  fromCurrency: string;
  toCurrency: string;
  chargePercent: number;
}

export function AbokiRatesRes(res): AbokiRatesResponseProps[] {
  if (Array.isArray(res) && res.length > 0) {
    return res.map((rate) => {
      const currencyPair = rate.currency_pair.split('/');
      return {
        rate: Number(rate.sell_rate),
        fromCurrency: currencyPair?.[0],
        toCurrency: currencyPair?.[1],
        chargePercent: Number(rate.card_charge_percentage),
      } as AbokiRatesResponseProps;
    });
  }
  return [] as AbokiRatesResponseProps[];
}

export interface CvtrState {
  currencyConversion: CurrencyCvtrResponseProps;
  cryptoCurrencyConversion: CryptoCurrencyCvtrResponseProps;
  abokiConversion: AbokiRatesResponseProps[];
  errors: any;
  message: string;
  isLoading: boolean;
}

export interface CvtrForm {
  amount: string;
  chargeAmt: string;
  convertedAmount: string;
  inverse: boolean;
  makeReoccuringPayment: boolean;
  rate: string;
  toCurrency: string;
  recipientCountry: string;
  fromCountry: string;
  fromCurrency: string;
  frequency: string;
  firstPayment: string;
  untilPayment: string;
  totalAmount: string;
  fromDailCode: string;
  recipientCountryId: number;
}
