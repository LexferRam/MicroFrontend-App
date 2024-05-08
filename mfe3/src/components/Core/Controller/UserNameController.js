import React from "react"
import TextField from "@mui/material/TextField"
import { Controller } from "react-hook-form"

export default function UserNameController(props) {
  const {
    objForm,
    label,
    onBlur: customOnBlur,
    readonly,
    disabled,
    ...rest
  } = props
  const { control } = objForm

  return (
    <Controller
      {...rest}
      fullWidth
      rules={{
        required: true,
        pattern: {
          value: /^[0-9a-zA-Z]{2,30}$/i,
          message: "Nombre de usuario inválido",
        },
        maxLength: 30,
      }}
      render={({
        field: { onBlur, ...restOfField },
        fieldState: { error },
      }) => (
        <TextField
          {...restOfField}
          {...rest}
          label={label}
          variant="standard"
          autoComplete="off"
          fullWidth
          error={error !== undefined}
          onBlur={(e) => {
            customOnBlur && customOnBlur(e.target.value)
            onBlur(e.target.value)
          }}
          InputProps={{
            ...props.InputProps,
            readOnly: readonly ? readonly : false,
            disabled: disabled ? disabled : false,
          }}
          
          helperText={
            (error && error.type === "required" && `Debe indicar ${label}`) ||
            (error &&
              error.type === "pattern" &&
              "El nombre de usuario debe ser alfanumérico de máximo de 30 caracteres") ||
            (error &&
              error.type === "maxLength" &&
              "El usuario debe tener un máximo de 30 caracteres")
          }
        />
      )}
      name={props.name}
      control={control}

      /*onBlur={([value]) => {
                onBlur && onBlur(value)
                return value
            }}*/
    />
  )
}
