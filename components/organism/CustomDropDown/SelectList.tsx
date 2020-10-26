/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Box } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { DropdownSelectInterface } from './customDropDown.interface';
import DropDownStyle from './customDropDown.style';
import SearchInput from './SelectInput';
import { Button } from '../../atoms';

export const SelectList = (props: DropdownSelectInterface) => {
  const [filter, setFilter] = React.useState(props.list);
  const [searchVal, setSearchVal] = React.useState('');

  React.useEffect(() => {
    if (
      props.searchProperty === null ||
      props.searchProperty === '' ||
      searchVal === ''
    ) {
      setFilter(props.list);
    } else {
      const newList =
        props?.list.filter((item) =>
          RegExp(String(searchVal).toLowerCase()).test(
            String(item[props.searchProperty]).toLowerCase()
          )
        ) ?? [];
      setFilter(newList);
    }
  }, [searchVal, props.list]);

  return (
    <DropDownStyle width={props.dropDownWidth} top={props.top || '0'}>
      <Box
        hidden={!props.showSearch}
        margin="0 0 .5rem"
        id="search-field"
        className="drop-down-search"
      >
        <SearchInput
          title={props.title}
          startIcon={
            <Box>
              <Search fontSize="default" style={{ fill: '#ccc' }} />
            </Box>
          }
          searchProperty={props.searchProperty}
          placeholder={props.placeholder}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
          params={{ endIcon: null }}
        />
      </Box>
      <Box className="list-con">
        {filter.map((item, index) => {
          return (
            <Button
              width="100%"
              onClick={() => {
                props.selectItem(item);
              }}
              key={index}
              padding="0 .2rem"
              borderRadius="0"
              bgColor={
                item[props.property] === props.selectedValue
                  ? '#e3e3e3'
                  : '#fff'
              }
            >
              {props.makeItem(item, index)}
            </Button>
          );
        })}
      </Box>
    </DropDownStyle>
  );
};
