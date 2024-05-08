import React from 'react'
import AmountFormatInput from 'components/Core/NumberFormat/NumberFormatFree'
import { Controller } from "react-hook-form";

export default function AmountFormatController(props) {
    const { objForm, label, required, onChange:customOnChange, onBlur: customOnBlur, ...rest } = props;
    const { control } = objForm
    return (
        <Controller
            {...rest}
            name={props.name}
            control={control}
            rules={{ required: required}}
            as={AmountFormatInput}
            render={({ field, fieldState: { error }  }) => (
                <AmountFormatInput
                  {...field}
                  {...rest}
                  label={label}
                  variant= 'standard'
                  error={error !== undefined}
                  onChange={(value) => {
                    customOnChange && customOnChange(value);
                    field.onChange(value)
                  }}
                  onBlur={(value) => {
                    customOnBlur && customOnBlur(value)
                    field.onBlur(value)
                  }}
                helperText={error && error.type==='required' && `Debe indicar ${label}`}
                />
              )}
        />
    )
}

