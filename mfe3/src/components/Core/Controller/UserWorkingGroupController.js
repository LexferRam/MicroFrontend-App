import React, { useEffect, useState } from "react"
import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { Controller } from "react-hook-form"
import Axios from "axios"
import AwesomeDebouncePromise from 'awesome-debounce-promise';

export default function UserWorkingGroupController(props) {
  const { objForm, name, label, onChange, array, required, groupId, ...rest } = props
  const [options, setOptions] = useState([])
  const [inputValue, setInputValue] = useState(null)
  const { errors, control } = objForm

  const asyncFunction = async function get_candidates_list(p_query) {
    const params = {
      p_descript: p_query
    }
    try {
      const response = await Axios.post("/dbo/portal_admon/get_candidate_users_wrk_grp", params)
      setOptions(response.data.cur_candidate_users)
    } catch (error) {
      console.log(error)
    }
  }

  const searchAPIDebounced = AwesomeDebouncePromise(asyncFunction, 380);


  useEffect(() => {
    searchAPIDebounced('',null) 
  },[])


  return (
    <Controller
      label="Usuario"
      control={control}
      name={name}
      setOptions={setOptions}
      options={options}
      inputValue={inputValue}
      rules={{ required: required != null ? required :true }}
      render={({ field, fieldState: { error } }) => (
        <Autocomplete
          id={`id_${name}`}
          options={options ?? []}
          loadingText="Cargando..."
          noOptionsText="Escriba para seleccionar el usuario"
          isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
          getOptionLabel={(option) => option.NAME}
          onChange={(event,value) => {
            setInputValue(value.VALUE)
            field.onChange(value.VALUE)
            onChange && onChange(value ? value.VALUE : null)
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label={label}
              fullWidth
              variant="standard"
              onChange={(e) => {
                if (e !== null) {
                  if (e.target.value !== undefined) {
                    if (e.target.value.length > 2){
                      searchAPIDebounced(e.target.value, null)
                    } else {setOptions([])}
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