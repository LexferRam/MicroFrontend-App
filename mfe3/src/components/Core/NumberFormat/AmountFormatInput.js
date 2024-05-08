import React, { useState, useEffect } from "react"
import { NumericFormat } from "react-number-format"
import TextField from "@mui/material/TextField"

export default function AmountFormatInput(props) {
  const { onChange, value, ...rest } = props
  const [val, setVal] = useState()

  useEffect(() => {
    setVal(value)
  }, [])

  return (
    <NumericFormat
      {...rest}
      id={rest.name}
      value={val}
      customInput={TextField}
      thousandSeparator={"."}
      decimalSeparator={","}
      decimalScale={2}
      fixedDecimalScale
      displayType={"input"}
      onValueChange={(values, sourceInfo) => {
        setVal(values.floatValue)
        onChange && onChange(values.floatValue)
      }}
      valueIsNumericString
      prefix={rest.prefix}
    />
  )
}
