import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @MUI components
import { styled } from "@mui/material/styles"
import { Grid } from "@mui/material"

const styles = {
  grid: {
    padding: "0 15px !important"
  }
};

const NewGrid = styled(Grid)(({ theme, ownerState }) => {
  const { className } = ownerState
  return { ...styles.grid, ...className }
})

export default function GridItem(props) {
  const { children, className, ...rest } = props

  return (
    <NewGrid item {...rest} ownerState={{ className: {...className} }}>
      {children}
    </NewGrid>
  )
}

GridItem.defaultProps = {
  className: null,
}

GridItem.propTypes = {
  children: PropTypes.node,
  className: PropTypes.object,
}
