import React from 'react';
import {
  Box,
  useTheme,
  Container,
  Avatar,
  useMediaQuery,
} from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import ItemsCarousel from 'react-items-carousel';
import { Image, Text } from '../../atoms';
import Assets from '../../../utils/assets';
import { TestimonialStyle } from './style';

const Testimonial = () => {
  const { QUOTES } = Assets;
  const threeItems = useMediaQuery('(min-width:1024px)');
  const twoItems = useMediaQuery('(min-width:768px)');

  const [items, setItems] = React.useState(1);
  React.useEffect(() => {
    if (threeItems) setItems(3);
    else if (twoItems) setItems(2);
    else setItems(1);
  }, [twoItems, threeItems]);

  const theme = useTheme();
  const [active, setActive] = React.useState(0);
  return (
    <Container>
      <TestimonialStyle>
        <Box
          position="relative"
          display="flex"
          marginTop="2rem"
          className="header"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Image
            src={QUOTES}
            width="9rem"
            css="background-size: cover;"
            alt="quotes"
          />
          <Box position="absolute">
            <Text
              variant="h4"
              margin="0 0 0 1.5rem"
              fontWeight="500"
              color={theme.palette.primary.light}
            >
              What are people
              <br />
              saying about Syarpa?
            </Text>
          </Box>
        </Box>
        <Box className="body" marginBottom="4rem">
          <Box
            zIndex="1"
            right="0"
            css="background-image:linear-gradient(to right, transparent , #f7f8ff);"
            height="100%"
            position="absolute"
            width="20%"
          />
          <ItemsCarousel
            infiniteLoop={false}
            gutter={20}
            activePosition="center"
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={items}
            slidesToScroll={2}
            outsideChevron
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={active}
            requestToChangeActive={(value) => setActive(value)}
            rightChevron={
              <Box
                zIndex="5"
                className="right-arrow"
                position="relative"
                left="-4rem"
              >
                <KeyboardArrowRight fontSize="large" />
              </Box>
            }
            leftChevron={<KeyboardArrowLeft fontSize="large" />}
          >
            {[
              {
                title: '“I’ve had no problems..”',
                content: `I use Syarpa to send money to my parents back home in Nigeria and so far, I haven’t encountered any problems`,
                pic: Assets.PROFILE_PIC,
                name: 'Peter (Brighton, England):',
              },
              {
                title: '“The transfers were quick…”',
                content: `When it comes to online payment apps, I have issues with trust. But when I started to use Syarpa, I’ve not had to worry about the safety of my funds.`,
                pic: Assets.PROFILE_PIC,
                name: 'Dayo (Lagos, Nigeria)',
              },
              {
                title: '“I can’t believe their transfers we…”',
                content: `Syarpa is fast and efficient. I have peace of mind using them.`,
                pic: Assets.PROFILE_PIC,
                name: 'Chichi (Kent, England):',
              },
            ].map((item, i) => (
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                minHeight="13rem"
                bgcolor="#fff"
                padding="1rem"
                key={i}
              >
                <Box display="flex" flexDirection="column">
                  <Box marginBottom=".5rem">
                    <Text
                      css="font-style:italic;"
                      variant="h5"
                      fontSize="1.3rem"
                      fontWeight="500"
                      color={theme.palette.primary.light}
                    >
                      {item.title}
                    </Text>
                  </Box>
                  <Box paddingX=".5rem">
                    <Text
                      color="#bbb"
                      fontWeight="300"
                      fontSize=".85rem"
                      variant="caption"
                    >
                      {item.content}
                    </Text>
                  </Box>
                </Box>
                <Box display="flex" alignItems="center">
                  <Avatar
                    alt="Remy Sharp"
                    src={require(`../../../public${item.pic}`)}
                    css="width: 1.6rem; height: 1.6rem;"
                  />
                  <Text
                    margin="0 1rem"
                    color={theme.palette.secondary.main}
                    variant="caption"
                  >
                    {item.name}
                  </Text>
                </Box>
              </Box>
            ))}
          </ItemsCarousel>
        </Box>
      </TestimonialStyle>
    </Container>
  );
};

export default Testimonial;
