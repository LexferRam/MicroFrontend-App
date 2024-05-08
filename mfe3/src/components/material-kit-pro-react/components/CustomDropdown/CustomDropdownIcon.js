import React from "react"

// nodejs library to set properties for components
import PropTypes from "prop-types"

// @material-ui/core components
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem"
import MenuList from "@mui/material/MenuList"
import ClickAwayListener from "@mui/base/ClickAwayListener"
import Paper from "@mui/material/Paper"
import Grow from "@mui/material/Grow"
import Divider from "@mui/material/Divider"
import Popper from "@mui/material/Popper"


import customDropdownStyle from "./customDropdownStyle.js"
import { Icon, IconButton, Tooltip } from "@mui/material"

const NewMenuList = styled(MenuList)(({ theme }) => {
  const newStyles = customDropdownStyle(theme)
  return {
    ...newStyles.menuList,
  }
})

const NewMenuItem = styled(MenuItem)(({ theme }) => {
  const newStyles = customDropdownStyle(theme)
  return {
    ...newStyles.dropdownHeader,
  }
})

const NewComplexMenuItem = styled(MenuItem)(({ theme, ownerState }) => {
  const newStyles = customDropdownStyle(theme)
  const { hoverColor, noLiPadding, rtlActive } = ownerState
  return {
    ...newStyles.dropdownItem,
    ...newStyles[hoverColor + "Hover"],
    ...(noLiPadding && newStyles.noLiPadding),
    ...(rtlActive && newStyles.dropdownItemRTL),
  }
})

const NewDivider = styled(Divider)(({ theme }) => {
  const newStyles = customDropdownStyle(theme)
  return {
    ...newStyles.dropdownDividerItem,
  }
})

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const newStyles = customDropdownStyle(theme)
  const { theStyle } = ownerState
  return {
    ...(theStyle && newStyles[theStyle]),
  }
})

const NewB = styled("b")(({ theme, ownerState }) => {
  const newStyles = customDropdownStyle(theme)
  const { dropup, anchorEl, rtlActive } = ownerState
  return {
    ...newStyles.caret,
    ...(dropup && !anchorEl && newStyles.caretDropup),
    ...(Boolean(anchorEl) && !dropup && newStyles.caretActive),
    ...(rtlActive && newStyles.caretRTL),
  }
})

const NewPopper = styled(Popper)(({ theme, ownerState }) => {
  const newStyles = customDropdownStyle(theme)
  const { anchorEl, navDropdown } = ownerState
  return {
    ...(!anchorEl && newStyles.popperClose),
    ...newStyles.pooperResponsive,
    ...(Boolean(anchorEl) && navDropdown && newStyles.pooperNav),
  }
})

const NewPaper = styled(Paper)(({ theme }) => {
  const newStyles = customDropdownStyle(theme)
  return {
    ...newStyles.dropdown,
  }
})

export default function CustomDropdownIcon(props) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const theme = useTheme()
  const styles = customDropdownStyle(theme)

  const handleClick = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null)
    } else {
      setAnchorEl(event.currentTarget)
    }
  }
  const handleClose = (event) => {
    if (anchorEl && anchorEl.contains(event.target)) {
      return
    }
    setAnchorEl(null)
  }
  const handleCloseMenu = (param) => {
    setAnchorEl(null)
    if (props && props.onClick) {
      props.onClick(param)
    }
  }
  const {
    icon,
    dropdownList,
    dropup,
    dropdownHeader,
    iconColor,
    arrow,
    styleIcon,
    tooltipPlacement,
    tooltipTitle,
    caret,
    hoverColor,
    dropPlacement,
    rtlActive,
    noLiPadding,
    innerDropDown,
    navDropdown,
  } = props

  const dropDownMenu = (
    <NewMenuList role="menu">
      {dropdownHeader !== undefined ? (
        <NewMenuItem onClick={() => handleCloseMenu(dropdownHeader)}>
          {dropdownHeader}
        </NewMenuItem>
      ) : null}
      {dropdownList.map((prop, key) => {
        if (prop.divider) {
          return (
            <NewDivider key={key} onClick={() => handleCloseMenu("divider")} />
          )
        } else if (
          prop.props !== undefined &&
          prop.props["data-ref"] === "multi"
        ) {
          return (
            <NewMenuItem key={key} sx={{ overflow: "visible", padding: 0 }}>
              {prop}
            </NewMenuItem>
          )
        }
        return (
          <NewComplexMenuItem
            key={key}
            onClick={() => handleCloseMenu(prop)}
            ownerState={{
              hoverColor: hoverColor,
              noLiPadding: noLiPadding,
              rtlActive: rtlActive,
            }}
          >
            {prop}
          </NewComplexMenuItem>
        )
      })}
    </NewMenuList>
  )
  return (
    <NewDiv
      ownerState={{
        theStyle: innerDropDown ? "innerManager" : "manager",
      }}
    >
      <div sx={{ ...customDropdownStyle.target }}>
        <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
          <IconButton color={iconColor} onClick={handleClick}>
            <Icon style={styleIcon ? styleIcon : {}}>{icon}</Icon>
          </IconButton>
        </Tooltip>
      </div>
      <NewPopper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={dropPlacement}
        ownerState={{
          anchorEl: anchorEl,
          navDropdown: { navDropdown },
        }}
        popperOptions={{
          strategy: "absolute",
        }}
      >
        {({ TransitionProps }) => (
          <Grow
            {...TransitionProps}
            in={Boolean(anchorEl)}
            id="menu-list"
            style={
              dropup
                ? { transformOrigin: "0 100% 0" }
                : { transformOrigin: "0 0 0" }
            }
          >
            <NewPaper>
              {innerDropDown ? (
                dropDownMenu
              ) : (
                <ClickAwayListener onClickAway={handleClose}>
                  {dropDownMenu}
                </ClickAwayListener>
              )}
            </NewPaper>
          </Grow>
        )}
      </NewPopper>
    </NewDiv>
  )
}

CustomDropdownIcon.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: "primary",
}

CustomDropdownIcon.propTypes = {
  hoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
  dropdownList: PropTypes.array,
  buttonProps: PropTypes.object,
  dropup: PropTypes.bool,
  dropdownHeader: PropTypes.node,
  rtlActive: PropTypes.bool,
  caret: PropTypes.bool,
  dropPlacement: PropTypes.oneOf([
    "bottom",
    "top",
    "right",
    "left",
    "bottom-start",
    "bottom-end",
    "top-start",
    "top-end",
    "right-start",
    "right-end",
    "left-start",
    "left-end",
  ]),
  noLiPadding: PropTypes.bool,
  innerDropDown: PropTypes.bool,
  navDropdown: PropTypes.bool,
  // This is a function that returns the clicked menu item
  onClick: PropTypes.func,
}
