import React from 'react';
import { addYears, format } from 'date-fns';
import {
  Collapse,
  Box,
  Dialog,
  useTheme,
  DialogActions,
  Button as MUIButton,
} from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { Text, Button } from '../../atoms';
import { TransferForm } from '../../../models/Transfer';
import SimpleDropDown from '../CustomDropDown/SimpleDropDown';

const frequencyForm = {
  Daily: {
    value: 'Daily',
    views: ['date', 'month', 'year'],
    format: 'MM/dd/yyyy',
  },
  Monthly: {
    value: 'Monthly',
    views: ['month', 'year'],
    format: 'MM/yyyy',
  },
  Yearly: { value: 'Yearly', views: ['year'], format: 'yyyy' },
};

const ReoccuringPayment = ({ form: frm, setForm, reoccur }) => {
  const form: TransferForm = frm;
  const [open, setOpen] = React.useState(false);

  const [untilDate, setUntilDate] = React.useState(form.untilPayment);
  const [firstPayment, setFirstPayment] = React.useState(form.firstPayment);
  const [untilPayment, setUntilPayment] = React.useState(form.untilPayment);
  const [frequency, setFrequency] = React.useState(form.frequency);
  const [change, setChange] = React.useState(true);
  const theme = useTheme();

  const getUntilPayment = () => {
    if (untilPayment === 'Further Notice') return untilPayment;
    const dates = untilPayment.split('/');
    if (frequency === 'Monthly') return `${dates[0]}/${dates[2]}`;
    if (frequency === 'Yearly') return dates[2];
    return untilPayment;
  };

  React.useEffect(() => {
    if (!form.makeReoccuringPayment) {
      setChange(true);
      setForm({
        ...form,
        frequency: 'Daily',
        firstPayment: format(new Date(), 'MM/dd/yyyy'),
        untilPayment: 'Further Notice',
      } as TransferForm);
      setFirstPayment(format(new Date(), 'MM/dd/yyyy'));
      setFrequency('Daily');
      setUntilPayment('Further Notice');
      setUntilDate('Further Notice');
    }
  }, [form.makeReoccuringPayment]);

  return (
    <Collapse css="width: 100%" in={reoccur}>
      <Collapse css="width: 100%" in={!change}>
        <Box
          width="100%"
          display="flex"
          alignItems="flex-start"
          justifyContent="space-between"
        >
          <Text color="#9da8b6" fontSize=".8rem" variant="body2">
            {frequency}
          </Text>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Text color="#9da8b6" fontSize=".8rem" variant="body2">
              From {firstPayment}
            </Text>
            <Button
              fontSize=".8rem"
              padding=".3rem 0 .3rem .3rem"
              color={theme.palette.info.main}
              colorTheme="transparent"
              onClick={() => setChange(true)}
            >
              Change
            </Button>
          </Box>
        </Box>
      </Collapse>
      <Collapse css="width: 100%" in={change}>
        <Box width="100%">
          <SimpleDropDown
            id="payment-frequency"
            top="48px"
            title="Frequency"
            bgcolor="#fff"
            dropDownWidth="100%"
            inputWidth="100%"
            selectItem={(e) => setFrequency(e.target.value)}
            property="value"
            params={{ name: 'frequency' }}
            selectedItem={frequency}
            list={Object.values(frequencyForm)}
            makeItem={(item) => (
              <Text
                textAlign="left"
                padding=".5rem 0.2rem"
                color="#999"
                width="100%"
                variant="caption"
              >
                {item.value}
              </Text>
            )}
          >
            {({ item }) => (
              <Text
                textAlign="left"
                padding=".5rem 0.2rem"
                variant="caption"
                fontWeight="400"
                fontSize=".85rem"
                color="rgba(0, 0, 0, 0.54)"
              >
                {item.target.value}
              </Text>
            )}
          </SimpleDropDown>
        </Box>
        <Box width="100%" marginTop="1rem">
          <DatePicker
            fullWidth
            name="first-payment"
            label="First Payment"
            css="input{font-size: .8rem; padding: 1rem}"
            format="MM/dd/yyyy"
            inputVariant="outlined"
            minDate={new Date()}
            maxDate={addYears(new Date(), 10)}
            value={firstPayment}
            onChange={(val) =>
              setFirstPayment(format(new Date(val), 'MM/dd/yyyy'))
            }
          />
        </Box>
        <Box width="100%" marginTop="1rem">
          <SimpleDropDown
            id="until-payment"
            top="48px"
            title="Until"
            bgcolor="#fff"
            dropDownWidth="100%"
            inputWidth="100%"
            selectItem={(e) => {
              if (e.target.value === 'Further Notice') {
                setUntilPayment(e.target.value);
              } else {
                setOpen(true);
              }
            }}
            property="value"
            params={{ name: 'until' }}
            selectedItem={untilPayment}
            list={[
              { value: 'Further Notice', name: 'Further Notice' },
              { value: 'Select Date', name: 'Select Date' },
            ]}
            makeItem={(item) => (
              <Text
                textAlign="left"
                padding=".5rem 0.2rem"
                color={
                  item.name === 'Select Date'
                    ? theme.palette.primary.light
                    : '#999'
                }
                width="100%"
                variant="caption"
              >
                {item.name}
              </Text>
            )}
          >
            {() => (
              <Text
                textAlign="left"
                padding=".5rem 0.2rem"
                variant="caption"
                fontWeight="400"
                fontSize=".85rem"
                color="rgba(0, 0, 0, 0.54)"
              >
                {getUntilPayment()}
              </Text>
            )}
          </SimpleDropDown>
          <Dialog
            onClose={() => setOpen(false)}
            aria-labelledby="simple-dialog-title"
            open={open}
            disableBackdropClick
            disableEscapeKeyDown
          >
            <Box>
              <DatePicker
                views={frequencyForm[frequency]?.views}
                label="Year and Month"
                minDate={new Date(firstPayment)}
                value={untilDate}
                variant="static"
                onChange={(val) => {
                  setUntilDate(format(new Date(val), 'MM/dd/yyyy'));
                }}
              />
            </Box>
            <DialogActions>
              <MUIButton
                autoFocus
                onClick={() => {
                  setOpen(false);
                }}
                color="primary"
              >
                Cancel
              </MUIButton>
              <MUIButton
                onClick={() => {
                  setUntilPayment(format(new Date(untilDate), 'MM/dd/yyyy'));
                  setOpen(false);
                }}
                color="primary"
              >
                Ok
              </MUIButton>
            </DialogActions>
          </Dialog>
        </Box>
        <Box width="100%" marginTop="1rem">
          <Button
            padding=".6rem"
            width="100%"
            onClick={() => {
              setChange(false);
              setForm({
                ...form,
                frequency,
                firstPayment,
                untilPayment,
                makeReoccuringPayment: true,
              } as TransferForm);
            }}
            height="40px"
            fontWeight="300"
            bgColor={theme.palette.info.main}
          >
            Confirm
          </Button>
        </Box>
      </Collapse>
    </Collapse>
  );
};

export default ReoccuringPayment;
