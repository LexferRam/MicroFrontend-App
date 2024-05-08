import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { PatternFormat } from 'react-number-format';

export default function PhoneMobileFormat(props) {
    const [val, setVal] = useState(null)
    const { onChange, value, ...rest } = props
    useEffect(() => {
        setVal(value)
    }, [value])
    return (
        <PatternFormat
            {...rest}
            value={val}
            customInput={TextField}
            fullWidth
            format="(####) ###-####" 
            mask="_"    
            type='tel' 
            onValueChange={(values, sourceInfo) => {
                onChange && onChange(values.value)
                setVal(values.value)
            }}
            valueIsNumericString
        />
    )
}

  