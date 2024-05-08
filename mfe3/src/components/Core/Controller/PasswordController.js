import React from 'react'
import { Controller } from "react-hook-form";
import Password from '../Password/Password'
import { validatePassword } from 'utils/utils'

export default function PasswordController(props) {
    const { objForm, label } = props;
    const { errors, control } = objForm
    return (
        <Controller
            fullWidth
            render={({ field, fieldState: { error } }) => (
                <Password
                  {...field}
                  label={label}
                  variant='standard'
                  autoComplete="off"
                  fullWidth
                  error={error !== undefined}
                  helperText={
                    error && `Su clave no cumple con las especificaciones mínimas`
                  }
                />
              )}
            name="p_password"
            control={control}
            rules={{ validate: (value) => validatePassword(value) }}
            
        />
    )
}
