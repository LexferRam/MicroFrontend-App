import React from "react"

//mui components
import { styled } from "@mui/material/styles"

//core components
import sectionLocationsStyle from "./sectionLocationsStyle"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import ProviderLocationsControllerNew from "components/Core/ProviderLocationsController/ProviderLocationsControllerNew"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...sectionLocationsStyle[style] }
})

const NewH2 = styled("h2")(({ theme}) => {
  return { ...sectionLocationsStyle.title }
})
export default function SectionLocations() {
  const autoClasses = {
    ...sectionLocationsStyle.mlAuto,
    ...sectionLocationsStyle.mrAuto,
  }

  return (
    <div className="cd-section">
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
              <GridItem
                xs={12}
                sm={8}
                md={8}
                className={autoClasses}
              >
                <NewH2>Ubicación de Aliados</NewH2>
              </GridItem>
            </GridContainer>
          </NewDiv>
          <GridContainer className={sectionLocationsStyle.contentCenter}>
            <GridItem>
              <ProviderLocationsControllerNew />
            </GridItem>
          </GridContainer>
        </NewDiv>
      </NewDiv>
    </div>
  )
}
