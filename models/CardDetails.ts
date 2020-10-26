export interface CardValidationResProps {
  countryOrigin: string;
  bin: string;
  cardType: string;
  issuer: string;
}

export function CardValidationRes(res): CardValidationResProps {
  return {
    countryOrigin: res.issuing_country,
    bin: res.bin,
    cardType: res.card_type,
    issuer: res.issuer_info,
  };
}

export interface CardState {
  cardValidation: CardValidationResProps;
  errors: any;
  message: string;
  isLoading: boolean;
}
