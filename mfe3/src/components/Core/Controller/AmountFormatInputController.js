import React from 'react'
import AmountFormatInput from 'components/Core/NumberFormat/AmountFormatInput'
import { Controller } from "react-hook-form";

export default function AmountFormatInputController(props) {
    const { errors, control, onChange, onBlur, label, readonly,  ...rest } = props;
    
    return (
        <Controller
            {...rest}
            label={label}
            control={control}
            name={props.name}
            rules={{ required: props.required !== undefined ? props.required : readonly ? false : true }}
            render={({ field, fieldState: { error }  }) => (
                <AmountFormatInput
                  {...field}
                  {...rest}
                  label={label}
                  variant= 'standard'
                  error={error !== undefined}
                  onChange={(value) => {
                    onChange && onChange(value);
                    field.onChange(value)
                  }}
                  onBlur={(value) => {
                    onBlur && onBlur(value)
                    field.onBlur(value)
                  }}
                helperText={error && error.type==='required' && `Debe indicar ${label}`}
                />
              )}
              InputProps={{
                ...props.InputProps,
                readOnly: readonly ? readonly : false
            }}
        />
    )
}
