import React from 'react';
import { parseISO, parse, format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { BVNDetailsAsync } from '../store/actions/bankActions';

export default function useBVNVerify() {
  const dispatch = useDispatch();
  const initialError = {
    firstName: '',
    lastName: '',
    dob: '',
  };
  const [bvnErrors, setBvnErrors] = React.useState(initialError);

  const verifyWithBvn = ({ values, cb }) => {
    if (values.senderCountry !== 'NG') {
      cb(true);
      return;
    }
    dispatch(
      BVNDetailsAsync({
        params: values.BVN,
        cb: (res) => {
          let isValid = true;
          let errors = initialError;
          if (
            res &&
            res?.firstName?.toLowerCase() !== values.firstName.toLowerCase()
          ) {
            isValid = false;
            errors = {
              ...errors,
              firstName: 'first name does not match info on BVN',
            };
          }
          if (
            res &&
            res?.lastName?.toLowerCase() !== values.lastName.toLowerCase()
          ) {
            isValid = false;
            errors = {
              ...errors,
              lastName: 'last name does not match info on BVN',
            };
          }
          if (res && res?.dob && values.birthDate) {
            const dob1 = format(
              parse(res?.dob, 'dd-MMM-yy', new Date()),
              'dd-MMM-yyyy'
            );
            const dob2 = format(parseISO(values?.birthDate), 'dd-MMM-yyyy');

            if (dob1 !== dob2) {
              isValid = false;
              errors = {
                ...errors,
                dob: 'Date of Birth does not match info on BVN',
              };
            }
          }
          if (!res) isValid = false;
          cb(isValid);
          setBvnErrors(errors);
        },
      })
    );
  };

  return { bvnErrors, verifyWithBvn };
}
