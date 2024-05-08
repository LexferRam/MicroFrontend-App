import React from 'react'
import { Controller } from "react-hook-form";
import IdentificationFormat from '../NumberFormat/IdentificationFormat'

export default function IdentificationController(props) {
    const { errors, control, index, label, onChange: customOnChange, onBlur: customOnBlur, required, otherRules, ...rest } = props;
    const rules = {
        required: required !== undefined ? required : true,
        ...(otherRules !== undefined && otherRules)
    }
    return (
        <Controller
            name={`p_identification_number_${index}`}
            {...rest}
            control={control}
            rules={rules}
            render={({ field: { onChange, onBlur, ...restOfField }, fieldState: {error} }) => (
                <IdentificationFormat
                  {...restOfField}
                  {...rest}
                  label={label}
                  variant='standard'
                  error={error!==undefined}
                  helperText={error && 'Debe introducir la Identificación'}
                onBlur={([value]) => {
                    onBlur && onBlur(value)
                    customOnBlur && customOnBlur(value)
                }}
                onChange={(value) => {
                    onChange && onChange(value)
                    customOnChange && customOnChange(value)
                    return value
                }}
                  fullWidth
                  />
            )}
           
        />
    )
}
