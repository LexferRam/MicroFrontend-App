import React from "react"
import { styled } from "@mui/material/styles"
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import { Fade } from "@mui/material"

const useStylesFunc = (theme) => ({
  modal: {
    marginTop: "70px !important",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
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

export default function ModalSimple({ children, open = false, handleClose }) {
  return (
    <NewModal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={NewBackdrop}
      BackdropProps={{ timeout: 500 }}
    >
      <Fade in={true}>
        <DivPaper>{children}</DivPaper>
      </Fade>
    </NewModal>
  )
}
