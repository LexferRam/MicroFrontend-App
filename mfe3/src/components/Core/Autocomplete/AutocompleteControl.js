import React, { useEffect, useState } from "react"
import Axios from "axios"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import CircularProgress from "@mui/material/CircularProgress"

export default function AutocompleteControl(props) {
  const {
    api,
    cursor,
    name,
    label,
    helperText,
    inputValue,
    setInputValue,
    isOpen,
    handleChange,
    fieldCtrlOnChange,
    ...rest
  } = props
  const [open, setOpen] = useState(isOpen)
  const [options, setOptions] = useState([])
  const loading = open && options.length === 0

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    ;(async () => {
      const response = await Axios.post(api)
      const jsonCursor = response.data[cursor]
      if (active) {
        setOptions(jsonCursor)
      }
    })()

    return () => {
      active = false
    }
  }, [loading])

  return (
    <Autocomplete
      id={`id_${name}`}
      open={open}
      onOpen={() => {
        setOpen(true)
      }}
      onClose={() => {
        setOpen(false)
      }}
      isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
      getOptionLabel={(option) => option.NAME}
      options={options}
      loading={loading}
      onInputChange={props.onInputChange}
      loadingText="Cargando"
      clearOnEscape
      onChange={(_, data) => {
        fieldCtrlOnChange(data)
        handleChange && handleChange(data)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          variant="standard"
          fullWidth
          helperText={helperText}
          /* onChange={(e) => {
            setInputValue(e.target.value)
            fieldCtrlOnChange && fieldCtrlOnChange(e.target.value)
            onChange && onChange(e.target.value ? e.target.value : null)
          }}*/
          InputProps={{
            ...params.InputProps,
            name: props.name,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  )
}
