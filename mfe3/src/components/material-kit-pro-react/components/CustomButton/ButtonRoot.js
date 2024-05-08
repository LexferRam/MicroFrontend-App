import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"

import styles from "./buttonStyle.js"

export default styled(Button)(({ theme, ownerState }) => {
  const {
    color,
    round,
    fullWidth,
    disabled,
    textColor,
    simple,
    size,
    block,
    link,
    justIcon,
    fileButton,
    className,
  } = ownerState

  return {
    ...styles.button,
    ...styles[size],
    ...styles[color],
    ...(round && styles.round),
    ...(fullWidth && styles.fullWidth),
    ...(disabled && styles.disabled),
    ...(simple && styles.simple(textColor ? textColor : null)),
    ...(block && styles.block),
    ...(link && styles.link),
    ...(justIcon && styles.justIcon),
    ...(fileButton && styles.fileButton),
    ...(className !== undefined && className),
  }
})
