import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import Card from "components/material-dashboard-pro-react/components/Card/Card.js"
import CardHeader from "components/material-dashboard-pro-react/components/Card/CardHeader.js"
import CardBody from "components/material-dashboard-pro-react/components/Card/CardBody.js"
import CardIcon from "components/material-dashboard-pro-react/components/Card/CardIcon.js"
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js"
import styles from "./cardPanelStyleObj"
import { Icon, useMediaQuery, useTheme } from "@mui/material"

const Div1 = styled("div")(({ theme }) => ({
  ...styles.cardIconTitleManagement,
}))
const Div2 = styled("div")(({ theme }) => ({
  ...styles.baseHeader,
}))
const NewH4 = styled("h4")(({ theme }) => ({
  ...styles.cardIconTitlePanel,
}))

export default function CardManagement(props) {
  const { collapse, className } = props
  const [expanded, setExpanded] = useState(true)
  const theme = useTheme()
  const hiddenMdUp = useMediaQuery(theme.breakpoints.up("md"))
  const hiddenSmDown = useMediaQuery(theme.breakpoints.down("sm"))

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
        >
          {props.icon && <Icon>{props.icon}</Icon>}
          {props.iconValue && <h5>{props.iconValue}</h5>}
        </CardIcon>
        <Div1>
          <Div2>
            <NewH4>{props.titulo}</NewH4>
          </Div2>
          {props.headerComponent && !hiddenSmDown && (
            /*<Hidden smDown implementation="css" sx={styles.baseHeader}>*/
            <GridContainer
              justify="flex-end"
              alignItems="center"
              sx={styles.textButton}
            >
              {props.headerComponent}
            </GridContainer>
            /*</Hidden>*/
          )}
        </Div1>
      </CardHeader>
      <CardBody expanded={expanded}>
        {props.headerComponent && !hiddenMdUp && (
          /*<Hidden mdUp implementation="css">*/
          <GridContainer
            justify="center"
            alignItems="center"
            className={styles.textButton}
          >
            {props.headerComponent}
          </GridContainer>
          /*</Hidden>*/
        )}
        {props.children}
      </CardBody>
    </Card>
  )
}
