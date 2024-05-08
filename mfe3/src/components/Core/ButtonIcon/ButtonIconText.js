import React from "react"
// @Mui components
import { styled } from "@mui/material/styles"

import Icon from "@mui/material/Icon"
import Tooltip from "@mui/material/Tooltip"
import Zoom from "@mui/material/Zoom"

import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"

const styles = {
  actionButtonRound: {
    width: "auto",
    height: "auto",
    minWidth: "auto",
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px",
    },
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative",
  },
}

const buttonStyles = {
  ...styles.actionButton,
  ...styles.actionButtonRound,
}

const NewIcon = styled(Icon)(({ theme }) => {
  return { ...styles.icon }
})

export default function ButtonIconText(props) {
  return (
    <Tooltip
      title={props.tooltip}
      placement="right-start"
      arrow
      TransitionComponent={Zoom}
    >
      <Button round color={props.color} customClass={buttonStyles}>
        <div>
          <NewIcon>{props.icon}</NewIcon>
        </div>
      </Button>
    </Tooltip>
  )
}
