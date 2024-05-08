import React from 'react'
import {NumericFormat} from 'react-number-format';
import TextField from '@mui/material/TextField';

export default function IdentificationFormat(props) {
    const { onChange, ...rest } = props
    
    return (
        <NumericFormat
            {...rest}
            customInput={TextField}
            decimalSeparator={","}
            thousandSeparator={"."}
            onValueChange={({ value }) => {
                onChange && onChange(value);
            }}
            inputProps={{
                maxLength: 15,
            }}
            format={props.format&&props.format}
            valueIsNumericString
        />
    )
}


