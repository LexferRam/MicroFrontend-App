import React from 'react';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
//import SwipeableViews from 'react-swipeable-views';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      <Box pl={2} pr={2}>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}

export default function TabSimpleFormLanding(props) {
    
  return (
    <React.Fragment>
        <Tabs
          {...props}
          sx={{minHeight: 0, height: '35px'}}
        >
          {props.data.map((reg,index) => (
              <Tab key={index} label={reg.titulo} {...a11yProps(index)} sx={{width: '127px',
              minWidth: '0',
              py: '2px',
              px: '12px',
              minHeight: 0,
              height: '35px'}} />
          ))}
        </Tabs>
        {/*<SwipeableViews
          axis='x'
          index={props.value}
          onChangeIndex={props.handleChangeIndex}
        > */}
          {props.data.map((reg,index) => (
              <TabPanel key={index}   value={props.value} index={index}>
                  {reg.component}
              </TabPanel>
          ))}
        {/*</SwipeableViews> */}
    </React.Fragment>
  );
}
