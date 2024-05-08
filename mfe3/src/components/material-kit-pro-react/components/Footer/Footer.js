/* eslint-disable */
import React from "react"
// nodejs library to set properties for components
import PropTypes from "prop-types"

// @material-ui/core components
import { styled } from "@mui/material/styles"

import styles from "./footerStyle"

const NewFooter = styled("footer")(({ theme, ownerState }) => {
  const { themeType, big, className } = ownerState
  return {
    ...styles.footer,
    ...(themeType !== undefined  && themeType !== "transparent" && styles[themeType]),
    ...(big && styles.big), //big || children !== undefined
    ...(className !== undefined && className),
  }
})

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...styles[style] }
})

export default function Footer(props) {
  const { children, content, theme, big, className } = props

  return (
    <NewFooter
      ownerState={{
        themeType: theme,
        big: big || children !== undefined,
        className: className,
      }}
    >
      <NewDiv
        ownerState={{
          style: "container",
        }}
      >
        {children !== undefined ? (
          <div>
            <NewDiv
              ownerState={{
                style: "content",
              }}
            >
              {children}
            </NewDiv>
            <hr />
          </div>
        ) : (
          " "
        )}
        {content}
        <NewDiv
          ownerState={{
            style: "clearFix",
          }}
        />
      </NewDiv>
    </NewFooter>
  )
}

Footer.propTypes = {
  theme: PropTypes.oneOf(["dark", "white", "transparent"]),
  big: PropTypes.bool,
  content: PropTypes.node.isRequired,
}
