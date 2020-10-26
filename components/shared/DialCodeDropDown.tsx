import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';
import { Text } from '../atoms';
import CountryFlag from './CountryFlag';
import { TextField } from '../molecule';
import { fakeEvent } from '../../utils';
import { GetCountriesAsync } from '../../store/actions/countryActions';
import SimpleDropDown from '../organism/CustomDropDown/SimpleDropDown';

const DialCodeDropDown = ({
  dialCode = '234',
  id,
  values,
  errors,
  touched,
  change,
  params = {},
}) => {
  const theme = useTheme();
  const { countries } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(GetCountriesAsync());
  }, []);

  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Text
        color={theme.palette.primary.light}
        fontWeight="400"
        fontSize=".8rem"
        variant="button"
      >
        Phone
      </Text>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-end"
        width="100%"
      >
        <Box width="33%">
          <SimpleDropDown
            bgcolor="#fff"
            selectedItem={dialCode}
            id={id}
            dropDownWidth="8rem"
            inputWidth="100%"
            list={countries}
            showSearch
            params={params}
            searchProperty="dialCode"
            property="dialCode"
            selectItem={(e) => change('dialCode', e)}
            makeItem={(item) => (
              <Box
                paddingY=".5rem"
                justifyContent="flex-start"
                display="flex"
                height="100%"
                width="100%"
                alignItems="center"
              >
                <CountryFlag
                  countryCode={item.countryCode}
                  flag={item.flag || ''}
                />
                <Text margin=".1rem .5rem" fontWeight="300" variant="subtitle2">
                  +{item.dialCode}
                </Text>
              </Box>
            )}
          >
            {({ item }: any) => {
              return (
                <Box
                  paddingY=".5rem"
                  justifyContent="flex-start"
                  display="flex"
                  height="100%"
                  width="100%"
                  alignItems="center"
                >
                  <Text
                    margin=".1rem .5rem"
                    fontWeight="300"
                    variant="subtitle2"
                  >
                    +{item.target.value}
                  </Text>
                </Box>
              );
            }}
          </SimpleDropDown>
        </Box>
        <TextField
          width="65%"
          value={values.phoneNumber}
          onChange={(e) =>
            change(
              'phoneNumber',
              fakeEvent(
                'phoneNumber',
                String(e.target.value).replace(/[^0-9.]/g, '')
              )
            )
          }
          params={{
            name: 'phoneNumber',
            error: touched.phoneNumber && Boolean(errors.phoneNumber),
          }}
        />
      </Box>

      <Box>
        <Text color="red" variant="caption">
          {touched.phoneNumber || touched.phoneNumber
            ? errors.phoneNumber || errors.phoneNumber
            : ''}
        </Text>
      </Box>
    </Box>
  );
};

export default DialCodeDropDown;
