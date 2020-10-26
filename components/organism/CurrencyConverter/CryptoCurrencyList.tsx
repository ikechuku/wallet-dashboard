import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { Text, Button } from '../../atoms';
import { GetCryptoCurrencyAsync } from '../../../store/actions/countryActions';
import theme from '../../../utils/theme';
import { CountriesState } from '../../../models/Countries';
import CountryFlag from '../../shared/CountryFlag';
import SimpleDropDown from '../CustomDropDown/SimpleDropDown';

const CryptoCurrencyList = ({ id, selectedCountry, selectCountry }) => {
  const dispatch = useDispatch();
  const { currencies }: CountriesState = useSelector(
    (state) => state.countries
  );

  React.useEffect(() => {
    if (!(currencies && currencies.length > 0)) {
      dispatch(GetCryptoCurrencyAsync());
    }
  }, []);

  return (
    <SimpleDropDown
      selectedItem={selectedCountry.currency}
      dropDownWidth="18rem"
      inputWidth="70%"
      id={id}
      params={{ name: 'currency' }}
      list={currencies}
      showSearch
      showBorder={false}
      searchProperty="currencyName"
      property="currencyCode"
      selectItem={(val) => {
        selectCountry({
          countryCode: val.countryCode,
          currencyCode: val.currencyCode,
          flag: val.flag,
        });
      }}
      makeItem={(item, index) => (
        <Box
          width="100%"
          display="flex"
          alignItems="flex-start"
          flexDirection="column"
        >
          {index === 0 && (
            <Text
              margin=".5rem 0 .5rem .7rem"
              color={theme.palette.primary.light}
              variant="button"
              fontSize=".6rem"
            >
              All Currencies
            </Text>
          )}
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            css="padding: .5rem;"
          >
            <CountryFlag flag={item.flag} countryCode={item.countryCode} />
            <Box textAlign="left" display="flex" alignItems="center">
              <Text padding="0 .5rem" fontSize=".9rem" variant="subtitle2">
                {item.currencyCode}
              </Text>
              <Text fontWeight="300" fontSize=".7rem" variant="subtitle2">
                {item.currencyName}
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    >
      {({ item }: any) => {
        return (
          <Button padding="0 .5rem" colorTheme="transparent">
            <Box display="flex" alignItems="center">
              <CountryFlag
                countryCode={item.target.value}
                flag={item.flag || ''}
              />
              <Text
                className="currency"
                padding="0 .2rem 0 .5rem"
                fontSize="1.2rem"
                variant="overline"
                fontWeight="400"
              >
                {selectedCountry.currency}
              </Text>
            </Box>
          </Button>
        );
      }}
    </SimpleDropDown>
  );
};

export default React.memo(CryptoCurrencyList);
