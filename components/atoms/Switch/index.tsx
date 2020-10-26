import React from 'react';
import { Switch, Box } from '@material-ui/core';
import SwitchStyle from './switch.style';

const CustomSwitch = ({
  name = 'checkSwitch',
  className,
  checked,
  toggle = (_) => _,
}) => (
  <Box className={className}>
    <Switch
      checked={checked}
      onChange={toggle}
      name={name}
      classes={{
        root: 'root',
        switchBase: 'switchBase',
        thumb: 'thumb',
        track: 'track',
        checked: 'checked',
      }}
    />
  </Box>
);

export default SwitchStyle(CustomSwitch);
