import React from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../atoms';
import { GetBanksAsync } from '../../store/actions/bankActions';
import SimpleDropDown from '../organism/CustomDropDown/SimpleDropDown';

const BanksDropDown = ({ top = '0', params, country, bank, setBank }) => {
  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.banks);

  React.useEffect(() => {
    dispatch(GetBanksAsync({ params: country }));
  }, [country, JSON.stringify(banks)]);

  return (
    <SimpleDropDown
      id="recipient-bank"
      dropDownWidth="100%"
      inputWidth="100%"
      selectItem={(e) => {
        setBank(e);
      }}
      property="code"
      params={params}
      searchProperty="name"
      selectedItem={bank}
      top={top}
      list={banks}
      placeholder={banks && banks.length > 0 ? 'Select bank' : 'No Banks'}
      showSearch
      makeItem={(item) => (
        <Box
          display="flex"
          paddingY=".5rem"
          width="100%"
          justifyContent="flex-start"
          fontWeight="300"
          height="100%"
          alignItems="center"
        >
          <Text fontSize=".9rem" font-fontWeight="300" variant="body1">
            {item.name}
          </Text>
        </Box>
      )}
    >
      {({ item }) => (
        <Box
          display="flex"
          width="100%"
          justifyContent="flex-start"
          fontWeight="300"
          height="100%"
          alignItems="center"
        >
          <Text fontSize=".9rem" font-fontWeight="300" variant="body1">
            {item.name}
          </Text>
        </Box>
      )}
    </SimpleDropDown>
  );
};

export default BanksDropDown;
