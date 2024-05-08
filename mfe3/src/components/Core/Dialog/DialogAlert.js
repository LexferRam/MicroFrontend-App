import React from 'react'
import { styled } from "@mui/material/styles";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from "@mui/material/Slide";
import CustomButton from "components/material-kit-pro-react/components/CustomButton"
import Close from "@mui/icons-material/Close";

import styles from "./modalStyle";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const NewDialog = styled(Dialog)(({ theme}) => ({
  ...styles.center,
  ...styles.modalRoot,
}));

const NewDialogTitle = styled(DialogTitle)(({ theme}) => ({
  ...styles.modalHeader,
}));

const NewClose = styled(Close)(({ theme}) => ({
  ...styles.modalClose,
}));

const NewH4 = styled("h4")(({ theme}) => ({
  ...styles.modalTitle,
}));

const NewDialogContent = styled(DialogContent)(({ theme}) => ({
  ...styles.modalBody,
}));

const NewDialogActions = styled(DialogActions)(({ theme}) => ({
  ...styles.modalFooter,
}));

export default function DialogAlert(props) {
    const { open, closeModal, errorMesagge, errorTitle } = props
    return (
        <NewDialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={closeModal}
            aria-labelledby="classic-modal-slide-title"
            aria-describedby="classic-modal-slide-description"
        >
        <NewDialogTitle
            id="classic-modal-slide-title"
            disableTypography
        >
          <CustomButton
            justIcon
            className={styles.modalCloseButton}
            key="close"
            aria-label="Close"
            color="transparent"
            onClick={closeModal}
          >
            <NewClose className={styles.modalClose} />
          </CustomButton>
          <NewH4>{errorTitle}</NewH4>
        </NewDialogTitle>
        <NewDialogContent
          id="classic-modal-slide-description"
        >
          <p>
            {errorMesagge}
          </p>
        </NewDialogContent>
        <NewDialogActions>
          <CustomButton
            onClick={closeModal}
            color="danger"
            simple
          >
            Cerrar
          </CustomButton>
        </NewDialogActions>
      </NewDialog>
    )
}
