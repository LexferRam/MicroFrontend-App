import React, { Fragment } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material"

export default function AlertDialog(props) {
  const {
    open,
    title,
    variant,
    description,
    onSubmit,
    onClose,
    isAffirmative,
  } = props

  return (
    <Dialog open={open}>
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {variant === "danger" && (
          <Fragment>
            <Button color="primary" onClick={onSubmit}>
              {isAffirmative ? "SI" : "Aceptar"}
            </Button>
            <Button color="primary" onClick={onClose}>
              {isAffirmative ? "NO" : "Cancelar"}
            </Button>
          </Fragment>
        )}

        {variant === "info" && (
          <Button color="primary" onClick={onSubmit}>
            Aceptar
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}
