import * as React from 'react';
import { Box, Hidden, useTheme } from '@material-ui/core';
import Router from 'next/router';
import { Text, Button, Image } from '../../../atoms';
import { DbBodyStyle } from './styles';
import DashboardActivities from './dashboardActivies';
import Assets from '../../../../utils/assets';
import Activity from './list';

const DashboardBody = ({ className, transactions }) => {
  const { SEND_ICON, MONEY_DASHBOARD, REQUEST_ICON } = Assets;
  const theme = useTheme();
  return (
    <Box className={`hide-scrollbar ${className}`}>
      <Hidden smUp>
        <Box width="100%" marginBottom=".5rem">
          <DashboardActivities />
        </Box>
      </Hidden>
      {transactions?.list && transactions.list.length > 0 ? (
        <Activity transactions={transactions} />
      ) : (
        <Box
          flexDirection="column"
          height="100%"
          width="100%"
          display="flex"
          className="placeholder"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            margin="1rem 0"
            width="4rem"
            alt="money image"
            src={require(`../../../../public${MONEY_DASHBOARD}`)}
          />
          <Text
            margin="0 0 1rem 0"
            color="#9DA8B6"
            fontSize="1.2rem"
            textAlign="center"
            variant="h5"
          >
            Make your first
            <br />
            transaction
          </Text>
          <Text color="#9DA8B6" textAlign="center" variant="body1">
            Efficient, Faster, Safe Money Transfer
          </Text>
          <Box
            marginTop="2rem"
            display="flex"
            className="btns"
            width="100%"
            justifyContent="space-between"
          >
            <Box
              flexDirection="column"
              display="flex"
              width="45%"
              justifyContent="center"
            >
              <Button
                className="dashboard-btn"
                onClick={() => Router.push('/transfer')}
                bgColor={theme.palette.primary.light}
              >
                <Image
                  height="1.4rem"
                  className="img-actn"
                  alt="send money icon"
                  src={require(`../../../../public${SEND_ICON}`)}
                />
              </Button>
              <Text
                className="text-actn"
                color="#9DA8B6"
                textAlign="center"
                variant="caption"
              >
                Send
              </Text>
            </Box>
            <Box
              flexDirection="column"
              display="flex"
              width="45%"
              justifyContent="center"
            >
              <Button
                className="dashboard-btn"
                bgColor={theme.palette.primary.light}
              >
                <Image
                  height="1.3rem"
                  className="img-actn"
                  alt="send money icon"
                  src={require(`../../../../public${REQUEST_ICON}`)}
                />
              </Button>
              <Text
                className="text-actn"
                color="#9DA8B6"
                textAlign="center"
                variant="caption"
              >
                Request
              </Text>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default DbBodyStyle(DashboardBody);
