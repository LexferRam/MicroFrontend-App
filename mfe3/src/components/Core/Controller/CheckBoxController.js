import React from 'react'
import { styled} from '@mui/system';
import { Controller } from "react-hook-form";
import { FormControlLabel, Checkbox } from '@mui/material';
import Check from "@mui/icons-material/Check";
import styles from "components/material-dashboard-pro-react/components/customCheckboxRadioSwitch";

const NewDiv = styled("div")(({ theme }) => {
    return {...styles.checkboxAndRadio}
  })

  const NewCheck = styled(Check)(({ theme, ownerState }) => {
    const {styleCheck} = ownerState
    return {...styles[styleCheck]}
  })

  const NewFormControlLabel = styled(FormControlLabel)(({ theme, ownerState}) => {
    const {classLabel} = ownerState
    return {
        ...styles.labelRoot,
        "& .MuiFormControlLabel-label":{
            ...( classLabel === undefined && styles.label ),
            ...( classLabel !== undefined && styles[classLabel])
        }
    }
  })

  const NewCheckbox = styled(Checkbox)(({ theme }) => {
    return {
        ...styles.checkRoot,
        "& .Mui-checked":{
            ... styles.checked ,
        }
    }
  })

export default function CheckBoxController(props) {
    
    const { control, errors, label, name, onChange: customChange, classLabel,  ...rest } = props;
    
    return (
        <NewDiv>
            <NewFormControlLabel
                key={name}
                label={label}
                ownerState={{
                    classLabel: classLabel
                    }}
                control={
                    <Controller
                        control={control}
                        name={name}
                        defaultValue='N'
                        render={({ field, fieldState: { error } }) => (
                            <NewCheckbox
                                {...field}
                                {...rest}   
                                checkedIcon={<NewCheck ownerState={{
                                                        styleCheck: "checkedIcon"
                                                        }}  />}
                                icon={<NewCheck ownerState={{
                                    styleCheck: "uncheckedIcon"
                                    }}  />  }
                                onChange={(event) => {
                                    customChange && customChange(event.target.checked)
                                    field.onChange(event.target.checked ? 'S' :'N')
                                }}
                            />
                        )}
                    />
                }
            />
        </NewDiv>
    )
}
