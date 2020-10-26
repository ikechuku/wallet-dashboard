import React from 'react';
import { TextField, InputAdornment, withStyles, Box } from '@material-ui/core';
import { InputProps } from './textfield.interface';
import style from './texfield.style';
import Text from '../../atoms/Text';

const CssTextField = withStyles(({ palette }) => ({
  root: {
    '& label[data-shrink="true"]': {
      color: palette.primary.light,
    },
    '& label[data-shrink="false"]': {
      opacity: 0.5,
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: palette.primary.light,
      opacity: 0.5,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'rgba(0, 0, 0, .2)',
      },
      '&:hover fieldset': {
        borderColor: '#666',
      },
      '&.Mui-focused fieldset': {
        borderColor: palette.primary.light,
        opacity: 0.5,
      },
    },
  },
}))(TextField);

const makeInput = ({ params = {}, ...props }) => {
  const inputProps = {
    startAdornment: props.startIcon ? (
      <InputAdornment position="start">{props.startIcon}</InputAdornment>
    ) : null,
    endAdornment: props.endIcon ? (
      <InputAdornment position="end">{props.endIcon}</InputAdornment>
    ) : null,
  };

  return {
    combo: (
      <CssTextField
        InputProps={inputProps}
        label={props.labelPosition === 'in' ? props.label : null}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        FormHelperTextProps={{ className: 'tx-helper-text' }}
        value={props.value}
        variant="outlined"
        onChange={props.onChange}
        type={props.type}
        className="combo"
        {...params}
      >
        {props.children}
      </CssTextField>
    ),
  }[props.variant || 'combo'];
};

const Input: React.SFC<InputProps> = (props) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      className={`inputbox ${props.className}`}
    >
      {props.label && (!props.labelPosition || props.labelPosition === 'out') && (
        <Text
          className="fake-label"
          colorTheme={props.colorTheme}
          variant="button"
          fontSize=".8rem"
        >
          {props.label}
        </Text>
      )}
      {makeInput(props)}
    </Box>
  );
};

export default style(Input);
