import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Autocomplete, TextField} from '@mui/material';
import { Controller } from "react-hook-form"
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function UserWorkflowController(props) {
  const { objForm, name, label, onChange, array, required, userId, ...rest } = props
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(null)
  const [value, setValue] = useState('')
  const {  control } = objForm

  const asyncFunction =async function get_brokers_list(p_query) {
    const params = {
      p_descript: p_query,
    }
    const response = await Axios.post("/dbo/workflow/get_users_workflow", params)
    setOptions(response.data.p_users)
  }

  const searchAPIDebounced = AwesomeDebouncePromise(asyncFunction, 380);

  useEffect(() => {
    searchAPIDebounced('',null) //Se llama una primera vez antes de utilizarlo para cargar la data
  },[])


  return (
    <Controller
      label="Usuario"
      control={control}
      name={name}
      rules={{ required: required != null ? required :true }}
      setOptions={setOptions}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id={`id_${name}`}
          fullWidth
          options={options ?? []}
          inputValue={inputValue}
          value={value}
          loadingText="Cargando..."
          noOptionsText="Escriba para seleccionar el usuario"
          isOptionEqualToValue={(option, value) => option.VALUE === value.VALUE}
          getOptionLabel={(option) => option.NAME ?? ''}
          onChange={(event, value) => {
            let value2register = ''

            if(value && value.VALUE){
              value2register = value.VALUE
            }
            field.onChange(value2register)
            onChange && onChange(value)
          }}
          onInputChange={(event,value) => {
            setInputValue(value)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              error={error !== undefined}
              variant="standard"
              
              helperText={
                error && error.type === 'required' && `Debe indicar el usuario`
              }
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      )}
    />)
}
