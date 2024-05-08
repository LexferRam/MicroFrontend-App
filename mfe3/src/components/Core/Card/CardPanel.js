import React from "react"
import { styled } from "@mui/material/styles"
import { Icon } from "@mui/material"
import Card from "components/material-dashboard-pro-react/components/Card/Card.js"
import CardHeader from "components/material-dashboard-pro-react/components/Card/CardHeader.js"
import CardBody from "components/material-dashboard-pro-react/components/Card/CardBody.js"
import CardIcon from "components/material-dashboard-pro-react/components/Card/CardIcon.js"
import SvgIconPiramide from "components/Core/CustomIcons/SvgIconPiramide.js"
import SvgIconOceanica from "components/Core/CustomIcons/SvgIconOceanica.js"

import styles from "./cardPanelStyleObj"

const NewH4 = styled("h4")(({ theme }) => ({
  ...styles.cardIconTitle,
}))

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

export default function CardPanel(props) {
  const { collapse, className, backgroundIconColor } = props
  const [expanded, setExpanded] = React.useState(true)
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  const handleCollapseCard = () => {
    collapse && setExpanded(!expanded)
    
  }
  return (
    <Card
      collapse={collapse}
      handleCollapseCard={handleCollapseCard}
      expanded={expanded}
      className={className ? className : undefined}
    >
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

          {props.icon !== "company_icon" && <Icon>{props.icon}</Icon>}
        </CardIcon>
        <NewH4>{props.titulo}</NewH4>
      </CardHeader>
      <CardBody expanded={expanded}>{props.children}</CardBody>
    </Card>
  )
}
