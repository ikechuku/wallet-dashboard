import React from 'react';
import { Container, Divider, Hidden } from '@material-ui/core';
import {
  Header,
  HomeNav,
  SendCrypto,
  OptionMoney,
  PaymentTypes,
  DownloadApp,
  ChooseSkarpa,
  Footer,
} from '../components/templates/Home';
import Style, { Banner, FooterBg } from '../components/templates/Home/style';
import Testimonial from '../components/templates/Home/Testimonial';
import PublicRoute from '../components/shared/PublicRoute';

const Index = () => {
  return (
    <PublicRoute
      Component={() => (
        <Style>
          <Banner>
            <Container>
              <HomeNav />
              <Header />
              <Hidden xsDown>
                <ChooseSkarpa />
              </Hidden>
            </Container>
          </Banner>
          <Testimonial />
          <SendCrypto />
          <Hidden xsDown>
            <OptionMoney />
          </Hidden>
          <PaymentTypes />
          <Divider />
          <DownloadApp />
          <FooterBg>
            <Container>
              <Footer />
            </Container>
          </FooterBg>
        </Style>
      )}
    />
  );
};
export default Index;
