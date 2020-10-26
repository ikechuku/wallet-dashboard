import React from 'react';
import { useSelector } from 'react-redux';
import { UpdateOutlined } from '@material-ui/icons';
import { Divider, Box, useTheme } from '@material-ui/core';
import MoneyOptions from './MoneyOptions';
import PaymentOptions from './PaymentOptions';
import ChooseCurrency from './ChooseCurrency';
import { Text } from '../../atoms';
import CurrencyCvtrStyle from './CurrencyConverter.style';
import { TransferForm } from '../../../models/Transfer';
import { CountryListResProps } from '../../../models/Countries';
import { AuthState } from '../../../models/Auth';

const TransferConverter = ({
  children,
  hide = false,
  className = 'transfer-ctvr',
  disableToAmount,
  form: frm,
  setForm,
  freezeCountry = false,
}) => {
  const { profile }: AuthState = useSelector((state) => state.auth);
  const form = frm as TransferForm;
  const [cashOption, setCashOption] = React.useState(
    form.fromCountry === 'CRYPTO' ? 'crypto' : 'cash'
  );
  const [payOption, setPayOption] = React.useState('bankTransfer');
  /* const [reoccur] = React.useState(form.makeReoccuringPayment); */
  const theme = useTheme();
  React.useEffect(() => {
    if (cashOption === 'cash') {
      const country = profile ? profile.country : null;
      setForm({
        ...form,
        fromCurrency: country ? country?.currencyCode : 'GBP',
        fromCountry: country ? country?.countryCode : 'GBP',
        fromFlag: '',
        amount: '1000',
      });
    } else if (cashOption === 'crypto') {
      setForm({
        ...form,
        fromCurrency: 'BTC',
        fromCountry: 'CRYPTO',
        fromFlag: '',
        amount: '1',
      });
    }
  }, [cashOption]);

  return (
    <CurrencyCvtrStyle className={className}>
      <Box width="100%" minWidth="330px">
        <Box className="hd" padding="0.8rem">
          {!hide && (
            <MoneyOptions
              cashOption={cashOption}
              setCashOption={
                /* form.convertedAmount ?  */ setCashOption /* : (_) => _ */
              }
            />
          )}
          {!hide && (
            <PaymentOptions payOption={payOption} setPayOption={setPayOption} />
          )}
          <Box className="rate-info" position="relative" width="100%">
            <Box width="100%">
              <ChooseCurrency
                id="transfer-send-rate-from-currency"
                title="You send them"
                type={cashOption}
                money={form.amount}
                setMoney={(val) =>
                  setForm({
                    ...form,
                    inverse: false,
                    amount: val,
                  })
                }
                country={{
                  currency: form.fromCurrency,
                  flag: form.fromFlag,
                  countryCode: form.fromCountry,
                }}
                selectCountry={(ctry) =>
                  setForm({
                    ...form,
                    inverse: false,
                    fromFlag: ctry.flag,
                    fromCountry: ctry.countryCode,
                    fromCurrency: ctry.currencyCode,
                    fromDailCode: ctry.dialCode,
                  })
                }
              />
              <Divider css="height: 1px; background: #d2dbf8;" />
              <ChooseCurrency
                id="transfer-recieve-rate-from-currency"
                title="And they get"
                money={form.convertedAmount}
                disabled={disableToAmount}
                country={{
                  currency: form.toCurrency,
                  flag: form.toFlag,
                  countryCode: form.recipientCountry,
                }}
                freezeCountry={freezeCountry}
                setMoney={(val) =>
                  setForm({
                    ...form,
                    convertedAmount: val,
                    inverse: true,
                  })
                }
                selectCountry={(ctry: CountryListResProps) =>
                  setForm({
                    ...form,
                    inverse: false,
                    recipientCountry: ctry.countryCode,
                    toFlag: ctry.flag,
                    toCurrency: ctry.currencyCode,
                    recipientCountryId: ctry.id,
                  })
                }
              />

              <Box
                display="flex"
                margin=".5rem 0 0"
                justifyContent="center"
                alignItems="center"
              >
                <Box display="inline-block" color="#35EDD1">
                  <UpdateOutlined
                    css="vertical-align: middle;"
                    color="inherit"
                    fontSize="small"
                  />
                </Box>
                <Text
                  color="#9da8b6"
                  fontWeight="300"
                  padding="0 0 0 .5rem"
                  variant="caption"
                >
                  Should arrive by{' '}
                  <Text
                    fontWeight="500"
                    variant="caption"
                    color={
                      className === 'transfer-ctvr'
                        ? theme.palette.primary.light
                        : '#fff'
                    }
                  >
                    January 22nd
                  </Text>
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box width="100%" marginTop=".5rem">
          {[
            {
              left: 'Rate',
              right: `1${form.fromCurrency} = ${form?.rate || 'N/A'} ${
                form.toCurrency
              }`,
            },
            {
              left: 'Fees',
              right: `${form.chargeAmt}`,
            },
            {
              left: 'Total Amount to pay',
              right: `${form.totalAmount}`,
              color:
                className === 'transfer-ctvr'
                  ? theme.palette.primary.light
                  : '#fff',
            },
          ].map((item, index) => (
            <Box
              key={index}
              display="flex"
              alignItems="center"
              paddingX="1rem"
              width="100%"
              height="1.9rem"
              justifyContent="space-between"
            >
              <Text
                textAlign="left"
                color="#cbcbcb"
                fontWeight="400"
                fontSize=".8rem"
                variant="caption"
              >
                {item.left}
              </Text>
              <Text
                textAlign="right"
                fontWeight="400"
                color={item.color || '#cbcbcb'}
                fontSize=".8rem"
                padding="0 0 0 .5rem"
                variant="caption"
              >
                {item.right}
              </Text>
            </Box>
          ))}
        </Box>

        {children}
      </Box>
    </CurrencyCvtrStyle>
  );
};

export default TransferConverter;
