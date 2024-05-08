import { Box } from '@mui/material'
import React from 'react'
const TRAFFIC_STYLES = {
  circleRed:{
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'red',
    margin: '0.15em 0'
  },
  circleOrange:{
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'orange',
    margin: '0.15em 0'
  },
  circleGreen:{
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: 'green',
    margin: '0.15em 0'
  },
  containerCircle: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems:'center'
  },
}

const TrafficLight = (props) => {
  const {typeLight} = props

  const checkCircle = (valueCircle) => {
    if(valueCircle === '1'){
      return TRAFFIC_STYLES.circleRed
    }else if(valueCircle === '2'){
      return TRAFFIC_STYLES.circleOrange
    }else if(valueCircle === '3'){
      return TRAFFIC_STYLES.circleGreen
    }else{
      return {}
    }
  }


  return (
    <Box sx={TRAFFIC_STYLES.containerCircle}>
      <Box sx={{
        ...checkCircle(typeLight)
      }}/>
    </Box>
      
  )
}

export default TrafficLight