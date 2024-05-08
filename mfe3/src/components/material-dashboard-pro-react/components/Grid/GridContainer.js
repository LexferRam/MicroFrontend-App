import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @MUI components
import { styled } from "@mui/material/styles"
import Grid from "@mui/material/Grid"

const styles = {
  grid: {
    margin: "0 -15px",
    width: "calc(100% + 30px)"
    // '&:before,&:after':{
    //   display: 'table',
    //   content: '" "',
    // },
    // '&:after':{
    //   clear: 'both',
    // }
  }
};

const NewGrid = styled(Grid)(({ theme, ownerState }) => {
  const { className } = ownerState
  return { ...styles.grid, ...className }
})

export default function GridContainer(props) {
  const { children, className, justify, ...rest } = props
  return (
    <NewGrid container justifyContent={justify} {...rest} ownerState={{ className: className }}>
      {children}
    </NewGrid>
  )
}

GridContainer.defaultProps = {
  className: null,
}

GridContainer.propTypes = {
  children: PropTypes.node,
  className: PropTypes.object,
}