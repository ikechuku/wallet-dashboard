import * as React from 'react';
import { Box, useTheme, Avatar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import useUpdateProfile from '../../../../hooks/useUpdateProfile';
import AuthErrors from '../../../shared/AuthErrors';
import { TextField } from '../../../molecule';
import DialCodeDropDown from '../../../shared/DialCodeDropDown';
import DateInput from '../../../shared/DateInput';
import { Text, Button } from '../../../atoms';
import { fakeEvent } from '../../../../utils';
import CountriesDropDown from '../../../shared/CountriesDropDown';
import { BankActions } from '../../../../store/actions/bankActions';
import { PersonalProfileStyle } from '../styles';
import Assets from '../../../../utils/assets';
import useBreakPoints from '../../../../hooks/useBreakPoints';

const PersonalProfile = ({ className }) => {
  const dispatch = useDispatch();
  const { sm } = useBreakPoints();
  const [errorState, setErrorState] = React.useState(null);
  const theme = useTheme();
  const {
    formik: { values, errors, touched, ...formik },
    bvnErrors,
    change,
    isLoading,
    message,
    bankErrors,
  } = useUpdateProfile({
    form: {},
    cb: ({ setIsLoading, pass }) => {
      if (pass) setErrorState('Saved Successfully');
      setIsLoading(false);
    },
  });

  return (
    <>
      <AuthErrors
        AuthActions={() => {
          setErrorState(null);
          dispatch(BankActions());
        }}
        message={message || errorState}
        errors={bankErrors}
        condition={(message || errorState) === 'Saved Successfully'}
      />
      <Box
        marginX="auto"
        className={className}
        marginBottom="2rem"
        height="100%"
        width="100%"
      >
        <Box
          display="flex"
          flexDirection={sm ? 'row' : 'column'}
          width="100%"
          alignItems="center"
          padding=".5rem 0 1.5rem"
        >
          <Avatar
            alt="Remy Sharp"
            src={Assets.PROFILE_PIC}
            css={`
              width: ${sm ? 4 : 6}rem;
              height: ${sm ? 4 : 6}rem;
            `}
          />
          <Box margin={sm ? '0 1.5rem' : '1.5rem 0'}>
            <Button
              padding=".5rem .8rem"
              fontWeight="400"
              borderRadius="0.1rem"
              fontSize=".85rem"
              bgColor={theme.palette.primary.light}
            >
              Upload Profile Picture
            </Button>
          </Box>
          {/* <Box marginLeft="1.5rem">
            <Button
              css="border: 1.2px solid #c3c3c3;"
              startIcon={<DeleteOutline color="inherit" />}
              color="#C3C3C3"
              padding=".5rem .8rem"
              fontWeight="400"
              borderRadius="0.1rem"
              fontSize=".85rem"
              colorTheme="transparent"
            >
              Delete
            </Button>
          </Box> */}
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Box width="100%" display="flex" flexDirection="column">
            <Box
              width="100%"
              borderBottom="1px solid #ccc"
              display="flex"
              padding="0 .2rem"
              marginBottom="2rem"
              flexDirection="column"
            >
              <Text
                color={theme.palette.primary.light}
                fontSize="1.1rem"
                variant="button"
              >
                Your Personal Details
              </Text>
            </Box>
            <Box className="row" display="flex" flexDirection="column">
              <Box width="100%" marginBottom="1rem">
                <TextField
                  label="Legal First Name"
                  labelPosition="in"
                  onChange={(e) => change('firstName', e)}
                  value={values.firstName}
                  params={{
                    name: 'firstName',
                    error:
                      touched.firstName &&
                      Boolean(
                        errors.firstName ||
                          (values.senderCountry === 'NG' && bvnErrors.firstName)
                      ),
                    helperText: touched.firstName
                      ? errors.firstName ||
                        (values.senderCountry === 'NG' && bvnErrors.firstName)
                      : '',
                  }}
                />
              </Box>
              <Box width="100%" marginBottom="1rem">
                <TextField
                  label="Legal Last Name"
                  labelPosition="in"
                  value={values.lastName}
                  onChange={(e) => change('lastName', e)}
                  params={{
                    name: 'lastName',
                    error:
                      touched.lastName &&
                      Boolean(
                        errors.lastName ||
                          (values.senderCountry === 'NG' && bvnErrors.lastName)
                      ),
                    helperText: touched.lastName
                      ? errors.lastName ||
                        (values.senderCountry === 'NG' && bvnErrors.lastName)
                      : '',
                  }}
                />
              </Box>
            </Box>

            <Box className="row" display="flex" flexDirection="column">
              <Box display="flex" flexDirection="column" width="100%">
                <DialCodeDropDown
                  params={{
                    name: 'dialCode',
                  }}
                  touched={touched}
                  errors={errors}
                  values={values}
                  id="personal-dial"
                  dialCode={values.dialCode}
                  change={change}
                />
              </Box>
              <Box css="margin: 1rem 0; @media (min-width: 960px){margin-top: 1.4rem;}">
                <Box>
                  <DateInput
                    name="birthDate"
                    date={values.birthDate}
                    change={(dt) =>
                      change('birthDate', fakeEvent('birthDate', dt))
                    }
                  />
                </Box>

                {values.senderCountry === 'NG' && bvnErrors.dob && (
                  <Box>
                    <Text color="red" variant="caption">
                      {bvnErrors.dob}
                    </Text>
                  </Box>
                )}
              </Box>
            </Box>
            {values.senderCountry === 'NG' && (
              <Box
                className="row"
                display="flex"
                marginTop=".5rem"
                flexDirection="column"
              >
                <Box width="100%">
                  <TextField
                    label="BVN"
                    labelPosition="in"
                    value={values.BVN}
                    onChange={(e) => {
                      if (e.target.value.length > 11) return;
                      change(
                        'BVN',
                        fakeEvent(
                          'BVN',
                          String(e.target.value).replace(/[^0-9]/g, '')
                        )
                      );
                    }}
                    params={{
                      name: 'BNV',
                      error: touched.BVN && Boolean(errors.BVN),
                      helperText: touched.BVN ? errors.BVN : '',
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box width="100%" display="flex" flexDirection="column">
            <Box
              width="100%"
              borderBottom="1px solid #ccc"
              display="flex"
              padding="0 .2rem"
              marginY="2rem"
              flexDirection="column"
            >
              <Text
                color={theme.palette.primary.light}
                fontSize="1.1rem"
                variant="button"
              >
                Your address
              </Text>
            </Box>
            <Box className="row" display="flex" flexDirection="column">
              <Box width="100%" marginBottom="1rem">
                <TextField
                  onChange={(e) => change('postalCode', e)}
                  value={values.postalCode}
                  params={{
                    name: 'postalCode',
                    error: touched.postalCode && Boolean(errors.postalCode),
                    helperText: touched.postalCode ? errors.postalCode : '',
                  }}
                  label="Postal Code"
                  labelPosition="in"
                />
              </Box>
              <Box width="100%" marginBottom="1rem">
                <TextField
                  onChange={(e) => change('address', e)}
                  value={values.address}
                  params={{
                    name: 'address',
                    error: touched.address && Boolean(errors.address),
                    helperText: touched.address ? errors.address : '',
                  }}
                  label="Address"
                  labelPosition="in"
                />
              </Box>
            </Box>
            <Box
              className="row"
              alignItems="flex-start"
              display="flex"
              flexDirection="column"
            >
              <Box width="100%" marginBottom="1rem">
                <TextField
                  onChange={(e) => change('city', e)}
                  value={values.city}
                  params={{
                    name: 'city',
                    error: touched.city && Boolean(errors.city),
                    helperText: touched.city ? errors.city : '',
                  }}
                  label="City"
                  labelPosition="in"
                />
              </Box>
              <Box width="100%" marginBottom="1rem">
                <CountriesDropDown
                  id="personal-country"
                  params={{
                    name: 'senderCountry',
                  }}
                  country={values.senderCountry}
                  setCountry={(e) => change('senderCountry', e)}
                />
              </Box>
            </Box>
          </Box>
          <Box className="button-box" margin="1rem 0" width="100%">
            <Button
              padding=".6rem"
              isLoading={isLoading}
              params={{ type: 'submit' }}
              width="100%"
              fontWeight="300"
              bgColor={theme.palette.info.main}
            >
              Save Changes
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default PersonalProfileStyle(PersonalProfile);
