import * as React from 'react';
import { Box, useTheme, Divider } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { UpdateOutlined } from '@material-ui/icons';
import { Text, Button } from '../../atoms';
import AuthErrors from '../../shared/AuthErrors';
import { convertToCurrency } from '../../../utils';
import { TransferActions } from '../../../store/actions/tranferActions';
import { transferNavigate, TransferRoutes } from '../../../utils/enums';
import { TransferState } from '../../../models/Transfer';
import { TextField } from '../../molecule';
import { ConfirmStyle } from './styles';

const Confirm = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const transfer: TransferState = useSelector((state) => state.transfer);
  const { form, message, errors, createdCharge, isLoading } = transfer;
  const [narration, setNarration] = React.useState(form.narration);

  return (
    <ConfirmStyle>
      <AuthErrors
        AuthActions={() => dispatch(TransferActions())}
        message={message}
        errors={errors}
        condition={createdCharge}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="2rem auto 3rem"
      >
        <Text
          margin="0 auto"
          textAlign="center"
          fontWeight="300"
          color={theme.palette.primary.light}
          variant="caption"
        >
          You are about to send
        </Text>
        <Text
          textAlign="center"
          color={theme.palette.primary.light}
          variant="h6"
        >
          {convertToCurrency(form.amount)} {form.fromCurrency}
        </Text>
      </Box>
      <Box className="confirm-box">
        <Box className="row" justifyContent="center">
          <Text className="value" variant="button">
            Transfer details
          </Text>
        </Box>
        {[
          { key: 'Recipient', value: form.newRecipientName },
          {
            key: 'You send them',
            className: 'value',
            value: `${convertToCurrency(form.amount)} ${form.fromCurrency}`,
          },
          { key: 'Fee', value: form?.chargeAmt },
        ].map((item, ind) => (
          <Box key={ind} className="row" justifyContent="space-between">
            <Text className="key" variant="caption">
              {item.key}
            </Text>
            <Text
              className={item.className ?? 'key'}
              variant={item.className ? 'subtitle1' : 'caption'}
            >
              {item.value}
            </Text>
          </Box>
        ))}
        <Box className="row">
          <Text color="green" fontWeight="300" variant="caption">
            Promo code?
          </Text>
        </Box>
        <Divider css="color:rgba(0,0,0,.06); margin: .8rem 0;" />
        {[
          {
            key: 'They get',
            value: `${convertToCurrency(form.convertedAmount)} ${
              form.toCurrency
            }`,
          },
          { key: 'Total to pay', value: form.totalAmount },
        ].map((item, ind) => (
          <Box key={ind} className="row" justifyContent="space-between">
            <Text className="key" variant="caption">
              {item.key}
            </Text>
            <Text className="value" variant="subtitle1">
              {item.value}
            </Text>
          </Box>
        ))}
        <Box className="row">
          <TextField
            color="#bbb"
            width="100%"
            onChange={(e) => setNarration(e.target.value)}
            params={{ defaultValue: narration }}
            label="Reference"
            labelPosition="in"
          />
        </Box>
        <Box className="row" justifyContent="center">
          <Box display="inline-block" color="#35EDD1">
            <UpdateOutlined
              css="vertical-align: middle;"
              color="inherit"
              fontSize="small"
            />
          </Box>
          <Text
            color="#9da8b6"
            fontWeight="300"
            padding="0 0 0 .5rem"
            variant="caption"
          >
            Should arrive by{' '}
            <Text
              fontWeight="500"
              variant="caption"
              color={theme.palette.primary.light}
            >
              January 22nd
            </Text>
          </Text>
        </Box>
        <Box width="100%">
          <Button
            padding=".6rem"
            isLoading={isLoading}
            onClick={() => {
              const newForm = { ...form, narration };
              dispatch(
                TransferActions({
                  form: newForm,
                } as TransferState)
              );
              transferNavigate({
                route:
                  form.fromCountry === 'CRYPTO'
                    ? TransferRoutes.CRYPTO_PAYMENT_METHODS
                    : TransferRoutes.CASH_PAYMENT_METHODS,
                obj: { ...transfer, form: newForm },
              });
            }}
            width="100%"
            fontWeight="300"
            bgColor={theme.palette.primary.light}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </ConfirmStyle>
  );
};

export default Confirm;
