import React from 'react';
import { Box } from '@material-ui/core';
import { Text } from '../../atoms';
import InputAmount from './InputAmount';
import FiatCurrencyList from './FiatCurrencyList';
import CryptoCurrencyList from './CryptoCurrencyList';

export default ({
  country,
  id,
  setMoney = (_) => _,
  selectCountry,
  money,
  type = 'cash',
  freezeCountry = false,
  title,
  disabled = false,
}) => {
  return (
    <React.Fragment key="bottom">
      <Box
        display="flex"
        position="relative"
        className="money-converter"
        alignItems="flex-start"
        marginTop=".7rem"
      >
        <Box
          display="flex"
          width="50%"
          alignItems="flex-end"
          css={`
            pointer-events: ${freezeCountry ? 'none' : ''};
          `}
          justifyContent="flex-start"
        >
          {type === 'cash' ? (
            <FiatCurrencyList
              selectedCountry={country}
              selectCountry={selectCountry}
              id={id}
            />
          ) : (
            <CryptoCurrencyList
              selectedCountry={country}
              selectCountry={selectCountry}
              id={id}
            />
          )}
        </Box>
        <Box
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
          width="50%"
          paddingRight=".5rem"
        >
          <Text
            color="rgba(255,255,255, .4)"
            textAlign="right"
            fontWeight="300"
            className="transfer-msg"
            variant="caption"
          >
            {title}
          </Text>
          <InputAmount setMoney={setMoney} disabled={disabled} money={money} />
        </Box>
      </Box>
    </React.Fragment>
  );
};
