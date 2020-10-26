import React from 'react';
import { Container, Box, useTheme } from '@material-ui/core';
import Header from '../components/templates/HowItWorks/Header';
import Footer from '../components/templates/HowItWorks/Footer';
import Style from '../components/templates/Home/style';
import PublicRoute from '../components/shared/PublicRoute';
import { HomeNav } from '../components/molecule';
import HowSyarpaWorks from '../components/templates/HowItWorks/Body';

const index = () => {
  return (
    <PublicRoute
      Component={() => {
        const theme = useTheme();
        return (
          <Style>
            <Box bgcolor={theme.palette.primary.light}>
              <Container>
                <HomeNav />
                <Header />
              </Container>
            </Box>
            <HowSyarpaWorks />
            <Footer />
          </Style>
        );
      }}
    />
  );
};
export default index;
