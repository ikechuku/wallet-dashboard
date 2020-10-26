import React from 'react';
import { Box, InputBase } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import useMoneyFormatter from '../../../hooks/useMoneyFormatter';

const InputAmount = ({ setMoney = (_) => _, money, disabled = false }) => {
  const [focus, setFocus] = React.useState(false);
  const formatMoney = useMoneyFormatter(money);
  return (
    <Box display="flex" justifyContent="flex-end">
      {money !== null ? (
        <InputBase
          disabled={disabled}
          className="money-value"
          value={focus ? formatMoney.focus : formatMoney.blur}
          onBlur={() => {
            setMoney(
              /\./.test(money)
                ? Number(money).toFixed(2)
                : Number(money).toFixed(0)
            );
            setFocus(false);
          }}
          onFocus={() => setFocus(true)}
          onChange={(e) => {
            if (Number.isNaN(Number(e.target.value))) {
              setMoney(money);
            } else if (e.target.value === '') {
              setMoney('0');
            } else setMoney(e.target.value);
          }}
          inputProps={{ 'aria-label': 'naked' }}
        />
      ) : (
        <Skeleton animation="wave" width={150} height={35} variant="rect" />
      )}
    </Box>
  );
};

export default InputAmount;
