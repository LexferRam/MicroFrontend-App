import React, { useEffect, useState } from "react"
import { Autocomplete, TextField} from '@mui/material';
import { Controller } from "react-hook-form"
import Axios from "axios"
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function ProvidersController(props) {
  const { control, name, label, onChange, array, required, codContracting, ...rest } = props
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(null)

  const asyncFunction =async function get_health_providers(p_query, p_provider_code) {
    const params = {
      p_description: p_query,
      p_provider_code: p_provider_code,
    }
    const response = await Axios.post("/dbo/workflow/get_health_providers_list", params)
    setOptions(response.data.p_cur_data)
    if(p_provider_code!==null)
      setInputValue(response.data.p_cur_data[0])
  }

  const searchAPIDebounced = AwesomeDebouncePromise(asyncFunction, 380);

  useEffect(() => {
    if (codContracting){
      asyncFunction(null, codContracting.toString())
    }
  }, [])

  return (
    <Controller
      label="Proveedor"
      control={control}
      name={name}
      rules={{ required: required !== null ? required : true }}
      defaultValue={codContracting}
      setOptions={setOptions}
      inputValue={inputValue}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id={`id_${name}`}
          fullWidth
          options={options ?? []}
          defaultValue={codContracting}
          loadingText="Cargando..."
          noOptionsText="Escriba para seleccionar el proveedor"
          isOptionEqualToValue={(option, value) => option.DESCRIPTION === value.DESCRIPTION}
          getOptionLabel={(option) => option.DESCRIPTION}
          onChange={(event, value) => {
            setInputValue(value.DESCRIPTION)
            field.onChange(value.CODE)
            onChange && onChange(value ? value.CODE : null)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              error={error !== undefined}
              variant="standard"
              onChange={(e) => {
                if (e !== null) {
                  if (e.target.value !== undefined) {
                    if (e.target.value.length > 2) {
                      console.log(e.target.value)
                      searchAPIDebounced(e.target.value, null)
                    } else { setOptions([]) }
                  }
                }
              }}
              helperText={
                error && error.type === 'required' && `Debe indicar el proveedor`
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
