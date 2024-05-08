import React from 'react'
import NumberFormatFree from 'components/Core/NumberFormat/NumberFormatFree'
import { Controller } from "react-hook-form";

export default function NumberFormatController(props) {
    const { errors, control, name, label, readonly, onChange, ...rest } = props
    return (
        <Controller
            {...rest}
            name={name}
            control={control}
            rules={{ required: props.required !== undefined ? props.required : readonly ? false : true }}
            render={({ field , fieldState: { error }}) => (
                <NumberFormatFree
                  {...field}
                  {...rest}
                  label={label}
                  variant= 'standard'
                  error={error !== undefined}
                  onChange={(value) => {
                    onChange && onChange(value);
                    field.onChange(value)
                }}
                  fullWidth
                  helperText={
                    error && error.type === 'required' && `Debe indicar ${label}`}
                />
              )}
              InputProps={{
                ...props.InputProps,
                readOnly: readonly ? readonly : false
            }} 
        />
    )
}

