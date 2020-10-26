import React, { ReactNode } from 'react';
import {
  Twitter,
  Instagram,
  Facebook,
  LinkedIn,
  YouTube,
} from '@material-ui/icons';
import { Grid, Box, Link, Container } from '@material-ui/core';
import Text from '../../atoms/Text';
import { FooterStyle as Style } from './style';
import { Logo } from '../../molecule';

interface FooterLinkProps {
  text: any;
  href: string;
}

interface FooterNavProps {
  Head: ReactNode;
  list: Array<FooterLinkProps>;
  display?: string;
  margin?: string;
  component: Function;
}
const Footer = () => (
  <Style>
    <Container>
      <Grid container alignItems="flex-start">
        {[
          {
            head: (
              <>
                <Logo theme="dark" imageSize="7rem" />
              </>
            ),
            list: [
              { text: 'About us', href: '#' },
              { text: 'News', href: '#' },
              { text: 'Careers', href: '#' },
            ],
            component: ({ text, href }: FooterLinkProps) => (
              <Link color="inherit" href={`/${href}`}>
                <Text variant="body1">{text}</Text>
              </Link>
            ),
          },
          {
            head: <Text variant="subtitle1">Help and Support</Text>,
            list: [
              { text: 'FAQ', href: '#' },
              { text: 'Contact us', href: '#' },
              { text: 'Partner with Us', href: '#' },
            ],
            component: ({ text, href }: FooterLinkProps) => (
              <Link color="inherit" href={`/${href}`}>
                <Text variant="body1">{text}</Text>
              </Link>
            ),
          },
          {
            head: <Text variant="subtitle1">Legal</Text>,
            list: [
              { text: 'Terms and conditions', href: '#' },
              { text: 'Privacy policy', href: '#' },
              { text: 'Cookies policy', href: '#' },
            ],
            component: ({ text, href }: FooterLinkProps) => (
              <Link color="inherit" href={`/${href}`}>
                <Text variant="body1">{text}</Text>
              </Link>
            ),
          },
          {
            head: <Text variant="subtitle1">Follow us</Text>,
            list: [
              { text: Twitter, href: '#' },
              { text: Facebook, href: '#' },
              { text: Instagram, href: '#' },
              { text: LinkedIn, href: '#' },
              { text: YouTube, href: '#' },
            ],
            display: 'inline-block',
            margin: '.7rem 1.3rem 0 0',
            component: ({ text: Comp, href }: FooterLinkProps) => (
              <Link color="inherit" href={`/${href}`}>
                <Comp />
              </Link>
            ),
          },
        ].map((item, index) => (
          <Grid item md={3} sm={6} xs={12} key={index}>
            <FooterNav
              Head={item.head}
              list={item.list}
              display={item.display}
              margin={item.margin}
              component={item.component}
            />
          </Grid>
        ))}
      </Grid>
      <Text margin="4rem 0 0" variant="body1" fontWeight="300">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime
        quibusdam, dolores ut provident velit omnis reprehenderit sunt, ex
        explicabo, cum atque perferendis possimus nihil commodi nulla facere
        mollitia ipsam deserunt? Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Odio ipsum sequi commodi eveniet laborum beatae facere
        quo. Quasi commodi laudantium ipsum, magnam ex officia, perspiciatis
        libero nisi provident obcaecati earum?
      </Text>
    </Container>
  </Style>
);

const FooterNav = ({
  Head,
  list,
  display = 'block',
  margin = '.7rem 0',
  component,
}: FooterNavProps) => (
  <>
    <Box display="flex" className="header" alignItems="center" height="5rem">
      {Head}
    </Box>
    {list.map((item, index) => (
      <Box display={display} margin={margin} key={index}>
        {component(item)}
      </Box>
    ))}
  </>
);

export default Footer;
