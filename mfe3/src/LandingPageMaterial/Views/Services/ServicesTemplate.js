import React from "react"
import { graphql } from "gatsby"
import { styled } from "@mui/material/styles"

import LandingPage from "../../Layout/LandingPage"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import Parallax from "components/material-kit-pro-react/components/Parallax/Parallax.js"
import SectionTemplate from "LandingPageMaterial/Views/Sections/SectionTemplate"

import styles from "LandingPageMaterial/Views/Sections/sectionStyle"

import ReactMarkdown from "react-markdown"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...styles[style] }
})

const NewH2 = styled("h2")(({ theme }) => {
  return { ...styles.title }
})

const NewH5 = styled("h5")(({ theme }) => {
  return { ...styles.description, ...styles.gray26 }
})

const NewReactMarkdown = styled(ReactMarkdown)(({ theme }) => {
  return { ...styles.p }
})

export default ({ data }) => {
  const servicio = data.strapiPerfiles
  const gridItemAutoClasses = {
    ...styles.mlAuto,
    ...styles.mrAuto,
  }
  return (
    <LandingPage>
      <Parallax
        small
        image={
          servicio.imagen_principal_perfil.localFile.childImageSharp.gatsbyImageData.images.fallback.src
        }
      />
      <SectionTemplate>
        <GridContainer>
          <GridItem xs={12} sm={8} md={8} className={gridItemAutoClasses}>
            <NewH2>{servicio.nombre_perfil}</NewH2>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem md={8} sm={8} className={gridItemAutoClasses}>
            <NewH5>
              <NewReactMarkdown
                source={servicio.descripcion_perfil.data.descripcion_perfil}
              />
            </NewH5>
          </GridItem>
        </GridContainer>
      </SectionTemplate>
    </LandingPage>
  )
}
export const query = graphql`
  query ($id: String!) {
    strapiPerfiles: strapiPerfile (id: { eq: $id }) {
      nombre_perfil
      descripcion_perfil {
        data {
          descripcion_perfil
        }
      }
      id
      imagen_principal_perfil {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 95, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`
