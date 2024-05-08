import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { DateTimePicker } from "@mui/x-date-pickers"
import dayjs from "dayjs"

export default function DateTimeMaterialPicker(props) {
  const {
    onChange,
    value,
    auxiliarValue,
    register,
    required,
    label,
    readonly,
    inputRef,
    helperText,
    disableFuture,
    format,
    limit,
    ...rest
  } = props
  const dateFormat = format || "DD/MM/YYYY hh:mm:ss"

  let initialDateValue = value
  if (initialDateValue === undefined) {
    initialDateValue = null
  }

  const [selectedDate, setSelectedDate] = useState(initialDateValue)

  //const [val, setVal] = useState(dayjs(value, "DD/MM/YYYY hh:mm:ss"))
  //const theValue = dayjs(value, "DD/MM/YYYY hh:mm:ss")

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DateTimePicker
        {...rest}
        fullWidth
        label={label}
        disableFuture={disableFuture}
        value={selectedDate}
        inputFormat={dateFormat}
        cancelLabel="Cancelar"
        okLabel="Aceptar"
        onChange={(newValue) => {
          setSelectedDate(newValue)
          onChange && onChange(newValue)
        }}
        renderInput={(params) => (
          <TextField
            fullWidth
            {...params}
            helperText={helperText}
            variant="standard"
          />
        )}
      />
    </LocalizationProvider>
  )
}
