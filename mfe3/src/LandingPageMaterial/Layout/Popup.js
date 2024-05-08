import React, { useState, useEffect } from "react"
import Cancel from "@mui/icons-material/Cancel"
import { styled } from "@mui/material/styles"
// import popUpStyle from "./PopupStyle"
import popUpStyle from "./PopupStylePrensentationPage"
import img from "../../../static/Pop_Up_centro_de_inspección.jpg"
// import img2 from "../../../static/POPUP_ANIVERSARIO.jpg"
// import img_instrictivo_pira from "../../../static/Instructivo_firma_electronica_Piramide.jpg"
// import img2_instrictivo_oce from "../../../static/Instructivo_firma_electronica_Oceánica.jpg"

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

const NewDivCounter = styled("div")(({theme}) => {
  return {...popUpStyle.containerCounter}
})

const PopUp = (company) => {
  const [close, setClose] = useState(false)
  const [timeout, setTime] = useState(20)
  const [load, setLoad] = useState(true)

  const handleClose = () => {
    setClose(true)
    window.sessionStorage.setItem("modal", "true")
  }

  useEffect(() => {
    const status = window.sessionStorage.getItem("modal")
    console.log(4, close, status)
    setClose(status ? true : false)
    setTimeout(() => {
      setLoad(false)
    },3000)
  }, [])

  useEffect(() => {
    if (!close && !load) {
      let time = timeout - 1
      if (time >= 0) {
        setTimeout(() => {
          setTime(time)
        },1000)
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
            style: "modalContainer",
          }}
        >
          {!load && (
            <NewDiv
              ownerState={{
                style: "modalBody",
              }}
            >
              <NewCancel  onClick={handleClose} />
              {/* <a href='https://venemergencia.com' target={'_blank'}><img  alt='Venemergencia' src={process.env.GATSBY_INSURANCE_COMPANY === 'OCEANICA'? "Instructivo_firma_electronica_Oceánica.pdf" : "Instructivo_firma_electronica_Piramide.pdf"} /></a> */}
              <NewImg
                alt="FIRMA"
                src={
                  company.company === "OCEANICA"
                  ? img
                  : null
                }
                
              />
              <NewDivCounter>
                {/* <NewP> Ver paso a paso</NewP> */}
                {/* <NewDiv
                  ownerState={{
                    style: "containerbtn",
                  }}
                >
                  <>
                    <NewButton
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
                            ? "Instructivo_firma_electronica_Oceánica.pdf"
                            : "Instructivo_firma_electronica_Piramide.pdf"
                        }`}
                        target={"_blank"}
                      >
                        Descargar  Instructivo
                      </NewA>
                    </NewButton>
                  </>
                </NewDiv> */}

                <NewH4>{timeout}</NewH4>

                {/*  <LinearProgress variant="determinate" value={timeout} valueBuffer={timeout} /> */}
              </NewDivCounter>
            </NewDiv>
          )}
        </NewDiv>
      )}
    </>
  )
}

export default PopUp
