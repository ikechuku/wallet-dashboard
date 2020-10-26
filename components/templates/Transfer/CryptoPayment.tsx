import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateOutlined } from '@material-ui/icons';
import { Box, useTheme } from '@material-ui/core';
import QRCode from 'qrcode.react';
import useClipboard from 'react-use-clipboard';
import Router from 'next/router';
import { Text, Button, Image } from '../../atoms';
import Assets from '../../../utils/assets';
import { CryptoPaymentStyle as Style } from './styles';
/* import { TransferRoutes, transferNavigate } from '../../../utils/enums'; */
import AuthErrors from '../../shared/AuthErrors';
import { TransferActions } from '../../../store/actions/tranferActions';
import { convertToCurrency } from '../../../utils';
import { TransferState } from '../../../models/Transfer';
import CryptoReEnterPayment from './CryptoReEnterAmount';

const CryptoPayment = () => {
  const dispatch = useDispatch();
  const { form, cryptoCharge }: TransferState = useSelector(
    (state) => state.transfer
  );
  const theme = useTheme();

  const [isAddressCopied, copyAddress] = useClipboard(cryptoCharge?.url ?? '', {
    successDuration: 3000,
  });
  const [isAmountCopied, copyAmount] = useClipboard(form.amount, {
    successDuration: 3000,
  });

  const delay = 60000;
  const [time, setTime] = React.useState(delay);

  React.useEffect(() => {
    if (form.cryptoPayPage) return;
    let addTime = delay;
    const timeOut = setInterval(() => {
      if (addTime === 1000) {
        dispatch(
          TransferActions({
            form: { ...form, cryptoPayPage: true },
          } as TransferState)
        );
        clearInterval(timeOut);
        setTime(delay);
      } else {
        addTime -= 1000;
        setTime(addTime);
      }
    }, 1000);

    return () => clearInterval(timeOut);
  }, [form.cryptoPayPage]);

  return form.cryptoPayPage ? (
    <CryptoReEnterPayment />
  ) : (
    <Style>
      <AuthErrors
        AuthActions={() => dispatch(TransferActions())}
        message={
          (isAmountCopied ? 'Amount Copied to Clipboard' : null) ??
          (isAddressCopied ? 'Address Copied to Clipboard' : null)
        }
        errors={null}
        condition={isAmountCopied || isAddressCopied}
      />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        margin="1rem auto"
      >
        <Text
          textAlign="center"
          color={theme.palette.primary.light}
          variant="h6"
        >
          Pay into our Syarpa wallet
        </Text>

        <Text
          margin="0 auto"
          textAlign="center"
          fontWeight="300"
          width="250px"
          color="#bbb"
          variant="caption"
        >
          Send bitcoin to our wallet and we will transfer to your recipient on
          your behalf
        </Text>
        <Box className="row" justifyContent="center">
          <Box
            marginRight=".5rem"
            display="inline-block"
            color={theme.palette.secondary.main}
          >
            <UpdateOutlined
              css="vertical-align: middle;"
              color="inherit"
              fontSize="small"
            />
          </Box>
          <Text
            color={theme.palette.primary.main}
            fontWeight="300"
            fontSize=".85rem"
            variant="caption"
          >
            You have{' '}
            <Text
              fontWeight="500"
              variant="caption"
              color={theme.palette.secondary.main}
            >
              {time / 1000} secs
            </Text>{' '}
            to complete this payment
          </Text>
        </Box>
      </Box>
      <Box className="confirm-box">
        <Box display="flex" justifyContent="center" margin="1.5rem auto 2rem">
          <QRCode
            fgColor={theme.palette.primary.light}
            value={cryptoCharge?.url ?? 'asas'}
          />
        </Box>
        {[
          {
            key: cryptoCharge?.url,
            value: 'Copy address',
            action: copyAddress,
          },
          {
            key: `${convertToCurrency(form.amount)} ${form.fromCurrency}`,
            value: 'Copy amount',
            action: copyAmount,
          },
        ].map((item, ind) => (
          <Box
            key={ind}
            className="row"
            marginBottom=".5rem"
            justifyContent="space-between"
          >
            <Text
              width="50%"
              css="word-wrap:break-word;"
              className="key"
              variant="body1"
              fontSize=".85rem"
            >
              {item.key}
            </Text>
            <Button
              bgColor="#f5f8ff"
              color={theme.palette.primary.light}
              padding=".5rem"
              onClick={item.action}
            >
              <Text
                margin="0 .5rem 0 0"
                color={theme.palette.primary.light}
                variant="caption"
                fontWeight="400"
              >
                {item.value}
              </Text>
              <Image
                width="1rem"
                src={Assets.COPY_CONTENT}
                alt="copy content"
              />
            </Button>
          </Box>
        ))}
        {[
          {
            key: 'Current Rate',
            value: `${form.fromCurrency} 1 = ${form.rate} ${form.toCurrency}`,
          },
          {
            key: 'They receive',
            value: `${form.toCurrency} ${convertToCurrency(
              form.convertedAmount
            )}`,
          },
        ].map((item, ind) => (
          <Box key={ind} className="row" justifyContent="space-between">
            <Text className="key" variant="caption">
              {item.key}
            </Text>
            <Text className="value" variant="caption">
              {item.value}
            </Text>
          </Box>
        ))}
        <Box width="100%" marginTop="1rem">
          <Button
            padding=".6rem"
            onClick={() => Router.replace('/transfer/pending')}
            width="100%"
            fontWeight="300"
            bgColor={theme.palette.primary.light}
          >
            Done
          </Button>
        </Box>
        <Box width="100%">
          <Button
            padding=".6rem"
            onClick={() => Router.replace('/dashboard')}
            width="100%"
            fontWeight="300"
            color="#bbb"
            colorTheme="transparent"
          >
            Cancel Transaction
          </Button>
        </Box>
      </Box>
    </Style>
  );
};

export default CryptoPayment;
