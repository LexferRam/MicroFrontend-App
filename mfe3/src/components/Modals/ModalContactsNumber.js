import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}))

export default function CustomizedDialogs(props) {
  const { modalPhoneContacts, setModalPhoneContacts } = props
  const company = process.env.GATSBY_INSURANCE_COMPANY

  const handleClose = () => {
    setModalPhoneContacts(false)
  }

  const numbersContactsPiramide = [
    {
        id: 1,
        number: "0800(SPIRAMI)-7747264"
    },
    {
        id: 2,
        number: "0212-2190400"
    },
    {
        id: 3,
        number: "0212-2193698"
    },
    {
        id: 4,
        number: "0212-3194940"
    }
  ]

  const numbersContactsOceanica = [
    {
        id: 1,
        number: "0800(OCEANIC)-6232642"
    },
    {
        id: 2,
        number: "0212-3003800"
    },
    {
        id: 3,
        number: "0212-2193699"
    },
    {
        id: 4,
        number: "0212-3194930"
    }
  ]

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={modalPhoneContacts}
      >
        <DialogTitle sx={{ m: 0, p: 2, fontWeight: '800' }} id="customized-dialog-title">
          Contactanos
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent
           sx={{ lineHeight: "2rem"}}
          dividers
        >
            {
              company !== 'OCEANICA' ?  numbersContactsPiramide.map((item,index)=>(
                    <div style={{display: "grid", gridTemplateColumns: "50px 1fr"}} key={index}>
                    <LocalPhoneIcon style={{fill: "red"}}/>
                    <p>{item.number}</p>
                    </div>
                )) : numbersContactsOceanica.map((item,index)=>(
                    <div style={{display: "grid", gridTemplateColumns: "50px 1fr"}} key={index}>
                    <LocalPhoneIcon style={{fill: "#47c0b6"}}/>
                    <p>{item.number}</p>
                    </div>
                ))
            }
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  )
}
