import React from "react"
import { styled } from "@mui/material"
import SlickCardPanel from "components/Core/Slick/SlickCardPanel"
import CardPanel from "./CardPanel"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"

const StyledTitle = styled("h4", {
  shouldForwardProp: (prop) => prop !== "className",
})(({ className }) => {
  return {
    ...(className && { ...className }),
  }
})

const CLASS_STYLES = {
  containerCard: {
    maxWidth: "270px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  contetBody: {
    fontSize: 20,
    fontWeight: "bold",
  },
}

const CarouselCardPanel = (props) => {
  const { dataCards, handleDataCard, handleLevelCard, slidesToShow = 5 } = props

  return (
    <SlickCardPanel arrows={true} slidesToShow={slidesToShow}>
      {dataCards.map((element, index) => (
        <CardPanel
          className={CLASS_STYLES.containerCard}
          icon={element.icon_name}
          titulo={element.label}
          backgroundIconColor={element.color_card}
          dataCard={element}
          handleFooter={handleDataCard}
          handleLevelCard={handleLevelCard}
          key={`card_panel_${index + 1}`}
        >
          <GridContainer justify="center">
            <StyledTitle className={CLASS_STYLES.contetBody}>
              {element.count}
            </StyledTitle>
          </GridContainer>
        </CardPanel>
      ))}
    </SlickCardPanel>
  )
}

export default CarouselCardPanel
