import PhoneMobileFormat from 'components/Core/NumberFormat/PhoneMobileFormat';
import React from 'react';
import { Controller } from "react-hook-form";

export default function PhoneController(props) {
    const { errors, control, register, name, label,onChange, onBlur, readonly, defaultValue, ...rest } = props;
    return (
        <Controller
            {...rest}
            name={name}
            control={control}
            rules={{ required: true, minLength: 11 }}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <PhoneMobileFormat
                    {...field}
                    {...rest}
                    control={control}
                    label={label}
                    variant='standard'
                    fullWidth
                    error={error !== undefined}
                    onChange={(value) => {
                        onChange && onChange(value)
                        field.onChange(value)
                    }}
                    onBlur={(e) => {
                        onBlur && onBlur(e.target.value)
                        field.onBlur(e.target.value)
                    }}
                    InputProps={{
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
