import * as React from 'react';
import { Box, Fade } from '@material-ui/core';

interface SPAProps {
  component: any;
  isVisible: boolean;
}

const SPA = ({ pages }: { pages: Array<SPAProps> }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      width="100%"
    >
      {pages.map(({ component: Component, isVisible }, key) => (
        <Fade key={key} in={isVisible}>
          {isVisible ? (
            <Box display="flex" flexDirection="column" width="100%">
              <Component />
            </Box>
          ) : (
            <Box />
          )}
        </Fade>
      ))}
    </Box>
  );
};

export default SPA;
