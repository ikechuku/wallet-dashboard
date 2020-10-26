/* eslint-disable import/prefer-default-export */
import React from 'react';
import { IconButton } from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import { TextField } from '../../molecule';

const SearchInput = ({ params: { endIcon, ...params }, ...props }) => {
  const getEndIcon = () => {
    if (endIcon) return endIcon;
    return props.searchVal !== '' ? (
      <IconButton
        onClick={() => props?.clearVal?.(null) ?? props.setSearchVal('')}
      >
        <Clear />
      </IconButton>
    ) : null;
  };

  return (
    <TextField
      label={props.title}
      startIcon={props.startIcon}
      bgColor="#fff"
      onFocus={props?.onFocus}
      padding={props.padding ?? '10px'}
      value={props.searchVal}
      endIcon={getEndIcon()}
      placeholder={props.placeholder}
      labelPosition="in"
      params={{ ...params, autoComplete: 'off' }}
      onChange={(e) => {
        props.setSearchVal(e.target.value);
      }}
    />
  );
};

export default SearchInput;
