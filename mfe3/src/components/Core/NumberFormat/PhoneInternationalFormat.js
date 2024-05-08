import React,{useEffect} from 'react'
import {PatternFormat} from 'react-number-format';
import TextField from '@mui/material/TextField';

export default function PhoneInternationalFormat(props) {
    const { onChange, value, ...rest } = props
    const [val, setVal] = React.useState();

    useEffect(() => {
        setVal(value)
    }, [])

    return (
        <PatternFormat
            {...rest}
            value={val}
            customInput={TextField}
            fullWidth
            format="+############" 
            mask="_"    
            type='tel' 
            onValueChange={(values, sourceInfo) => {
                onChange && onChange(values, sourceInfo)
                setVal(values.value)
            }}
            valueIsNumericString
        />
    )
}

  