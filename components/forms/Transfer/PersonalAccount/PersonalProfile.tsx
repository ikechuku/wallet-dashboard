import React from 'react';
import { format, parseISO } from 'date-fns';
import { Box, useTheme } from '@material-ui/core';
import personalStyle from './personal.style';
import { Text, Button } from '../../../atoms';
import { TransferState } from '../../../../models/Transfer';
import { ProfileResProps } from '../../../../models/Profile';
import { TransferRoutes, transferNavigate } from '../../../../utils/enums';

const PersonalProfile = ({
  transfer,
  className,
  profile,
}: {
  transfer: TransferState;
  profile: ProfileResProps;
  className?: string;
}) => {
  const { form } = transfer;
  const theme = useTheme();

  return (
    <Box
      marginX="auto"
      className={className}
      marginBottom="2rem"
      height="100%"
      width="100%"
    >
      <Box width="100%" display="flex" flexDirection="column">
        <Box className="row" display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              First Name
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {form.firstName}
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              Legal Last Name
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {form.lastName}
            </Text>
          </Box>
        </Box>
        <Box className="row" display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              Birth Date
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {format(parseISO(form.birthDate), 'MM-dd-yyyy')}
            </Text>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              Phone Number
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              +{form.dialCode} {form.phoneNumber}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box width="100%" display="flex" flexDirection="column">
        <Box
          width="100%"
          borderBottom="1px solid #ccc"
          display="flex"
          padding="0 .2rem"
          marginBottom="2rem"
          flexDirection="column"
        >
          <Text
            color={theme.palette.primary.light}
            fontSize="1.1rem"
            variant="button"
          >
            Your address
          </Text>
        </Box>
        <Box className="row" display="flex" flexDirection="column">
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              Postal Code
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {form.postalCode}
            </Text>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              Address
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {form.address}
            </Text>
          </Box>
        </Box>
        <Box
          className="row"
          alignItems="flex-start"
          display="flex"
          flexDirection="column"
        >
          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              City
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {form.city}
            </Text>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            width="100%"
            marginBottom="1rem"
          >
            <Text color={theme.palette.primary.light} variant="caption">
              Country
            </Text>
            <Text margin=".5rem 0" fontSize="1.1rem" variant="button">
              {profile?.country?.name}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box margin="1rem 0" width="100%">
        <Button
          padding=".6rem"
          onClick={() =>
            transferNavigate({
              route: TransferRoutes.TRANFER_TYPE,
              obj: transfer,
            })
          }
          width="100%"
          fontWeight="300"
          bgColor={theme.palette.primary.light}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default personalStyle(PersonalProfile);
