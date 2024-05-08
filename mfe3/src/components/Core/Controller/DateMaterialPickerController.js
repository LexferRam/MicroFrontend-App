import React from "react"
import { Controller } from "react-hook-form"
import DateMaterialPicker from "../Datetime/DateMaterialPicker"

export default function DateMaterialPickerController(props) {
  const {
    errors,
    control,
    onChange: customOnChange,
    label,
    name,
    required,
    limit,
    readonly,
    disableFuture,
    minDate,
    openTo = "day",
    views = null,
    format = "DD/MM/YYYY",
    defaultValue = null,
    disabled = false,
    ...rest
  } = props

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      InputProps={{
        ...props.InputProps,
        readOnly: readonly ? readonly : false,
      }}
      rules={{
        required: required !== undefined ? required : readonly ? false : true,
      }}
      render={({
        field: { onChange, ...restOfField },
        fieldState: { error },
      }) => (
        <DateMaterialPicker
          {...restOfField}
          minDate={minDate}
          disabled={disabled}
          select
          disableFuture={disableFuture}
          label={label}
          error={error !== undefined}
          limit={limit}
          onChange={(e) => {
            customOnChange && customOnChange(e)
            onChange(e)
          }}
          helperText={
            (error && error.type === "required" && `Debe indicar ${label}`) ||
            (error && error.type === "pattern" && "Fecha inválida")
          }
          openTo={openTo}
          views={views}
          format={format}
        />
      )}
    />
  )
}
