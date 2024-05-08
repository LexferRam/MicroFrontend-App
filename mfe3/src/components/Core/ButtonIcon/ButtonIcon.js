import React from "react"

//Core components
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

export default function ButtonIcon(props) {
  return (
    <Button round color={props.color} className={buttonStyles}>
      <props.icon
        sx={{
          ...styles.icon,
        }}
      />
    </Button>
  )
}
