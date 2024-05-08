import React from 'react'
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled } from "@mui/material/styles"
import Check from "@mui/icons-material/Check";

import styles from "components/material-dashboard-pro-react/components/customCheckboxRadioSwitch";
const NewDiv = styled("div")(({ theme, ownerState }) => {
    const { style, className } = ownerState
    return {
        ...styles[style],
        ...(className !== undefined && className)
    }
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

const NewCheckedIcon = styled(Check)(({ theme }) => {
    return {
        ...styles.checkedIcon,
    }
})

const NewUnCheckedIcon = styled(Check)(({ theme }) => {
    return {
        ...styles.uncheckedIcon,
    }
})

export default function CheckBox(props) {
    const { label, name, classLabel, ...rest } = props;
    

    return (
        <NewDiv ownerState={{
            style: "checkboxAndRadio"
          }}>
            <NewFormControlLabel
                label={label}
                key={name}
                ownerState={{
                    classLabel: classLabel
                    }}
                control={
                    <NewCheckbox
                        {...rest}
                        name={name}
                        checkedIcon={<NewCheckedIcon />}
                        icon={<NewUnCheckedIcon />}
                    />
                }
            />
        </NewDiv>
    )
}
