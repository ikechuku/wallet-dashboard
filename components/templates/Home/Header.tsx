import React from 'react';
import Router from 'next/router';
import { Box, Hidden, useTheme } from '@material-ui/core';
import Text from '../../atoms/Text';
import Button from '../../atoms/Button';
import useAbokiConverter from '../../../hooks/useAbokiConverter';
import { HeaderStyle as Style } from './style';
import TransferConverter from '../../organism/CurrencyConverter/TransferConverter';
import useCryptoConverter from '../../../hooks/useCryptoConverter';
import useConverterForm from '../../../hooks/useConverterForm';

const HomeHeader = () => {
  React.useEffect(() => {
    Router.prefetch('/login');
    Router.prefetch('/signup');
    Router.prefetch('/how-it-works');
  }, []);

  const { form, setForm } = useConverterForm({});

  const { disableToAmount } = useAbokiConverter({
    form,
    setForm,
  });

  useCryptoConverter({
    form,
    setForm,
  });

  const theme = useTheme();
  return (
    <Style>
      <Box width="100%" display="flex" className="greet">
        <Box display="flex" flexGrow="1">
          <Box className="greet-msg">
            <Hidden smDown>
              <Text
                fontWeight="600"
                color={theme.palette.secondary.contrastText}
                margin="0 0 2rem"
                variant="h3"
              >
                Efficient, Faster, Safe Money Transfer
              </Text>
            </Hidden>

            <Hidden xsDown>
              <Text
                margin="0 0 2rem"
                css="opacity: .7"
                color={theme.palette.secondary.contrastText}
                variant="h6"
                fontWeight="300"
                lineHeight="1.6rem"
              >
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga
                dolorem temporibus ipsam consequatur praesentium error nulla
                doloribus
              </Text>
              <Text
                fontWeight="300"
                color={theme.palette.secondary.contrastText}
                variant="h6"
              >
                Start sending money now!
              </Text>
              <div className="action-btns">
                <Button
                  onClick={() => {
                    Router.push('/signup');
                  }}
                  bgColor={theme.palette.secondary.main}
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => {
                    Router.push('/login');
                  }}
                  bgColor={theme.palette.primary.main}
                >
                  Login
                </Button>
              </div>
            </Hidden>
          </Box>
        </Box>
        <Box
          display="flex"
          width="100%"
          className="current-rates"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Hidden mdUp>
            <Text
              fontWeight="600"
              color={theme.palette.secondary.contrastText}
              variant="h3"
            >
              Efficient, Faster, Safe Money Tranfer
            </Text>
            <Text
              css="opacity: .5"
              color={theme.palette.secondary.contrastText}
              width="80%"
              margin=".1rem 0 2rem"
              variant="caption"
              fontWeight="300"
            >
              Lorem ipsum dolor sit, amet consectetur
            </Text>
          </Hidden>
          <Box
            className="rate-con"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Text
              variant="body1"
              css="opacity: .3"
              color={theme.palette.secondary.contrastText}
              margin="0 0 1rem"
            >
              CHECK CURRENT RATES
            </Text>
            <TransferConverter
              disableToAmount={disableToAmount}
              form={form}
              setForm={setForm}
              className="home"
            >
              <Box marginTop=".5rem" display="flex" alignSelf="end">
                <Button
                  bgColor={theme.palette.secondary.main}
                  fontWeight="300"
                  onClick={() => Router.push('/login')}
                  width="100%"
                >
                  Start sending money!
                </Button>
              </Box>
            </TransferConverter>
          </Box>
        </Box>
      </Box>
    </Style>
  );
};

export default HomeHeader;
