import React from 'react';
import { Box, useTheme } from '@material-ui/core';
import Router from 'next/router';
import { Image, Text, Button } from '../../../atoms';
import Assets from '../../../../utils/assets';
import { ActionCards } from './styles';
import { ActiveStyle, PopAnimStyle } from '../../../shared/StyleUtils';

const DashboardActivities = ({ width = '100%', margin = '', className }) => {
  const theme = useTheme();
  const { SEND_ICON, PAY_BILLS_ICON, REQUEST_ICON } = Assets;
  return (
    <Box
      display="flex"
      width={width}
      alignItems="center"
      className={className}
      color="white"
      justifyContent="space-between"
    >
      {[
        {
          active: true,
          image: SEND_ICON,
          title: 'Send',
          href: '/transfer',
        },
        { image: REQUEST_ICON, title: 'Request', href: '' },
        { image: PAY_BILLS_ICON, title: 'Pay Bills', href: '' },
      ].map((item, key) => (
        <Button
          onClick={() => {
            if (!item.active) return;
            Router.push(item.href);
          }}
          padding="0"
          css={`
            ${PopAnimStyle(item.active)} ${ActiveStyle(item.active)}
          `}
          bgColor="#fff"
          key={key}
          margin={margin}
        >
          <Box
            borderRadius=".2rem"
            className="action-card"
            padding="0.5rem"
            flexDirection="column"
            boxShadow="0 1px 5px 5px rgba(0, 0, 0, 0.05)"
            height="5rem"
            minWidth="6.5rem"
            display="flex"
            alignItems="flex-start"
            justifyContent="space-between"
            width="32%"
          >
            <Image
              css="margin-bottom: .3rem;"
              height="1.5rem"
              alt="Syapa account image"
              src={require(`../../../../public${item.image}`)}
            />
            <Text
              fontSize=".8rem"
              color={theme.palette.primary.light}
              fontWeight="500"
              variant="body1"
            >
              {item.title}
            </Text>
          </Box>
        </Button>
      ))}
    </Box>
  );
};

export default ActionCards(DashboardActivities);
