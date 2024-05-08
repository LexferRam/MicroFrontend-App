import React, { useState } from "react"
import DateTimeMaterialPicker from "../Datetime/DateTimeMaterialPicker"
import { Controller } from "react-hook-form"
import TextField from "@mui/material/TextField"
import dayjs from "dayjs"

export default function DateTimeMaterialPickerController(props) {
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
    openTo = "day",
    views = null,
    formatIn = "DD/MM/YYYY hh:mm:ss",
    defaultValue = null,
    ...rest
  } = props

  return (
    <Controller
      {...rest}
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
        field: { onChange, onBlur, ...restOfField },
        fieldState: { error },
      }) => (
        <DateTimeMaterialPicker
          {...restOfField}
          select
          disableFuture={disableFuture}
          label={label}
          error={error !== undefined}
          limit={limit}
          onChange={(e) => {
            customOnChange && customOnChange(e)
            onChange(e)
          }}
          onBlur={(e) => {
            onBlur(e.target.value)
          }}
          helperText={
            (error && error.type === "required" && `Debe indicar ${label}`) ||
            (error && error.type === "pattern" && "Fecha inválida")
          }
          format={formatIn}
        />
      )}
    />
  )
}
