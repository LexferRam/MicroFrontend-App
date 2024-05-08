import React from 'react'
import { styled } from '@mui/material/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js";

const useStylesObj = {
  expansionCard: {
    marginTop: '0',
    boxShadow: '5px 2px 6px 3px rgba(0, 0, 0, 0.14)',
    borderRadius: '4px',
  },
  expansionSummary: {
    padding: '0px 1em',
    background: 'beige'
  },
  expansionDetails: {
    padding: '3px 3px 3px'
  },
  expansionTitle: {
      fontSize: '0.7rem'
  }
};


const NewAccordion = styled(Accordion)(({ theme }) => {
  return { ...useStylesObj.expansionCard }
})

const NewAccordionSummary = styled(AccordionSummary)(({ theme }) => {
  return { ...useStylesObj.expansionSummary }
})

const NewAccordionDetails = styled(AccordionDetails)(({ theme }) => {
  return { ...useStylesObj.expansionDetails }
})

const NewTypography = styled(Typography)(({ theme }) => {
  return { ...useStylesObj.expansionTitle }
})

export default function AccordionPanelJobGroup(props) {
  
  return (
    <NewAccordion>
      <NewAccordionSummary
        expandIcon={<ExpandMoreIcon color="primary" />}
        aria-controls={`panel${props.id}a-content`}
        id={`panel${props.id}a-header`}
      >
        <NewTypography variant="subtitle2" >{props.title} </NewTypography>
      </NewAccordionSummary>
      <NewAccordionDetails >
        <GridItem xs={12}>
          {props.children}
        </GridItem>
      </NewAccordionDetails>
    </NewAccordion>
  )
}