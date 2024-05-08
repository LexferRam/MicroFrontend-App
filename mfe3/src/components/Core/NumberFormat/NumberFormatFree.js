import React from 'react'
import { NumericFormat } from 'react-number-format';
import TextField from '@mui/material/TextField';

export default function NumberFormatFree(props) {
    const { onChange, value, ...rest } = props
    
    return (
        <NumericFormat
            {...rest}
            value={value}
            customInput={TextField}
            fullWidth
            onValueChange={target => {
                onChange(target.value);
            }}
        />
    )
}

