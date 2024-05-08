import React from "react"
//import { makeStyles, useTheme } from "@material-ui/core/styles"
import { styled, useTheme } from "@mui/material/styles"

import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"
import Chip from "@mui/material/Chip"

const useStylesFunc = theme => ({
  formControl: {
    width: "100%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
})

const NewFormControl = styled(FormControl)(({ theme }) => {
  const newStyles = useStylesFunc(theme)
  return {
      ...newStyles.formControl,
  }
})

const NewChip = styled(Chip)(({ theme }) => {
  const newStyles = useStylesFunc(theme)
  return {
      ...newStyles.chip,
  }
})

const NewDivChip = styled("div")(({ theme }) => {
  const newStyles = useStylesFunc(theme)
  return {
      ...newStyles.chips,
  }
})

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      marginTop: 40,
    },
  },
  variant: "menu",
  getContentAnchorEl: null,
}

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  }
}


export default function SelectMultipleChip(props) {
  const { id, idLabel, label, arrayValues, idvalue, descrip, onChange, value, setInputValue } = props
  const theme = useTheme()
  const [personName, setPersonName] = React.useState([])

  const handleChange = (event) => {
    setPersonName(event.target.value)
    setInputValue && setInputValue(event.target.value)
    onChange(event)
  }

  return (
    <NewFormControl>
      <InputLabel id={idLabel}>{label}</InputLabel>
      <Select
        labelId={idLabel}
        id={id}
        fullWidth
        multiple
        value={value !== undefined?value:personName}
        onChange={handleChange}
        input={<Input id={idLabel} />}
        renderValue={selected => {
          return (
            <NewDivChip>
              {selected.map(value => {
                const regSelect = arrayValues.find(
                  element => element[idvalue] === value
                )
                return (
                  <NewChip
                    key={value}
                    label={regSelect[descrip]}
                  />
                )
              })}
            </NewDivChip>
          )
        }}
        MenuProps={MenuProps}
      >
        {arrayValues.map(reg => (
          <MenuItem
            key={reg[idvalue]}
            value={reg[idvalue]}
            style={getStyles(reg, personName, theme)}
          >
            {reg[descrip]}
          </MenuItem>
        ))}
      </Select>
    </NewFormControl>
  )
}
