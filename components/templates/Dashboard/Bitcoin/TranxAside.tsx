import React from 'react';
import { Box, useTheme, Divider } from '@material-ui/core';
import { Text, Button } from '../../../atoms';
import { convertToCurrency } from '../../../../utils';
import { TransactionItemResProps } from '../../../../models/Transaction';

const TranxAside = ({ tranx }: { tranx: TransactionItemResProps }) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="27rem"
      maxWidth="500px"
      minWidth="300px"
      width="28%"
      marginLeft="1rem"
    >
      <Box display="flex" width="100%" justifyContent="center" marginY=".4rem">
        <Text color={theme.palette.primary.light} variant="button">
          Transaction Details
        </Text>
      </Box>
      <Box
        display="flex"
        height="100%"
        bgcolor="#fff"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          padding="1rem"
          height="100%"
          width="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          justifyContent="space-between"
        >
          <Box width="100%">
            <Text
              textAlign="center"
              color={theme.palette.primary.light}
              fontWeight="500"
              variant="subtitle1"
            >
              {tranx.beneficiaryName}
            </Text>
            <Text
              textAlign="center"
              fontSize=".7rem"
              color="#ccc"
              variant="body1"
            >
              {tranx.transferDate}
            </Text>
          </Box>
          <Box height="50%" width="100%">
            <Box
              width="100%"
              height="50%"
              display="flex"
              justifyContent="center"
              flexDirection="column"
              flexGrow="1"
            >
              {[
                {
                  left: 'Amount',
                  right: `${convertToCurrency(tranx.transferAmount)} ${String(
                    tranx.transferAmountCurrency.toUpperCase()
                  )}`,
                },
                {
                  left: 'Convert to',
                  right: `${convertToCurrency(tranx.chargeAmount)} ${String(
                    tranx.currencyPair
                  )
                    .split('/')[0]
                    .toUpperCase()}`,
                },
                {
                  left: 'Charge Status',
                  right: tranx.chargeStatus,
                },
                {
                  left: 'Transfer Status',
                  right: tranx.transferStatus,
                },
              ].map((item, key) => (
                <Box
                  key={key}
                  width="100%"
                  display="flex"
                  margin=".2rem 0"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize=".8rem"
                    color="#ccc"
                    fontWeight="400"
                    variant="body1"
                  >
                    {item.left}
                  </Text>
                  <Text
                    fontSize=".8rem"
                    color={theme.palette.primary.light}
                    fontWeight="400"
                    variant="body1"
                  >
                    {item.right}
                  </Text>
                </Box>
              ))}
            </Box>
            <Box
              width="100%"
              display="flex"
              height="50%"
              justifyContent="center"
              flexDirection="column"
              flexGrow="1"
            >
              <Divider />
              {[
                {
                  left: 'Current rate',
                  right: convertToCurrency(tranx.transferRate),
                },
                {
                  left: 'Transfer Number',
                  right: tranx.beneficiaryAccountNumber,
                },
              ].map((item, key) => (
                <Box
                  key={key}
                  width="100%"
                  display="flex"
                  margin=".3rem 0"
                  justifyContent="space-between"
                >
                  <Text
                    fontSize=".8rem"
                    color={theme.palette.primary.light}
                    fontWeight="400"
                    variant="body1"
                  >
                    {item.left}
                  </Text>
                  <Text
                    fontSize=".8rem"
                    color="#ccc"
                    fontWeight="400"
                    variant="body1"
                  >
                    {item.right}
                  </Text>
                </Box>
              ))}
              <Divider />
            </Box>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            width="100%"
          >
            <Text
              fontSize=".8rem"
              color={theme.palette.primary.light}
              fontWeight="300"
              variant="body1"
            >
              Reference
            </Text>
            <Text
              fontSize=".8rem"
              color="#ccc"
              fontWeight="300"
              variant="body1"
            >
              {tranx.narration}
            </Text>
          </Box>
          <Box width="100%" height="2rem">
            <Button
              bgColor={theme.palette.primary.light}
              width="100%"
              height="2rem"
              css="opacity: 0.5;"
            >
              <Text
                fontSize=".8rem"
                color="#fff"
                fontWeight="300"
                variant="button"
              >
                Repeat Transaction
              </Text>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TranxAside;
