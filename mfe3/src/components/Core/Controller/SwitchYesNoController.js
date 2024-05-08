import React from 'react'
import { Controller } from "react-hook-form";
import { FormControlLabel, Switch, Grid} from '@mui/material';

export default function SwitchYesNoController(props) {
    const { control, label, name, onChange, color, ...rest } = props;
  
    return (
        <Grid component="label" container alignItems="center" spacing={1}>
        <Grid item>No</Grid>
            <Grid item>
                <FormControlLabel
                    key={name}
                    label="Si"
                    control={
                        <Controller
                           {...rest}
                            control={control}
                            name={name}
                            defaultValue='N'
                            render={({ field, fieldState: { error } }) => (
                                <Switch
                                  {...field}
                                  {...rest}
                                  color={color || "primary"}
                                  onChange={(event) => {
                                    field.onChange(event.target.checked ? 'S' :'N')
                                    onChange && onChange(event.target.checked)
                                }}
                                />
                              )}
                        />
                    }
                    
                />
            </Grid>
            
        </Grid>
    )
}
