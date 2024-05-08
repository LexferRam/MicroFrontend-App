import React from "react"
import { useForm } from "react-hook-form"
import { styled } from '@mui/material/styles';
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import EmailController from "components/Core/Controller/EmailController"
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import Axios from "axios"
import { useDialog } from "context/DialogContext"
import { Fade, Icon } from "@mui/material"

const useStylesFunc = (theme) => ({
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

const NewModal = styled(Modal)(({ theme }) => {
  const stylesGet = useStylesFunc(theme)
  return {
    ...stylesGet.modal,
  }
})

const NewBackdrop = styled(Backdrop)(({ theme }) => {
  return {
    zIndex: -1,
  }
})

const DivPaper = styled("div")(({ theme }) => {
  const stylesGet = useStylesFunc(theme)
  return {
    ...stylesGet.paper,
  }
})

export default function FormMail(props) {
  const { urlApi, apiParams, isModal, handleClose } = props

  return (
    <>
      {isModal ? (
        <NewModal
          open={true}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={NewBackdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={true}>
            <DivPaper>
              <Form
                urlApi={urlApi}
                apiParams={apiParams}
                handleClose={handleClose}
              />
            </DivPaper>
          </Fade>
        </NewModal>
      ) : (
        <Form urlApi={urlApi} apiParams={apiParams} />
      )}
    </>
  )
}

function Form(props) {
  const { handleSubmit, control, ...objForm } = useForm()
  const { urlApi, apiParams, handleClose } = props
  const dialog = useDialog()

  const onSubmit = async (data) => {
    const params = {
      ...apiParams,
      ...data,
    }
    const result = await Axios.post(urlApi, params)
    dialog({
      variant: "info",
      catchOnCancel: false,
      title: "Alerta",
      description: "Su correo fue enviado exitosamente",
    })
    objForm.reset({})
    handleClose && handleClose()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <EmailController control={control} label="Destinatario" name="p_to" />
      <EmailController
        control={control}
        label="Copia"
        name="p_cc"
        required={false}
      />
      <EmailController
        control={control}
        label="Copia oculta"
        name="p_co"
        required={false}
      />
      <Button color="primary" type="submit" fullWidth>
        <Icon>send</Icon> Enviar correo
      </Button>
    </form>
  )
}
