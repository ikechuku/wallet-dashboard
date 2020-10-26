import React from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
} from '@material-ui/core';
import { DropDownProps } from './dropDown.interface';
import style from './dropDown.style';

const makeSelect = ({ params = {}, ...props }) => {
  const children = props.data.map((obj, index) => {
    return props.native ? (
      <option key={index} value={obj.value}>
        {obj.text}
      </option>
    ) : (
      <MenuItem key={index} value={obj.value}>
        {obj.text}
      </MenuItem>
    );
  });
  return {
    combo: (
      <Select
        labelId="simple-select-outlined-label"
        label={props.label}
        native={props.native}
        value={props.initialValue}
        MenuProps={{ disableScrollLock: true }}
        onChange={props.onChange}
        placeholder={props.placeholder}
        variant="outlined"
        className="combo select"
        {...params}
      >
        {children}
      </Select>
    ),
  }[props.variant || 'combo'];
};

const SelectComp: React.SFC<DropDownProps> = (props) => {
  return (
    <Box
      flexDirection="column"
      width="100%"
      display="flex"
      className={`selectbox ${props.className}`}
    >
      <FormControl variant="outlined">
        {props.label && (
          <InputLabel id="simple-select-outlined-label">
            {props.label}
          </InputLabel>
        )}

        {makeSelect(props)}
      </FormControl>
    </Box>
  );
};

export default style(SelectComp);
