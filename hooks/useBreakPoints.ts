import { useMediaQuery } from '@material-ui/core';

const useBreakPoints = () => {
  const xs = useMediaQuery('(min-width:0)');
  const sm = useMediaQuery('(min-width:600px)');
  const md = useMediaQuery('(min-width:960px)');
  const lg = useMediaQuery('(min-width:1280px)');
  const xl = useMediaQuery('(min-width:1920px)');
  return { xs, sm, md, lg, xl };
};

export default useBreakPoints;
