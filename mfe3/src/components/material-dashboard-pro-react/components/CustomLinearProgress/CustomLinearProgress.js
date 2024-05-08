import React from "react"
import PropTypes from "prop-types"
import { styled } from "@mui/material/styles"
import styles from "./customLinearProgressStyle.js"
import { LinearProgress } from "@mui/material"

const NewLinearProgress = styled(LinearProgress)(({ color }) => {
  return {
    ...styles.root,
    ...styles[color + "Background"],
    bar: { ...styles.bar, ...styles[color] },
  }
})

export default function CustomLinearProgress(props) {
  const { color, ...rest } = props

  return <NewLinearProgress {...rest} color={color} />
}

CustomLinearProgress.defaultProps = {
  color: "gray",
}

CustomLinearProgress.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
}
