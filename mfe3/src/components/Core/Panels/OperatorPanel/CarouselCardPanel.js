import React from 'react'
import { styled } from '@mui/material';
import SlickCard from 'components/Core/Slick/SlickCard'
import CardPanel from './CardPanel'
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js";


const useStyles = {
  containerCard:{
    maxWidth: '300px'
  },
}

const CarouselCardPanel = (props) => {
  const {dataCards,handleDataCard} = props
  
  return (
    <SlickCard arrows={false} slidesToShow={5}>
      {
        dataCards.map((element,index) => (
            <CardPanel 
              className={classes.containerCard} 
              icon={element.icon_name}
              titulo={element.label}
              backgroundIconColor={element.color_card}
              dataCard={element}
              handleFooter={handleDataCard}
              key={`card_panel_${index +1}`}
            >
              <GridContainer justify="center">
                <h5>{element.count}</h5>
              </GridContainer>
            </CardPanel>
        ))
      }
    </SlickCard>
  )
}

export default CarouselCardPanel



