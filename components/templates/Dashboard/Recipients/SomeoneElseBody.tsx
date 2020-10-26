import React from 'react';
import { useDispatch } from 'react-redux';
import { Pagination } from '@material-ui/lab';
import { Box } from '@material-ui/core';
import RecipientList from './RecipientList';
import { GetOthersRecipientsAsync } from '../../../../store/actions/recipientActions';
import { emptyObj } from '../../../../utils';
import Spinner from '../../../atoms/Spinner';

const RecipientBody = ({ othersList }) => {
  const dispatch = useDispatch();
  const checkList = () => {
    if (othersList === null) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Spinner size="3rem" />
        </Box>
      );
    }
    if (othersList?.list?.length === 0) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          No Saved Recipients
        </Box>
      );
    }
  };

  const handleChange = (event, page) => {
    dispatch(GetOthersRecipientsAsync({ params: page }));
  };
  React.useEffect(() => {
    dispatch(GetOthersRecipientsAsync());
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
        {!(!emptyObj(othersList) && othersList?.list?.length > 0) ? (
          checkList()
        ) : (
          <RecipientList list={othersList.list} />
        )}
      </Box>
      <Box
        flexGrow="1"
        marginTop="2rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {othersList && (
          <Pagination
            onChange={handleChange}
            className="tranx-pagination"
            page={othersList.page}
            count={othersList.pages}
          />
        )}
      </Box>
    </Box>
  );
};
export default RecipientBody;
