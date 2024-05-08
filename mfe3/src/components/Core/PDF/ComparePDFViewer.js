import React, { useEffect, useState } from "react"
import ComparePDFDocument from "components/Core/PDF/ComparePDFDocument"
import { PDFViewer } from "@react-pdf/renderer"
import useBudgetPlans from 'utils/hooks/useBudgetPlans';

export default function ComparePDFViewer(props) {
  const { objPDF , objBudget} = props;
  const budgetPlans = useBudgetPlans(objPDF);
  const [visiblePDF,setVisiblePDF] = useState(false);
  const [transformedPlans,setTransformedPlans] = useState(null)
  const handleVisiblePDF = (value) =>{
    setVisiblePDF(value);
  }

  useEffect(() =>{
    budgetPlans.length > 0 && handleVisiblePDF(true);
    budgetPlans.length > 0 && setTransformedPlans(budgetPlans);
  },[budgetPlans])

  return (
    <>
    { visiblePDF && transformedPlans &&
      <PDFViewer width="100%" height="650px">
      <ComparePDFDocument objPDF={objPDF} objBudget={objBudget} budgetPlans={transformedPlans} plans={objPDF.plans}/>
    </PDFViewer>
    }
    </>
  )
}
