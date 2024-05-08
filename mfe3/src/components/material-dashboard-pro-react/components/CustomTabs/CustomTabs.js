import React from "react"

// nodejs library to set properties for components
import PropTypes from "prop-types"

//Mui components
import { styled } from "@mui/material/styles"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"

// core components
import Card from "../../../material-kit-pro-react/components/Card/Card"
import CardBody from "../../../material-kit-pro-react/components/Card/CardBody"
import CardHeader from "../../../material-kit-pro-react/components/Card/CardHeader"

import styles from "./customTabsStyle.js"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { rtlActive } = ownerState
  return { ...styles.cardTitle, ...(rtlActive && styles.rtlActive) }
})

const NewTabs = styled(Tabs)(({ theme }) => ({
  /*"&.MuiTabs-root":{*/
  ...styles.tabsRoot,
  /* },*/

  "& .MuiTabs-indicator": {
    ...styles.displayNone,
  },
}))

const NewTab = styled(Tab)(({ theme, ownerState }) => {
  const { applyWrapperStyle } = ownerState
  return {
    "&.MuiTab-root": {
      ...styles.tabRootButton,
    },
    "&.Mui-selected": {
      ...styles.tabSelected,
    },
    ...(applyWrapperStyle && styles.tabWrapper),
  }
})

export default function CustomTabs(props) {
  const [value, setValue] = React.useState(
    props.tabSelected ? props.tabSelected : 0
  )
  const handleChange = (event, value) => {
    setValue(value)
  }
  const { headerColor, plainTabs, tabs, title, rtlActive } = props

  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? (
          <NewDiv
            ownerState={{
              rtlActive: rtlActive,
            }}
          >
            {title}
          </NewDiv>
        ) : null}
        <NewTabs value={value} onChange={handleChange} textColor='inherit'>
          {tabs.map((prop, key) => {
            var icon = {}
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon />,
              }
            }
            return (
              <NewTab
                ownerState={{
                  applyWrapperStyle: true,
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            )
          })}
        </NewTabs>
      </CardHeader>
      <CardBody className={styles.tabPadding}>
        {tabs.map((prop, key) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>
          }
          return null
        })}
      </CardBody>
    </Card>
  )
}

CustomTabs.propTypes = {
  headerColor: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  title: PropTypes.string,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      tabName: PropTypes.string.isRequired,
      tabIcon: PropTypes.object,
      tabContent: PropTypes.node.isRequired,
    })
  ),
  rtlActive: PropTypes.bool,
  plainTabs: PropTypes.bool,
  tabSelected: PropTypes.number,
}
