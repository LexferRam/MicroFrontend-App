import React from 'react'
import { styled } from "@mui/material/styles"
import {Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material/';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js";

const stylesPanelCard = {
  expansionCard: {
    marginTop: '0',
    marginBottom: '1rem',
    boxShadow: '5px 2px 6px 3px rgba(0, 0, 0, 0.14)',
    padding: '0.1em 0.3em',
    borderRadius: '4px'
  },
  expansionSummary: {
    padding: '0px 8px'
  },
  expansionDetails: {
    padding: '3px 3px 3px'
  },
  expansionTitle: {
      fontSize: '0.7rem'
  }
};

const NewAccordion = styled(Accordion)(({ theme }) => {
  return { ...stylesPanelCard.expansionCard }
})

const NewAccordionSummary = styled(AccordionSummary)(({ theme }) => {
  return { ...stylesPanelCard.expansionSummary }
})

const NewAccordionDetails = styled(AccordionDetails)(({ theme }) => {
  return { ...stylesPanelCard.expansionDetails }
})

const NewTypography = styled(Typography)(({ theme }) => {
  return { ...stylesPanelCard.expansionTitle }
})

export default function AccordionCard(props) {

  return (
    <NewAccordion >
      <NewAccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        aria-controls={`panel${props.id}a-content`}
        id={`panel${props.id}a-header`}
      >
        <NewTypography variant="subtitle2" color={props.color} >{props.title} </NewTypography>
      </NewAccordionSummary>
      <NewAccordionDetails>
        <GridItem xs={12}>
          {props.children}
        </GridItem>
      </NewAccordionDetails>
    </NewAccordion>
  )
}