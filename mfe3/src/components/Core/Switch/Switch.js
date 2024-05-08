import React from "react"
import { Switch, styled } from "@mui/material"

const SwitchCustom = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  margin: theme.spacing(1),
  "& .MuiSwitch-switchBase": {
    padding: 1,
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.white,
      "& + .MuiSwitch-track": {
        backgroundColor: "#52d869",
        opacity: 1,
        border: "none",
      },
    },
    "& + .MuiSwitch-track": {
      backgroundColor: "#ef1635",
      opacity: 1,
      border: "none",
    },

    "&$focusVisible $thumb": {
      color: "#52d869",
      border: "6px solid #fff",
    },
  },
  "& .MuiSwitch-thumb": {
    width: 12,
    height: 12,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(["background-color", "border"]),
  },
  "& .MuiSwitch-checked": {},
  "& .MuiSwitch-focusVisible": {},
}))

const CustomSwitch = (props) => {
  return <SwitchCustom disableRipple {...props} />
}


export default CustomSwitch
