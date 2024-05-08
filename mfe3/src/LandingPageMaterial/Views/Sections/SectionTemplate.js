import React from 'react'
import { styled } from "@mui/material/styles";
import sectionStyle from './sectionStyle'

const NewDiv = styled("div")(({ theme }) => {
    return { 
        ...sectionStyle.main,
        ...sectionStyle.mainRaised
     }
  });

  const DivStyled = styled("div")(({ theme, ownerState }) => {
    const { style } = ownerState
    return { ...sectionStyle[style] }
  })

export default function SectionTemplate(props) {
    
    return (
        <NewDiv >
            <DivStyled ownerState={{
                style: "container",
              }}>
                <div className="cd-section">
                    <DivStyled ownerState={{
                        style: "container",
                        }}>
                        <DivStyled ownerState={{
                        style: "features1",
                        }}>
                            {props.children}
                        </DivStyled>
                    </DivStyled>
                </div>
            </DivStyled>
        </NewDiv>
    )
}
