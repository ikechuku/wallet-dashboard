/* eslint-disable dot-notation */
import * as Yup from 'yup';
import { format, subYears } from 'date-fns';

export const personalAccValidationSchema = Yup.object({
  firstName: Yup.string('Enter your First name')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
    .required('First Name is required'),
  lastName: Yup.string('Enter your Last name')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
    .required('Last Name is required'),
  BVN: Yup.string().when('senderCountry', {
    is: 'NG',
    then: Yup.string('Enter BVN').required('BVN is required'),
  }),
  birthDate: Yup.date()
    .max(format(subYears(new Date(), 15), 'MM/dd/yyyy'))
    .min(format(subYears(new Date(), 120), 'MM/dd/yyyy'))
    .required('Birth day is required'),
  phoneNumber: Yup.number('Enter phone number')
    .required('Phone number is required')
    .positive()
    .nullable(true),
  postalCode: Yup.string('Enter postal code').required(
    'Postal code is required'
  ),
  address: Yup.string('Enter Address').required('Address is required'),
  city: Yup.string('Enter City')
    .required('City is required')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed'),
});

export const businessAccValidationSchema = Yup.object({
  businessName: Yup.string('Enter your Business Name')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
    .required('Business Name is required'),
  registeredName: Yup.string('Enter your Business Name')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed')
    .required('Registed Name is required'),
  role: Yup.string('Enter Role year')
    .required('Role is required')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed'),
  registeredNumber: Yup.string('Enter Registration number').required(
    'Registration number is required'
  ),
  website: Yup.string('Enter website').required('website is required'),
  category: Yup.string('Enter Category')
    .required('Category is required')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed'),
  subCategory: Yup.string('Enter SubCategory')
    .required('SubCategory is required')
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed'),
});

export const recipientValidationSchema = Yup.object({
  bank: Yup.string('Select your Bank Name').when(
    ['sendEmail', 'recipientCountry'],
    {
      is: (sendEmail, recipientCountry) =>
        sendEmail === false && recipientCountry === 'NG',
      then: Yup.string('Enter Bank Name').required('Bank Name is required'),
    }
  ),
  bankName: Yup.string('Select your Bank Name').when(
    ['sendEmail', 'recipientCountry'],
    {
      is: (sendEmail, recipientCountry) =>
        sendEmail === false && recipientCountry === 'GB',
      then: Yup.string(
        'Generate Bank Name from complete account number and sortcode'
      ).required(
        'Generate Bank Name from complete account number and sortcode'
      ),
    }
  ),
  accountNumber: Yup.string('Enter Account number')
    .when(['sendEmail', 'recipientCountry'], {
      is: (sendEmail, recipientCountry) => {
        return sendEmail === false && recipientCountry === 'GB';
      },
      then: Yup.string('Enter Sort Code')
        .required('account number is required')
        .length(8, 'account number must be 8 digits'),
    })
    .when(['sendEmail', 'recipientCountry'], {
      is: (sendEmail, recipientCountry) => {
        return sendEmail === false && recipientCountry === 'NG';
      },
      then: Yup.string('Enter Sort Code')
        .required('account number is required')
        .length(10, 'account number must be 10 digits'),
    }),
  existingRecipient: Yup.string('Must be a string').matches(
    /^[A-Za-z\s]+$/,
    'Only letters allowed'
  ),
  newRecipientName: Yup.string('Enter full name')
    .when(['sendEmail', 'recipientCountry'], {
      is: (sendEmail, recipientCountry) => {
        return sendEmail === false && recipientCountry === 'GB';
      },
      then: Yup.string('Enter full name').required('Full name is required'),
    })
    .when(['sendEmail', 'recipientCountry'], {
      is: (sendEmail, recipientCountry) => {
        return sendEmail === false && recipientCountry === 'NG';
      },
      then: Yup.string(
        'Generate full name from bank and complete account number'
      ).required('Generate full name from bank and complete account number'),
    }),

  newRecipientEmail: Yup.string('Enter Email').when('sendEmail', {
    is: true,
    then: Yup.string('Enter Email').required('Email is required'),
  }),
  sendEmail: Yup.boolean(),
  sortCode: Yup.string('Enter Sort Code').when(
    ['sendEmail', 'recipientCountry'],
    {
      is: (sendEmail, recipientCountry) => {
        return sendEmail === false && recipientCountry === 'GB';
      },
      then: Yup.string('Enter Sort Code')
        .required('Sort Code is required')
        .length(6, 'sort code must be 6 digits'),
    }
  ),
});

export const myRecipientValidationSchema = Yup.object({
  bank: Yup.string('Select your Bank Name').when(
    ['sendEmail', 'recipientCountry'],
    {
      is: (sendEmail, recipientCountry) =>
        sendEmail === false && recipientCountry === 'NG',
      then: Yup.string('Enter Bank Name').required('Bank Name is required'),
    }
  ),
  bankName: Yup.string('Select your Bank Name').when(['recipientCountry'], {
    is: (recipientCountry) => recipientCountry === 'GB',
    then: Yup.string(
      'Generate Bank Name from complete account number and sortcode'
    ).required('Generate Bank Name from complete account number and sortcode'),
  }),
  accountNumber: Yup.string('Enter Account number')
    .when(['recipientCountry'], {
      is: (recipientCountry) => recipientCountry === 'GB',
      then: Yup.string('Enter Sort Code')
        .required('account number is required')
        .length(8, 'account number must be 8 digits'),
    })
    .when(['recipientCountry'], {
      is: (recipientCountry) => recipientCountry === 'NG',
      then: Yup.string('Enter Sort Code')
        .required('account number is required')
        .length(10, 'account number must be 10 digits'),
    }),
  existingRecipient: Yup.string('Must be a string').matches(
    /^[A-Za-z\s]+$/,
    'Only letters allowed'
  ),
  sortCode: Yup.string('Enter Sort Code').when(
    ['sendEmail', 'recipientCountry'],
    {
      is: (sendEmail, recipientCountry) => {
        return sendEmail === false && recipientCountry === 'GB';
      },
      then: Yup.string('Enter Sort Code')
        .required('Sort Code is required')
        .length(6, 'sort code must be 6 digits'),
    }
  ),
});

export const cardValidationSchema = Yup.object({
  cardHolderName: Yup.string("Enter Card Holder's Name")
    .required("Card Holder's Name is required")
    .matches(/^[A-Za-z\s]+$/, 'Only letters allowed'),
  cardNumber: Yup.number('Enter Card Number').required(
    'Card Number is required'
  ),
  expiry: Yup.string('Enter Expiry Date').required('Expiry Date is required'),
  cvv: Yup.number('Enter cvv').required('cvv is required'),
});
