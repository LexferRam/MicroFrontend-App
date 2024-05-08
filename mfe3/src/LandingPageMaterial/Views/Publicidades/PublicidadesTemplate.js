import React, { useState } from "react"
import { styled } from "@mui/material/styles"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import LandingPage from "../../Layout/LandingPage"
//import NoticiaTexto from "./NoticiaTexto"
import styles from "./publicidadStyle"
//import Img from "gatsby-image"

const handleBack = () => window.history.back()
const checkPath = () => {
  const windowGlobal = typeof window !== "undefined" && window
  if (windowGlobal) {
    if (window.location.pathname.includes("asesor") === true) {
      return false
    } else {
      return true
    }
  }
}

const NewDiv = styled("div")(({ theme }) => {
  return { ...styles.advertisingImage }
})

const NewImg = styled("img")(({ theme }) => {
  return { ...styles.imagen }
})

export default ({ data }) => {
  const getFinalImage = (src) => {
    const image = getImage(src)
    return image
  }

  const publicidad = data.strapiPublicidades

  return (
    <LandingPage noLinks={checkPath() ? undefined : true}>
      <NewDiv>
        <NewImg
          src={publicidad.imagen_alterna.localFile.childImageSharp.original.src}
        />
      </NewDiv>
    </LandingPage>
  )
}

export const query = graphql`
  query ($id: String!) {
    strapiPublicidades: strapiPublicidade(id: { eq: $id }) {
      id
      titulo_publicidad
      fecha_publicacion
      imagen_principal {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 98, layout: FULL_WIDTH)
          }
        }
      }
      imagen_alterna {
        localFile {
          childImageSharp {
            original {
              src
            }
          }
        }
      }
    }
  }
`
