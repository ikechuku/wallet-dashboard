import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@material-ui/core';
import { Text, Image } from '../atoms';
import { GetCountriesAsync } from '../../store/actions/countryActions';
import { BankActions } from '../../store/actions/bankActions';
import SimpleDropDown from '../organism/CustomDropDown/SimpleDropDown';
import { CountryListResProps } from '../../models/Countries';

const CountriesDropDown = ({
  country = 'GB',
  property = 'countryCode',
  value = 'name',
  id,
  setCountry,
  params = {},
}: {
  country: any;
  property?: string;
  id: string;
  value?: string;
  setCountry: Function;
  params?: any;
}) => {
  const { countries } = useSelector((state) => state.countries);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!(countries && countries.length > 0)) dispatch(GetCountriesAsync());
  }, []);

  return (
    <SimpleDropDown
      id={id}
      bgcolor="#fff"
      dropDownWidth="100%"
      inputWidth="100%"
      showSearch
      selectItem={(e) => {
        setCountry(e);
        dispatch(BankActions({ banks: null }));
      }}
      property={property}
      params={params}
      placeholder={
        countries && countries.length > 0 ? 'Select Country' : 'No Countries'
      }
      searchProperty="name"
      selectedItem={country}
      list={
        countries && countries.length > 0
          ? countries.filter(
              (ctry: CountryListResProps) => ctry.countryCode !== 'CRYPTO'
            )
          : countries
      }
      makeItem={(item) => (
        <Box
          width="100%"
          display="flex"
          justifyContent="flex-start"
          height="100%"
          paddingY=".5rem"
          alignItems="center"
        >
          <Image
            alt="country flag"
            src={item.flag}
            width="1.5rem"
            height="1.2rem"
          />
          <Text
            textAlign="left"
            margin=".1rem .5rem"
            fontWeight="300"
            variant="subtitle2"
          >
            {item[value]}
          </Text>
        </Box>
      )}
    >
      {({ item }) => (
        <Box
          width="100%"
          justifyContent="flex-start"
          display="flex"
          height="100%"
          paddingY=".5rem"
          alignItems="center"
        >
          <Image
            alt="country flag"
            src={item.flag}
            width="1.5rem"
            height="1.2rem"
          />
          <Text
            textAlign="left"
            margin=".1rem .5rem"
            fontWeight="300"
            css="white-space: nowrap;"
            variant="subtitle2"
          >
            {item[value]}
          </Text>
        </Box>
      )}
    </SimpleDropDown>
  );
};

export default CountriesDropDown;
