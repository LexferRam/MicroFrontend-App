import React, { useState } from "react"
import { Autocomplete, TextField} from '@mui/material';

export default function AutoCompleteWithData(props) {
  const { name, 
          label, 
          error, 
          helperText, 
          inputValue = null, 
          value = null,  
          fieldCtrlOnChange, 
          onChange: customOnChange,
          options,
          noOptionsText,
          multiple,
          fullWidth } = props
  const [open, setOpen] = useState(false)
  const [valueInt, setValueInt] = useState(null);
  const [inputValueInt, setInputValueInt] = useState('');
  const loading = open && options.length === 0
  return (
    <Autocomplete
      id={`id_${name}`}  
      fullWidth={fullWidth}
      multiple={multiple}
      options={options ?? []}
      open={open}
      onOpen={() => { setOpen(true) }}
      onClose={() => { setOpen(false) }}
      
      isOptionEqualToValue={(option, value) => option.NAME === value.NAME}
      getOptionLabel={(option) => option.NAME}
      loadingText="Cargando"
      noOptionsText={noOptionsText}
      value={value !== null ?value:valueInt}
      onChange={(event, newValue) => {
        setValueInt(newValue)
        fieldCtrlOnChange && fieldCtrlOnChange(event)
        customOnChange &&  customOnChange([event,newValue])
      }}
      inputValue={inputValue !== null ?inputValue:inputValueInt}
      onInputChange={(event, newInputValue) => {
        setInputValueInt(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          fullWidth
          helperText={error && helperText}
          error={error !== undefined}
          variant="standard"
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
  )

}