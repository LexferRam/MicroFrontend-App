import React from 'react'
import TextField from '@mui/material/TextField';
import { Controller } from "react-hook-form";

export default function EmailController(props) {

    const { errors, control, register, label, name, onChange: customOnChange, onBlur: customOnBlur, readonly, required, ...rest } = props;

    return (
        <Controller
            {...rest}
            name={name}
            control={control}
            rules={{
                required: required !== undefined ? required : readonly ? false : true,
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Correo electrónico inválido"
                }
            }}
            render={({ field: {onBlur, onChange, ...restField}, fieldState: { error } }) => (
                <TextField
                    {...restField}
                    {...rest}
                    fullWidth
                    label={label}
                    variant='standard'
                    error={error !== undefined}
                    onChange={(e) => {
                        customOnChange && customOnChange(e.target.value)
                        onChange(e)
                    }}
                    onBlur={(e) => {
                        customOnBlur && customOnBlur(e.target.value)
                        onBlur(e)
                    }}
                    InputProps={{
                        readOnly: readonly ? readonly : false
                    }}
                    helperText={
                        (error && error.type === "required" && `Debe indicar ${label}` ||
                        error && error.type === "pattern" && "Correo electrónico inválido")
                    }
                />
            )}


        />
    )
}

