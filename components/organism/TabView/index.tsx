import * as React from 'react';
import { Box, Tabs, Tab } from '@material-ui/core';
import TabStyle from './Tab.style';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function a11yProps(index: any) {
  return {
    id: `tab-${index}`,
    className: 'tab',
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      display={value !== index ? 'none' : 'flex'}
      flexGrow="1"
      width="100%"
      role="tabpanel"
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const getTabs = (value, index, label, inActive) => {
  return (
    <Tab
      key={index}
      css={`
        pointer-events: ${inActive ? 'none' : ''};
      `}
      disabled={inActive}
      classes={{
        wrapper: index === value ? 'text-wrapper active' : 'text-wrapper',
      }}
      label={label}
      {...a11yProps(index)}
    />
  );
};

export interface TabViewInterface {
  title: string;
  Component: React.ReactNode;
  inActive?: boolean;
}

const TabView = (props: { tabs: TabViewInterface[]; onChange?: Function }) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    if (props.onChange) props.onChange(newValue);
  };

  const tabHeads = [];
  const tabBody = [];

  props.tabs.forEach(({ title, Component, inActive }, index) => {
    tabHeads.push(getTabs(value, index, title, inActive));
    tabBody.push(
      <TabPanel key={index} value={value} index={index}>
        {Component}
      </TabPanel>
    );
  });

  return (
    <TabStyle
      alignItems="center"
      display="flex"
      flexGrow="1"
      flexDirection="column"
    >
      <Box width="100%">
        <Tabs
          value={value}
          indicatorColor="primary"
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {tabHeads}
        </Tabs>
      </Box>
      {tabBody}
    </TabStyle>
  );
};

export default TabView;
