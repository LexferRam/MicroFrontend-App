import React, { useState } from "react"
import TextField from "@mui/material/TextField"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { TimePicker } from "@mui/x-date-pickers"
import esLocale from "date-fns/locale/es"

export default function TimeHourPicker(props) {
  const { onChange, value, auxiliarValue, helperText, is12H, ...rest } = props
  const initialTime =
    auxiliarValue !== undefined
      ? auxiliarValue
      : new Date("December 15, 2021 12:00")
  const [selectedDate, setSelectedDate] = useState(initialTime)

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={esLocale}>
      <TimePicker
        {...rest}
        value={selectedDate}
        ampm={is12H ? is12H : false}
        openTo="hours"
        onChange={(date) => {
          setSelectedDate(date)
          onChange && onChange(date)
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
