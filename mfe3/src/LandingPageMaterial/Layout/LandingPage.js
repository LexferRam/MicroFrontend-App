import React, { Fragment } from 'react'
import Seo from './Seo'
import Rrss from './Rrss'
import Header from '../../components/material-kit-pro-react/components/Header/Header'
import HeaderLinks from '../../components/material-kit-pro-react/components/Header/HeaderLinks'
import FooterSection from '../../components/material-kit-pro-react/components/Footer/FooterSection'
import BlankHeader from '../../components/Core/Header/BlankHeader'

export default function LandingPage(props) {
    return (
        <>
            <Seo noChatBot={props.noChatBot} title={props.pageTitle}/>
            {
                props.noLinks ? <BlankHeader
                        fixed
                        color={props.color ? props.color : "white"}
                        noLinks= {props.noLinks}
                        /*changeColorOnScroll={{
                            height: 400,
                            color: "white"
                        }}*/
                    />
                :
                    <Header
                        links={<HeaderLinks dropdownHoverColor="primary" />}
                        fixed
                        color={props.color ? props.color : "white"}
                        /*changeColorOnScroll={{
                            height: 400,
                            color: "white"
                        }}*/
                    />
            }
            <>
                {props.children}
                { props.noDial !== true && <Rrss /> }
            </>
            {/* { props.noFooter !== true && <FooterSection/> } */}
        </>
    )
}
