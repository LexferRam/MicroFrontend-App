import React from 'react'
import PhoneInternationalFormat from 'components/Core/NumberFormat/PhoneInternationalFormat'
import { Controller } from "react-hook-form";

export default function PhoneInternationalController(props) {
    const { errors, control, name, objForm, onChange, onBlur, label, ...rest } = props;
    
    return (
        <Controller
            {...rest}
            name={name}
            control={control}
            rules={{ required: true, minLength: 9, maxLength: 13 }}            
            render={({ field, fieldState: { error } }) => (
                <PhoneInternationalFormat
                    {...field}
                    {...rest}
                    label={label}
                    variant='standard'
                    fullWidth
                    error={error !== undefined}
                    onChange={(a, b) => {
                        onChange && onChange(a.value);
                        field.onChange(a.value)
                    }}
                    onBlur={(e) => {
                        onBlur && onBlur(e.target.value)
                        field.onBlur(e.target.value)
                    }}
                    helperText={
                        error && error.type === 'required' && `Debe indicar ${label}`
                    }
                
                />

            )}
            
        />
    )
}
