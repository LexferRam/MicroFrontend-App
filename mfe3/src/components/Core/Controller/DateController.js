import React, { useState } from "react"
import { Controller } from "react-hook-form"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { MobileDatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import TextField from "@mui/material/TextField"
import dayjs from "dayjs"
import localeEs from "dayjs/locale/es"

export default function DateController(props) {
  const {
    errors,
    control,
    name,
    value,
    defaultValue = null,
    label,
    required,
    readOnly,
    limit,
    formatIn,
    disablePast,
    disableFuture,
    onBlur,
    onChange: customOnChange,
    ...rest
  } = props
  let initialDateValue = value
  if (initialDateValue === undefined) {
    initialDateValue = null
  }
  const [selectedDate, setSelectedDate] = useState(initialDateValue)
  const dateFormat = formatIn || "DD/MM/YYYY"

  function onChangeCallback(dateObject) {
    // date format is case sensitive!
    //let formattedDateString = format(dateObject, dateFormat)
    let formattedDateString = dayjs(value, dateFormat)
    setSelectedDate(formattedDateString)
    customOnChange && customOnChange(formattedDateString)
  }

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required !== undefined ? required : true,
        pattern: {
          value: /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i,
          message: "Fecha inválida",
        },
      }}
      render={({ field, fieldState: { error } }) => (
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="es"
          localeText={{
            cancelButtonLabel: "Cancelar",
            okButtonLabel: "Aceptar",
            clearButtonLabel: "Limpiar",
          }}
        >
          <MobileDatePicker
            value={selectedDate}
            label={label}
            fullWidth
            inputFormat={dateFormat}
            format={dateFormat}
            disablePast={disablePast}
            disableFuture={disableFuture}
            onChange={onChangeCallback}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                error={error !== undefined}
                onBlur={(e) => {
                  onBlur && onBlur(e.target.value)
                  field.onBlur(e.target.value)
                }}
                helperText={
                  (error &&
                    error.type === "required" &&
                    `Debe indicar ${label}`) ||
                  (error && error.type === "pattern" && "Fecha inválida")
                }
              />
            )}
            {...field}
          />
        </LocalizationProvider>
      )}
    />
  )
}
