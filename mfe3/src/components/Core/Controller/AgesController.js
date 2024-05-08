import React from 'react'
import AgesFormat from 'components/Core/NumberFormat/AgesFormat'
import { Controller } from "react-hook-form";

export default function AgesController(props) {
    const { errors, control, register, label, name, onChange, readonly, ...rest } = props;
    return (
        <Controller
            {...rest}
            name={name}
            control={control}
            rules={{ required: props.required !== undefined ? props.required : true }}
            render={({ field, fieldState: { error } }) => (
                <AgesFormat
                  {...field}
                  {...rest}
                  label={label}
                  variant= 'standard'
                  fullWidth
                  error={error !== undefined}
                  helperText={
                    (error && error.type === "required" && `Debe indicar ${label}` )
                }
                />
              )}
            
        />
    )
}
