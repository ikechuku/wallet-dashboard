import * as React from 'react';
import { Box } from '@material-ui/core';
import MUIButton from '@material-ui/core/Button';
import style from './button.style';
import { ButtonProps } from './button.interface';
import Spinner from '../Spinner';

const Button: React.SFC<ButtonProps> = ({
  onClick,
  colorTheme,
  children,
  startIcon,
  endIcon,
  variant,
  className,
  isLoading,
  params,
}) => {
  return (
    <MUIButton
      startIcon={startIcon}
      endIcon={endIcon}
      variant={variant}
      className={`${className} ${colorTheme}`}
      onClick={onClick}
      type="button"
      {...params}
      disabled={isLoading === true ? isLoading : params?.disabled}
    >
      {isLoading && (
        <Box
          position="absolute"
          display="flex"
          alignItems="center"
          height="100%"
          top="0"
          left="1rem"
        >
          <Spinner color="inherit" />
        </Box>
      )}
      {children}
    </MUIButton>
  );
};

export default style(Button);
