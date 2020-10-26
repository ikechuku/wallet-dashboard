import * as React from 'react';
import { Box } from '@material-ui/core';
import Style from './styles';
import PersonalProfile from './PersonalProfile';
import useBreakPoints from '../../../hooks/useBreakPoints';
import { InAppHeaderStyle } from '../../shared/StyleUtils';
import HeaderNavigation from '../../organism/HeaderNavigation';

const PersonalProfileTemplate = () => {
  const { md, lg } = useBreakPoints();
  /* const { profile }: AuthState = useSelector((state) => state.auth); */
  const getWidth = () => {
    if (lg) return '60%';
    if (md) return '80%';
    return '100%';
  };
  return (
    <Style>
      <InAppHeaderStyle>
        <HeaderNavigation title="Profile" />
      </InAppHeaderStyle>
      {/* {profile.userProfileType === 'PERSONAL' && } */}
      <Box
        height="90vh"
        width="100%"
        /* className="hide-scrollbar" */
        css="overflow-y: auto;"
      >
        <Box maxWidth="1000px" padding="2rem" width={getWidth()}>
          <PersonalProfile />
        </Box>
      </Box>
    </Style>
  );
};

export default PersonalProfileTemplate;
