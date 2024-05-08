import React from 'react'
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import { Controller } from "react-hook-form";

export default function SelectSimpleController(props) {
    const { label, 
            name, 
            array = [], 
            readonly = false,  
            onChange, 
            errors, 
            control,
            required,
            disabled,
            fullWidth = true,
            defaultValue = '',
            sx = {},
             ...rest } = props;
    
    return (
        <Controller
            {...rest}
            name={name}
            control={control}
            rules={{ required: required !== undefined ? required : readonly ? false : true }}
            defaultValue={defaultValue}
            render={({ field, fieldState: { error } }) => (
                <TextField
                {...field}
                sx={sx}
                select
                disabled={disabled}
                fullWidth={fullWidth}
                label={label}
                error={error!==undefined}
                variant= 'standard'
                onChange={(e) => {
                    onChange && onChange(e.target.value);
                    field.onChange(e.target.value);
                }}
                InputProps={{
                    ...rest.InputProps,
                    readOnly: readonly ? readonly : false,
                  }}
                  helperText={
                    error && error.type === 'required' && `Debe indicar ${label}`
                  }
                >
                <MenuItem key={undefined} value=''>{label}</MenuItem>
                    {array && array.map(opc => {
                        const obj = Object.entries(opc)
                        return (
                            <MenuItem key={obj[0][1]} value={obj[0][1]}>
                                {obj[1][1]}
                            </MenuItem>
                        )
                    })}
            </TextField>
              )}
        >
            
        </Controller>
    )
}
