import React from 'react'
import Card from '../Card/Card'
import CardBody from "../Card/CardBody";
import princingPlansStyle from "./princingPlansStyle.js";

export default function PricingDetails({children, index}) {
  
  const clsCardP   = {...princingPlansStyle.cardPricingDetails}
  return (
    <Card key={index} pricing className={clsCardP}>
      <CardBody pricing>
        {children}
      </CardBody>
    </Card>
  )
}
