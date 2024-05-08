import React from "react"
import { NumericFormat } from "react-number-format"
import TextField from "@mui/material/TextField"

const NumberOnlyFormat = (props) => {
  const { onChange, value, inputRef, ...rest } = props

  return (
    <NumericFormat
      {...rest}
      value={value}
      decimalScale={0}
      customInput={TextField}
      onValueChange={(values) => {
        onChange && onChange(values.value)
      }}
      valueIsNumericString
    />
  )
}

export default NumberOnlyFormat
