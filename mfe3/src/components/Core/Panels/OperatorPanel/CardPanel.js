import React from 'react'
import { styled } from "@mui/material/styles"
import { Icon } from '@mui/material';

import Card from "components/material-dashboard-pro-react/components/Card/Card.js";
import CardHeader from "components/material-dashboard-pro-react/components/Card/CardHeader.js";
import CardBody from "components/material-dashboard-pro-react/components/Card/CardBody.js";
import CardIcon from "components/material-dashboard-pro-react/components/Card/CardIcon.js";
import CardFooter from "components/material-dashboard-pro-react/components/Card/CardFooter.js";
import styles from "components/Core/Card/cardPanelStyleObj";

const NewH4 = styled("h4")(({ theme}) => ({
  ...styles.cardIconTitle
}))

const CardPanel = (props) => {

  const { className,backgroundIconColor,dataCard,handleFooter } = props
  return (
    <Card 
    className={className ? className : undefined}
    >
    <CardHeader color={props.iconColor} icon>
        <CardIcon color={props.iconColor?props.iconColor:"primary"} className={styles.centerIcon} style={backgroundIconColor ? {background : backgroundIconColor} : undefined}>
            <Icon>{props.icon}</Icon>
        </CardIcon>
        <NewH4>{props.titulo}</NewH4> 
    </CardHeader>
    <CardBody>
        {props.children}
    </CardBody>
    <CardFooter className={styles.footerPanel} onClick={() => handleFooter(dataCard)}>
      <h5>Ver info.</h5>
    </CardFooter>
</Card>
  )
}

export default CardPanel