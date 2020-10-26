/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { subYears, format, formatISO } from 'date-fns';
import { DatePicker } from '@material-ui/pickers';

const DateInput = ({
  date = formatISO(new Date()),
  min = subYears(new Date(), 120),
  max = subYears(new Date(), 15),
  change,
  variant = 'inline',
  name = 'date',
  label = 'Date of Birth',
}: {
  variant?: 'inline';
  min?: Date;
  max?: Date;
  change: Function;
  name?: string;
  label?: string;
  date?: string;
}) => {
  const theme = useTheme();
  return (
    <Box
      display="flex"
      css={`
        .MuiInputBase-root {
          height: 49px;
        }
        .MuiFormLabel-root {
          color: ${theme.palette.primary.light};
        }
      `}
      flexDirection="column"
      width="100%"
    >
      <DatePicker
        fullWidth
        autoOk
        variant={variant}
        inputVariant="outlined"
        label={label}
        minDate={min}
        css="button{padding: 0;} input{font-size: .8rem;background: #fff;}"
        name={name}
        minDateMessage={`date is below ${format(min, 'MM/dd/yyyy')}`}
        maxDate={max}
        maxDateMessage={`date is above ${format(max, 'MM/dd/yyyy')}`}
        format="MM/dd/yyyy"
        value={new Date(date)}
        onChange={(val) => {
          change(formatISO(new Date(val)));
        }}
      />
    </Box>
  );
};

export default DateInput;
