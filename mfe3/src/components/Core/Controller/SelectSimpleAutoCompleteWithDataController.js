import React from "react"
import { Controller } from "react-hook-form"
import AutoCompleteWithData from "components/Core/Autocomplete/AutoCompleteWithData"

export default function SelectSimpleAutoCompleteWithDataController(props) {
  const { objForm, name, label, onChange, array, required, noOptionsText, ...rest } =
    props
  const { control } = objForm
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: required }}
      {...rest}
      render={({ field, fieldState: { error } }) => (
        <AutoCompleteWithData
          label={label}
          noOptionsText={noOptionsText ? noOptionsText : ""}
          fieldCtrlOnChange={field.onChange}
          onChange={onChange}
          options={array}
          {...rest}
          helperText={
            error &&
            error.type === "required" &&
            "Debe indicar un item de la lista"
          }
        />
      )}
    />
  )
}
