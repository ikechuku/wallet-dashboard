import React from 'react';
import { Box, useTheme, ClickAwayListener } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { DropdownInterface } from './customDropDown.interface';
import { fakeEvent } from '../../../utils';
import { DropDownConStyle } from './customDropDown.style';
import SearchInput from './SelectInput';
import { SelectList } from './SelectList';

const AutoCompleteDropDown = ({
  params = { name: 'name' },
  list,
  ...props
}: DropdownInterface) => {
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState<boolean>();
  const [val, setVal] = React.useState(null);
  const [filter, setFilter] = React.useState(list);
  const [searchVal, setSearchVal] = React.useState('');

  React.useEffect(() => {
    if (list) {
      const selected = list.find(
        (item) => item[props.property] === props.selectedItem
      );
      setVal(fakeEvent(params.name, props.selectedItem, selected));
      setSearchVal(props.selectedItem);
    }
  }, [list, props?.selectedItem]);

  React.useEffect(() => {
    if (
      props.searchProperty === null ||
      props.searchProperty === '' ||
      searchVal === ''
    ) {
      setFilter(list);
    } else {
      const newList =
        list.filter((item) =>
          RegExp(String(searchVal).toLowerCase()).test(
            String(item[props.searchProperty]).toLowerCase()
          )
        ) ?? [];

      setFilter(newList);
    }
  }, [list, searchVal]);

  if (list === null) {
    return (
      <Skeleton
        width={props.inputWidth}
        animation="wave"
        height={50}
        variant="rect"
      />
    );
  }
  const handleClose = () => {
    setOpen(false);
    setSearchVal(val?.[props.property] ?? '');
  };

  return (
    <DropDownConStyle>
      <ClickAwayListener onClickAway={() => handleClose()}>
        <div css="position: relative; height: 48px; background: transparent;">
          <Box height="100%" width="100%" color={theme.palette.primary.light}>
            <SearchInput
              title={props.title}
              padding="15px"
              startIcon={props.startIcon}
              onFocus={() => setOpen(true)}
              searchProperty={props.searchProperty}
              placeholder={props.placeholder}
              searchVal={searchVal}
              clearVal={() => props.selectItem(null)}
              setSearchVal={setSearchVal}
              params={params}
            />
          </Box>
          {isOpen && (
            <SelectList
              isOpen={isOpen}
              {...props}
              selectItem={(obj) => {
                const evtObj = fakeEvent(params.name, obj[props.property], obj);
                props.selectItem(evtObj);
                setOpen(false);
                setSearchVal(obj[props.property]);
              }}
              list={filter}
              selectedValue={val?.[props.property]}
            />
          )}
        </div>
      </ClickAwayListener>
    </DropDownConStyle>
  );
};

export default AutoCompleteDropDown;
