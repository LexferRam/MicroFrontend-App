import React from "react"
import { Autocomplete, TextField } from "@mui/material"
import { Controller } from "react-hook-form"

export default function AutocompleteController(props) {
  const {
    control,
    label,
    name,
    readonly,
    defaultValue,
    value,
    arrayValues = [],
    noOptionsText,
    multiple,
    onChange: handleChange,
    ...rest
  } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      value={value}
      rules={{
        required:
          props.required !== undefined
            ? props.required
            : readonly
            ? false
            : true,
      }}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error },
      }) => (
        <Autocomplete
          {...rest}
          multiple={multiple}
          options={arrayValues}
          value={value}
          noOptionsText={noOptionsText}
          defaultValue={defaultValue}
          onChange={(_, data) => {
            onChange(data)
            handleChange && handleChange(data)
          }}
          renderOption={(props, option) => {
            return (
              <li {...props} key={`index_${option.NAME}_${option.VALUE}`}>
                {option.NAME}
              </li>
            )
          }}
          getOptionLabel={(option) => option.NAME ?? ""}
          renderInput={(params) => (
            <TextField
              {...params}
              {...field}
              fullWidth
              inputRef={ref}
              label={label}
              error={Boolean(error)}
              variant="standard"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              helperText={
                error && error.type === "required" && `Debe indicar el ${label}`
              }
            />
          )}
          // eslint-disable-next-line react/prop-types
          isOptionEqualToValue={(option, value) => option.VALUE === value.VALUE}
        />
      )}
    />
  )
}
