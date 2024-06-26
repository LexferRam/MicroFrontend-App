import React, { useEffect, useState } from "react"
import { Page, Font, View, Document, Text} from '@react-pdf/renderer';
import RobotoSlabBold from '../../../../static/fonts/RobotoSlab-Bold.ttf';
import Roboto from '../../../../static/fonts/Roboto-Regular.ttf';
import RobotoBold from '../../../../static/fonts/Roboto-Bold.ttf';
import HeaderPDF from 'components/Core/PDF/HeaderPDF';
import CobertColumnPDF from 'components/Core/PDF/CobertColumnPDF';
import PlanColumnPDF from 'components/Core/PDF/PlanColumnPDF';
import styles from 'components/Core/PDF/comparePDFStyles';
import ConditionsHumanCard from './ConditionsHumanCard';
import ConditionsVehicleCard from './ConditionsVehicleCard';
import AdvisorInfoPDF from './AdvisorInfoPDF';
import RateSumModifiedInfoPDF from './RateSumModifiedInfoPDF';
import RateSumMarksLegendInfoPDF from './RateSumMarksLegendInfoPDF';
import { getProfileCode} from 'utils/auth'



Font.register({family: 'Roboto Slab', src: RobotoSlabBold});
Font.register({family: 'Roboto', fonts: [
  {src: Roboto},
  {src: RobotoBold, fontWeight: 700}
]});

export default function ComparePDFDocument(props){
  const { objPDF, budgetPlans, plans, objBudget } = props
  const {infoClient, cobertsDescrip, payments, type, budgetInfo, propertyDescrip, cobertsProperty} = objPDF
  const [visibleLegendRate,setVisibleLegendRate] = useState(false);
  const [visibleLegendSum,setVisibleLegendSum] = useState(false);
const getModifiedSumOrRate = async () => {
  let modifiedSum =  objBudget.plans.filter(plan => plan.sum_modified_esp === 'S')
  let modifiedRate = objBudget.plans.filter(plan => plan.rate_modified_esp === 'S')
  
  modifiedSum.length != 0 ? budgetInfo.sum_modified_esp='S': budgetInfo.sum_modified_esp='N'
  modifiedRate.length != 0 ? budgetInfo.rate_modified_esp='S': budgetInfo.rate_modified_esp='N'

  modifiedSum.length != 0 ? setVisibleLegendSum(true): setVisibleLegendSum(false)
  modifiedRate.length != 0 ? setVisibleLegendRate(true): setVisibleLegendRate(false)

} 

  useEffect(() => {

     getModifiedSumOrRate()
  }, []);
  
  return (
    <>
      <Document>
      {budgetPlans.map((arrayPlan,index) => (
        <Page size="A4" style={styles.page} key={index + 40}>
          <HeaderPDF/>
          <View style={styles.wrapper}>
            <CobertColumnPDF 
              infoClient={infoClient} 
              cobertsDescription={cobertsDescrip}
              distinctPayments={payments}
              type={type}
              objPDF= {objPDF}
              budgetInfo={budgetInfo}
              propertyDescrip={propertyDescrip}
              cobertsProperty={cobertsProperty}
              index={index}
            />
            {arrayPlan.map((plan, index) => (
              <View style={styles.wrapperPlan} key={index + 15}>
              <PlanColumnPDF
                objPDF= {objPDF}
                plan={plan}
                type={type}
                key={index + 50}
              />
              </View>
            ))}
          </View>
          {budgetPlans.length -1 === index && type === 'PERSONAS' && <ConditionsHumanCard infoClient={infoClient}/>}
          {budgetPlans.length -1 === index && type === 'AUTOMOVIL' && <ConditionsVehicleCard budgetInfo={budgetInfo} />}
          {budgetPlans.length -1 === index && <AdvisorInfoPDF budgetInfo={budgetInfo}  /> }
          {budgetPlans.length -1 === index && type === 'AUTOMOVIL' && <RateSumMarksLegendInfoPDF budgetInfo={budgetInfo} visibleLegendRate={visibleLegendRate} visibleLegendSum={visibleLegendSum} /> }
        </Page>
      ))
      }
      </Document>
    </>
  )
}
