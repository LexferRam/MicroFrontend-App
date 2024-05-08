import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Paper from "@mui/material/Paper";
import Grow from "@mui/material/Grow";
import Divider from "@mui/material/Divider";
import Popper from "@mui/material/Popper";
import Button from "../CustomButtons/Button.js";
import customDropDownStyles from "./customDropdownStyle.js";
import { Icon, IconButton, Tooltip } from "@mui/material";

const NewMenuList = styled(MenuList)(({ theme }) => {
  const newStyles = customDropDownStyles(theme)
  return {
    ...newStyles.menuList,
  }
})

const NewMenuItem = styled(MenuItem)(({ theme }) => {
  const newStyles = customDropDownStyles(theme)
  return {
    ...newStyles.dropdownHeader,
  }
})

const NewDivider = styled(Divider)(({ theme }) => {
  const newStyles = customDropDownStyles(theme)
  return {
    ...newStyles.dropdownDividerItem,
  }
})

const DropDownItem = styled(MenuItem)(({ theme, ownerState }) => {
  const newStyles = customDropDownStyles(theme)
  const { hoverColor, noLiPadding, rtlActive } = ownerState
  return {
    ...newStyles.dropdownItem,
    ...newStyles[hoverColor + "Hover"],
    ...(noLiPadding && newStyles.noLiPadding),
    ...(rtlActive && newStyles.dropdownItemRTL)
  }
})

const DivManager = styled("div")(({ theme, ownerState }) => {
  const newStyles = customDropDownStyles(theme)
  const { innerDropDown} = ownerState
  return {
    ...(innerDropDown && newStyles.innerManager),
    ...(!innerDropDown && newStyles.manager)
  }
})

const DivTarget = styled("div")(({ theme }) => {
  const newStyles = customDropDownStyles(theme)
  return {
    ...newStyles.target
  }
})

const NewPopper = styled(Popper)(({ theme, ownerState }) => {
  const newStyles = customDropDownStyles(theme)
  const { anchorEl, navDropdown } = ownerState
  return {
    ...newStyles.pooperResponsive,
    ...(anchorEl && newStyles.popperClose),    
    ...(navDropdown && Boolean(anchorEl) && newStyles.pooperNav)
  }
})

const NewPaper = styled(Paper)(({ theme  }) => {
  const newStyles = customDropDownStyles(theme)
  return {
    ...newStyles.dropdown
  }
})

export default function CustomDropdownIcon(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    if (anchorEl && anchorEl.contains(event.target)) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
  };
  const handleClose = event => {
    if (anchorEl?.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
  };
  const handleCloseMenu = param => {
    setAnchorEl(null);
    if (props && props.onClick) {
      props.onClick(param);
    }
  };
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
    navDropdown
  } = props;
  console.log('dropdownList:',dropdownList)
  const dropDownMenu = (
    <NewMenuList role="menu" >
      {dropdownHeader !== undefined ? (
        <NewMenuItem onClick={() => handleCloseMenu(dropdownHeader)} >
          {dropdownHeader}
        </NewMenuItem>
      ) : null}
      {dropdownList.map((prop, key) => {
        if (prop.divider) {
          return (
            <NewDivider
              key={key}
              onClick={() => handleCloseMenu("divider")}
            />
          );
        } else if (
          prop.props !== undefined &&
          prop.props["data-ref"] === "multi"
        ) /*{
          return (
            <DropDownItem
              key={key}
              sx={{ overflow: "visible", padding: 0 }}
              ownerState={{
                hoverColor: hoverColor, 
                noLiPadding: noLiPadding, 
                rtlActive: rtlActive
              }}
            >
              {prop}
            </DropDownItem>
          );
        }*/
        return (
          <DropDownItem
            key={key}
            onClick={() => handleCloseMenu(prop)}
            ownerState={{
              hoverColor: hoverColor, 
              noLiPadding: noLiPadding, 
              rtlActive: rtlActive
            }}
          >
            {prop}
          </DropDownItem>
        );
      })}
    </NewMenuList>
  );
  return (
    <DivManager ownerState={{
      innerDropDown: innerDropDown, 
    }} >
      <DivTarget>
        <Tooltip title={tooltipTitle} placement={tooltipPlacement} arrow>
            <IconButton color={iconColor} 
                onClick={handleClick}>
                <Icon style={styleIcon?styleIcon:{}}>{icon}</Icon>
                
            </IconButton>
        </Tooltip>
      </DivTarget>
      <NewPopper
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        transition
        disablePortal
        placement={dropPlacement}
        ownerState={{
          anchorEl: anchorEl,
          navDropdown: {navDropdown}
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
            <NewPaper >
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
    </DivManager>
  );
}

CustomDropdownIcon.defaultProps = {
  caret: true,
  dropup: false,
  hoverColor: "primary"
};

CustomDropdownIcon.propTypes = {
  hoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ]),
  buttonText: PropTypes.node,
  buttonIcon: PropTypes.object,
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
    "left-end"
  ]),
  noLiPadding: PropTypes.bool,
  innerDropDown: PropTypes.bool,
  navDropdown: PropTypes.bool,
  // This is a function that returns the clicked menu item
  onClick: PropTypes.func
};
