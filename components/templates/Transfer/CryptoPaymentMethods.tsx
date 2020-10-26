import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Grid, useTheme, Hidden } from '@material-ui/core';
import { Text, Button, Image } from '../../atoms';
import Assets from '../../../utils/assets';
import { CryptoPayMethodStyle } from './styles';
import { CryptoPaymentReqProps, TransferState } from '../../../models/Transfer';
import { TransferRoutes, transferNavigate } from '../../../utils/enums';
import {
  CryptoPaymentAsync,
  TransferActions,
} from '../../../store/actions/tranferActions';
import Spinner from '../../atoms/Spinner';
import AuthErrors from '../../shared/AuthErrors';
import { emptyObj } from '../../../utils';
import { AuthState } from '../../../models/Auth';

const OptionsCard = ({
  alt,
  isLoading = false,
  src,
  heading,
  subHeading,
  subTitle,
  page = (_) => _,
}) => {
  const theme = useTheme();
  return (
    <Button css="text-align: left;" width="100%" padding="0" onClick={page}>
      <Box position="relative" width="100%">
        {isLoading && (
          <Box
            width="100%"
            height="100%"
            bgcolor="#bbb"
            position="absolute"
            css="opacity: .5"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner />
          </Box>
        )}
        <Box
          width="100%"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          boxShadow="0 1px 3px 3px rgba(0, 0, 0, 0.03)"
          padding="1rem .6rem"
          bgcolor="#fff"
          className="card-box"
        >
          <Box width="4rem" textAlign="center">
            <Image
              height="2.5rem"
              alt={alt}
              src={require(`../../../public${src}`)}
            />
          </Box>
          <Box flexGrow="1" paddingX=".5rem">
            <Text
              fontWeight="400"
              color={theme.palette.primary.light}
              fontSize=".9rem"
              variant="subtitle1"
            >
              {heading}
            </Text>
            <Hidden xsDown>
              <Text
                fontWeight="300"
                color="rgba(0, 0, 0, .5)"
                variant="subtitle2"
              >
                {subHeading}
              </Text>
            </Hidden>
            <Text
              fontWeight="300"
              color={theme.palette.info.main}
              variant="caption"
            >
              {subTitle}
            </Text>
          </Box>
        </Box>
      </Box>
    </Button>
  );
};

const CryptoPaymentMethods = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const transfer: TransferState = useSelector((state) => state.transfer);
  const { profile }: AuthState = useSelector((state) => state.auth);
  const { form, cryptoCharge, message, errors } = transfer;
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(TransferActions())}
        message={message}
        errors={errors}
        condition={!emptyObj(cryptoCharge)}
      />
      <Box margin="2rem auto" width="80%">
        <Text
          color={theme.palette.primary.light}
          textAlign="center"
          fontSize="1.4rem"
          variant="h6"
        >
          How do you want to pay?
        </Text>
      </Box>
      <CryptoPayMethodStyle
        alignItems="center"
        margin="0 auto 3rem"
        display="flex"
        flexDirection="column"
      >
        <Grid container className="pay-options-grid" spacing={2}>
          {[
            {
              alt: 'Pay from your crypto wallet',
              src: Assets.CONNECT_CRYPTO,
              heading: 'Pay from your crypto wallet',
              isLoading: false,
              subHeading:
                'Connect to an existing crypto wallet and pay directly to your recipient.',
              subTitle: '',
            },
            {
              alt: 'Pay into our Syarpa wallet',
              active: true,
              isLoading,
              src: Assets.SYARPA_WALLET_OUTLINE,
              heading: 'Pay into our Syarpa wallet',
              subHeading:
                'Send bitcoin to our wallet and we will transfer to your recipient on your behalf.',
              subTitle: '',
              page: () => {
                setIsLoading(true);
                dispatch(
                  CryptoPaymentAsync({
                    params: {
                      bankCode:
                        form.recipientCountry === 'NG'
                          ? form.bank
                          : form.sortCode,
                      accountName: form.newRecipientName,
                      accountNumber: form.accountNumber,
                      fromAmount: Number(form.amount),
                      fromCurrency: form.fromCurrency,
                      narration: form.narration,
                      toAmount: Number(form.convertedAmount),
                      toCurrency: form.toCurrency,
                      bankName: form.bankName,
                      tranxId: `${Date.now()}${profile.userId}`,
                    } as CryptoPaymentReqProps,
                    cb: (pass) => {
                      setIsLoading(false);
                      if (pass) {
                        transferNavigate({
                          route: TransferRoutes.CRYPTO_PAYMENT,
                          obj: {
                            ...transfer,
                            cryptoCharge: pass,
                          } as TransferState,
                        });
                      }
                    },
                  })
                );
              },
            },
          ].map((optBox, index) => (
            <Grid
              key={index}
              item
              sm={6}
              xs={12}
              css={`
                opacity: ${optBox.active ? 1 : 0.5};
              `}
              className="opt-box"
            >
              <OptionsCard
                alt={optBox.alt}
                page={optBox.page}
                isLoading={optBox.isLoading}
                heading={optBox.heading}
                subHeading={optBox.subHeading}
                src={optBox.src}
                subTitle={optBox.subTitle}
              />
            </Grid>
          ))}
        </Grid>
      </CryptoPayMethodStyle>
    </>
  );
};

export default CryptoPaymentMethods;
