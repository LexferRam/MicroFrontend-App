import React, { Fragment } from "react"
import { styled } from "@mui/material/styles"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material"

const styles = {
    container: {
      minWidth: '32em',
      padding:'1em',
      textAlign:'center'
    }
  }
  
  const NewDiv = styled("div")(({ theme }) => ({
    ...styles.container,
  }))

export default function FewWordsDialog(props) {
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
              <NewDiv>{description}</NewDiv>
          </DialogContent>
          <DialogActions>
              {variant === "danger" && (
                  <Fragment>
                      <Button color={variant} onClick={onSubmit}>
                          {isAffirmative ? "SI" : "Aceptar"}
                      </Button>
                      <Button color={variant} onClick={onClose}>
                          {isAffirmative ? "NO" : "Cancelar"}
                      </Button>
                  </Fragment>
              )}

              {variant === "info" && (
                  <Button color={variant} onClick={onSubmit}>
                      Aceptar
                  </Button>
              )}
          </DialogActions>
      </Dialog>
  )
}
