import { Box, useTheme } from '@material-ui/core';
import React from 'react';
import CustomSwitch from '../../atoms/Switch';
import { Text, Button } from '../../atoms';
import { TextField } from '../../molecule';

const EnterCardDetails = ({
  values,
  handleSubmit,
  handleChange,
  setFieldTouched,
}) => {
  const theme = useTheme();

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  return (
    <Box
      padding="1rem"
      marginX="auto"
      bgcolor="white"
      marginBottom="1rem"
      className="recipient-form"
      width="100%"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(values);
        }}
      >
        <Box marginBottom="1rem" className="row">
          <TextField
            color="#bbb"
            onChange={(e) => change('narration', e)}
            value={values.paymentRef}
            params={{
              name: 'narration',
            }}
            label="Narration (optional)"
            labelPosition="in"
          />
        </Box>
        <Box alignItems="center" display="flex" justifyContent="space-between">
          <Text
            color={values.saveCard ? '#00baff' : '#9da8b6'}
            fontWeight="400"
            variant="button"
          >
            Save card details
          </Text>
          <CustomSwitch
            name="saveCard"
            bgColor="#00baff"
            checked={values.saveCard}
            toggle={(e) => change('saveCard', e)}
          />
        </Box>
        <Box margin="1rem 0" width="100%">
          <Button
            padding=".6rem"
            params={{
              type: 'submit',
            }}
            width="100%"
            fontWeight="300"
            bgColor={theme.palette.primary.light}
          >
            Confirm
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EnterCardDetails;
