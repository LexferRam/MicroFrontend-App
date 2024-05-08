import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// import parse from 'date-fns/parse'

export default function DateController(props) {
  const {
    label,
    name,
    readonly,
    defaultValue = null,
    required = false,
    validate = false,
    control,
    fullWidth = true,
    customOnChange = null,
    ...rest
  } = props

  const dateFormat = 'dd/MM/yyyy'

  /*let initialDateValue =
    defaultValue && parse(defaultValue, dateFormat, new Date())
  if (initialDateValue == undefined) {
    initialDateValue = null
  }*/

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      rules={{
        required: required !== undefined ? required : readonly ? false : true,
        validate: validate !== undefined ? validate : readonly ? false : true,
      }}
      render={({ field, fieldState: {error} }) => (
        <DatePicker
          {...field}
          {...rest}
          label={label}
          inputFormat={dateFormat}
          views={['year', 'month', 'day']}
          readOnly={readonly}
          onChange={date => {
            console.log(date)
            customOnChange && customOnChange(date)
            field.onChange(date)
          }}
          renderInput={params => (
            <TextField
            variant='standard'
              fullWidth={fullWidth}
              {...params}
              error={error}
              helperText={
                (error &&
                  error.type === 'required' &&
                  `Debe indicar el ${label}`) ||
                (error &&
                  error.type === 'validate' &&
                  error.message)
              }
            />
          )}
        />
      )}
    />
  )
}

DateController.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  readonly: PropTypes.bool,
  rest: PropTypes.any,
  required: PropTypes.bool,
  validate: PropTypes.func,
}
