import React from 'react';
import {
  Box,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
} from '@material-ui/core';
import { Button, Text } from '../atoms';
import { convertToCurrency } from '../../utils';

const TranxListItem = (props) => {
  const theme = useTheme();
  const { handleClick, tranx, item, colorCode } = props;
  return (
    <Button
      onClick={() => handleClick(item)}
      width="100%"
      css={`
        transition: all 0.4s ease;
        box-shadow: ${tranx.id === item.id
          ? '0 1px 10px 0px rgba(0, 0, 0, 0.05)'
          : 'none'};
        transform: scale(${tranx.id === item.id ? 1.02 : 1});
      `}
      colorTheme="transparent"
      padding="0"
      margin="0 0 .5rem"
    >
      <Box
        width="100%"
        display="flex"
        bgcolor={tranx.id === item.id ? '#f9f9f9' : '#fff'}
        flexDirection="column"
        borderRadius=".2rem"
      >
        <Box
          paddingX="1rem"
          justifyContent="space-between"
          width="100%"
          display="flex"
          paddingY=".5rem"
          marginBottom="-1rem"
        >
          <Text fontSize=".7rem" color="#bbb" variant="caption">
            {item.transferDate}
          </Text>
          <Text
            fontSize=".7rem"
            color={colorCode(item.transferStatus)}
            variant="caption"
          >
            {item.transferStatus}
          </Text>
        </Box>
        <ListItem css="padding-top: 0;">
          <ListItemIcon>
            <Avatar css="background: #ffe2ea; font-size: .9rem; width: 2rem; height: 2rem; color: #f7698e;">
              {String(item.beneficiaryName[0]).toUpperCase()}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primaryTypographyProps={{
              color: 'primary',
            }}
            primary={
              <Text
                fontSize=".9rem"
                color={theme.palette.primary.light}
                variant="subtitle1"
              >
                {item.beneficiaryName}
              </Text>
            }
            secondary={
              <Text color="#bbb" fontSize=".7rem" variant="caption">
                {item.paymentType}
              </Text>
            }
          />
          <ListItemSecondaryAction>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
              <Text
                fontSize=".9rem"
                color={theme.palette.primary.light}
                variant="subtitle1"
              >
                -{convertToCurrency(item.chargeAmount)}{' '}
                {String(item.currencyPair).split('/')[0].toUpperCase()}
              </Text>
              <Text fontSize=".7rem" color="#bbb" variant="caption">
                {convertToCurrency(item.transferAmount)}{' '}
                {String(item.transferAmountCurrency.toUpperCase())}
              </Text>
            </Box>
          </ListItemSecondaryAction>
        </ListItem>
      </Box>
    </Button>
  );
};

export default TranxListItem;
