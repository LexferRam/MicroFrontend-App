import React from "react"
import { styled } from "@mui/material/styles"
import { useStaticQuery, graphql } from "gatsby"

//import Chat from "@material-ui/icons/Chat";
// import VerifiedUser from "@material-ui/icons/VerifiedUser";
//import Fingerprint from "@material-ui/icons/Fingerprint";

import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import InfoArea from "components/material-kit-pro-react/components/InfoArea/InfoArea.js"
import featuresStyle from "./sectionStyle"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...featuresStyle[style] }
})

const NewH2 = styled("h2")(({ theme }) => ({
  ...featuresStyle.titleSection,
}))

export default function SectionCaracteristicas({ ...rest }) {
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  const data = useStaticQuery(
    graphql`
      {
        allStrapiCaracteristicas: allStrapiCaracteristica (sort: { order: ASC, fields: orden }) {
          edges {
            node {
              orden
              descripcion_caracteristica
              nombre_caracteristica
              icono {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      quality: 60
                      width: 150
                      layout: CONSTRAINED
                    )
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const autoClasses = {
    ...featuresStyle.mlAuto,
    ...featuresStyle.mrAuto,
  }
  return (
    <div className="cd-section" {...rest}>
      <NewDiv ownerState={{
              style: "container",
            }}>
        <NewDiv ownerState={{
              style: "features1",
            }}>
          <GridContainer>
            <GridItem xs={12} sm={8} md={8} className={autoClasses}>
              <NewH2>
                {insuranceCompany == "OCEANICA"
                  ? "Para nuestros clientes somos"
                  : "¿Por qué Pirámide Seguros?"}
              </NewH2>
            </GridItem>
          </GridContainer>
          <GridContainer>
            {data.allStrapiCaracteristicas.edges.map(({ node }, index) => (
              <GridItem xs={12} sm={3} md={3} key={index}>
                <InfoArea
                  vertical
                  image={node.icono.localFile.childImageSharp.gatsbyImageData.images.fallback.src}
                  title={node.nombre_caracteristica}
                  description={node.descripcion_caracteristica}
                  iconColor="danger"
                  titlecenter
                  justificar="center"
                />
              </GridItem>
            ))}
          </GridContainer>
        </NewDiv>
      </NewDiv>
    </div>
  )
}
