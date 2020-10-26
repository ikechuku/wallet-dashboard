import React from 'react';
import { useTheme, CircularProgress } from '@material-ui/core';

const Spinner = ({ size = '1.5rem', ...props }) => {
  const theme = useTheme();
  return props.color === 'inherit' ? (
    <CircularProgress color="inherit" size={size} />
  ) : (
    <CircularProgress
      css={`
        svg {
          color: ${props.color ?? theme.palette.primary.light} !important;
        }
      `}
      size={size}
    />
  );
};

export default Spinner;
