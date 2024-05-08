import React from 'react'
import {NumericFormat} from 'react-number-format';

export default function IdentificationFormatDisplay(props) {
    const {value, name, ...rest } = props
    return (
        <NumericFormat
            {...rest}
            id={name}
            value={value}
            fullWidth
            displayType={"text"}
            valueIsNumericString
            decimalSeparator={","}
            thousandSeparator={"."}
        />
    )
}
