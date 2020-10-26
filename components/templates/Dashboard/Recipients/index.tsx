import * as React from 'react';
import { Box, useTheme, Menu, MenuItem, Hidden } from '@material-ui/core';
import { KeyboardArrowDown, Search } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import Style, { RecieptTabStyle } from './styles';
import MyselfBody from './MyselfBody';
import SomeoneElseBody from './SomeoneElseBody';
import { TextField, DialogModal } from '../../../molecule';
import { Button, Text } from '../../../atoms';
import DirectDebitIcon from '../../../icons/DirectDebitIcon';
import CryptoIcon from '../../../icons/CryptoIcon';
import CashIcon from '../../../icons/CashIcon';
import AddCashRecipientFrom from '../../../forms/Recipients/AddCashRecipient';
import TabView from '../../../organism/TabView';
import AddMyselfForm from '../../../forms/Recipients/AddMySelf';
import {
  RecipientState,
  RecipientResProps,
  RecipientResItem,
} from '../../../../models/RecipientDetails';
import HeaderNavigation from '../../../organism/HeaderNavigation';
import { InAppHeaderStyle } from '../../../shared/StyleUtils';

const RecipientTemplate = () => {
  const { othersList, myselfList }: RecipientState = useSelector(
    (state) => state.recipients
  );
  const [list, setList] = React.useState<RecipientResProps>();
  const [index, setIndex] = React.useState<number>(0);
  const theme = useTheme();
  const anchorEl = React.useRef(null);
  const [newActionOpen, setnewActionOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(null);

  React.useEffect(() => {
    setList(index ? myselfList : othersList);
  }, [othersList, myselfList]);

  const handleAction = (action) => {
    setOpenModal(action);
    setnewActionOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      searchRecipient: '',
    },
    onSubmit: null,
  });

  const change = (name, e) => {
    e.persist();
    formik.handleChange(e);
    formik.setFieldTouched(name, true, false);
  };

  return (
    <Style>
      <InAppHeaderStyle>
        <HeaderNavigation title="Recipient" />
      </InAppHeaderStyle>
      <Box display="flex" flexDirection="column" height="100%">
        <Menu
          id="simple-menu"
          css=".MuiPaper-root{border-radius: .6rem; left:1rem; right:1rem; box-shadow: 0px 9px 33px #9DA8B657;}"
          anchorEl={anchorEl.current}
          keepMounted
          open={newActionOpen}
          onClose={() => {
            setnewActionOpen(false);
          }}
        >
          {[
            {
              action: 'bank',
              title: 'Add Bank Account',
              icon: DirectDebitIcon,
            },
            {
              action: 'cash',
              title: 'Add Cash Recipient',
              icon: CashIcon,
            },
            {
              action: 'crypto',
              title: 'Add Crypto Account',
              icon: CryptoIcon,
              inActive: true,
            },
          ].map(({ icon: Comp, ...item }, ind) => (
            <MenuItem
              key={ind}
              onClick={() => {
                if (item.inActive) return;
                handleAction(item.action);
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                css={`
                  opacity: ${item?.inActive ? 0.5 : 1};
                `}
              >
                <Comp width="26" height="26" />
                <Text
                  color={theme.palette.primary.light}
                  margin="0 .8rem"
                  variant="subtitle1"
                >
                  {item.title}
                </Text>
              </Box>
            </MenuItem>
          ))}
        </Menu>
        <DialogModal
          title="Add Cash Recipient"
          open={openModal === 'cash'}
          handleClose={() => setOpenModal(null)}
          form={AddCashRecipientFrom}
        />
        <DialogModal
          title="Add Your Bank Account"
          open={openModal === 'bank'}
          handleClose={() => setOpenModal(null)}
          form={AddMyselfForm}
        />
        <Box className="search-header" display="flex" padding="1rem">
          <Box display="flex" flexGrow="1">
            <TextField
              label="Search"
              labelPosition="in"
              css=".combo svg{color: #ccc;}"
              startIcon={<Search />}
              placeholder="Recipient name"
              padding=".8rem"
              bgColor="#fff"
              value={formik.values.searchRecipient}
              onChange={(e) => {
                const {
                  target: { value },
                } = e;
                if (!RegExp(/^[A-Za-z\s]+$/).test(value) && value !== '') {
                  return;
                }
                const filteredList = (index
                  ? myselfList
                  : othersList
                ).list.filter((item: RecipientResItem) => {
                  return RegExp(String(value).toLowerCase()).test(
                    String(item.name).toLowerCase()
                  );
                });
                change('searchRecipient', e);
                setList({
                  list: filteredList,
                  page: 1,
                  pageLength: 5,
                  pages: Math.ceil(filteredList.length / 5),
                  draw: 1,
                  pageSize: 5,
                  total: filteredList.length,
                } as RecipientResProps);
              }}
              width="100%"
              params={{ name: 'searchRecipient' }}
            />
          </Box>
          <Hidden smDown>
            <Box
              display="flex"
              justifyContent="space-between"
              marginLeft=".5rem"
              minWidth="27rem"
              maxWidth="47rem"
              width="65%"
            >
              <Button
                width="32%"
                padding="0"
                fontWeight="400"
                borderRadius=".2rem"
                fontSize=".85rem"
                bgColor={theme.palette.info.main}
                onClick={() => setOpenModal('bank')}
              >
                Add Bank Account
              </Button>
              <Button
                width="32%"
                padding="0"
                fontWeight="400"
                borderRadius=".2rem"
                fontSize=".85rem"
                bgColor={theme.palette.primary.light}
                onClick={() => setOpenModal('cash')}
              >
                Add Cash Recipient
              </Button>
              <Button
                width="32%"
                padding="0"
                fontWeight="400"
                borderRadius=".2rem"
                fontSize=".85rem"
                css={`
                  opacity: 0.5;
                  border: 1.5px solid ${theme.palette.primary.light};
                `}
                bgColor="#fff"
                color={theme.palette.primary.light}
                onClick={() => setOpenModal('crypto')}
              >
                Add Crypto Recipient
              </Button>
            </Box>
          </Hidden>
          <Hidden mdUp>
            <Box
              display="flex"
              justifyContent="space-between"
              marginLeft=".5rem"
              width="35%"
              maxWidth="20rem"
              minWidth="5rem"
            >
              <div css="display:flex; flex-grow: 1;" ref={anchorEl}>
                <Button
                  fontWeight="300"
                  width="100%"
                  padding=".3rem"
                  bgColor={theme.palette.info.main}
                  fontSize=".8rem"
                  color="#fff"
                  endIcon={
                    <KeyboardArrowDown color="inherit" fontSize="default" />
                  }
                  onClick={() => setnewActionOpen(true)}
                >
                  Add New
                </Button>
              </div>
            </Box>
          </Hidden>
        </Box>
        <RecieptTabStyle display="flex" flexGrow="1">
          <TabView
            tabs={[
              {
                title: 'Recipients',
                Component: <SomeoneElseBody othersList={list} />,
              },
              {
                title: 'Myself',
                Component: <MyselfBody myselfList={list} />,
              },
            ]}
            onChange={(ind) => {
              (document.querySelector(
                'input[name="searchRecipient"]'
              ) as any).value = '';

              setList(index ? myselfList : othersList);
              setIndex(ind);
            }}
          />
        </RecieptTabStyle>
      </Box>
    </Style>
  );
};

export default RecipientTemplate;
