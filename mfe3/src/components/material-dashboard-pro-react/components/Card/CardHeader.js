import React from "react"
import PropTypes from "prop-types"

import { styled } from "@mui/material/styles"
import styles from "./cardHeaderStyle.js"

const NewCardHeader = styled("div")(({ theme, ownerState }) => {
  const {
    color,
    plain,
    image,
    contact,
    signup,
    stats,
    icon,
    text,
    noShadow,
    center,
    basicColor,
    className,
  } = ownerState
  return {
    ...styles.cardHeader,
    
    //New application of Styles
    ...(basicColor && color && styles[color + "CardHeaderBasic"]),
    
    ...(plain && !image && styles.cardHeaderPlain),
    ...(image && styles.cardHeaderImage),
    ...(center && styles.cardHeaderCenterText),
    ...(contact && styles.cardHeaderContact),
    ...(signup && styles.cardHeaderSignup),
    ...(noShadow && styles.noShadow),
    ...(stats && styles.cardHeaderStats),
    ...(icon && styles.cardHeaderIcon),
    ...(text && styles.cardHeaderText),
    ...(color && styles[color + "CardHeader"]),
    ...(color && !icon && !text && styles[color + "CardHeader"]),
    ...((color && !icon && !image && !text) && styles.cardNotIconImageStyles),
    ...((color && icon && styles.cardHeaderIconStyle)),
    ...(className !== undefined && className),
    ...styles.cardHeaderPiram,
    ...((color || plain || image || contact || signup || stats || icon || text) && styles.basicHeaderStyles),
  }
})

export default function CardHeader(props) {
  const {
    className,
    children,
    color,
    plain,
    image,
    contact,
    signup,
    stats,
    icon,
    text,
    center,
    basicColor,
    clName,
    ...rest
  } = props

  return (
    <NewCardHeader
      className={clName}
      ownerState={{
        color: color,
        plain: plain,
        image: image,
        contact: contact,
        signup: signup,
        stats: stats,
        icon: icon,
        text: text,
        center: center,
        basicColor:basicColor,
        className: className,
      }}
    >
      {children}
    </NewCardHeader>
  )
}

CardHeader.propTypes = {
  className: PropTypes.object,
  color: PropTypes.oneOf([
    "warning",
    "success",
    "danger",
    "info",
    "primary",
    "rose",
  ]),
  plain: PropTypes.bool,
  image: PropTypes.bool,
  contact: PropTypes.bool,
  signup: PropTypes.bool,
  stats: PropTypes.bool,
  icon: PropTypes.bool,
  text: PropTypes.bool,
  center: PropTypes.bool,
  basicColor: PropTypes.bool,
  children: PropTypes.node,
}
