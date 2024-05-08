import React from 'react'
import { Controller } from "react-hook-form";
import SelectMultipleChip from 'components/Core/SelectMultiple/SelectMultipleChip';

export default function SelectSimpleController(props) {
    const { objForm, label, onChange, array, required, value, setInputValue, ...rest} = props; 
    const { control } = objForm
    return (
        <Controller            
            name={props.name}
            control={control}
            rules={{ required: required !== undefined ? required : true }}
            render={({ field, fieldState: { error } }) => (
                <SelectMultipleChip
                    {...rest}
                    label={label}
                    arrayValues={props.arrayValues}
                    fullWidth
                    id="s_destiny"
                    idvalue={props.idvalue}
                    descrip={props.descrip}
                    value={value}
                    setInputValue={setInputValue}
                    onChange={(a) => {
                        field.onChange(a.target.value)
                        onChange && onChange(a.target.value)
                    }}
                />
            )}
            
            
        >
        </Controller>
    )
}
