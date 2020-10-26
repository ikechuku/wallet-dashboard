/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import CryptoJS from 'crypto-js';

export const saveToLocalStorage = ({ obj, key, isJson = false }) => {
  if (obj) {
    localStorage.setItem(key, isJson ? JSON.stringify(obj) : obj);
  }
};

export function* safe(effect) {
  try {
    return yield effect;
  } catch (err) {
    return err;
  }
}

export const updateToLocalStorage = ({ obj, key, parent = 'user' }) => {
  const val = localStorage.getItem(parent);
  if (val) {
    const jsonVal = JSON.parse(val);
    jsonVal[key] = obj;
    localStorage.setItem(parent, JSON.stringify(jsonVal));
  }
};

export const removeFromLocalStorage = ({ key, parent = 'user' }) => {
  const val = localStorage.getItem(parent);
  if (val) {
    const jsonVal = JSON.parse(val);
    delete jsonVal[key];
    localStorage.setItem(parent, JSON.stringify(jsonVal));
  }
};

export const getDate = (val) => {
  try {
    const date = new Date(val).toUTCString();
    return date;
  } catch (e) {
    return val;
  }
};
export const getLocalStorage = ({ key, isJson = false }) => {
  const val = localStorage.getItem(key);
  if (!val) return null;
  return isJson ? JSON.parse(val) : val;
};

export const clearLocalStorage = ({ key }) => {
  localStorage.removeItem(key);
};

export const fakeEvent = (name, value, ...rest) => ({
  target: { name, value },
  persist: (_) => _,
  selected: rest[0],
  ...rest[0],
});

export const emptyObj = (obj = {}) => {
  for (const _i in obj) return false;
  return true;
};

export const axiosCall = async ({
  method = 'GET',
  host = process.env.SERVER,
  path = '',
  payload = {},
}) => {
  const url = `${host}/api/${path}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-ClientSecret': process.env.CLIENT_SECRET,
  };

  const axiosData = {
    method,
    url,
    data: payload,
    headers,
    json: true,
    /* httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }), */
  };

  return axios(axiosData);
};

export const convertToCurrency = (str, decimal = 2) => {
  let num;
  if (decimal === 0) {
    num = Number(str).toFixed(decimal);
    return `${num}.`.replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/\./, '');
  }
  if (decimal > 0) {
    return Number(str)
      .toFixed(decimal)
      .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  return str;
};

export const getGreeting = () => {
  const myDate = new Date();
  const hrs = myDate.getHours();

  let greet;

  if (hrs >= 0 && hrs < 12) greet = 'Good Morning';
  else if (hrs >= 12 && hrs < 17) greet = 'Good Afternoon';
  else greet = 'Good Evening';
  return greet;
};

export function fetchData({ model, extra = {}, ...args }) {
  return axiosCall(args)
    .then((res) => {
      const { data, Data } = res.data;
      return { data: model(data || Data || res.data, extra) };
    })
    .catch((err) => {
      try {
        const { data } = err.response;
        if (
          data?.ResponseCode === '04' ||
          data?.ResponseMessage ===
            'RefreshToken does not exist / is not usable for this user'
        ) {
          clearLocalStorage({ key: 'user' });
          window.location.reload();
        }
        return {
          error:
            data.ResponseMessage || data.message
              ? { message: data.ResponseMessage || data.message }
              : { errors: data.errors },
        };
      } catch (e) {
        return {
          error: { message: 'Something went wrong' },
        };
      }
    });
}

function refreshToken() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;
      if (
        (error.response?.status === 401 ||
          error.response?.message === 'Token has expired' ||
          error.response?.data?.message === 'Token has expired') &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;
        const user = getLocalStorage({ key: 'user', isJson: true });
        return axiosCall({
          path: `Auth/RefreshToken`,
          method: 'POST',
          payload: {
            Token: user.token,
            RefreshToken: user.refreshToken,
            ExpiresIn: 0,
          },
        }).then((res) => {
          if (res.status === 200) {
            // 1) put token to LocalStorage
            const { Data } = res.data;
            user.refreshToken = Data.RefreshToken;
            user.token = Data.Token;
            saveToLocalStorage({ obj: user, key: 'user', isJson: true });

            // 2) Change Authorization header
            axios.defaults.headers.common.Authorization = `Bearer ${Data.Token}`;

            originalRequest.headers.Authorization = `Bearer ${Data.Token}`;
            // 3) return originalRequest object with Axios.
            return axios(originalRequest);
          }
        });
      }

      // return Error object with Promise
      return Promise.reject(error);
    }
  );
}

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
  refreshToken();
};

export const decryptionKey = (encrypted) => {
  try {
    const decrypted = CryptoJS.AES.decrypt(
      encrypted,
      CryptoJS.enc.Utf8.parse(process.env.RESET_PASS_DECRYPTION_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse('zT$3qIjUR$4rIj45'),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return '';
  }
};

export const encryptKey = (value) => {
  try {
    const encrypted = CryptoJS.AES.encrypt(
      value,
      CryptoJS.enc.Utf8.parse(process.env.RESET_PASS_DECRYPTION_KEY),
      {
        iv: CryptoJS.enc.Utf8.parse('zT$3qIjUR$4rIj45'),
        padding: CryptoJS.pad.Pkcs7,
        mode: CryptoJS.mode.CBC,
      }
    );

    return encrypted.toString();
  } catch (error) {
    return '';
  }
};

export const formatPhone = (phone, dialcode) => {
  if (phone.isEmpty) return phone;
  return (
    String(dialcode).replace(RegExp('[^0-9]'), '') +
    (phone[0] === '0' ? phone.substring(1, phone.length) : phone)
  );
};

export const truncate = (input, length = 30) =>
  input && input.length > length ? `${input.substring(0, length)}...` : input;

export const mockUKAccountValidation = {
  isCorrect: true,
  isDirectDebitCapable: true,
  statusInformation: 'OK',
  correctedSortCode: '560029',
  correctedAccountNumber: '26207729',
  iban: 'GB10NWBK56002926207729',
  bank: 'National Westminster Bank plc',
  bankBIC: 'NWBKGB21',
  branch: 'St. James & Piccadilly (A)',
  branchBIC: '53B',
  contactAddressLine1: 'Chatham Rcsc',
  contactAddressLine2: 'Western Avenue',
  contactPostTown: 'Chatham',
  contactPostcode: 'ME4 4RT',
  contactPhone: '0870 2403355',
  contactFax: '',
  fasterPaymentsSupported: true,
  chapsSupported: true,
};

export const bvnValidationMock = {
  first_name: 'EWERE',
  last_name: 'EBIE',
  dob: '03-Sep-93',
  mobile: '08187697110',
  bvn: '22273873491',
};
