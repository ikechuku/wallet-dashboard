import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { parseISO, isValid, isAfter, formatISO, subYears } from 'date-fns';
import { useFormik } from 'formik';
import { AuthState } from '../models/Auth';
import useBVNVerify from './useBVNVerify';
import { personalAccValidationSchema } from '../validation/transferValidator';
import { UpdateProfileAsync } from '../store/actions/profileActions';
import { UpdateProfileReqProps } from '../models/Profile';
import { BankState } from '../models/BankDetails';

export default function useUpdateProfile({ form, cb }) {
  const dispatch = useDispatch();
  const {
    auth: { profile },
    banks: { message, errors: bankErrors },
  }: {
    auth: AuthState;
    banks: BankState;
  } = useSelector((state) => ({ auth: state.auth, banks: state.banks }));
  const [isLoading, setIsLoading] = React.useState(false);

  const { bvnErrors, verifyWithBvn } = useBVNVerify();
  const dob = () => {
    const parseDate = parseISO(profile.dateOfBirth);
    const date = isValid(parseDate)
      ? isAfter(parseDate, new Date(1900, 1, 1))
      : false;

    if (date && profile.dateOfBirth) return profile.dateOfBirth;
    if (form.birthDate) return form.birthDate;
    return formatISO(subYears(new Date(), 16));
  };

  const formik = useFormik({
    initialValues: {
      firstName: profile.firstName || form.firstName,
      lastName: profile.lastName || form.lastName,
      dialCode: form.dialCode || profile?.country?.dialCode,
      phoneNumber: profile.phoneNumber || form.phoneNumber,
      BVN: '',
      birthDate: dob(),
      postalCode: profile.postalCode || form.postalCode,
      address: profile.address || form.address,
      city: profile.city || form.city,
      senderCountry: profile?.country?.countryCode || form.senderCountry,
    },
    validationSchema: personalAccValidationSchema,
    onSubmit: (vals) => {
      setIsLoading(true);

      verifyWithBvn({
        values: vals,
        cb: (val: boolean) => {
          if (val) {
            dispatch(
              UpdateProfileAsync({
                cb: (pass) => cb({ pass, setIsLoading, vals }),
                params: {
                  id: profile.id,
                  Firstname: vals.firstName,
                  Lastname: vals.lastName,
                  Address: vals.address,
                  DateOfBirth: vals.birthDate,
                  City: vals.city,
                  DialCode: vals.dialCode,
                  MobileNumber: vals.phoneNumber,
                  PostalCode: vals.postalCode,
                } as UpdateProfileReqProps,
              })
            );
          } else setIsLoading(false);
        },
      });
    },
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };
  return { formik, bvnErrors, change, isLoading, message, bankErrors };
}
