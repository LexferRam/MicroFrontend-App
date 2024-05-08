import React from 'react'
import { Text,View } from '@react-pdf/renderer';
import styles from 'components/Core/PDF/comparePDFStyles';

export default function CardAgesPDF(props){
  const {budgetInfo, visibleLegendRate, visibleLegendSum} = props
  return (
    <>
      {(visibleLegendRate === true || visibleLegendSum === true) ?
          <View style={styles.wrapper}>
              <View style={styles.rowFootNote}>
                    <Text>{visibleLegendSum === true ? ' (*) Plan con suma modificada ' : null}</Text>
                    <Text>{visibleLegendRate === true? ' (**) Plan con tasa modificada ' : null}</Text>
                </View>
          </View>
          :
          <View style={styles.wrapper}>
              <View style={styles.rowFootNote}>
                    <Text>{budgetInfo.sum_modified_esp && budgetInfo.sum_modified_esp === 'S' ? ' (*) Plan con suma modificada ' : null}</Text>
                    <Text>{budgetInfo.rate_modified_esp && budgetInfo.rate_modified_esp === 'S' ? ' (**) Plan con tasa modificada ' : null}</Text>
                </View>
          </View>
      }    
    </>
          
  )
}