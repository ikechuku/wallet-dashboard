import React from 'react';
import { Box } from '@material-ui/core';
import CashIcon from '../../icons/CashIcon';
import { Text, Button } from '../../atoms';
import CryptoIcon from '../../icons/CryptoIcon';

const MoneyOption = ({
  title,
  icon: Component,
  active,
  onClick = (_) => _,
}) => (
  <Box width="100%">
    <Button
      borderRadius=".2rem"
      width="100%"
      className={`${active ? 'active' : ''}`}
      padding=".2rem 1rem"
      onClick={onClick}
    >
      <Component color="inherit" width="1.2rem" height="1.2rem" />
      <Text
        padding="0 0 0 .3rem"
        fontSize="1rem"
        fontWeight="300"
        variant="subtitle1"
      >
        {title}
      </Text>
    </Button>
  </Box>
);

export default ({ cashOption, setCashOption }) => {
  return (
    <Box className="money-option" display="flex">
      <MoneyOption
        active={cashOption === 'cash'}
        onClick={() => setCashOption('cash')}
        title="Cash"
        icon={CashIcon}
      />
      <MoneyOption
        active={cashOption === 'crypto'}
        onClick={() => setCashOption('crypto')}
        title="Crypto"
        icon={CryptoIcon}
      />
    </Box>
  );
};
