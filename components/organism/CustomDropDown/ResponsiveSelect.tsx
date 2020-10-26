/* eslint-disable import/prefer-default-export */
import React from 'react';
import { Box, Hidden, Drawer } from '@material-ui/core';
import { SelectList } from './SelectList';
import { DropdownSelectInterface } from './customDropDown.interface';

const ResponsiveSelect = (props: DropdownSelectInterface) => {
  return (
    <>
      <Hidden xsDown>
        {props.isOpen && (
          <SelectList
            showSearch={props.showSearch}
            dropDownWidth={props.dropDownWidth}
            height={props.height}
            {...props}
            title={props.showLabelInDropDown ? props.title : null}
          />
        )}
      </Hidden>
      <Hidden smUp>
        <Drawer
          anchor="bottom"
          className="btm-drawer"
          id={props.id}
          open={props.isOpen}
          onClose={() => props.closeSelect(false)}
        >
          <Box display="flex" flexDirection="center" height="360px">
            <Box marginX="auto" width="95%">
              <SelectList
                {...props}
                dropDownWidth="100%"
                top=".6rem"
                showSearch
              />
            </Box>
          </Box>
        </Drawer>
      </Hidden>
    </>
  );
};

export default ResponsiveSelect;
