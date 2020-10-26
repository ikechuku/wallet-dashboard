import { convertToCurrency } from '../utils';

function useMoneyFormatter(money) {
  let formatMoney;
  if (money === 'NaN' || money === '0' || money === 0) {
    formatMoney = { focus: '', blur: 0 };
  } else {
    formatMoney = {
      focus: money,
      blur: /\./.test(money)
        ? convertToCurrency(money)
        : convertToCurrency(money, 0),
    };
  }
  return formatMoney;
}

export default useMoneyFormatter;
