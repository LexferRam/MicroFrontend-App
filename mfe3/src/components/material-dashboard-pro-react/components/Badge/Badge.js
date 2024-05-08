import React from "react"
import PropTypes from "prop-types"

// @Mui components
import { styled } from "@mui/material/styles"

import styles from "./badgeStyle"

const NewSpan = styled("span")(({ theme, ownerState }) => {
  const { color } = ownerState
  return { ...styles.badge, ...styles[color.color ?? ""] }
})

export default function Badge(props) {
  const { color, children, className } = props
  return (
    <NewSpan
      className={className}
      ownerState={{
        color: { color },
      }}
    >
      {children}
    </NewSpan>
  )
}

Badge.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  children: PropTypes.node,
}
