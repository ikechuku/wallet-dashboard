import * as React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { TextField } from '../../../molecule';
import { Button, Text } from '../../../atoms';
import BusinessStyle from './businessacc.style';
import CountriesDropDown from '../../../shared/CountriesDropDown';
import { TransferState } from '../../../../models/Transfer';
import { businessAccValidationSchema } from '../../../../validation/transferValidator';
import { TransferRoutes, transferNavigate } from '../../../../utils/enums';
import { TransferActions } from '../../../../store/actions/tranferActions';
import SimpleDropDown from '../../../organism/CustomDropDown/SimpleDropDown';

const BusinessAccount = ({ className }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const transfer: TransferState = useSelector((state) => state.transfer);
  const { values, errors, touched, ...formik } = useFormik({
    initialValues: {
      businessName: '',
      registeredName: '',
      companyType: 'Limited',
      role: '',
      registeredNumber: '',
      website: '',
      category: '',
      subCategory: '',
      country: 'GB',
    },
    validationSchema: businessAccValidationSchema,
    onSubmit: (vals) => {
      const newForm = { ...transfer.form, ...vals };
      dispatch(
        TransferActions({
          form: newForm,
        })
      );
      transferNavigate({
        route: TransferRoutes.CONFIRM_BUSINESS,
        obj: { ...transfer, form: newForm },
      });
    },
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Box
      marginX="auto"
      className={className}
      marginBottom="2rem"
      height="100%"
      width="100%"
    >
      <form onSubmit={formik.handleSubmit}>
        <Box width="100%" display="flex" flexDirection="column">
          <Box
            display="flex"
            marginBottom=".5rem"
            flexDirection="column"
            className="row"
            alignItems="center"
          >
            <Box marginBottom=".2rem" width="100%">
              <CountriesDropDown
                id="business-country"
                country={values.country}
                setCountry={(e) => change('city', e)}
              />
            </Box>
            <Box marginBottom="1.3rem" width="100%">
              <Text
                margin="1rem 0 1.3rem"
                fontSize=".75rem"
                className="country-note"
                css="opacity: .6"
                variant="caption"
              >
                Please note we cannot offer our services to unregistered
                charities from the UK
              </Text>
            </Box>
          </Box>
          <Text
            margin="0 0 .6rem"
            color={theme.palette.info.main}
            variant="caption"
          >
            Get details using Companies House
          </Text>
          <Box
            marginBottom="1.3rem"
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            className="row break"
          >
            <Box marginBottom="1.3rem" width="100%">
              <TextField
                color="#bbb"
                variant="combo"
                value={values.businessName}
                params={{
                  name: 'businessName',
                  error: touched.businessName && Boolean(errors.businessName),
                  helperText: touched.businessName ? errors.businessName : '',
                }}
                onChange={(e) => change('businessName', e)}
                label="Business Name"
                labelPosition="in"
              />
            </Box>
            <Box width="100%">
              <Button
                width="100%"
                padding=".7rem"
                fontWeight="300"
                bgColor={theme.palette.primary.light}
              >
                Search
              </Button>
            </Box>
          </Box>
          <Box marginBottom="1.3rem" borderBottom="1px solid #ccc">
            <Text color={theme.palette.primary.light} variant="subtitle1">
              Your business
            </Text>
          </Box>
          <Box
            marginBottom="1rem"
            display="flex"
            flexDirection="column"
            className="row"
          >
            <Box marginBottom="1.5rem" width="100%">
              <TextField
                color="#bbb"
                value={values.registeredName}
                params={{
                  name: 'registeredName',
                  error:
                    touched.registeredName && Boolean(errors.registeredName),
                  helperText: touched.registeredName
                    ? errors.registeredName
                    : '',
                }}
                onChange={(e) => change('businessName', e)}
                label="Registered Business Name"
                labelPosition="in"
              />
            </Box>
            <Box width="100%">
              <SimpleDropDown
                id="company-type"
                dropDownWidth="100%"
                inputWidth="100%"
                selectItem={(e) => change('companyType', e)}
                property="value"
                params={{
                  name: 'companyType',
                }}
                selectedItem={values.companyType}
                list={[{ value: 'Limited' }, { value: 'Public' }]}
                makeItem={(item) => (
                  <Text
                    width="100%"
                    textAlign="left"
                    padding=".5rem 0.2rem"
                    color={theme.palette.primary.light}
                    variant="subtitle2"
                  >
                    {item.value}
                  </Text>
                )}
              >
                {({ item }) => (
                  <Text
                    width="100%"
                    textAlign="left"
                    padding=".5rem 0.2rem"
                    color={theme.palette.primary.light}
                    variant="subtitle2"
                  >
                    {item.target.value}
                  </Text>
                )}
              </SimpleDropDown>
            </Box>
          </Box>
          <Box
            marginBottom="1rem"
            display="flex"
            flexDirection="column"
            className="row"
          >
            <Box marginBottom="1.3rem" width="100%">
              <TextField
                color="#bbb"
                value={values.role}
                params={{
                  name: 'role',
                  error: touched.role && Boolean(errors.role),
                  helperText: touched.role ? errors.role : '',
                }}
                onChange={(e) => change('role', e)}
                label="Role"
                labelPosition="in"
              />
            </Box>
            <Box width="100%">
              <TextField
                color="#bbb"
                value={values.registeredNumber}
                params={{
                  name: 'registeredNumber',
                  error:
                    touched.registeredNumber &&
                    Boolean(errors.registeredNumber),
                  helperText: touched.registeredNumber
                    ? errors.registeredNumber
                    : '',
                }}
                onChange={(e) => change('registeredNumber', e)}
                label="Registered number"
                labelPosition="in"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            marginBottom="1.5rem"
            flexDirection="column"
            className="row"
            justifyContent="space-between"
          >
            <Box width="100%">
              <TextField
                color="#bbb"
                value={values.website}
                params={{
                  name: 'website',
                  error: touched.website && Boolean(errors.website),
                  helperText: touched.website ? errors.website : '',
                }}
                onChange={(e) => change('website', e)}
                label="Website"
                labelPosition="in"
              />
            </Box>
          </Box>

          <Box marginBottom="1.3rem" borderBottom="1px solid #ccc">
            <Text color={theme.palette.primary.light} variant="subtitle1">
              What does your business do?
            </Text>
          </Box>
          <Box
            marginBottom="1rem"
            display="flex"
            flexDirection="column"
            className="row"
          >
            <Box marginBottom="1.3rem" width="100%">
              <TextField
                color="#bbb"
                value={values.category}
                params={{
                  name: 'category',
                  error: touched.category && Boolean(errors.category),
                  helperText: touched.category ? errors.category : '',
                }}
                onChange={(e) => change('category', e)}
                label="Category"
                labelPosition="in"
              />
            </Box>
            <Box width="100%">
              <TextField
                color="#bbb"
                value={values.subCategory}
                params={{
                  name: 'subCategory',
                  error: touched.subCategory && Boolean(errors.subCategory),
                  helperText: touched.subCategory ? errors.subCategory : '',
                }}
                onChange={(e) => change('subCategory', e)}
                label="Subcategory"
                labelPosition="in"
              />
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          className="row"
          alignItems="flex-start"
          margin="1rem auto"
          width="100%"
        >
          <Box marginBottom=".8rem" width="100%">
            <Button
              padding=".6rem"
              params={{ type: 'submit' }}
              width="100%"
              fontWeight="300"
              bgColor={theme.palette.primary.light}
            >
              Save
            </Button>
          </Box>
          <Box width="100%">
            <Text variant="caption">
              <Text css="opacity: .6" variant="caption">
                By clicking continue, you confirm you are an authorized
                representative of Waltdesign Ltd and have authorisation to make
                payments on behalf of
              </Text>{' '}
              <Text color={theme.palette.primary.light} variant="caption">
                Waltdesign Ltd.
              </Text>
            </Text>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default BusinessStyle(BusinessAccount);
