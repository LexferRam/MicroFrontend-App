import React, { useEffect, useState } from "react"
import { Autocomplete, TextField} from '@mui/material';
import { Controller } from "react-hook-form"
import Axios from "axios"
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function LeaderGroupController(props) {
  const { objForm, name, label, onChange, array, required, groupId, ...rest } = props
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(null)
  const { errors, control } = objForm

  const asyncFunction = async function get_brokers_list(p_query) {
    const params = {
      p_descript: p_query,
      p_group_id: groupId,
    }
    const response = await Axios.post("/dbo/workflow/get_availables_leaders", params)
    setOptions(response.data.p_users)
  }

  const searchAPIDebounced = AwesomeDebouncePromise(asyncFunction, 380);


  useEffect(() => {
    searchAPIDebounced('',null) //Se llama una primera vez antes de utilizarlo para cargar la data
  },[])


  return (
    <Controller
      label="Usuario"
      setOptions={setOptions}
      options={options}
      inputValue={inputValue}
      name={name}
      control={control}
      rules={{ required: required != null ? required :true }}

      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id={`id_${name}`}
          fullWidth
          options={options ?? []}
          loadingText="Cargando..."
          noOptionsText="Escriba para seleccionar el usuario"
          getOptionSelected={(option, value) => option.NAME === value.NAME}
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
              onChange={(e) => {
                setInputValue(e.target.value)
                field.onChange(e.target.value)
                onChange && onChange(e.target.value ? e.target.value : null)
                if (e !== null) {
                  if (e.target.value !== undefined) {
                    if (e.target.value.length > 2){
                      searchAPIDebounced(e.target.value, null)
                    } 
                  }
                }
              }}
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

