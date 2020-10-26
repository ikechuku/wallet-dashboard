import * as React from 'react';
import { Box, Tabs, Tab, useTheme } from '@material-ui/core';
import { useDispatch, useSelector, batch } from 'react-redux';
import { Text } from '../../atoms';
import SomeOneElseForm from '../../forms/Transfer/Recipient/SomeoneElse';
import { RecieptStyle } from './styles';
import MyselfForm from '../../forms/Transfer/Recipient/Myself';
import { BankActions } from '../../../store/actions/bankActions';
import { TransferState } from '../../../models/Transfer';
import { TransferActions } from '../../../store/actions/tranferActions';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `recipient-tab-${index}`,
    className: 'recipient-tab',
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      css="width: 100%;"
      role="tabpanel"
      hidden={value !== index}
      id={`recipient-tabpanel-${index}`}
      aria-labelledby={`recipient-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

const Recipient = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { form }: TransferState = useSelector((state) => state.transfer);

  const [value, setValue] = React.useState(
    form.recipientTag === 'myself' ? 1 : 0
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (!form.sendRecipient) {
      batch(() => {
        dispatch(BankActions({ accountDetails: null }));
        dispatch(
          TransferActions({
            accountDetails: null,
            form: {
              ...form,
              bankName: null,
              accountNumber: null,
              bank: null,
              existingRecipient: null,
              newRecipientEmail: null,
              newRecipientName: null,
              recipientTag: null,
              sortCode: null,
              swiftCode: null,
              sendEmail: false,
              sendRecipient: null,
            },
          } as TransferState)
        );
        setValue(newValue);
      });
    }
  };

  React.useEffect(() => {
    dispatch(BankActions({ accountDetails: {} }));
  }, []);

  return (
    <>
      <Box margin="2rem auto 3rem">
        <Text color={theme.palette.primary.light} variant="h6">
          Who are you sending money to?
        </Text>
      </Box>
      <RecieptStyle alignItems="center" display="flex" flexDirection="column">
        <Box width="100%">
          <Tabs
            value={value}
            indicatorColor="primary"
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab
              classes={{
                wrapper: value === 0 ? 'text-wrapper active' : 'text-wrapper',
              }}
              label="Someone else"
              {...a11yProps(0)}
            />
            <Tab
              classes={{
                wrapper: value === 1 ? 'text-wrapper active' : 'text-wrapper',
              }}
              label="Myself"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <SomeOneElseForm />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyselfForm />
        </TabPanel>
      </RecieptStyle>
    </>
  );
};

export default Recipient;
