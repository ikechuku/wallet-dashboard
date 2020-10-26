import * as React from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Hidden, IconButton } from '@material-ui/core';
import { Clear, ArrowBack } from '@material-ui/icons';
import { TransferStyle } from './styles';
import { TransferRoutes } from '../../../utils/enums';
import { transfer as initialTransfer } from '../../../store/reducers/initialState';
import SPA from '../../shared/SPA';
import transferRoute from './routes';
import Progress from '../../molecule/Progress';
import { AuthState } from '../../../models/Auth';
import { TransferState, TransferForm } from '../../../models/Transfer';
import { emptyObj, removeFromLocalStorage } from '../../../utils';
import { TransferActions } from '../../../store/actions/tranferActions';
import Spinner from '../../atoms/Spinner';

const TranferTemplate = ({ className }) => {
  const { auth, transfer } = useSelector((state) => ({
    auth: state.auth,
    transfer: state.transfer,
  }));
  const dispatch = useDispatch();
  const { profile } = auth as AuthState;
  const { form } = transfer as TransferState;
  const router = useRouter();

  const startRoute = TransferRoutes.ENTER_PAYMENT;
  const [route, setRoute] = React.useState(startRoute);
  const [readyState, setReadyState] = React.useState(false);

  React.useEffect(() => {
    setReadyState(false);
  }, []);

  React.useEffect(() => {
    const {
      query: { page },
    } = router;
    const pageString = String(page);
    const splitUrl = router.asPath.split('=');
    if (
      emptyObj(form) &&
      splitUrl?.[0] !== '/transfer' &&
      splitUrl?.[0] !== '/transfer?recipient'
    ) {
      setReadyState(true);
      router.back();
    } else {
      if (splitUrl?.[0] === '/transfer') {
        removeFromLocalStorage({ key: 'form' });
        const toCurrency =
          auth?.profile.country?.currencyCode === 'GBP' ? 'NGN' : 'GBP';
        const recipientCountry = toCurrency === 'GBP' ? 'GB' : 'NG';
        const recipientCountryId = toCurrency === 'GBP' ? 236 : 162;
        dispatch(
          TransferActions({
            ...initialTransfer,
            form: {
              ...form,
              toCurrency,
              recipientCountry,
              recipientCountryId,
            } as TransferForm,
          })
        );
        setReadyState(true);
      } else {
        setReadyState(true);
      }
      setRoute(pageString);
    }
  }, [router.query.page]);

  const getRoute = () =>
    transferRoute[route] || transferRoute[TransferRoutes.ENTER_PAYMENT];

  return (
    <Box height="100%" padding="0.5rem 1rem 3rem" className={className}>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Box
          width="100%"
          flexDirection="column"
          alignItems="center"
          display="flex"
          className={className}
        >
          <Hidden smUp>
            <Box
              display="flex"
              width="100%"
              justifyContent="flex-end"
              color="rgba(0,0,0.2)"
            >
              <IconButton onClick={() => router.push('/dashboard')}>
                <Clear color="inherit" />
              </IconButton>
            </Box>
          </Hidden>
          <Box
            className="navigation"
            width="100%"
            alignItems="flex-start"
            marginTop=".8rem"
            display="flex"
          >
            <Hidden xsDown>
              <IconButton
                css="width: 3rem; height: 3rem; margin: 0 2rem 0 0;"
                onClick={() => router.back()}
              >
                <ArrowBack />
              </IconButton>
            </Hidden>
            <Progress
              step={getRoute().step}
              routes={[
                `/transfer?page=${TransferRoutes.ENTER_PAYMENT}`,
                `/transfer?page=${
                  profile.userProfileType === 'PERSONAL'
                    ? TransferRoutes.ENTER_PERSONAL
                    : TransferRoutes.ENTER_BUSINESS
                }`,
                `/transfer?page=${TransferRoutes.TRANFER_TYPE}`,
                `/transfer?page=${TransferRoutes.CONFIRM_PAYMENT}`,
                `/transfer?page=${TransferRoutes.PAYMENT_METHOD}`,
              ]}
              fontSize=".7rem"
              list={['Amount', 'You', 'Recipient', 'Review', 'Payment']}
            />
            <Hidden xsDown>
              <IconButton
                css="width: 3rem; height: 3rem; margin: 0 0 0 2rem;"
                onClick={() => router.push('/dashboard')}
              >
                <Clear />
              </IconButton>
            </Hidden>
          </Box>
        </Box>
        <Box width="100%" display="flex" flexGrow="1" className="transfer-body">
          {!readyState ? (
            <Box
              width="100%"
              height="80vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Spinner size="3rem" />
            </Box>
          ) : (
            <SPA
              pages={[{ component: getRoute().component, isVisible: true }]}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default TransferStyle(TranferTemplate);
