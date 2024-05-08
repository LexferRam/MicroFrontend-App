import React from "react";
import { styled, useTheme } from "@mui/material/styles"
import PropTypes from "prop-types";
import { Tab, Tabs } from '@mui/material/';

import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js";
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js";
import { hexToRgb } from "components/material-kit-pro-react/material-kit-pro-react.js";

import styles from "./navPillsStyle.js";

const NewDivWrap = styled("div")(({ theme }) => {
  const newStyles = styles(theme)
  return {
      ...newStyles.contentWrapper,
  }
})

const NewTabs = styled(Tabs)(({ theme }) => ({
    marginTop: "20px",
    paddingLeft: "0",
    marginBottom: "0",
    overflow: "visible !important",
    '& .MuiTabs-fixed':{
      overflow: "visible !important"
    },
    '& .MuiTabs-indicator':{
      display: "none !important"
    },
    '& .MuiTabs-flexContainer':{
      display: "flex",
      flexWrap: "wrap"
    }
  
}))

const NewTab = styled(Tab)(({ theme, ownerState }) => {
  const { color, horizontal } = ownerState
  const newStyles = styles(theme)

  return {
    ...newStyles.pills,
    ...(horizontal && newStyles.horizontalPills),
    '&.Mui-selected':{
      color: theme.palette.white.main,
      backgroundColor: theme.palette.primary.main,
      boxShadow:
        "0 4px 20px 0px rgba(" +
        hexToRgb(theme.palette.black.main) +
        ", 0.14), 0 7px 10px -5px rgba(" +
        hexToRgb(theme.palette.primary.main) +
        ", 0.4)"
      
    }
  }
})

export default function NavPills(props) {
  const { tabs, color, horizontal, alignCenter } = props;
  const [active, setActive] = React.useState(props.active);

  const theme = useTheme()
  const stylesBody = styles(theme)

  const handleChange = (event, active) => {
    setActive(active);
    props.handleActiveBackground && props.handleActiveBackground(active);
  };
  /*const handleChangeIndex = index => {
    setActive(index);
  };*/
  
  const tabButtons = (
    <NewTabs
      value={active}
      onChange={handleChange}
      centered={alignCenter}
    >
      {tabs.map((prop, key) => {
        var icon = {};
        if (prop.tabIcon !== undefined) {
          icon["icon"] = <prop.tabIcon className={stylesBody.tabIcon} />;
        }
        
        return (
          <NewTab
            label={prop.tabButton}
            key={key}
            {...icon}
            ownerState={{
              horizontal: horizontal,
              color:color
            }}
          />
        );
      })}
    </NewTabs>
  );
  const tabContent = (
    <NewDivWrap>
      {tabs.map((prop, key) => {
        if (key === active) {
          return <div key={key}>{prop.tabContent}</div>;
        }
        return null;
      })}
    </NewDivWrap>
  );
  /*const tabContent = (
    <div className={classes.contentWrapper}>
      <SwipeableViews
        axis={direction === "rtl" ? "x-reverse" : "x"}
        index={active}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((prop, key) => {
          return (
            <div className={classes.tabContent} key={key}>
              {prop.tabContent}
            </div>
          );
        })}
      </SwipeableViews>
    </div>
  );*/

  return horizontal !== undefined ? (
    <GridContainer>
      <GridItem {...horizontal.tabsGrid}>{tabButtons}</GridItem>
      <GridItem {...horizontal.contentGrid}>{tabContent}</GridItem>
    </GridContainer>
  ) : (
    <div>
      {tabButtons}
      {tabContent}
    </div>
  );
}

NavPills.defaultProps = {
  active: 0,
  color: "primary"
};

NavPills.propTypes = {
  // index of the default active pill
  active: PropTypes.number,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabButton: PropTypes.string,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node
    })
  ).isRequired,
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ]),
  direction: PropTypes.string,
  horizontal: PropTypes.shape({
    tabsGrid: PropTypes.object,
    contentGrid: PropTypes.object
  }),
  alignCenter: PropTypes.bool
};
