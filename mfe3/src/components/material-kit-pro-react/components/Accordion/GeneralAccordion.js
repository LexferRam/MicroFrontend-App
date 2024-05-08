import React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from "@mui/icons-material/ExpandMore";
import accStyles from "./accordionStyle.js";

const NewAccordion = styled(Accordion)(({ theme }) => {
  const stylesGet = accStyles(theme)
  return {
    ...stylesGet.expansionPanel,
    "&.Mui-expanded": {
      ...stylesGet.expansionPanelExpanded,
    }
  }
})

const NewAccordionSummary = styled(AccordionSummary)(({ theme, ownerState }) => {
  const stylesGet = accStyles(theme)
  const { color } = ownerState
  return {
    ...stylesGet.expansionPanelSummary,
    ...stylesGet[color +"ExpansionPanelSummary"],
    "&.Mui-expanded": {
      ...stylesGet.expansionPanelSummaryExpaned,
      ...stylesGet[color +"ExpansionPanelSummaryExpaned"]
    },
    "&.MuiAccordionSummary-content": {
      ...stylesGet.expansionPanelSummaryContent,
    },
    "&.MuiAccordionSummary-expandIconWrapper": {
      ...stylesGet.expansionPanelSummaryExpandIcon,
    }
  }
})

const NewAccordionDetails = styled(AccordionDetails)(({ theme}) => {
  const stylesGet = accStyles(theme)
  return {
    ...stylesGet.expansionPanelDetails,
  }
})

const NewDivStyle = styled("div")(({ theme}) => {
  const stylesGet = accStyles(theme)
  return {
    ...stylesGet.root,
  }
})

const NewH4 = styled("h4")(({ theme }) => {
  const stylesGet = accStyles(theme)
  return {
    ...stylesGet.title
  }
})

export default function GeneralAccordion(props) {
  const { collapses, activeColor } = props;
  const [active, setActive] = React.useState(
    props.active.length === undefined ? [props.active] : props.active
  );
  const [single] = React.useState(
    props.active.length === undefined ? true : false
  );
  const handleChange = panel => () => {
    let newArray;

    if (single) {
      if (active[0] === panel) {
        newArray = [];
      } else {
        newArray = [panel];
      }
    } else {
      if (active.indexOf(panel) === -1) {
        newArray = [...active, panel];
      } else {
        newArray = [...active];
        newArray.splice(active.indexOf(panel), 1);
      }
    }
    setActive(newArray);
  };
  
  return (
    <NewDivStyle>
      {collapses.map((prop, key) => {
        return (
          <NewAccordion
            expanded={active === key || active.indexOf(key) !== -1}
            onChange={handleChange(key)}
            key={key}
          >
            <NewAccordionSummary
              expandIcon={<ExpandMore />}
                 ownerState={{
                  color: activeColor,
                }}
            >
              <NewH4>{prop.title}</NewH4>
            </NewAccordionSummary>
            <NewAccordionDetails>
              {prop.content}
            </NewAccordionDetails>
          </NewAccordion>
        );
      })}
    </NewDivStyle>
  );
}

Accordion.defaultProps = {
  active: -1,
  activeColor: "primary"
};

Accordion.propTypes = {
  // index of the default active collapse
  active: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.arrayOf(PropTypes.number)
  ]),
  collapses: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node
    })
  ).isRequired,
  activeColor: PropTypes.oneOf([
    "primary",
    "secondary",
    "warning",
    "danger",
    "success",
    "info",
    "rose"
  ])
};
