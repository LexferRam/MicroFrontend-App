import React from 'react'
import { styled } from '@mui/material/styles';
import { Accordion, AccordionSummary, AccordionDetails, Tooltip, IconButton, Icon } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js";
import styles from './accordionComparePanelStyles';

const NewTooltip = styled(Tooltip)(({ theme}) => {
  return {
    ...styles.buttonContainer
  }
})

const NewSpan = styled("span")(({ theme}) => {
  return {
    ...styles.titleCategory
  }
})

export default function AccordionComparePanel(props){
  const unmount = props.unmount ? true : false;
  const defaultExpanded=props.defaultExpanded;
  
  function handleClickIcons(event){
    event.stopPropagation()
    props.handleClickIcon(props.params)
  }

  return(
    <Accordion className={props.className} defaultExpanded={defaultExpanded} TransitionProps={{ unmountOnExit: unmount }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon/>}
        aria-controls={`panel${props.id}a-content`}
        id={`panel${props.id}a-header`}
      >
        <NewSpan >{props.title}
          
          {props.icon &&  <NewTooltip title="Eliminar beneficio" placement="right-start" arrow >
          <IconButton onClick={(event) =>handleClickIcons(event)}>
            <Icon style={{ fontSize: 22, color: "red" }}>remove_circle</Icon>
          </IconButton>
        </NewTooltip>}
        </NewSpan>

      </AccordionSummary>
      <AccordionDetails>
        <GridItem xs={12}>
          {props.children}
        </GridItem>
      </AccordionDetails>
    </Accordion>
  )
}