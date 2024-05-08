import React from "react"

// nodejs library to set properties for components
import PropTypes from "prop-types"
// @mui components
import { styled } from "@mui/material/styles"

// core components
import styles from "./parallaxStyle.js"

const Div = styled("div")(({ theme, ownerState }) => {
  const { filter, small, className } = ownerState
  return {
    ...styles.parallax,
    ...(filter !== undefined && styles[filter + "Color"]),
    ...(small && styles.small),
    ...className,
  }
})

export default function Parallax(props) {
  let windowScrollTop
  if (typeof window != "undefined") {
    if (window.innerWidth >= 768) {
      windowScrollTop = window.pageYOffset / 3
    } else {
      windowScrollTop = 0
    }
  }

  const [transform, setTransform] = React.useState(
    "translate3d(0," + windowScrollTop + "px,0)"
  )
  React.useEffect(() => {
    if (typeof window === "undefined") return
    if (window.innerWidth >= 768) {
      window.addEventListener("scroll", resetTransform)
    }
    return function cleanup() {
      if (window.innerWidth >= 768) {
        window.removeEventListener("scroll", resetTransform)
      }
    }
  })
  const resetTransform = () => {
    var windowScrollTop = window.pageYOffset / 3
    setTransform("translate3d(0," + windowScrollTop + "px,0)")
  }
  const { filter, className, children, style, image, small } = props

  return (
    <Div
      ownerState={{
        filter: filter,
        small: small,
        className: className ,
      }}
      style={{
        ...style,
        backgroundImage: "url(" + image + ")",
        transform: transform,
      }}
    >
      {children}
    </Div>
  )
}

Parallax.propTypes = {
  className: PropTypes.object,
  filter: PropTypes.oneOf([
    "primary",
    "rose",
    "dark",
    "info",
    "success",
    "warning",
    "danger",
  ]),
  children: PropTypes.node,
  style: PropTypes.string,
  image: PropTypes.string,
  small: PropTypes.bool,
}
