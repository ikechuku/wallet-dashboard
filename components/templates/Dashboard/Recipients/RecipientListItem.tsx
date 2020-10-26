import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  ListItem,
  ListItemIcon,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  useTheme,
  Collapse,
} from '@material-ui/core';
import { DeleteOutline } from '@material-ui/icons';
import Router from 'next/router';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { Button, Text } from '../../../atoms';
import { RecipientResItem } from '../../../../models/RecipientDetails';
import CashIcon from '../../../icons/CashIcon';
import { RecipientListItemStyle } from './styles';
import { AccountDetailsAsync } from '../../../../store/actions/bankActions';
import { encryptKey } from '../../../../utils';
import { SendRecipient } from '../../../../models/Transfer';
import Spinner from '../../../atoms/Spinner';

const RecipientListItem = ({ handleClick, setItemToDelete, ...props }) => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.banks);
  const { recipient }: { recipient: RecipientResItem } = props as any;
  const { item }: { item: RecipientResItem } = props as any;
  const theme = useTheme();

  return (
    <RecipientListItemStyle>
      <ClickAwayListener
        onClickAway={() => {
          if (recipient?.id === item?.id) handleClick(null);
        }}
      >
        <Box>
          <Box
            onClick={() => {
              handleClick(item);
            }}
            role="button"
            width="100%"
            bgcolor="transparent"
            padding="0"
            margin="0 0 .5rem"
          >
            <Box
              width="100%"
              display="flex"
              flexDirection="column"
              className="list-box"
              css="transition: background .3s ease-out;"
              borderRadius=".6rem"
              bgcolor={recipient?.id === item?.id ? '#fff' : null}
            >
              <ListItem
                className="list-con"
                css={`
                  padding: 0.4rem;
                  ${recipient?.id === item?.id
                    ? ''
                    : 'border-bottom: 1px solid #ddd'}
                `}
              >
                <ListItemIcon css="min-width: 2.9rem;">
                  <Avatar
                    className="avatar"
                    css="background: #F0E2FF; font-size: .9rem; width: 2rem; height: 2rem; color: #6F3FA2;"
                  >
                    {String(item.name[0]).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    color: 'primary',
                  }}
                  primary={
                    <Text
                      className="name"
                      fontSize="1rem"
                      color={theme.palette.primary.light}
                      variant="subtitle1"
                      fontWeight="400"
                    >
                      {item.name}
                    </Text>
                  }
                  secondary={
                    <Text
                      className="account-name"
                      color="#bbb"
                      fontSize=".8rem"
                      variant="caption"
                    >
                      {item.currencyCode} ending with{' '}
                      <Text
                        variant="caption"
                        color={theme.palette.primary.light}
                      >
                        {item.accountNumber.slice(-4)}
                      </Text>
                    </Text>
                  }
                />
                <ListItemSecondaryAction>
                  <Box
                    display="flex"
                    width="4rem"
                    className="list-actions"
                    justifyContent="space-between"
                    alignItems="flex-end"
                  >
                    <CashIcon />
                    <Box width="40%" marginLeft=".5rem" display="flex">
                      <Text fontSize="1.3rem" variant="caption">
                        .
                      </Text>
                      <Text fontSize="1.3rem" variant="caption">
                        .
                      </Text>
                      <Text fontSize="1.3rem" variant="caption">
                        .
                      </Text>
                    </Box>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              <Collapse in={recipient?.id === item?.id}>
                <>
                  <Box
                    display="flex"
                    flexDirection="column"
                    className="info-cont"
                    alignItems="flex-start"
                    padding="0 .5rem .5rem"
                  >
                    {[
                      {
                        title: 'Sort Code',
                        value: item.sortCode,
                      },
                      {
                        title: 'Account Number',
                        value: item.accountNumber,
                      },
                      {
                        title: 'Bank Name',
                        value: item.bankName,
                      },
                    ].map((itm, index) =>
                      !itm.value ? (
                        <div key={index} />
                      ) : (
                        <Box
                          key={index}
                          display="flex"
                          className="info-item"
                          flexDirection="column"
                          marginBottom=".7rem"
                          alignItems="flex-start"
                        >
                          <Text
                            fontSize=".8rem"
                            fontWeight="300"
                            lineHeight="14px"
                            variant="body1"
                            color="#9DA8B6"
                          >
                            {itm.title}
                          </Text>
                          <Text
                            fontSize=".9rem"
                            variant="caption"
                            color={theme.palette.primary.light}
                          >
                            {itm.value}
                          </Text>
                        </Box>
                      )
                    )}
                  </Box>
                  <Box className="info-action">
                    <Button
                      width="100%"
                      startIcon={
                        isLoading ? (
                          <Spinner color="#fff" />
                        ) : (
                          <CashIcon color="#fff" />
                        )
                      }
                      fontSize=".8rem"
                      onClick={() => {
                        const sendRecipient = {
                          toCurrency: item.currencyCode,
                          sendEmail: false,
                          newRecipientName: item.name,
                          recipientCountryId: item.countryId,
                          accountNumber: item.accountNumber,
                          recipientCountry: item.countryCode,
                          bank: item.bankCode,
                          bankName: item.bankName,
                          sortCode: item.sortCode,
                          recipientTag: item.tag,
                        } as SendRecipient;

                        const accountDetails = {
                          accountNumber: item.accountNumber,
                          country: item.countryCode,
                        } as any;

                        if (item.currencyCode === 'NGN') {
                          accountDetails.code = item.bankCode;
                        } else if (item.currencyCode === 'GBP') {
                          accountDetails.sortCode = item.sortCode;
                        }

                        dispatch(
                          AccountDetailsAsync({
                            params: accountDetails,
                            cb: (pass) => {
                              if (pass) {
                                sendRecipient.accountDetails = pass;
                                Router.push(
                                  `/transfer?recipient=${encryptKey(
                                    JSON.stringify(sendRecipient)
                                  )}`
                                );
                              }
                            },
                          })
                        );
                      }}
                      bgColor={theme.palette.primary.light}
                    >
                      Send Cash
                    </Button>
                    <Button
                      width="100%"
                      css="border: 1.2px solid #c3c3c3;"
                      startIcon={<DeleteOutline color="inherit" />}
                      fontSize=".8rem"
                      onClick={() => {
                        setItemToDelete(item);
                      }}
                      color="#C3C3C3"
                      colorTheme="transparent"
                    >
                      Delete
                    </Button>
                  </Box>
                </>
              </Collapse>
            </Box>
          </Box>
        </Box>
      </ClickAwayListener>
    </RecipientListItemStyle>
  );
};

export default RecipientListItem;
