import React from 'react'

// @Mui components
import { styled } from "@mui/material/styles"
import Icon from "@mui/material/Icon";

//Core components
import Card from "components/material-dashboard-pro-react/components/Card/Card";
import CardHeader from 'components/material-dashboard-pro-react/components/Card/CardHeader';
import CardBody from 'components/material-dashboard-pro-react/components/Card/CardBody';
import CardIcon from 'components/material-dashboard-pro-react/components/Card/CardIcon';
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js";
import styles from './cardTemplateStyle'

const NewDiv = styled("div")(({ theme}) => {
  return { ...styles.buttonAccion }
})

const NewH5 = styled("h5")(({ theme}) => {
  return { ...styles.cardIconTitle }
})

export default function CardTemplate(props) {
  const { collapse, back,handleBack } = props
  const [expanded,setExpanded] = React.useState(true);
  const handleCollapseCard = () =>{
    collapse && setExpanded(!expanded);
  }
  return (
    <Card 
      collapse={collapse} 
      handleCollapseCard={handleCollapseCard}
      expanded={expanded}
      >
      <CardHeader color={props.color} icon>
        <CardIcon color={props.iconcolor}>
          <Icon>{props.icon}</Icon> 
        </CardIcon>
        <NewH5>{props.titulo}</NewH5>
      </CardHeader>
      <CardBody 
        expanded={expanded}
        >
        {props.body}
        <NewDiv >
          <Button fullWidth color={props.iconcolor} type="submit" onClick={props.actionButton ? props.actionButton : undefined}>
          {props.iconaccion && <Icon>{props.iconaccion}</Icon>}  {props.accion}
          </Button>
        </NewDiv>
        {
          back &&
          <NewDiv>
          <Button fullWidth onClick={handleBack}>
            <Icon>fast_rewind</Icon> Regresar
          </Button>
          </NewDiv>
        }
      </CardBody>
    </Card>
  )
}