import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, useTheme, List, useMediaQuery, Hidden } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { FolderOutlined, RepeatRounded } from '@material-ui/icons';
import { Text, Button } from '../../../atoms';
import { TransactionListStyle } from './styles';
import TranxListItem from '../../../shared/TranxListItem';
import TranxAside from './TranxAside';
import { GetTransactionsAsync } from '../../../../store/actions/dashBoardActions';

const Activity = ({ transactions }) => {
  const matches = useMediaQuery('(min-width:1120px)');
  const theme = useTheme();
  const dispatch = useDispatch();
  const [tranx, setTranx] = React.useState(transactions.list[0]);

  const handleClick = (item) => {
    setTranx(item);
  };

  React.useEffect(() => {
    setTranx(transactions.list[0]);
  }, [transactions.page]);

  const handleChange = (event, page) => {
    dispatch(GetTransactionsAsync({ params: page }));
  };

  const colorCode = (status) => {
    if (status === 'succeeded') return 'green';
    if (status === 'processing') return 'orange';
    if (status === 'failed') return 'red';
    return '#bbb';
  };

  return (
    <TransactionListStyle>
      <Box width="100%" display="flex" justifyContent="space-between">
        <Box
          width={matches ? '68%' : '100%'}
          display="flex"
          flexDirection="column"
        >
          <Hidden smUp>
            <Box
              marginTop=".5rem"
              display="flex"
              justifyContent="center"
              width="100%"
            >
              <Pagination
                onChange={handleChange}
                className="tranx-pagination"
                page={transactions.page}
                count={transactions.pages}
              />
            </Box>
          </Hidden>
          <Box
            borderBottom="1px solid #ccc"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            width="100%"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              width="100%"
              className="tranx-header"
              margin=".6rem 0"
            >
              <Button
                padding=".2rem"
                colorTheme="transparent"
                startIcon={<FolderOutlined color="primary" />}
              >
                <Text color={theme.palette.primary.light} variant="button">
                  Transfer History
                </Text>
              </Button>
              <Button
                padding=".2rem"
                params={{ disabled: true }}
                colorTheme="transparent"
                startIcon={<RepeatRounded color="disabled" />}
              >
                <Text color="#ccc" variant="button">
                  Recurring Transaction
                </Text>
              </Button>
            </Box>
            <Hidden xsDown>
              <Pagination
                onChange={handleChange}
                className="tranx-pagination"
                page={transactions.page}
                count={transactions.pages}
              />
            </Hidden>
          </Box>
          <Box>
            <List>
              {transactions.list.map((item, index) => (
                <TranxListItem
                  key={index}
                  handleClick={handleClick}
                  item={item}
                  tranx={tranx}
                  colorCode={colorCode}
                />
              ))}
            </List>
          </Box>
        </Box>
        {matches && <TranxAside tranx={tranx} />}
      </Box>
    </TransactionListStyle>
  );
};

export default Activity;
