import React from 'react';
import { useSelector } from 'react-redux';
import { Clear } from '@material-ui/icons';
import ReactCountryFlag from 'react-country-flag';
import { Box, IconButton, Hidden, useTheme } from '@material-ui/core';
import { Text, Button } from '../../atoms';
import { TextField, DropDown } from '../../molecule';
import { TransferRoutes, transferNavigate } from '../../../utils/enums';

const BusinessShareholderForm = ({
  shareholders,
  setShareholders,
  shareholder,
}) => {
  const theme = useTheme();
  const transfer = useSelector((state) => state.transfer);
  return (
    <Box marginX="auto" className="business-hd">
      {shareholders.map((sharehd, index) => (
        <Box key={index} marginBottom="1.5rem">
          <Box
            marginBottom="1.5rem"
            display="flex"
            alignItems="center"
            fontWeight="500"
            borderBottom="1px solid #2033a0"
            justifyContent="space-between"
          >
            <Text color={theme.palette.primary.light} variant="subtitle1">
              {`Director ${index + 1}`}
            </Text>
            {index !== 0 && (
              <IconButton
                onClick={() => {
                  const arr = [...shareholders];
                  arr.pop();
                  setShareholders([...arr]);
                }}
              >
                <Clear />
              </IconButton>
            )}
          </Box>
          <Box
            alignItems="center"
            marginTop="1rem"
            display="flex"
            flexDirection="column"
          >
            <Box width="100%">
              <Box className="row">
                <TextField
                  width="100%"
                  color={theme.palette.primary.light}
                  variant="combo"
                  value={sharehd.firstName}
                  margin="0 0 .8rem"
                  onChange={(val) => {
                    shareholders[index] = { ...sharehd, firstName: val };
                    setShareholders(shareholders);
                  }}
                  label="First Legal Names"
                  labelPosition="in"
                />
                <Hidden smUp>
                  <TextField
                    width="100%"
                    color={theme.palette.primary.light}
                    variant="combo"
                    value={sharehd.lastName}
                    label="Legal Last Name"
                    labelPosition="in"
                    onChange={(val) => {
                      shareholders[index] = { ...sharehd, lastName: val };
                      setShareholders(shareholders);
                    }}
                  />
                </Hidden>
                <Hidden xsDown>
                  <TextField
                    width="100%"
                    color={theme.palette.primary.light}
                    variant="combo"
                    value={sharehd.lastName}
                    label="Legal Last Name"
                    labelPosition="in"
                    onChange={(val) => {
                      shareholders[index] = { ...sharehd, lastName: val };
                      setShareholders(shareholders);
                    }}
                  />
                </Hidden>
              </Box>
              <Box
                className="row"
                display="flex"
                flexDirection="column"
                marginTop="1rem"
                alignItems="flex-end"
              >
                <Box display="flex" marginBottom="1rem" flexDirection="column">
                  <Text
                    color={theme.palette.primary.light}
                    fontWeight="400"
                    variant="button"
                    fontSize=".8rem"
                  >
                    Date of birth
                  </Text>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                  >
                    <TextField
                      placeholder="Day"
                      width="23%"
                      color={theme.palette.primary.light}
                      value={sharehd.dob.day}
                      variant="combo"
                      onChange={(val) => {
                        const items = [...shareholders];
                        const item = {
                          ...items[index],
                          dob: { ...items[index].dob, day: val },
                        };
                        items[index] = item;
                        setShareholders(items);
                      }}
                    />
                    <DropDown
                      placeholder="Month"
                      width="42%"
                      color={theme.palette.primary.light}
                      initialValue={sharehd.dob.month}
                      onChange={(val) => {
                        const items = [...shareholders];
                        const item = {
                          ...items[index],
                          dob: { ...items[index].dob, month: val },
                        };
                        items[index] = item;
                        setShareholders(items);
                      }}
                      variant="combo"
                      data={[
                        { value: 'jan', text: 'January' },
                        { value: 'feb', text: 'Febraury' },
                      ]}
                    />
                    <TextField
                      placeholder="Year"
                      width="30%"
                      color={theme.palette.primary.light}
                      variant="combo"
                      value={sharehd.dob.year}
                      onChange={(val) => {
                        const items = [...shareholders];
                        const item = {
                          ...items[index],
                          dob: { ...items[index].dob, year: val },
                        };
                        items[index] = item;
                        setShareholders(items);
                      }}
                    />
                  </Box>
                </Box>
                <Box display="flex" width="100%" justifyContent="space-between">
                  <DropDown
                    label="Country"
                    color={theme.palette.primary.light}
                    padding="9px 15px"
                    initialValue={sharehd.country}
                    onChange={(val) => {
                      const items = [...shareholders];
                      const item = {
                        ...items[index],
                        country: val,
                      };
                      items[index] = item;
                      setShareholders(items);
                    }}
                    variant="combo"
                    data={[
                      { code: 'NG', name: 'Nigeria' },
                      { code: 'GB', name: 'United Kingdom' },
                    ].map((item) => ({
                      value: item.code,
                      text: (
                        <Box display="flex" alignItems="center">
                          <ReactCountryFlag
                            countryCode={item.code}
                            svg
                            style={{
                              width: '2rem',
                              height: '2rem',
                            }}
                            title={item.name}
                          />
                          <Text margin="0 .5rem" variant="subtitle2">
                            {item.name}
                          </Text>
                        </Box>
                      ),
                    }))}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
      <Box width="100%" className="footer">
        <Box
          width="100%"
          margin="1rem 0"
          display="flex"
          className="add-director"
          justifyContent="center"
        >
          <Button
            padding=".6rem"
            onClick={() => {
              setShareholders([...shareholders, shareholder]);
            }}
            fontWeight="400"
            colorTheme="transparent"
          >
            <Box display="flex" justifyContent="flex-start">
              <Text variant="button" color="#00B3F5">
                Add another shareholder
              </Text>
            </Box>
          </Button>
        </Box>
        <Box width="100%" margin="1rem 0" className="save-button">
          <Button
            padding=".6rem"
            onClick={() =>
              transferNavigate({
                route: TransferRoutes.TRANFER_TYPE,
                obj: transfer,
              })
            }
            width="100%"
            fontWeight="300"
            bgColor={theme.palette.primary.light}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BusinessShareholderForm;
