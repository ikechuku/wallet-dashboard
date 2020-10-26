import React from 'react';
import { Box } from '@material-ui/core';
import zxcvbn from 'zxcvbn';
import './passwordMeter.scss';

const validatePasswordStrong = (
  value,
  minStrength,
  thresholdLength,
  onChange
) => {
  let output = '';
  if (value.length <= thresholdLength) output = 'Password is short';
  else if (zxcvbn(value).score < minStrength) output = 'Password is weak';
  else if (zxcvbn(value).score === minStrength) output = 'Password is strong';
  else output = '';
  onChange(output);
};

const PasswordMeter = ({ password = '', onChange }) => {
  const minStrength = 3;
  const thresholdLength = 7;
  const [strength, setStrength] = React.useState(0);

  React.useEffect(() => {
    setStrength(zxcvbn(password).score);
    validatePasswordStrong(password, minStrength, thresholdLength, onChange);
  }, [password]);

  const passwordLength = password.length;

  const strengthClass = [
    'strength-meter',
    passwordLength > 0 ? 'visible' : 'invisible',
  ]
    .join(' ')
    .trim();

  return (
    <Box className={strengthClass}>
      <div
        className="strength-meter-fill"
        data-strength={password === '' ? -1 : strength}
      />
    </Box>
  );
};

export default PasswordMeter;
