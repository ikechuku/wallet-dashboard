import * as React from 'react';
import { useSelector } from 'react-redux';
import { Box, useTheme } from '@material-ui/core';
import { ChevronLeftSharp } from '@material-ui/icons';
import { Button, Text, Image } from '../../atoms';
import Assets from '../../../utils/assets';
import useBreakPoints from '../../../hooks/useBreakPoints';
import { AuthState } from '../../../models/Auth';

const SettingsList = ({ selected, setSelected }) => {
  const theme = useTheme();
  const { user }: AuthState = useSelector((state) => state.auth);
  const { sm } = useBreakPoints();

  return (
    <Box width="100%" height="100%" borderRight="1px solid rgba(0,0,0,.07)">
      {[
        {
          title: 'My accounts',
          icon: Assets.SETTINGS1,
          active: true,
        },
        {
          title: 'Email Address',
          subTitle: (
            <Text variant="caption" textAlign="left">
              {user.email}{' '}
              <Text variant="caption" color="#23C1A9">
                Verified
              </Text>
            </Text>
          ),
          icon: Assets.SETTINGS6,
        },
        { title: 'Notifications', subTitle: '', icon: Assets.SETTINGS7 },
        { title: 'Change Password', subTitle: '', icon: Assets.SETTINGS8 },
        { title: 'Security', subTitle: '', icon: Assets.SETTINGS9 },
        { title: 'Refer a Friend', subTitle: '', icon: Assets.SETTINGS4 },
        { title: 'Display', subTitle: '', icon: Assets.SETTINGS5 },
        { title: 'Communications', subTitle: '', icon: Assets.SETTINGS0 },
        {
          title: 'Document verification',
          icon: Assets.SETTINGS3,
        },
        { title: 'Verification Level', subTitle: '', icon: Assets.SETTINGS2 },
      ].map((item, ind) => (
        <Button
          key={ind}
          bgColor={item.title === selected ? '#EFF1FF' : 'transparent'}
          onClick={() => item.active && setSelected(item.title)}
          width="100%"
          css={`
            opacity: ${item.active ? 1 : 0.5};
          `}
          padding="0"
        >
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            padding="1rem"
            borderBottom="1px solid rgba(0,0,0,.07)"
          >
            <Image src={item.icon} alt={item.title} width="2rem" />
            <Box
              flexGrow="1"
              marginLeft={sm ? '2.5rem' : '1rem'}
              display="flex"
              flexDirection="column"
            >
              <Text
                variant="subtitle1"
                color={theme.palette.primary.light}
                textAlign="left"
              >
                {item.title}
              </Text>
              {item.subTitle}
            </Box>
            <Box width="2rem" color={theme.palette.primary.light}>
              <ChevronLeftSharp
                color="inherit"
                fontSize="large"
                css="vertical-align: middle; transform: rotate(-185deg);"
              />
            </Box>
          </Box>
        </Button>
      ))}
    </Box>
  );
};

export default SettingsList;
