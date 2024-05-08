import React from 'react'
import {NumericFormat} from 'react-number-format';

export default function AmountFormat(props) {
    const { onChange, value, ...rest } = props
    return (
        <NumericFormat
            {...rest}
            id={rest.name}
            value={value}
            thousandSeparator={"."}
            decimalSeparator={","}
            decimalScale={2}
            fixedDecimalScale
            displayType={"text"}
            valueIsNumericString
        />
    )
}

