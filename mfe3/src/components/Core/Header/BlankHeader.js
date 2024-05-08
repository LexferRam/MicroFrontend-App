import React from "react"

import { styled } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"

// import headerStyles from "components/material-kit-pro-react/components/Header/headerStyle.js"
import headerStyles from "../../material-kit-pro-react/components/Header/headerStyle.js"
import LogoPiramide from "./logo-piramides.svg"
import LogoOceanica from "./oceanica_original.png"
import Link from "next/link"

function HideOnScroll(props) {
  const { children } = props
  const trigger = useScrollTrigger()

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}

const NewAppBar = styled(AppBar)(({ theme, ownerState }) => {
  const { color, absolute, fixed } = ownerState
  const styles = headerStyles(theme)
  return {
    ...styles.appBar,
    ...(color && styles[color]),
    ...(absolute && styles.absolute),
    ...(fixed && styles.fixed),
  }
})

const NewToolbar = styled(Toolbar)(({ theme }) => {
  const styles = headerStyles(theme)
  return {
    ...styles.container
  }
})


const NewImg = styled("img")(({ theme }) => {
  const styles = headerStyles(theme)
  return {
    ...styles.logo
  }
})

const NewDiv = styled("div")(({ theme }) => {
  const styles = headerStyles(theme)
  return {
    ...styles.flexLogo
  }
})

export default function BlankHeader(props) {
  /*React.useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });*/
  /*const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };*/
  const { color, fixed, absolute } = props

  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  const logo = insuranceCompany === "OCEANICA" ? LogoOceanica : LogoPiramide
  const altText =
    insuranceCompany === "OCEANICA" ? "Oceánica de Seguros" : "Pirámide Seguros"
  return (
    <HideOnScroll {...props}>
      <NewAppBar ownerState={{
        color: color,
        absolute: absolute,
        fixed: fixed
      }}>
        <NewToolbar >
          <NewDiv >
            {props.noLinks ? (
              <NewImg src={logo} alt={altText} />
            ) : (
              <Link to="/">
                <NewImg src={logo} alt={altText} />
              </Link>
            )}
          </NewDiv>
        </NewToolbar>
      </NewAppBar>
    </HideOnScroll>
  )
}
