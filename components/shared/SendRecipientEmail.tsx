import React from 'react';
import { Box, Collapse } from '@material-ui/core';
import { Text, Switch as CustomSwitch } from '../atoms';
import { TextField } from '../molecule';

const SendRecipientEmail = ({ values, change, touched, errors }) => {
  return (
    <>
      <Box
        alignItems="center"
        css="pointer-events: none"
        display="flex"
        justifyContent="space-between"
      >
        <Text
          color={values.sendEmail ? '#00baff' : '#9da8b6'}
          fontWeight="400"
          variant="button"
        >
          I don&apos;t know their Bank details
        </Text>
        <CustomSwitch
          name="sendEmail"
          bgColor="#00baff"
          checked={values.sendEmail}
          toggle={(e) => change('sendEmail', e)}
        />
      </Box>
      <Box width="100%" display="flex" flexDirection="column">
        <Collapse in={values.sendEmail}>
          <Text color="#c0ccda" fontWeight="400" variant="caption">
            If you don&apos;t know their details we will send them an email to
            get their bank details as soon as you complete your payment
          </Text>
        </Collapse>

        <Collapse in={values.sendEmail}>
          <Box marginY=".7rem" className="row">
            <TextField
              color="#bbb"
              onChange={(e) => change('newRecipientEmail', e)}
              value={values.newRecipientEmail}
              params={{
                name: 'newRecipientEmail',
                error:
                  touched.newRecipientEmail &&
                  Boolean(errors.newRecipientEmail),
                helperText: touched.newRecipientEmail
                  ? errors.newRecipientEmail
                  : '',
              }}
              label="Email"
              labelPosition="in"
            />
          </Box>
        </Collapse>
      </Box>
    </>
  );
};

export default SendRecipientEmail;
