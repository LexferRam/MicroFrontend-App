import React from 'react'
import { Controller } from "react-hook-form";
import Password from '../Password/Password'

export default function PasswordConfirmController(props) {
    const { objForm, label } = props;
    const { errors, control, watch} = objForm
    return (
        <Controller 
            render={({ field, fieldState: { error } }) => (
                <Password
                  {...field}
                  label={label}
                  variant='standard'
                  autoComplete="off"
                  fullWidth
                  confirm
                  error={error !== undefined}
                  helperText={
                    (error && error.type === 'required' && "Debe indicar su confirmacion de clave") ||
                    (error && error.type === "validate" && "Las claves no coinciden")
                  }
                />
              )}
            name="p_password_confirm"
            control={control} 
            rules={{ required: true, validate: (value) => value === watch('p_password') }}
            /*onChange={([value]) => {
                return value
            }}*/
        />
    )
}
