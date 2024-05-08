import React from 'react'
import { useForm } from "react-hook-form"
import { Dialog, DialogActions, DialogContent,DialogTitle } from "@mui/material";
import Button from "components/material-kit-pro-react/components/CustomButtons/Button";
import InputController from 'components/Core/Controller/InputController'
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js";
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js";
import { useDialog } from "context/DialogContext"


const CLASS_STYLES = {
  cleanButton:{
    padding: '0 0.8em'
  },
}

export default function ReasonDialog(props){
  
  const {openDialog, onSubmit,handleOpenDialog,onClose} = props;
  const { ...objForm } = useForm();
  const { control } = objForm
  const dialog = useDialog()


  const handleClose = () => {
    handleOpenDialog(false)
  }


  const handleSubmit = async () => {
    const data = objForm.getValues();
    if(!data.p_observation){
      dialog({
        variant: "info",
        title: "Alerta",
        description: "Debe registrar una observación",
      })
    }else{
      onSubmit && await onSubmit(objForm.getValues());
      handleClose();
    }
  }
  return(
    <>
    <Dialog open={openDialog} maxWidth="sm" fullWidth> 
      <DialogTitle>
        Motivo de pausa de trabajo
      </DialogTitle>
      <form autoComplete="off" style={{
        marginBottom: 0
      }}>
      <DialogContent>
        <GridContainer>
          <GridItem xs={12}>
            <InputController 
              control={control} 
              label="Observación" 
              name={'p_observation'} 
              multiline 
              fullWidth
              rows={3}
              variant="outlined"
            />
          </GridItem>
        </GridContainer>
        <DialogActions>
        <Button 
          color="primary" 
          simple 
          onClick={onClose}
          className={CLASS_STYLES.cleanButton}
        >
          Cancelar
        </Button>
        <Button 
          color="success" 
          simple 
          onClick={handleSubmit}
          className={CLASS_STYLES.cleanButton}
        >
          Registrar
        </Button>
        </DialogActions>
      </DialogContent>
      </form>
    </Dialog>
    </>
  )
}