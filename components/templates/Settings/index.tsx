import * as React from 'react';
import { ArrowBack } from '@material-ui/icons';
import { Box, IconButton, useTheme } from '@material-ui/core';
import Style from './styles';
import { InAppHeaderStyle } from '../../shared/StyleUtils';
import useBreakPoints from '../../../hooks/useBreakPoints';
import HeaderNavigation from '../../organism/HeaderNavigation';
import SettingsList from './SettingsList';
import SettingsMap from './panes';
import { Text } from '../../atoms';

const SettingsTemplate = () => {
  const { md } = useBreakPoints();
  const theme = useTheme();
  const [selected, setSelected] = React.useState('');

  return (
    <Style>
      <InAppHeaderStyle>
        <HeaderNavigation title="Settings" />
      </InAppHeaderStyle>
      <Box
        height="90vh"
        width="100%"
        /* className="hide-scrollbar" */
        overflow="hidden"
      >
        <Box
          display="flex"
          position="relative"
          flexDirection="row"
          height="100%"
          width="100%"
          className="anim"
          overflow="hidden"
        >
          <Box
            width={md ? '30%' : '100%'}
            minWidth="300px"
            height="100%"
            className="anim hide-scrollbar"
            css="overflow-y: auto; overflow-x: hidden;"
            position={md ? 'static' : 'absolute'}
            left={selected ? '-100%' : '0'}
          >
            <SettingsList setSelected={setSelected} selected={selected} />
          </Box>
          <Box
            className="anim"
            padding={md ? '1.5rem' : '1rem'}
            css="overflow-y: auto; overflow-x: hidden;"
            height="100%"
            position={md ? 'static' : 'absolute'}
            left={selected ? '0' : '100%'}
            display="flex"
            flexDirection="column"
            flexGrow="1"
            width={md ? 'auto' : '100%'}
          >
            <Box display="flex" alignItems="center">
              {!md && (
                <Box>
                  <IconButton onClick={() => setSelected('')}>
                    <ArrowBack />
                  </IconButton>
                </Box>
              )}
              <Text
                variant="subtitle1"
                fontSize="1.3rem"
                margin="0 1rem"
                color={theme.palette.primary.light}
                textAlign="left"
              >
                {selected}
              </Text>
            </Box>
            <Box display="flex" flexGrow="1">
              <SettingsMap selected={selected} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Style>
  );
};

export default SettingsTemplate;
