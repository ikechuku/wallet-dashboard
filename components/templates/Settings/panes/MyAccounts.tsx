import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { GetMyselfRecipientsAsync } from '../../../../store/actions/recipientActions';
import { emptyObj } from '../../../../utils';
import Spinner from '../../../atoms/Spinner';
import RecipientList from '../../Dashboard/Recipients/RecipientList';
import { RecipientState } from '../../../../models/RecipientDetails';

const MyAccounts = () => {
  const dispatch = useDispatch();
  const { myselfList }: RecipientState = useSelector(
    (state) => state.recipients
  );

  const checkList = () => {
    if (myselfList === null) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Spinner size="3rem" />
        </Box>
      );
    }
    if (myselfList?.list?.length === 0) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          You have no Accounts
        </Box>
      );
    }
  };

  const handleChange = (event, page) => {
    dispatch(GetMyselfRecipientsAsync({ params: page }));
  };

  React.useEffect(() => {
    dispatch(GetMyselfRecipientsAsync());
  }, []);
  return (
    <Box maxHeight="75vh" width="100%">
      <Box
        display="flex"
        css="overflow-y:auto;"
        height="80%"
        justifyContent="center"
        width="100%"
      >
        {!(!emptyObj(myselfList) && myselfList?.list?.length > 0) ? (
          checkList()
        ) : (
          <RecipientList list={myselfList.list} />
        )}
      </Box>
      <Box
        flexGrow="1"
        marginTop="2rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {myselfList && (
          <Pagination
            onChange={handleChange}
            className="tranx-pagination"
            page={myselfList.page}
            count={myselfList.pages}
          />
        )}
      </Box>
    </Box>
  );
};
export default MyAccounts;
