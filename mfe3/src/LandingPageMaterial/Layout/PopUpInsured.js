import React, { useState, useEffect } from "react"
import Cancel from "@mui/icons-material/Cancel"
import { styled } from "@mui/material/styles"
import popUpStyle from "./PopupStyle"
import img from "../../../static/OS_POPUP_FIRMA_ELECTRONICA.jpg"
import imgEspecialAtencion from "../../../static/especial_atencion.jpg"
const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...popUpStyle[style] }
})

const NewCancel = styled(Cancel)(({ theme }) => {
  return { ...popUpStyle.btnClose }
})

const NewImg = styled("img")(({ theme }) => {
  return { ...popUpStyle.modalImg }
})

const NewP = styled("p")(({ theme }) => {
  return { ...popUpStyle.titleModal }
})

const NewButton = styled("button")(({ theme }) => {
  return { ...popUpStyle.btn }
})

const NewA = styled("a")(({ theme }) => {
  return { ...popUpStyle.btnLabel }
})

const NewH4 = styled("a")(({ theme }) => {
  return { ...popUpStyle.time }
})

const PopUpInsured = (company) => {

  const [close, setClose] = useState(false)
  const [timeout, setTime] = useState(20)
  const [load, setLoad] = useState(false)

  const handleClose = () => {
    setClose(true)
   /// window.sessionStorage.setItem("modal", "true")
  }

  useEffect(() => {
   // const status = window.sessionStorage.getItem("modal")
   // console.log(4, close, status)
    ///setClose(status ? true : false)
    setTimeout(() => {
      setLoad(false)
    }, 3000)
  }, [])

 useEffect(() => {
    if (!load) {
      let time = timeout - 1
      if (time >= 0) {
        setTimeout(() => {
          setTime(time)
        }, 1000)
      } else {
        handleClose()
      }
    }
  }, [close, load, timeout])
  return (
    <>
      {!close && (
        <NewDiv
          ownerState={{
            style: company === 'OCEANICA' ? "modalBody" : "modalBodyPiramide",
          }}
        >
          {!load && (
            <NewDiv
              ownerState={{
                style: "modalBody",
              }}
            >
              <NewCancel  onClick={handleClose} />
              {/* <a href='https://venemergencia.com' target={'_blank'}><img className={classes.modalImg} alt='Venemergencia' src={process.env.GATSBY_INSURANCE_COMPANY === 'OCEANICA'?`Lineamientos-buzones-oceanica.jpg`:`Lineamientos-buzones-piramide.jpg`} /></a> */}
              <NewImg
                alt="firma"
                src={
                  company.company === "OCEANICA"
                  ? img
                  : imgEspecialAtencion
                }
                ownerState={{
                  style: company === 'OCEANICA' ? "modalImg" : "modalImgPiramide",
                }}
              />
              <div style={{ width: "100%", marginTop:"-40px",marginLeft:"5px" }}>
                {/*<NewP> Ver paso a paso</NewP>*/}
                <NewDiv
                  ownerState={{
                    style: "containerbtn",
                  }}
                >
                  <>
                    {/* <NewButton
                      sx={{
                        background:
                          company.company === "OCEANICA"
                            ? "#47C0B6"
                            : "#FC2D22",
                        marginLeft: "10px",
                        width: "9rem",
                      }}
                      type="button"
                    >
                      <NewA
                        href={`/${
                          company.company === "OCEANICA"
                          ? "ODS_ORDENES_AMP_ASESOR-ASEGURADO.pdf"
                          : "PS_ORDENES_AMP_ASESOR_ASEGURADO.pdf"
                        }`}
                        target={"_blank"}
                      >
                        Asesor/Asegurado
                      </NewA>
                    </NewButton> */}
                  </>
                </NewDiv>

                <NewH4>{timeout}</NewH4>

                {/*  <LinearProgress variant="determinate" value={timeout} valueBuffer={timeout} /> */}
              </div>
            </NewDiv>
          )}
        </NewDiv>
      )}
    </>
  )
}

export default PopUpInsured
