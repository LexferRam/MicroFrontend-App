import React, { useEffect } from "react"

// MUI components
import { styled } from "@mui/material/styles"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select from "@mui/material/Select"

const useStyles = (theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
})

const NewFormControl = styled(FormControl)(({ theme, ownerState }) => {
  const styles = useStyles(theme)
  const { className } = ownerState
  return { ...styles.formControl, ...(className !== undefined && className) }
})

export default function SelectSimple(props) {
  const {
    id,
    label,
    array,
    onChange,
    classNameForm,
    withoutLabel,
    updateWithDefaultValue,
    ...rest
  } = props

  useEffect(() => {
    if (updateWithDefaultValue) {
      onChange(rest.defaultValue)
    }
  }, [])

  return (
    <NewFormControl
      ownerState={{
        className: classNameForm,
      }}
    >
      {!withoutLabel && <InputLabel id={label}>{label}</InputLabel>}
      <Select
        labelId={`label_${id}`}
        id={id}
        fullWidth
        {...rest}
        onChange={(event) => {
          onChange && onChange(event.target.value)
          return event.target.value
        }}
        variant= 'standard'
      >
        {!withoutLabel && (
          <MenuItem key="" value="">
            {label}
          </MenuItem>
        )}
        {array &&
          array.map((opc) => {
            let obj = Object.entries(opc)
            return (
              <MenuItem key={obj[0][1]} value={obj[0][1]}>
                {obj[1][1]}
              </MenuItem>
            )
          })}
      </Select>
    </NewFormControl>
  )
}
