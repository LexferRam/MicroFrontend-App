import React from 'react'
import { styled } from "@mui/material/styles"
import Typography from '@mui/material/Typography';
import styles from "./noteMessageStyle";

const NewDivWrap = styled("div")(({ theme }) => {
    const newStyles = styles(theme)
    return {
        ...newStyles.message,
        ...newStyles.received,
    }
})

const NewDivTitle = styled("div")(({ theme, ownerState }) => {
    const newStyles = styles(theme)
    const { color } = ownerState
    return {
        ...(color && newStyles[color]),
    }
})

const NewDivFooter = styled("div")(({ theme }) => {
    const newStyles = styles(theme)
    return {
        ...newStyles.footermsj,
    }
})

export default function NoteMessage(props) {
    const { title, body, time, colorAuthor } = props
    
    return (
        <div>
            <NewDivWrap>
                <NewDivTitle 
                    ownerState={{
                        style: "hidden",
                }}>
                    <h6><strong>{title}</strong></h6>
                </NewDivTitle>
                <Typography variant="body2" gutterBottom>{body}</Typography>
                <NewDivFooter>
                    <Typography variant="caption" display="block">{time}</Typography>
                </NewDivFooter>
            </NewDivWrap>
        </div>
    )
}
