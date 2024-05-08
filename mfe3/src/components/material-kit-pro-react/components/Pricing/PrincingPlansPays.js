import React from 'react'
import { styled} from '@mui/system';
import CancelIcon from '@mui/icons-material/Cancel';

import Card from '../Card/Card'
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import AmountFormatDisplay from 'components/Core/NumberFormat/AmountFormatDisplay'

import CheckBox from 'components/Core/CheckBox/CheckBox'
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import { getProfileCode } from 'utils/auth'
import "./PrincingPlansPays.scss"

import princingPlansStyle from "./princingPlansStyle.js";

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...princingPlansStyle[style] }
})

const NewH6 = styled("h6")(({ theme}) => (princingPlansStyle.cardDescription))
const NewH3 = styled("h3")(({ theme}) => ({
  ...princingPlansStyle.cardTitlePrice
}))
const NewSmall = styled("small")(({ theme}) => ({
  ...princingPlansStyle.planPay
}))

export default function PrincingPlansPays(props) {
  const { 
    index, 
    description, 
    currency, 
    mount, 
    children, 
    footer, 
    plan, 
    onRemove, 
    showMount, 
    showPay, 
    handleSelectedPay,
    showCheckbox,
    removeCheckbox,
    disableSelects,
    tipoBudget
  } = props  

  const classesCardExt = {
    ...(( disableSelects && tipoBudget === 'PERSONAS') ? `${princingPlansStyle.cardPricing} selecters-cards` :`${princingPlansStyle.cardPricing}`)
  }

  const clsIconClose = {...princingPlansStyle.iconClose}
  const clsJustifyContentCenter = {...princingPlansStyle.justifyContentCenter}
  
  const handleRemovePlan = (plan) =>{
    onRemove(plan)
    showCheckbox && removeCheckbox(plan.plan_id)
  }

  const checkShowCheckbox = () => {
    if(showCheckbox === true && getProfileCode() === 'insurance_broker'){
      return true
    }else{
      return false
    }
  }

  return (
      <Card key={index} pricing className={princingPlansStyle.cardPricing} >
      <CardBody pricing >

        <NewH6>{description}</NewH6>
        
        {showMount && <NewDiv ownerState={{
                                style: "divMount",
                                }}>
          <GridContainer justify="center" alignItems="center">
            <GridItem xs={checkShowCheckbox() === true ? 10 : 12}>
          <NewH3>
            <small>{currency} </small>
            <AmountFormatDisplay name={`pricing_${index}`} value={mount} />
            {showPay && <NewSmall> / Anual </NewSmall>}
          </NewH3>
          </GridItem>
          {
            checkShowCheckbox() === true && plan.fraccionamiento.length > 0 &&
            <GridItem xs={2}>
              <CheckBox
                classLabel="labelSmall"
                name={`check_${index}_ab`}
                onChange={(e) => {
                  handleSelectedPay(e,plan.plan_id,0)
                }}
              />
            </GridItem>
          }
          </GridContainer>
          {showPay && plan.fraccionamiento.map((element, index) => (
            <GridContainer justify="center" alignItems="center" key={`rowCheck__${index}`}>
              <GridItem xs={checkShowCheckbox() === true ? 10 : 12}>
              <NewH3 key={index} >
                  <small>{currency} </small><AmountFormatDisplay name={`pricing_${index}`} value={element.prima} />
                  <NewSmall > / {element.nomplan} </NewSmall>
                </NewH3>
            </GridItem>
            {
              showCheckbox === true && getProfileCode() === 'insurance_broker' &&
              <GridItem xs={2}>
                <CheckBox
                  classLabel="labelSmall"
                  name={`check_${index}_cd`}
                  onChange={(e) => {
                    handleSelectedPay(e,plan.plan_id,element.maxgiro)
                  }}
                />
              </GridItem>
            }

            </GridContainer>
          ))}
        </NewDiv>}
        {onRemove && <CancelIcon color="secondary" className={clsIconClose} onClick={() => handleRemovePlan(plan)} />}
        {children}
      </CardBody>
      {footer && <CardFooter pricing className={clsJustifyContentCenter}>{footer}</CardFooter>}
    </Card>
  )
}
