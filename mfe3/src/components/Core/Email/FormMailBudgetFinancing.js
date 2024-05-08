import React from "react"
import { useForm } from "react-hook-form"
import Axios from "axios"
import { styled } from '@mui/material/styles';
import Icon from "@mui/material/Icon"
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import EmailController from "components/Core/Controller/EmailController"
import InputController from 'components/Core/Controller/InputController'
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import { useDialog } from 'context/DialogContext'

const useStylesFunc =(theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: "50%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
})

const NewModal = styled(Modal)(({ theme}) => {
  const stylesGet = useStylesFunc(theme)
  return {
    ...stylesGet.modal
  }
})

const NewBackdrop = styled(Backdrop)(({ theme}) => {
  return {
    zIndex:-1
  }
})

const DivPaper = styled("div")(({ theme }) => {
  const stylesGet = useStylesFunc(theme)
  return {
      ...stylesGet.paper,
  }
})

export default function FormMailBudgetFinancing(props) {
  const { handleClose,openModal, financingDetail } = props
  
  return (
    <>
      <NewModal open={openModal} onClose={handleClose} closeAfterTransition
          BackdropComponent={NewBackdrop}
        BackdropProps={{ timeout: 500 }}>
        <Fade in={openModal}>
          <DivPaper>
          <Form financingDetail={financingDetail} handleClose={handleClose}/>
          </DivPaper>
        </Fade>
      </NewModal>
    </>
  )
}


function Form(props) {
  const { handleSubmit, control,  ...objForm } = useForm()
  const { handleClose, financingDetail } = props
  const dialog = useDialog()

  const onSubmit = async (data) => {
    const params = {
      ...data,
      p_financing_number: financingDetail.NUMFINANC,
      p_financing_code:  financingDetail.CODFINANC
    }
    const result = await Axios.post('/dbo/financing/send_mail_financing_budget',params);
    dialog({
      variant: "info",
      catchOnCancel: false,
      title: "Alerta",
      description: result.data.result
    })
    objForm.reset({});
    handleClose && handleClose();
  }

  return (<form onSubmit={handleSubmit(onSubmit)}>
    <InputController control={control} label="Dirigido a (Nombre)" name="p_name" fullWidth/>
    <EmailController control={control} label="Correo del destinatario" name="p_to"/>
    <EmailController control={control} label="Copia" name="p_cc" required={false}/>
    <Button color="primary" type="submit" fullWidth><Icon>send</Icon> Enviar correo</Button>
  </form>)

}