import React from 'react'

//mui components
import { styled } from "@mui/material/styles"

//Core components
import LandingPage from '../../Layout/LandingPage'
import SectionPrincipal from '../Sections/SectionPrincipal'
import SectionCaracteristicas from '../Sections/SectionCaracteristicas'
import SectionProductos from '../Sections/SectionProductos'
import SectionNoticias from '../Sections/SectionNoticias'
import SectionLocations from '../Sections/SectionLocations';
import presentationStyle from "./presentationStyle.js";
import PopUp from '../../Layout/Popup';

const company = process.env.GATSBY_INSURANCE_COMPANY


const NewDiv = styled("div")(({ theme }) => ({
    ...presentationStyle.main,
    ...presentationStyle.mainRaised
  }))
  

export default function PresentationPage() {

    React.useEffect(() => {
        document.body.scrollTop = 0;
    });
    return (
        <LandingPage noChatBot={true} pageTitle="Principal" >
           {company === "OCEANICA" ? <PopUp company={company} /> : null  }  
           
            
            <SectionPrincipal/>
            <NewDiv>
                <SectionCaracteristicas/>
                <SectionProductos/>
                <SectionNoticias/>
                <SectionLocations/> 
            </NewDiv>
        </LandingPage>
    )
}
