import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers"
import dayjs from "dayjs"

export default function DateMaterialPicker(props) {
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
  const dateFormat = props.format || "DD/MM/YYYY"

  let initialDateValue = value
  if (initialDateValue === undefined) {
    initialDateValue = null
  }

  const getMaxDate = () => {
    const today = new Date();
    const date2put = new Date(today.getFullYear(), today.getMonth(), today.getDate() -1, 1)
    return date2put
}

  const [selectedDate, setSelectedDate] = useState(initialDateValue)
  const [maxDate, setMaxDate] = useState()

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        {...rest}
        label={label}
        disableFuture={disableFuture}
        value={selectedDate}
        inputFormat={format || dateFormat}
        maxDate={limit && getMaxDate()}
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
