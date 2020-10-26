import * as React from 'react';
import { Box, useTheme } from '@material-ui/core';
import { TransferTypeStyle } from './styles';
import { TransferRoutes, transferNavigate } from '../../../utils/enums';
import { Text, Image, Button } from '../../atoms';
import Assets from '../../../utils/assets';

const TransferType = () => {
  const theme = useTheme();
  return (
    <>
      <Box margin="2rem auto 3rem">
        <Text color={theme.palette.primary.light} variant="h6">
          What type of transfer is this?
        </Text>
      </Box>
      <TransferTypeStyle
        alignItems="center"
        width="100%"
        display="flex"
        margin="0 auto"
        className="list-con"
        flexDirection="column"
      >
        {[
          {
            type: 'Someone else/Myself',
            href: TransferRoutes.RECIPIENT,
            image: Assets.PERSONAL_ICON,
            content: 'You are sending this to an individual',
          },
          {
            type: 'A Business/Charity',
            href: null,
            image: Assets.BUSINESS_ICON,
            content: 'You are sending this to a business',
          },
        ].map((item, key) => (
          <Button
            key={key}
            onClick={() => {
              if (item.href) {
                transferNavigate({ route: item.href });
              }
            }}
            colorTheme="transparent"
            css={`
              opacity: ${item.href ? 1 : 0.5};
            `}
            padding="0"
            className="list-item-btn"
            width="100%"
            height="fit-content"
          >
            <Box
              key={key}
              width="100%"
              className="list-item"
              marginBottom="1rem"
              bgcolor="white"
              display="flex"
              alignItems="center"
              boxShadow="0 1px 5px 5px rgba(0, 0, 0, 0.05)"
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                width="3rem"
              >
                <Image
                  alt="icon"
                  src={require(`../../../public${item.image}`)}
                />
              </Box>
              <Box
                padding=".5rem"
                display="flex"
                flexDirection="column"
                flexGrow={1}
              >
                <Text
                  color={theme.palette.primary.light}
                  variant="subtitle1"
                  textAlign="left"
                  fontSize="1rem"
                >
                  {item.type}
                </Text>
                <Text
                  color="rgba(0,0,0,.4)"
                  textAlign="left"
                  className="content"
                  variant="caption"
                >
                  {item.content}
                </Text>
              </Box>
            </Box>
          </Button>
        ))}
      </TransferTypeStyle>
    </>
  );
};

export default TransferType;
