import React, { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"
import SpeedDial from "@mui/material/SpeedDial"
import SpeedDialAction from "@mui/material/SpeedDialAction"

import PhoneIcon from "@mui/icons-material/Phone"
import InstagramIcon from "@mui/icons-material/Instagram"
import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"
import XIcon from "@mui/icons-material/X"

import pink from "@mui/material/colors/pink"
import blue from "@mui/material/colors/blue"

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver"
import GridContainer from "../../components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "../../components/material-kit-pro-react/components/Grid/GridItem.js"
import Slide from "@mui/material/Slide"

import ModalContactsNumber from "../../components/Modals/ModalContactsNumber"

const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY

const styles = {
  root: {
    height: 380,
    transform: "translateZ(0px)",
    flexGrow: 1,
  },
  speedDial: {
    position: "fixed",
    bottom: "112px",
    right: "32px",
  },
  container0800: {
    width: "133px",
    paddingTop: "3px",
  },
  numberLeft: {
    paddingRight: "5px",
    paddingTop: "5px",
    flexBasis: "unset",
    width: "unset",
  },
  numberRight: {
    padding: "0",
    fontSize: "11px",
  },
  areaCodeServ: {
    fontSize: "21px",
  },
}

const NewSpan = styled("span")(({ theme, className }) => ({
  ...className,
}))

const NewSpeedDial = styled(SpeedDial)(({ theme, className }) => ({
  ...className,
}))

export default function OpenIconSpeedDial() {
  const [open, setOpen] = useState(true)
  const [modalPhoneContacts, setModalPhoneContacts] = useState(false)
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  const actions = [
    { icon: <PhoneIcon color="primary" />, name: "Contacto" },
    { icon: <YouTubeIcon sx={{ color: pink[500] }} />, name: "YouTube" },
    { icon: <InstagramIcon sx={{ color: pink[500] }} />, name: "Instagram" },
    { icon: <XIcon sx={{ color: blue[500] }} />, name: "Twitter" },
  ]

  if (insuranceCompany === "OCEANICA") {
    let actIndex = 0
    let actFlag = true
    actions.map((item) => {
      if (actFlag && item.name !== "Twitter") {
        actIndex += 1
      } else {
        actFlag = false
      }
    })
    if (!actFlag) {
      actions.splice(actIndex, 1)
    }
  }

  // const handleOpen = () => {
  //   setOpen(true)
  // }

  const handleClose = (rs) => {
    if (rs === "Twitter" && insuranceCompany !== "OCEANICA") {
      window.open("https://twitter.com/SegPiramide?s=20", "_blank")
    } else if (rs === "Twitter" && insuranceCompany === "OCEANICA") {
      window.open("https://twitter.com/", "_blank")
    }
    if (rs === "Instagram" && insuranceCompany !== "OCEANICA") {
      window.open(
        "https://instagram.com/piramidesegurosoficial?igshid=obklqxqunbsw",
        "_blank"
      )
    } else if (rs === "Instagram" && insuranceCompany === "OCEANICA") {
      window.open(
        "https://www.instagram.com/oceanicadesegurosve/?hl=es-la",
        "_blank"
      )
    }
    if (rs === "YouTube" && insuranceCompany !== "OCEANICA") {
      window.open(
        "https://www.youtube.com/channel/UC0hcuzQt11uutCSDLn34hkg",
        "_blank"
      )
    } else if (rs === "YouTube" && insuranceCompany === "OCEANICA") {
      window.open(
        "https://www.youtube.com/channel/UC8pqzSfrMDlST2kv104weJQ",
        "_blank"
      )
    } else if (
      rs === "Contacto" &&
      window.screen.width < 750
    ) {
      handleOpenModal()
    }
    setOpen(false)
  }


  const handleClick = () => {
    setOpen(!open);
  };


  const handleOpenModal = () => {
    setModalPhoneContacts(true)
  }

  
  const nameTooltip = (name) => {
    if (name === "Contacto") {
      return (
        <>
          <GridContainer className={styles.container0800}>
            <GridItem xs={7} className={styles.numberLeft}>
              <NewSpan className={styles.areaCodeServ}>0800</NewSpan>
            </GridItem>
            <GridItem xs={5} className={styles.numberRight}>
              {insuranceCompany !== "OCEANICA" ? (
                <>
                  <span>SPIRAMI</span>
                  <br />
                  <span>7747264</span>
                </>
              ) : (
                <>
                  <span>OCEANIC</span>
                  <br />
                  <span style={{ fontSize: "12px" }}>6232642</span>
                </>
              )}
            </GridItem>
          </GridContainer>
          {insuranceCompany !== "OCEANICA" ? (
            <>
              <GridContainer alignItems="center">
                <GridItem xs={7} className={styles.numberLeft}>
                  <NewSpan className={styles.areaCodeServ}>0212</NewSpan>
                </GridItem>
                <GridItem xs={5} className={styles.numberRight}>
                  <span>2190400</span>
                </GridItem>
              </GridContainer>
              <GridContainer alignItems="center">
                <GridItem xs={7} className={styles.numberLeft}>
                  <NewSpan className={styles.areaCodeServ}>0212</NewSpan>
                </GridItem>
                <GridItem xs={5} className={styles.numberRight}>
                  <span>2193698</span>
                </GridItem>
              </GridContainer>
              <GridContainer alignItems="center">
                <GridItem xs={7} className={styles.numberLeft}>
                  <NewSpan className={styles.areaCodeServ}>0212</NewSpan>
                </GridItem>
                <GridItem xs={5} className={styles.numberRight}>
                  <span>3194940</span>
                </GridItem>
              </GridContainer>
            </>
          ) : (
            <>
              <GridContainer alignItems="center">
                <GridItem xs={7} className={styles.numberLeft}>
                  <NewSpan className={styles.areaCodeServ}>0212</NewSpan>
                </GridItem>
                <GridItem xs={5} className={styles.numberRight}>
                  <span>3003800</span>
                </GridItem>
              </GridContainer>
              <GridContainer alignItems="center">
                <GridItem xs={7} className={styles.numberLeft}>
                  <NewSpan className={styles.areaCodeServ}>0212</NewSpan>
                </GridItem>
                <GridItem xs={5} className={styles.numberRight}>
                  <span>2193699</span>
                </GridItem>
              </GridContainer>
              <GridContainer alignItems="center">
                <GridItem xs={7} className={styles.numberLeft}>
                  <NewSpan className={styles.areaCodeServ}>0212</NewSpan>
                </GridItem>
                <GridItem xs={5} className={styles.numberRight}>
                  <span>3194930</span>
                </GridItem>
              </GridContainer>
            </>
          )}
        </>
      )
    } else {
      return name
    }
  }
 
  return (
    <>
      <Slide in={true} direction="up" timeout={2000}>
        <NewSpeedDial
          ariaLabel="Redes Sociales"
          className={styles.speedDial}
          icon={<RecordVoiceOverIcon />}
          // onClose={handleClose}
          // onOpen={handleOpen}
          onClick={handleClick}
          open={open}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={nameTooltip(action.name)}
              // tooltipOpen={action.name == 'Contacto' ? true : false}
              onClick={() => handleClose(action.name)}
            />
          ))}
        </NewSpeedDial>
      </Slide>
        <ModalContactsNumber
          modalPhoneContacts={modalPhoneContacts}
          setModalPhoneContacts={setModalPhoneContacts}
        />
    </>
  )
}
