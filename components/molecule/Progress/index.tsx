import React from 'react';
import Router from 'next/router';
import { Box, useTheme, LinearProgress } from '@material-ui/core';
import Style from './progress.style';
import { Text } from '../../atoms';

interface ProgressProps {
  list: Array<string>;
  step: number;
  className: string;
  thickness: string;
  fontSize: string;
  routes: Array<string>;
}

const Progress = ({
  fontSize = '1rem',
  /* thickness = '8px', */
  list = [],
  routes,
  step = 0,
  className = '',
}: ProgressProps) => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      display="flex"
      height="2rem"
      position="relative"
      className={className}
    >
      {list.map((item, index) => {
        /* const classNm = index > step ? 'inactive' : 'active'; */
        return (
          <Box
            position="relative"
            zIndex="2"
            height="100%"
            borderLeft="3px solid #f7f8ff"
            borderRight="3px solid #f7f8ff"
            css="cursor: pointer;"
            onClick={() => {
              if (step <= index) return;
              Router.push(routes[index], undefined, {
                shallow: true,
              });
            }}
            role="button"
            onKeyUp={(_) => _}
            key={index}
            width="20%"
            display="flex"
            flexGrow="1"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            {list.length > 0 ? (
              <Text
                margin="0 0 .6rem"
                fontSize={fontSize}
                color={theme.palette.primary.light}
                variant="subtitle1"
              >
                {list[index]}
              </Text>
            ) : null}
            {/* <Divider
              css={`
                height: ${thickness};
              `}
              className={`${classNm} divider-${index}`}
            /> */}
          </Box>
        );
      })}
      <LinearDeterminate step={step + 1} />
    </Box>
  );
};

function LinearDeterminate({ step }) {
  const [progress, setProgress] = React.useState(20);

  React.useEffect(() => {
    if (progress <= 100) setProgress(step * 20);
  }, [step]);

  return (
    <Box position="absolute" zIndex="1" bottom="1px" width="100%">
      <LinearProgress
        color="secondary"
        css="width:100%;background: rgba(0, 0, 0, 0.2); height:5px;"
        variant="determinate"
        value={progress}
      />
    </Box>
  );
}

export default Style(Progress);
