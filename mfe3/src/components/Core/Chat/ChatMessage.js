import React,{Fragment} from 'react'
import { styled} from "@mui/material/styles"
import Check from '@mui/icons-material/Check';
import Typography from '@mui/material/Typography';

import styles from "./chatMessageStyle";

const NewCheckReaded = styled(Check)(({ theme }) => {
    const newStyles = styles(theme)
    return {
        ...newStyles.readed,
    }
  })

  const NewCheckNotReaded = styled(Check)(({ theme }) => {
    const newStyles = styles(theme)
    return {
        ...newStyles.notreaded,
    }
  })

  const DivFooter = styled("div")(({ theme }) => {
    const newStyles = styles(theme)
    return {
      ...newStyles.footermsj
    }
  })

  const DivMessage = styled("div")(({ theme, ownerState }) => {
    const newStyles = styles(theme)
    const { type } = ownerState
    return {
      ...newStyles.message,
      ...newStyles[type]
    }
  })

  const DivColorAuthor = styled("div")(({ theme, ownerState }) => {
    const newStyles = styles(theme)
    const { color } = ownerState
    return {
      ...newStyles[color]
    }
  })

export default function ChatMessage(props) {
    const {title,body,time,readed,type,colorAuthor} = props

    function getReaded(){
        if(readed){
            return (
                <Fragment>
                    <NewCheckReaded />
                    <NewCheckReaded />
                </Fragment>
            )
        }else{
            return <NewCheckNotReaded />
        }
    }

    return (
        <div>
            <DivMessage ownerState={{
                type: type
            }}>
                <DivColorAuthor ownerState={{
                    color: colorAuthor
                }} >
                    <h6><strong>{title}</strong></h6>
                </DivColorAuthor>
                <Typography variant="body2" gutterBottom>{body}</Typography>
                <DivFooter >
                    <Typography variant="caption" display="block">{time} {getReaded()}</Typography>
                </DivFooter>
            </DivMessage>
        </div>
    )
}
