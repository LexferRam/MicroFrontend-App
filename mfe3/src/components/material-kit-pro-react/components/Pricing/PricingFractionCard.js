import React from "react"
import Card from "../Card/Card"
import CardBody from "../Card/CardBody"
import AmountFormatDisplay from "components/Core/NumberFormat/AmountFormatDisplay"
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js"
import Button from "components/material-kit-pro-react/components/CustomButtons/Button"
import { styled } from '@mui/material/styles';

import princingPlansStyle from "./princingPlansStyle.js"

const NewCard = styled(Card)(() => ({ ...princingPlansStyle.cardPricing }))
const NewDiv = styled("div")(() => ({ ...princingPlansStyle.divMount }))
const NewH3 = styled("h3")(() => ({ ...princingPlansStyle.cardTitlePrice }))
const NewSmall = styled("small")(() => ({ ...princingPlansStyle.planPay }))
const NewButton = styled(Button)(() => ({ ...princingPlansStyle.buyButton }))

export default function PrincingPlansPays(props) {
  const {
    currency,
    index,
    amount,
    showPay,
    showMount,
    plan,
    onSelectBuy,
    showAnual,
  } = props

  return (
    <NewCard key={index} pricing>
      <CardBody pricing>
        {showMount && (
          <NewDiv>
            {showAnual && (
              <GridContainer justify="center" alignItems="center">
                <GridItem xs={12}>
                  <NewH3>
                    <small>{currency} </small>
                    <AmountFormatDisplay
                      name={`pricing_${index}`}
                      value={amount}
                    />
                    {showPay && <NewSmall> / Anual </NewSmall>}
                  </NewH3>
                </GridItem>
              </GridContainer>
            )}

            {showPay &&
              plan.fraccionamiento.map((element, index) => (
                <GridContainer
                  justify="center"
                  alignItems="center"
                  key={`rowCheck__${index}`}
                >
                  <GridItem xs={12}>
                    <NewH3 key={index}>
                      <small>{currency} </small>
                      <AmountFormatDisplay
                        name={`pricing_${index}`}
                        value={element.prima}
                      />
                      <NewSmall> / {element.nomplan} </NewSmall>
                    </NewH3>
                  </GridItem>
                </GridContainer>
              ))}
          </NewDiv>
        )}
        <NewButton color="primary" round onClick={() => onSelectBuy(plan)}>
          Seleccionar
        </NewButton>
      </CardBody>
    </NewCard>
  )
}
