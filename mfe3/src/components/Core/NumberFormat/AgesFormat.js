import React from 'react'
import {PatternFormat} from 'react-number-format';
import TextField from '@mui/material/TextField';

const AgesFormat = (props) => {
    const { onChange, value, ...rest } = props
    
    return (
        <PatternFormat
            {...rest}
            value={value}
            customInput={TextField}
            fullWidth
            format="##-##-##-##-##-##-##-##-##" 
            mask="_"
            type='text'
            onValueChange={target => {
                onChange && onChange(target.formattedValue);
            }}
        />
    )
}

export default  AgesFormat

