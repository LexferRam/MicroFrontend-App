import React from "react"
import { Switch, styled } from "@mui/material"

const OperatorSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#52d869",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#52d869",
  },
}))

const CustomSwitch = (props) => {
  return <OperatorSwitch disableRipple {...props} />
}

export default CustomSwitch
