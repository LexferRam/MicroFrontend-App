import React from 'react'
import { styled } from "@mui/material/styles"
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";

const NewTextField = styled(TextField)(({ theme, ownerState }) => {
  const { className } = ownerState
  return {
    ...(className !== undefined && className)
  }
});

export default function InputController(props) {
  const { errors, control, register, label, name, onChange, onBlur, readonly, required, className, fullWidth = true, ...rest } = props;

  return (
    <Controller
      {...rest}
      name={name}
      control={control}
      rules={{ required: required !== undefined ? required : readonly ? false : true ,}}
      render={({ field, fieldState: { error } }) => (
        <NewTextField
          {...field}
          {...rest}
          ownerState={{
            className: className
          }}
          label={label}
          variant='standard'
          autoComplete="off"
          fullWidth={fullWidth}
          error={error !== undefined}
          onChange={(e) => {
            onChange && onChange(e.target.value);
            field.onChange(e.target.value)
          }}
          onBlur={(e) => {
            onBlur && onBlur(e.target.value)
            field.onBlur(e.target.value)
          }}
          InputProps={{
            ...props.InputProps,
            readOnly: readonly ? readonly : false
          }}
          helperText={
            error && error.type === 'required' && `Debe indicar ${label}`
          }
        />
      )}
    />
  )
}
