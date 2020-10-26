import * as React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Image } from '../../atoms';
import { CardDetailsStyle } from './styles';
import Assets from '../../../utils/assets';
import StripeForm from '../../shared/StripeForm';
import { TransferState } from '../../../models/Transfer';
import { TransferActions } from '../../../store/actions/tranferActions';
import AuthErrors from '../../shared/AuthErrors';
import { emptyObj } from '../../../utils';

const CardDetails = () => {
  const transfer: TransferState = useSelector((state) => state.transfer);
  const dispatch = useDispatch();
  const theme = useTheme();
  const { message, errors, stripeIntent } = transfer;
  return (
    <>
      <AuthErrors
        AuthActions={() => dispatch(TransferActions())}
        message={message}
        errors={errors}
        condition={!emptyObj(stripeIntent)}
      />
      <CardDetailsStyle width="100%" marginX="auto">
        <Box margin="2rem auto 3rem">
          <Text
            textAlign="center"
            fontSize="1.3rem"
            color={theme.palette.primary.light}
            variant="h6"
          >
            Add Bank Card
          </Text>
        </Box>
        <Box alignItems="center" display="flex" flexDirection="column">
          <StripeForm />
          <Box marginY=".5rem">
            <Text css="opacity: .7" variant="caption">
              we accept
            </Text>
          </Box>
          <Box width="95%" display="flex" justifyContent="space-between">
            {[
              Assets.MASTERCARD_LOGO,
              Assets.VISACARD_LOGO,
              Assets.MAESTRO_LOGO,
              Assets.AMEX_LOGO,
              Assets.PAYPAL_LOGO,
              Assets.JCB_LOGO,
            ].map((item, key) => (
              <Image
                key={key}
                alt="payment agents logo"
                src={require(`../../../public${item}`)}
              />
            ))}
          </Box>
        </Box>
      </CardDetailsStyle>
    </>
  );
};

export default CardDetails;
