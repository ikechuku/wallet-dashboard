import React from 'react';
import { connect } from 'react-redux';
import { Box } from '@material-ui/core';
import { GetUserAsync } from '../../store/actions/authActions';
import Loader from '../molecule/Loader';

const Hydrator = ({ Component, pageProps = {}, ...props }) => {
  React.useEffect(() => {
    props.GetUserAsync();
  }, []);
  return props.isSettingAuth ? (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      height="80vh"
    >
      <Loader />
    </Box>
  ) : (
    <main>
      <Component {...pageProps} />
    </main>
  );
};

const mapStateToProps = ({ auth }) => ({
  isSettingAuth: auth.isSettingAuth,
});

export default connect(mapStateToProps, { GetUserAsync })(Hydrator);
