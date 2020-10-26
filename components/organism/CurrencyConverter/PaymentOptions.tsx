import React from 'react';
import { Box } from '@material-ui/core';
import { Text, Button } from '../../atoms';
import SelectedCircle from '../../icons/SelectedCircle';

const PaymentOption = ({
  title,
  icon: Component,
  active,
  onClick = (_) => _,
}) => (
  <Button
    width="100%"
    colorTheme="transparent"
    className={active ? 'active' : ''}
    padding=".2rem 0"
    onClick={onClick}
  >
    <Box display="flex" alignItems="center" flexDirection="column">
      <Text
        padding=".5rem"
        fontSize=".8rem"
        fontWeight="300"
        variant="subtitle1"
      >
        {title}
      </Text>
      <Component color="#fff" fill="inherit" />
    </Box>
  </Button>
);

export default ({ payOption, setPayOption }) => {
  return (
    <Box className="pay-option" display="flex" justifyContent="space-between">
      {[
        { key: 'bankTransfer', text: 'Bank Transfer', active: true },
        { key: 'cashPickup', text: 'Cash Pickup' },
        { key: 'billPayment', text: 'Bill payment' },
      ].map((item, index) => (
        <Box key={index}>
          <PaymentOption
            onClick={() => item.active && setPayOption(item.key)}
            title={item.text}
            active={payOption === item.key}
            icon={SelectedCircle}
          />
        </Box>
      ))}
    </Box>
  );
};
