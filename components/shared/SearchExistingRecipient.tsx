/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Text } from '../atoms';
import { TransferActions } from '../../store/actions/tranferActions';
import { TransferState } from '../../models/Transfer';
import Spinner from '../atoms/Spinner';
import AutoCompleteDropDown from '../organism/CustomDropDown/AutoCompleteDropDown';

const SearchExistingRecipient = ({
  disabled = false,
  resetValues,
  recipients,
  value,
}) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  return (
    <>
      <Text
        margin="0 0 .5rem"
        color={theme.palette.primary.light}
        fontWeight="400"
        variant="button"
      >
        Search Existing Recipient
      </Text>
      <Box
        marginBottom="1rem"
        paddingBottom="2rem"
        borderBottom="1px solid #ccc"
        width="100%"
      >
        <AutoCompleteDropDown
          id="recipient-search"
          selectedItem={value}
          property="name"
          disabled
          startIcon={<Search />}
          searchProperty="name"
          top="3rem"
          selectItem={(e) => {
            if (e?.target?.value) {
              setLoading(true);
              onSelectExistingRecipient({
                e,
                dispatch,
                cb: (payload) => {
                  resetValues(payload);
                  setLoading(false);
                },
              });
            } else {
              resetValues({});
            }
          }}
          params={{
            disabled,
            name: 'existingRecipient',
            endIcon: loading ? <Spinner /> : null,
          }}
          dropDownWidth="100%"
          inputWidth="100%"
          makeItem={(item) => (
            <Box
              display="flex"
              paddingY=".5rem"
              height="100%"
              justifyContent="space-between"
              width="100%"
            >
              <Text color="#00baff" fontSize=".8rem" variant="caption">
                {item.name}
              </Text>
              <Text
                color="#bbb"
                fontSize=".8rem"
                fontWeight="300"
                variant="caption"
              >
                {item.currencyCode} Acc ending with{' '}
                <Text color="#2033a0" variant="caption">
                  {item.accountNumber.slice(-4)}
                </Text>
              </Text>
            </Box>
          )}
          list={recipients}
        />
      </Box>
    </>
  );
};

const onSelectExistingRecipient = ({ e, dispatch, cb }) => {
  if (e?.target?.value === '') {
    dispatch(TransferActions({ accountDetails: null } as TransferState));
    cb({});
  } else {
    cb({ ...e.selected });
  }
};

export default SearchExistingRecipient;
