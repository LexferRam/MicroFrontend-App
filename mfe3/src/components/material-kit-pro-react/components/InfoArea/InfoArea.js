import React from "react"
// nodejs library to set properties for components
import PropTypes from "prop-types"

// @mui components
import { styled } from "@mui/material/styles"
import Icon from "@mui/material/Icon"

// Others components
//import ReactMarkdown from "react-markdown"

// Core components
import styles from "./infoStyle.js"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style, iconColor, vertical, className } = ownerState
  return {
    ...styles[style],
    ...(iconColor && styles[iconColor]),
    ...(vertical && styles.iconWrapperVertical),
    ...(className !== undefined && className),
  }
})

const NewH4 = styled("h4")(({ theme, className }) => ({
  ...className,
}))
const NewP = styled("p")(({ theme, className }) => ({
  ...className,
}))

const NewIcon = styled(Icon)(({ theme, className }) => ({
  ...className,
}))

const iconStyle = {
  width: "2.25rem",
  height: "2.25rem",
  fontSize: "2.25rem",
}

const iconVertical = {
  width: "61px",
  height: "61px",
}

export default function InfoArea(props) {
  const {
    title,
    description,
    iconColor,
    vertical,
    className,
    justificar,
    titlecenter,
  } = props
  const iconClasses = {
    ...styles.icon,
    ...(vertical && styles.iconVertical),
  }

  let icon = null
  if (props.icon != null)
    switch (typeof props.icon) {
      case "string":
        icon = <NewIcon className={iconClasses}>{props.icon}</NewIcon>
        break
      default:
        icon = (
          <props.icon
            sx={{
              ...iconStyle,
              ...(vertical && iconVertical),
            }}
          />
        )
        break
    }

  const AlignTextFn = (justificar) => {
    if (justificar === "justify") {
      return styles.pJustify
    }
    if (justificar === "right") {
      return styles.pRight
    }
    if (justificar === "center") {
      return styles.titlecenter
    }
  }

  const reactMarkdownClasses = {
    ...styles.description,
    ...AlignTextFn(justificar),
  }

  const h4Styles = {
    ...styles.title,
    ...(titlecenter && styles.titlecenter),
  }

  return (
    <NewDiv
      ownerState={{
        style: "infoArea",
        className: className,
      }}
    >
      {icon != null && (
        <NewDiv
          ownerState={{
            style: "iconWrapper",
            iconColor: {iconColor},
            vertical: {vertical},
          }}
        >
          {icon}
        </NewDiv>
      )}
      {props.image != null && (
        <NewDiv
          ownerState={{
            style: "imgContainer",
          }}
        >
          <img src={props.image} alt={props.image} />
        </NewDiv>
      )}
      <NewDiv
        ownerState={{
          style: "descriptionWrapper",
        }}
      >
        <NewH4 className={h4Styles}>{title}</NewH4>
        <NewP className={reactMarkdownClasses}> {description}</NewP>
      </NewDiv>
    </NewDiv>
  )
}

InfoArea.defaultProps = {
  iconColor: "gray",
  justificar: null,
}

InfoArea.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.node.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  vertical: PropTypes.bool,
  justificar: PropTypes.string,
  titlecenter: PropTypes.bool,
  className: PropTypes.object,
}
