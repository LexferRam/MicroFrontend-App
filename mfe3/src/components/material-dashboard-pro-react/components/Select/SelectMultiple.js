import React,{useState, useEffect} from 'react'
import { styled } from "@mui/material/styles"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styles from "./customSelectStyle";

const NewFormControl = styled(FormControl)(({ theme }) => {
    return { ...styles.selectFormControl }
  })

  const NewInputLabel = styled(InputLabel)(({ theme }) => {
    return { ...styles.selectLabel }
  })

  const NewMenuItem = styled(MenuItem)(({ theme}) => {
    return { 
        ...styles.selectMenuItem
     }
  })


export default function SelectMultiple(props) {
    const { name, label, arrayValues, idvalue, descrip, onChange, arraySelected } = props    
    const clsSelectFormControl  = {...styles.selectFormControl}
    const clsSelectLabel  = {...styles.selectLabel}
    const [multipleSelect, setMultipleSelect] = useState([]);

    const handleMultiple = (event) => {
        setMultipleSelect(event.target.value);
        onChange && onChange(event.target.value)
    };

    useEffect(()=>{
        arraySelected && setMultipleSelect(arraySelected)
    },[arraySelected])

    return (
        <NewFormControl fullWidth variant="standard" >
            <NewInputLabel htmlFor={`id_${name}`} >{label}</NewInputLabel>
            <Select
                multiple
                value={multipleSelect}
                onChange={handleMultiple}
                MenuProps={{ className: styles.selectMenu }}
                classes={{ select: styles.select }}
                inputProps={{
                    name: name,
                    id: `id_${name}`
                }}
            >
                <NewMenuItem disabled > {label}</NewMenuItem>
                {arrayValues.map((reg,index) =>(
                    <NewMenuItem
                        key={index}
                        classes={{ selected: styles.selectMenuItemSelectedMultiple }}
                        value={reg[idvalue]}
                    >
                        {reg[descrip]}
                    </NewMenuItem>
                ))}
            </Select>
        </NewFormControl>
    )
}
