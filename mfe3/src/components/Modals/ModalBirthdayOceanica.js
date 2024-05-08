import React, { useState, useEffect } from "react"

//Mui components
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
// import Button from "@material-ui/core/Button";
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"

import "../Modals/styles/ModalBirthdayOceanica.css"
import Firework from "./image/fireworks.gif"
import Confetti from "./image/confetti.gif"

const dialogStyles = theme => ({
  root: {
    padding: theme.spacing(2),
  },
})

const NewDialogContent = styled(DialogContent)(({ theme }) => {
  const styles = dialogStyles(theme)
  return { ...styles.root }
})
export default function Popups(props) {
  //   const [openModalBirthday, setOpenModalBirthday] = useState(false);
  // const [close, setClose] = useState(false)
  const { openModalBirthday, setOpenModalBirthday } = props
  const [timeout, setTime] = useState(20)
  //   const handleClickOpen = () => {
  //     setOpenModalBirthday(true);
  //   };
  const name = JSON.parse(sessionStorage.getItem('PROFILE')).FIRST_NAME
  const surname = JSON.parse(sessionStorage.getItem('PROFILE')).LAST_NAME
  const handleClose = () => {
    setOpenModalBirthday(false)
  }
  
  useEffect(() => {
    if (openModalBirthday) {
      let time = timeout - 1
      if (time >= 0) {
        setTimeout(() => {
          setTime(time)
        }, 1000)
      } else {
        handleClose()
      }
    } else  {
      setTime(20)
    }
  }, [openModalBirthday, timeout])
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={openModalBirthday}
      >
          <>
            <NewDialogContent className="card_modal">
              <div className="container-mail">
              <div className="buttom_close">
                  <CloseIcon className="icon_close" onClick={handleClose} />
                </div>
                <img src="https://emergencia24horas.oceanicadeseguros.com/node/Imagen/cumpleOceaMin.jpg" className="image_birthday"/>
                <img src={Firework} className="image_fireworks"/>
                <img src={Confetti} className="image_confetti" />
                <div className="count">
                  <h4>{timeout}</h4>
                </div>
                <div className="container_text_oceanica">
                  <h2>{`${(name === "NULL" || name === "null") ? "" :name  }  ${(surname === "NULL" || surname === "null" ) ? "": surname}`}</h2>
                </div>
              </div>
            </NewDialogContent>
          </>
      </Dialog>
    </div>
  )

}
