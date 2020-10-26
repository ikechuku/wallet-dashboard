import * as React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Style from './styles';
import DashboardBody from './body';
import DashboardHeader from './header';
import { AuthState } from '../../../../models/Auth';
import { DashBoardState } from '../../../../models/Helpers';
import { SetUpDashboardAsync } from '../../../../store/actions/dashBoardActions';
import Spinner from '../../../atoms/Spinner';

const ActivityTemplate = () => {
  const dispatch = useDispatch();
  const {
    auth: { profile },
    dashboard,
  }: { auth: AuthState; dashboard: DashBoardState } = useSelector((state) => ({
    dashboard: state.dashboard,
    auth: state.auth,
  }));
  React.useEffect(() => {
    dispatch(SetUpDashboardAsync());
  }, []);
  return (
    <Style>
      <DashboardHeader profile={profile} />
      {/* {dashboard.isLoading ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height="100%"
        >
          <Spinner size="3rem" />
        </Box>
      ) : (
        <DashboardBody transactions={dashboard.transactions} />
      )} */}
    </Style>
  );
};

export default ActivityTemplate;
