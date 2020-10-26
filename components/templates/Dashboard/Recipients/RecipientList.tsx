import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, List } from '@material-ui/core';
import { RecipientListStyle } from './styles';
import RecipientListItem from './RecipientListItem';
import { RecipientResItem } from '../../../../models/RecipientDetails';
import AlertModal from '../../../molecule/DialogModal/Alert';
import {
  DeleteRecipientsAsync,
  GetMyselfRecipientsAsync,
  GetOthersRecipientsAsync,
} from '../../../../store/actions/recipientActions';

const RecipientList = ({ list }) => {
  const dispatch = useDispatch();
  const [recipient, setRecipient] = React.useState<RecipientResItem>(null);
  const [itemToDelete, setItemToDelete] = React.useState<RecipientResItem>(
    null
  );

  const handleClick = (item) => {
    setRecipient(item);
  };

  return (
    <>
      <RecipientListStyle>
        <Box width="100%" display="flex" justifyContent="space-between">
          <Box
            width="100%"
            display="flex"
            justifyContent="center"
            flexDirection="column"
          >
            <Box width="100%">
              <List>
                {list.map((item, index) => (
                  <div key={index}>
                    <RecipientListItem
                      handleClick={handleClick}
                      item={item}
                      setItemToDelete={setItemToDelete}
                      recipient={recipient}
                    />
                  </div>
                ))}
              </List>
            </Box>
          </Box>
        </Box>
      </RecipientListStyle>
      <AlertModal
        open={Boolean(itemToDelete)}
        handleClose={() => setItemToDelete(null)}
        title="Are you sure?"
        nextAction={() => {
          dispatch(
            DeleteRecipientsAsync({
              params: itemToDelete,
              cb: (pass) => {
                if (pass) {
                  if (itemToDelete.tag === 'myself') {
                    dispatch(GetMyselfRecipientsAsync());
                  } else dispatch(GetOthersRecipientsAsync());
                  setItemToDelete(null);
                }
              },
            })
          );
        }}
      >
        This action will delete the chosen recipient permanently
      </AlertModal>
    </>
  );
};

export default RecipientList;
