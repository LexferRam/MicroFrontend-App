import React from "react"
import { Switch, styled } from "@mui/material"

const SwitchAdvisor = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    "& .MuiSwitch-switchBase": {
    padding: 2,
    color: 'white',
    "&.Mui-checked": {
      transform: 'translateX(12px)',
      color: 'white',
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  "& .MuiSwitch-track": {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  "& .MuiSwitch-checked": {}
}))

const CustomSwitch = (props) => {
  return <SwitchAdvisor disableRipple {...props} />
}


export default CustomSwitch
