import React from 'react';
import { Box, useTheme, Container } from '@material-ui/core';
import Assets from '../../../utils/assets';
import { Image, Text } from '../../atoms';
import { Body, StepBody } from './howItWorks.style';

const Step = ({ ltr = true, num, title, body, img }) => {
  const theme = useTheme();
  return (
    <StepBody
      textAlign={ltr ? 'left' : 'right'}
      flexDirection={ltr ? `row` : 'row-reverse'}
      alignItems="center"
      paddingY="1rem"
      display="flex"
    >
      <Box
        display="flex"
        alignItems="flex-start"
        className="syarpa-step-detail"
      >
        <Text
          width="4rem"
          fontSize="1.7rem"
          color={theme.palette.secondary.main}
          variant="h6"
        >
          {num}
        </Text>
        <Box
          width="70%"
          className="content"
          display="flex"
          flexDirection="column"
        >
          <Text
            color={theme.palette.primary.light}
            variant="h6"
            margin="0 0 .5rem"
          >
            {title}
          </Text>
          <Text
            lineHeight="1.6rem"
            fontWeight="300"
            color="#bbb"
            fontSize="1rem"
            variant="body2"
          >
            {body}
          </Text>
          {num === '02' && (
            <Text
              lineHeight="1.6rem"
              fontWeight="300"
              color={theme.palette.info.main}
              fontSize="1rem"
              css="font-style:italic;"
              variant="body2"
            >
              Transfer methods vary by country
            </Text>
          )}
        </Box>
      </Box>
      <Box className="syarpa-step-img">
        <Image
          width="100%"
          src={require(`../../../public${img}`)}
          alt="step image"
        />
      </Box>
    </StepBody>
  );
};

const HowSyarpaWorks = () => {
  const theme = useTheme();
  return (
    <Container>
      <Body paddingY="2rem">
        <Box marginY="3rem">
          <Text
            textAlign="center"
            color={theme.palette.primary.light}
            variant="h3"
          >
            How Syarpa works
          </Text>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
          {[
            {
              title: 'Create your Account',
              body:
                'Sign up for free on our website or download our app to get started',
              img: Assets.CREATE_YOUR_ACCOUNT,
            },
            {
              title: 'Tell us How you want to pay',
              body:
                'Choose how much you want to transfer. You’ll see our low fees and exchange rate upfront',
              img: Assets.HOW_YOU_PAY,
            },
            {
              title: "Add your recipient's details",
              body:
                'Add a new recipient or choose from the list of people you have previously sent money ',
              img: Assets.RECIPIENT,
            },
            {
              title: 'Pay for your transfer',
              body:
                'Add a new recipient or choose from the list of people you have previously sent money',
              img: Assets.PAY_TRANSFER,
            },
          ].map((item, key) => (
            <Step
              title={item.title}
              img={item.img}
              ltr={key % 2 === 0}
              body={item.body}
              num={`0${key + 1}`}
              key={key}
            />
          ))}
        </Box>
      </Body>
    </Container>
  );
};
export default HowSyarpaWorks;
