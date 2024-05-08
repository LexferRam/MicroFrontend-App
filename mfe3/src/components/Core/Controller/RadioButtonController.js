import React from "react"

import { Controller } from "react-hook-form"

// @Mui components
import { styled } from "@mui/material/styles"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FiberManualRecord from "@mui/icons-material/FiberManualRecord"
import FormControl from "@mui/material/FormControl"

import styles from "components/material-dashboard-pro-react/components/customCheckboxRadioSwitch"

const NewFiberManualRecord = styled(FiberManualRecord)(
  ({ theme, ownerState }) => {
    const { style } = ownerState
    return { ...styles[style] }
  }
)

const NewFormControlLabel = styled(FormControlLabel)(({ theme }) => {
  return {
      ...styles.labelRoot,
      "& .MuiFormControlLabel-label":{
        ...styles.label
      }
  }
})

const NewRadio = styled(Radio)(({ theme }) => {
  return {
      ...styles.radioRoot,
      "& .Mui-checked":{
        ...styles.radio
      }
  }
})

export default function RadioButtonController(props) {
  const {
    control,
    name,
    values,
    onChange: customOnChange,
    required,
    erroMsg,
    ...rest
  } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, ...restOfField },
        fieldState: { error },
      }) => (
        <>
          <FormControl>
            <RadioGroup
              {...rest}
              {...restOfField}
              onChange={(event) => {
                customOnChange && customOnChange(event.target.value)
                onChange(event)
              }}
            >
              {values.map(({ value, label }, index) => (
                <NewFormControlLabel
                  key={index}
                  value={value}
                  label={label}
                  control={
                    <NewRadio
                      icon={
                        <NewFiberManualRecord
                          ownerState={{
                            style: "radioUnchecked",
                          }}
                        />
                      }
                      checkedIcon={
                        <NewFiberManualRecord
                          ownerState={{
                            style: "radioChecked",
                          }}
                        />
                      }
                    />
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          {error && (
            <p style={{ color: "red" }}>
              {erroMsg || "Debe indicar su respuesta"}
            </p>
          )}
        </>
      )}
      rules={{ required: required !== undefined ? required : false }}
    />
  )
}
