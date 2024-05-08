import React from "react"
import { Link } from "gatsby"

import { styled } from "@mui/material/styles"

import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import CustomButton from "components/material-kit-pro-react/components/CustomButton"
import NoticiasCards from "../Noticias/NoticiasCards"
import sectionNoticiasStyle from "./sectionNoticiasStyle"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...sectionNoticiasStyle[style] }
})

const NewH2 = styled("h2")(({ theme }) => {
  return { ...sectionNoticiasStyle.title }
})

export default function SectionBlogs({ ...rest }) {
  const autoClasses = {
    ...sectionNoticiasStyle.mlAuto,
    ...sectionNoticiasStyle.mrAuto,
  }

  return (
    <div className="cd-section" {...rest}>
      <NewDiv
        ownerState={{
          style: "blog",
        }}
      >
        <NewDiv
          ownerState={{
            style: "container",
          }}
        >
          <NewDiv
            ownerState={{
              style: "blog__titulo",
            }}
          >
            <GridContainer>
              <GridItem xs={12} sm={8} md={8} className={autoClasses}>
                <NewH2>Noticias</NewH2>
              </GridItem>
            </GridContainer>
          </NewDiv>
          <NoticiasCards />
          <GridContainer justify="center">
            <GridItem xs={6} sm={3} md={3}>
              <Link to="/noticias">
                <CustomButton sx={{ p: "5px" }} round block color="primary">
                  Más Noticias
                </CustomButton>
              </Link>
            </GridItem>
          </GridContainer>
        </NewDiv>
      </NewDiv>
    </div>
  )
}
