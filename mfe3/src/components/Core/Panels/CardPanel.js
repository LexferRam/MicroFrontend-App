import React from "react"
import { styled } from "@mui/material"
import Icon from "@mui/material/Icon"

import Card from "components/material-dashboard-pro-react/components/Card/Card.js"
import CardHeader from "components/material-dashboard-pro-react/components/Card/CardHeader.js"
import CardBody from "components/material-dashboard-pro-react/components/Card/CardBody.js"
import CardIcon from "components/material-dashboard-pro-react/components/Card/CardIcon.js"
import CardFooter from "components/material-dashboard-pro-react/components/Card/CardFooter.js"
import styles from "components/Core/Card/cardPanelStyleObj.js"
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import SvgIconPiramide from "components/Core/CustomIcons/SvgIconPiramide.js"
import SvgIconOceanica from "components/Core/CustomIcons/SvgIconOceanica.js"

// styles.cardIconTitle

const StyledTitle = styled("p")(() => {
  return {
    ...styles.cardIconTitle,
  }
})

const StyledDivIconPiramide = styled("div")(() => {
  const styles = {
    paddingLeft: "5px",
  }
  return {
    ...styles,
  }
})

const StyledDivIconOceanica = styled("div")(() => {
  const styles = {
    marginBottom: "0px",
  }
  return {
    ...styles,
  }
})

const CardPanel = (props) => {
  const {
    className,
    backgroundIconColor,
    dataCard,
    handleFooter,
    handleLevelCard,
  } = props
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  return (
    <Card className={className ? className : undefined}>
      <CardHeader color={props.iconColor} icon>
        <CardIcon
          color={props.iconColor ? props.iconColor : "primary"}
          className={styles.centerIcon}
          style={
            backgroundIconColor
              ? { background: backgroundIconColor }
              : undefined
          }
        >
          {props.icon === "company_icon" && insuranceCompany === "PIRAMIDE" && (
            <StyledDivIconPiramide>
              <SvgIconPiramide sx={{ color: "white !important" }} />
            </StyledDivIconPiramide>
          )}

          {props.icon === "company_icon" && insuranceCompany === "OCEANICA" && (
            <StyledDivIconOceanica>
            <SvgIconOceanica sx={{ color: "white !important" }} />
          </StyledDivIconOceanica>
          )}

          {props.icon !== "company_icon" && (
            <Icon sx={{ color: "white !important" }}>{props.icon}</Icon>
          )}
        </CardIcon>
        <StyledTitle>{props.titulo}</StyledTitle>
      </CardHeader>
      <CardBody>{props.children}</CardBody>
      <CardFooter className={styles.footerPanel}>
        {dataCard.drilldown && dataCard.drilldown === "S" && (
          <Button
            simple
            onClick={() => handleLevelCard(dataCard)}
            color="warning"
          >
            Ver Grupo
          </Button>
        )}
        <Button simple onClick={() => handleFooter(dataCard)} color="success">
          Ver Detalle
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CardPanel

// onClick={() => handleFooter(dataCard)}
