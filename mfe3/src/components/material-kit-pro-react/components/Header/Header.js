import React from "react"
// import { Link } from "gatsby"

// nodejs library to set properties for components
import PropTypes from "prop-types"

// @mui components
import { styled } from "@mui/material/styles"
import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Hidden from "@mui/material/Hidden"
import Drawer from "@mui/material/Drawer"
import Menu from "@mui/icons-material/Menu"
import Close from "@mui/icons-material/Close"
import useScrollTrigger from "@mui/material/useScrollTrigger"
import Slide from "@mui/material/Slide"

// core components
import styles from "./headerStyle.js"
import drawerStyles from "./headerDrawerStyle.js"
// import LogoPiramide from "../../../../../static/logo-piramides.svg"
// import LogoOceanica from "../../../../../static/oceanica_original.png"
import Link from "next/link.js"

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
  const appBarStyles = styles(theme)
  const { color, absolute, fixed } = ownerState

  return {
    ...appBarStyles.appBar,
    ...(color && appBarStyles[color]),
    ...(absolute && appBarStyles.absolute),
    ...(fixed && appBarStyles.fixed),
  }
})

const NewToolbar = styled(Toolbar)(({ theme}) => {
  const newToolbarStyles = styles(theme)
  return {
    ...newToolbarStyles.container,
  }
})

const NewButton = styled(Button)(({ theme }) => {
  const newButtonStyles = styles(theme)
  return {
    ...newButtonStyles.title
  }
})

const NewImg = styled("img")(({ theme }) => {
  const newImageStyles = styles(theme)
  return {
    ...newImageStyles.logo,
  }
})

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const newDivStyles = styles(theme)
  const { style } = ownerState
  return {
    ...(style && newDivStyles[style]),
  }
})

const NewIconButton = styled(IconButton)(({ theme }) => {
  const newIconButton = styles(theme)
  return {
    ...newIconButton.closeButtonDrawer,
  }
})

export default function Header(props) {
  const [mobileOpen, setMobileOpen] = React.useState(false)

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
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }
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
  const { color, links, fixed, absolute } = props

  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY

  return (
    <HideOnScroll {...props}>
      <NewAppBar
        ownerState={{
          color,
          absolute,
          fixed,
        }}
      >
        <NewToolbar>
          <NewButton>
            {insuranceCompany === "OCEANICA" ? (
              <Link href="/">
                <NewImg
                  src={LogoOceanica}
                  alt="Oceánica de Seguros"
                />
              </Link>
            ) : (
              <Link href="/">
                <NewImg
                src={''}
                  alt="Pirámide Seguros"
                />
              </Link>
            )}
          </NewButton>
          <NewDiv
              ownerState={{
                style: "hidden",
              }}
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            <NewDiv
              ownerState={{
                style: "collapse",
              }}
            >
              {links}
            </NewDiv>
          </NewDiv>
          <Hidden mdUp>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </IconButton>
          </Hidden>
        </NewToolbar>
        <Hidden mdUp implementation="js">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={mobileOpen}
            classes={{
              paper: drawerStyles.drawerPaper,
            }}
            onClose={handleDrawerToggle}
          >
            <NewIconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Close />
            </NewIconButton>
            <NewDiv
              ownerState={{
                style: "appResponsive",
              }}
            >
              {links}
            </NewDiv>
          </Drawer>
        </Hidden>
      </NewAppBar>
    </HideOnScroll>
  )
}

Header.defaultProp = {
  color: "white",
}

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  links: PropTypes.node,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
}
