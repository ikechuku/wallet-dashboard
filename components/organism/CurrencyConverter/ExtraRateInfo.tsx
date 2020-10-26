import React from 'react';
import { Box, Fade } from '@material-ui/core';
import { convertToCurrency } from '../../../utils';
import { Text } from '../../atoms';

const ExtraRateInfo = ({ form, detailed = false }) => {
  return (
    <Fade in={detailed}>
      <Box position="absolute" left="0" width="100%" top="1rem">
        {[
          {
            left: 'You send them',
            right: `${convertToCurrency(form.amount)} ${form.fromCurrency}`,
          },
          {
            left: 'Rate',
            right: `1${form.fromCurrency} = ${form?.rate || 'N/A'} ${
              form.toCurrency
            }`,
            fontsize: '.7rem',
          },
          {
            left: 'You send them',
            right: 'First 5 Transactions FREE',
            fontsize: '.7rem',
            color: '#ff4141',
          },
        ].map((item, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            width="100%"
            height="1.9rem"
            justifyContent="space-between"
          >
            <Text
              textAlign="left"
              color="#9da8b6"
              fontWeight="300"
              padding="0 0 0 .5rem"
              variant="caption"
            >
              {item.left}
            </Text>
            <Text
              textAlign="right"
              fontWeight="300"
              color={item.color || '#9da8b6'}
              fontSize={item.fontsize || '1rem'}
              padding="0 0 0 .5rem"
              variant="caption"
            >
              {item.right}
            </Text>
          </Box>
        ))}
        <Box
          display="flex"
          alignItems="center"
          textAlign="left"
          height="3rem"
          paddingBottom=".5rem"
          borderBottom="1px solid rgba(0,0,0,.06)"
        >
          <Text
            color="green"
            fontWeight="300"
            padding="0 0 0 .5rem"
            variant="caption"
          >
            Promo code?
          </Text>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          textAlign="left"
          height="3rem"
        >
          <Text
            color="#9da8b6"
            fontWeight="300"
            padding="0 0 0 .5rem"
            variant="caption"
          >
            They get
          </Text>
          <Text
            textAlign="right"
            fontWeight="300"
            color="#9da8b6"
            fontSize="1rem"
            padding="0 0 0 .5rem"
            variant="caption"
          >
            {convertToCurrency(form.convertedAmount)} {form.toCurrency}
          </Text>
        </Box>
      </Box>
    </Fade>
  );
};

export default ExtraRateInfo;
