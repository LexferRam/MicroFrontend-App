import React from "react"
import PropTypes from "prop-types"
import NumberOnlyFormat from "components/Core/NumberFormat/NumberOnlyFormat"
import { Controller } from "react-hook-form"

export default function NumberController(props) {
  const {
    control,
    errors,
    label,
    name,
    onChange,
    readonly,
    required,
    ...rest
  } = props

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      rules={{
        required: required !== undefined ? required : readonly ? false : true,
      }}
      render={({ field, fieldState: { error } }) => (
        <NumberOnlyFormat
          {...field}
          {...rest}
          label={label}
          variant="standard"
          fullWidth
          error={error !== undefined}
          onChange={(value) => {
            onChange && onChange(value)
            field.onChange(value)
          }}
          InputProps={{
            readOnly: readonly ? readonly : false,
          }}
          helperText={
            error && error.type === "required" && `Debe indicar ${label}`
          }
        />
      )}
    />
  )
}

NumberController.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  readonly: PropTypes.bool,
  rest: PropTypes.any,
  required: PropTypes.bool,
}
