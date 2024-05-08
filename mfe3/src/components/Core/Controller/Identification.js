import React, { Fragment } from "react"
import SelectSimpleController from "./SelectSimpleController"
import IdentificationController from "./IdentificationController"

export default function Identification(props) {
  const {
    index,
    arrayType,
    errors,
    objForm,
    control,
    required,
    onBlur,
    disabled,
  } = props

  function handleIdentificationType(value) {
    let idType = objForm.getValues()[`p_identification_type_${index}`]
    let idNumber = value
    let suffix = ""
    if (idType === "J" || idType === "G") {
      //props.checkVerifDigit &&
      if (idNumber && idNumber.length > 1) {
        suffix = idNumber.slice(-1)
        value = idNumber.slice(0, -1)
      } else {
        suffix = idNumber
        value = ""
      }
      value = (value ? value : "") + "-" + suffix
    } else {
      if (value) {
        value = value.replace("-", "")
        value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
      }
    }
    return value
  }

  function handleFormat(idType) {
    objForm.setValue(`p_identification_number_${index}`, "")
  }
  return (
    <Fragment>
      <SelectSimpleController
        required={required}
        control={control}
        label="Tipo de identificación"
        name={`p_identification_type_${index}`}
        array={arrayType}
        onChange={handleFormat}
        disabled={disabled ? disabled : undefined}
      />
      {/* <TextField
          label="Cedula"
          id={`p_identification_number_${index}`}
          sx={{ m: 1, width: '25ch' }}
          variant="standard"
        /> */}
      <IdentificationController
        required={required}
        control={control}
        label="Número de identificación"
        index={index}
        errors={errors}
        format={handleIdentificationType}
        onBlur={onBlur ? onBlur : undefined}
        disabled={disabled ? disabled : undefined}
      />
    </Fragment>
  )
}
