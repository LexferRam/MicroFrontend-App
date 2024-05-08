import React from 'react'
import { styled } from "@mui/material/styles"
import LandingPage from 'LandingPageMaterial/Layout/LandingPage'
import sectionStyle from "LandingPageMaterial/Views/Sections/sectionStyle"
import { hexToRgb } from 'components/material-kit-pro-react/material-kit-pro-react'

const DivMain = styled("div")(({ theme }) => ({
    background: '#fff',
    position: "relative",
    zIndex: "3",
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
    "0 16px 24px 2px rgba(" +
    hexToRgb('#000') +
    ", 0.14), 0 6px 30px 5px rgba(" +
    hexToRgb('#000') +
    ", 0.12), 0 8px 10px -5px rgba(" +
    hexToRgb('#000') +
    ", 0.2)"
  }))

const NewDiv = styled("div")(({ theme, ownerState }) => {
    const { style } = ownerState
    return { ...sectionStyle[style] }
  })

export default function TemplateBlank({children, title}) {      
    
    return (
        <LandingPage color="white" pageTitle={title}>
            <DivMain>
                <NewDiv ownerState={{
                    style: "container",
                }}>
                    <div className="cd-section">
                        <NewDiv ownerState={{
                            style: "container",
                        }}>
                            <NewDiv ownerState={{
                                style: "features2",
                            }}>
                                {children}
                            </NewDiv>
                        </NewDiv>
                    </div>
                </NewDiv>
            </DivMain>
        </LandingPage>
    )
}
