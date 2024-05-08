import React from "react"
import PropTypes from "prop-types"
import { styled } from "@mui/material/styles"
import Snack from "@mui/material/SnackbarContent"
import { Button, IconButton } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import styles from "./snackbarContentStyle.js"

const NewSpan = styled("span")(({ theme, icon }) => {
  return icon !== undefined ? styles.iconMessage : null
})

const NewIconButton = styled(IconButton)(({ theme }) => {
  return { ...styles.iconButton }
})

const NewCloseIcon = styled(CloseIcon)(({ theme }) => {
  return { ...styles.close }
})

export default function SnackbarContent(props) {
  const { plain, message, color, close, icon, isButton, buttonMessage } = props
  var action = []

  function onSnackButtonClick() {
    if (props.onButtonClick) {
      props.onButtonClick()
    }
  }

  if (close !== undefined) {
    action = [
      <NewIconButton key="close" aria-label="Close" color="inherit">
        <NewCloseIcon />
      </NewIconButton>,
    ]
  }

  const iconClasses = {
    ...styles.icon,
    ...(plain && styles.cardPlain),
    ...(color === "info" && styles.infoIcon),
    ...(color === "success" && styles.successIcon),
    ...(color === "warning" && styles.warningIcon),
    ...(color === "danger" && styles.dangerIcon),
    ...(color === "primary" && styles.primaryIcon),
    ...(color === "rose" && styles.roseIcon),
  }
  return (
    <Snack
      message={
        <div>
          {icon !== undefined ? (
            <props.icon
              sx={{
                ...iconClasses,
              }}
            />
          ) : null}
          {isButton !== undefined ? (
            <Button
              fullWidth
              onClick={() => onSnackButtonClick()}
              sx={{ textTransform: "none", p: 0, color: "white.main" }}
            >
              {buttonMessage}
            </Button>
          ) : (
            <NewSpan icon={icon}>{message}</NewSpan>
          )}
        </div>
      }
      sx={{ ...styles.root, ...styles[color], ...styles.message }}
      action={action}
    />
  )
}

SnackbarContent.defaultProps = {
  color: "info",
}

SnackbarContent.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf([
    "info",
    "success",
    "warning",
    "danger",
    "primary",
    "rose",
  ]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  isButton: PropTypes.bool,
  onButtonClick: PropTypes.func,
  buttonMessage: PropTypes.string,
}
