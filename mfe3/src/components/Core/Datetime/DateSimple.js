import React, { useState } from 'react'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import TextField from '@mui/material/TextField';


export default function DateSimple(props) {
  const { onChange, value, auxiliarValue, format, label, readOnly, name, errors, ...rest } = props
  const dateFormat = format || "dd/MM/yyyy"

  let initialDateValue = value
  if (initialDateValue === undefined) {
    initialDateValue = null
  }
  

  /*if (initialDateValue === 'Invalid Date') {
    initialDateValue = auxiliarValue && parse(auxiliarValue, dateFormat, new Date())
  } else if (initialDateValue === undefined) {
    initialDateValue = null
  } */

  const [selectedDate, setSelectedDate] = useState(initialDateValue);  
   

  return (
<LocalizationProvider dateAdapter={AdapterDateFns}>
  <DatePicker
    label={label}
    value={selectedDate}
    inputFormat={dateFormat}
    format={dateFormat}
    onChange={(a, b) => {
      setSelectedDate(a);
    }}
    renderInput={(params) => {
      <TextField {...params} {...rest} />
    }}
  />
</LocalizationProvider>
  )
}
