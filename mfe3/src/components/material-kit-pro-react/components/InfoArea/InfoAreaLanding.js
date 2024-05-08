import React from "react"
// nodejs library to set properties for components
import PropTypes from "prop-types"
// @material-ui/core components
import { styled } from "@mui/material/styles"
import Icon from "@mui/material/Icon"
import styles from "./infoStyleLanding.js"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style, iconColor, vertical, justificar, className } = ownerState

  return {
    ...(style && styles[style]),
    ...(iconColor && styles[iconColor]),
    ...(vertical && styles.iconWrapperVertical),
    ...(justificar && styles.p),
    ...(className !== undefined && className),
  }
})

const NewH4 = styled("h4")(({ theme, ownerState }) => {
  const { style, titlecenter } = ownerState

  return {
    ...(style && styles[style]),
    ...(titlecenter && styles.titlecenter),
  }
})

const NewIcon = styled(Icon)(({ theme, ownerState }) => {
  const { style, vertical } = ownerState

  return {
    ...(style && styles[style]),
    ...(vertical && styles.iconVertical),
  }
})
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

  let icon = null
  if (props.icon != null)
    switch (typeof props.icon) {
      case "string":
        icon = (
          <NewIcon
            ownerState={{
              style: "icon",
              vertical: vertical,
            }}
          >
            {props.icon}
          </NewIcon>
        )
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
            iconColor: iconColor,
            vertical: vertical,
          }}
        >
          {icon}
        </NewDiv>
      )}
      {props.image != null && (
        <NewDiv
          ownerState={{
            style: "iconWrapper",
            iconColor: iconColor,
            vertical: vertical,
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
        <NewDiv
          ownerState={{
            style: "containerTitle",
          }}
        >
          {icon != null && (
            <NewDiv
              ownerState={{
                style: "iconWrapperScreenSmall",
              }}
            >
              {icon}
            </NewDiv>
          )}
          <NewH4
            ownerState={{
              style: "title",
              titlecenter: titlecenter,
            }}
          >
            {title}
          </NewH4>
        </NewDiv>
        <NewDiv
          ownerState={{
            style: "description",
            justificar: justificar,
          }}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </NewDiv>
    </NewDiv>
  )
}

InfoArea.defaultProps = {
  iconColor: "gray",
  justificar: false,
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
  justificar: PropTypes.bool,
  titlecenter: PropTypes.bool,
  className: PropTypes.object,
}
