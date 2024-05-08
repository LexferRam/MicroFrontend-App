import React from "react"
import TimeHourPicker from "../Datetime/TimeHourPicker"
import { Controller } from "react-hook-form"

export default function TimeHourController(props) {
  const {
    objForm,
    label,
    required,
    onChange: customOnChange,
    readonly,
    is12H,
    ...rest
  } = props
  const { control } = objForm

  return (
    <Controller
      {...rest}
      InputProps={{
        ...props.InputProps,
        readOnly: readonly ? readonly : false,
      }}
      label={label}
      name={props.name}
      rules={{
        required: required !== undefined ? required : readonly ? false : true,
      }}
      control={control}
      render={({
        field: { onChange, ...restOfField },
        fieldState: { error },
      }) => (
        <TimeHourPicker
          {...rest}
          {...restOfField}
          select
          label={label}
          error={Boolean(error)}
          is12H={is12H}
          inputFormat="hh:mm a"
          onChange={(e) => {
            customOnChange && customOnChange(e)
            onChange(e)
          }}
          helperText={
            error && error.type === "required" && `Debe indicar ${label}`
          }
        />
      )}
    />
  )
}
