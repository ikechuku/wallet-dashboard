import React from 'react';
import { Box, useTheme, ClickAwayListener } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { KeyboardArrowDown } from '@material-ui/icons';
import { DropdownInterface } from './customDropDown.interface';
import ResponsiveSelect from './ResponsiveSelect';
import { fakeEvent } from '../../../utils';
import { DropDownConStyle } from './customDropDown.style';
import { Text } from '../../atoms';

const SimpleDropDown = ({
  children: Component,
  params = { name: 'name' },
  showBorder = true,
  ...props
}: DropdownInterface) => {
  const theme = useTheme();
  const [isOpen, setOpen] = React.useState<boolean>();
  const [val, setVal] = React.useState(null);

  React.useEffect(() => {
    if (props?.list) {
      const selected = props?.list.find(
        (item) => item[props.property] === props.selectedItem
      );
      if (selected) {
        setVal(fakeEvent(params.name, props.selectedItem, selected));
      }
    }
  }, [props?.list, props?.selectedItem]);

  if (props?.list === null) {
    return (
      <Skeleton
        width={props.inputWidth}
        animation="wave"
        height={50}
        variant="rect"
      />
    );
  }

  return (
    <DropDownConStyle>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <div css="position: relative; height: 48px; background: transparent;">
          <Box
            padding="0 0 0 .5rem"
            role="button"
            tabIndex={0}
            onClick={() => {
              if (params.disabled) return;
              setOpen(true);
            }}
            display="flex"
            bgcolor={props.bgcolor}
            height="100%"
            width="100%"
            border={showBorder ? '1px #bbb solid' : null}
            borderRadius=".25rem"
            justifyContent="space-between"
            position="relative"
            alignItems="center"
            color={theme.palette.primary.light}
          >
            <Box
              overflow="hidden"
              marginRight="1.3rem"
              display="flex"
              flexGrow="1"
              alignItems="center"
            >
              {!val ? (
                <Text variant="subtitle1" padding="0 .3rem" color="#ccc">
                  {props.placeholder}
                </Text>
              ) : (
                <Component item={val} />
              )}
            </Box>
            <Box
              position="absolute"
              right="0"
              paddingRight=".5rem"
              display="flex"
              bgcolor={props.bgcolor}
              width="auto"
              alignItems="center"
            >
              <KeyboardArrowDown color="inherit" fontSize="default" />
            </Box>
          </Box>
          {isOpen && (
            <ResponsiveSelect
              isOpen={isOpen}
              {...props}
              closeSelect={(bol) => setOpen(bol)}
              selectItem={(obj) => {
                const evtObj = fakeEvent(params.name, obj[props.property], obj);
                props.selectItem(evtObj);
                setOpen(false);
              }}
              list={props.list}
              selectedValue={val?.[props.property]}
            />
          )}
        </div>
      </ClickAwayListener>
    </DropDownConStyle>
  );
};

export default SimpleDropDown;
