import React, { useState, useEffect } from "react"
import { styled } from "@mui/material/styles"

//core components
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import ParallaxView from "../Parallax/ParallaxView"
import PestanasCotizadores from "../PestanasCotizadores/PestanasCotizadores"

import sectionPrincipalStyle from "./sectionPrincipalStyle"
import { graphql, useStaticQuery } from "gatsby"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"

const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...sectionPrincipalStyle[style] }
})

export default function SectionPrincipal() {
  const theme = useTheme()
  const matchesTablet = useMediaQuery(theme.breakpoints.up("sm"))
  const matchesLaptop = useMediaQuery(theme.breakpoints.up("md"))

  const data = useStaticQuery(
    graphql`
      {
        allStrapiCotizadores: allStrapiCotizadore(
          filter: { orden: { eq: 1 } }
        ) {
          edges {
            node {
              id
              nombre_cotizador
              texto_principal {
                data {
                  texto_principal
                }
              }
              texto_secundario {
                data {
                  texto_secundario
                }
              }
              imagen_fondo {
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                  }
                }
              }
              imagen_tablet {
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                  }
                }
              }
              imagen_movil {
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const [titulo, setTitulo] = useState({
    title: 
      data.allStrapiCotizadores.edges[0].node.texto_principal.data
        .texto_principal,
    texto:
      data.allStrapiCotizadores.edges[0].node.texto_secundario.data
        .texto_secundario,
    imagen:
      data.allStrapiCotizadores.edges[0].node.imagen_fondo.localFile
        .childImageSharp.gatsbyImageData.images.fallback.src,
    imagen_movil:
      data.allStrapiCotizadores.edges[0].node.imagen_movil.localFile
        .childImageSharp.gatsbyImageData.images.fallback.src,
    imagen_tablet:
      data.allStrapiCotizadores.edges[0].node.imagen_tablet.localFile
        .childImageSharp.gatsbyImageData.images.fallback.src,
  })

  const handleGetBackgroundImage = () => {
    if (matchesLaptop && matchesTablet) {
      return titulo.imagen
    } else if (matchesTablet && !matchesLaptop) {
      return titulo.imagen_tablet
    } else {
      return titulo.imagen_movil
    }
  }

  useEffect(() => {
    titulo && handleGetBackgroundImage()
  }, [matchesLaptop, matchesTablet, titulo])

  function updateTitleCotizador(value, valor) {
    setTitulo({
      ...titulo,
      title: value.texto_principal,
      texto: value.texto_secundario,
      imagen: value.imagen,
      imagen_movil: value.imagen_movil,
      imagen_tablet: value.imagen_tablet,
    })
  }

  return (
    <>
      {insuranceCompany === "OCEANICA" ? (
        <ParallaxView image={handleGetBackgroundImage()}>
          <NewDiv
            ownerState={{
              style: "container",
            }}
          >
            <GridContainer
              justify="center"
              className={sectionPrincipalStyle.containerBudget}
            >
              <GridItem
                xs={12}
                sm={6}
                md={4}
                lg={4}
                className={sectionPrincipalStyle.brand}
                sx={{ display: { xl: "none", xs: "block" } }}
              >
                <NewDiv
                  ownerState={{
                    style: "brandOceanica",
                  }}
                >
                  <div dangerouslySetInnerHTML={{ __html: titulo.title }} />
                  <NewDiv
                    ownerState={{
                      style: "titlePatch",
                    }}
                    dangerouslySetInnerHTML={{ __html: titulo.texto }}
                  />
                </NewDiv>
              </GridItem>
              <GridItem
                xs={12}
                sm={6}
                md={8}
                lg={8}
                className={sectionPrincipalStyle.itemBudget}
              >
                <PestanasCotizadores
                  updateTitle={updateTitleCotizador}
                  insuranceCompany={insuranceCompany}
                />
              </GridItem>
            </GridContainer>
          </NewDiv>
        </ParallaxView>
      ) : (
        <ParallaxView image={handleGetBackgroundImage()}>
          <>
            <NewDiv
              ownerState={{
                style: "contCustom",
              }}
            >
              <GridContainer justify="center">
                <GridItem
                  alignItems="center"
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className={sectionPrincipalStyle.itemBudgetPiramid}
                >
                  <PestanasCotizadores
                    updateTitle={updateTitleCotizador}
                    insuranceCompany={insuranceCompany}
                  />
                </GridItem>
                <GridItem
                  xs={12}
                  sm={6}
                  md={6}
                  lg={6}
                  className={sectionPrincipalStyle.itemBudgetPiramid}
                  sx={{ display: { xs: "none", sm: "block" } }}
                >
                  <NewDiv
                    ownerState={{
                      style: "brand",
                    }}
                  >
                    {/* <ReactMarkdown source={titulo.title} className={classes.titleItalic}/>
                                   <ReactMarkdown source={titulo.texto} className={classes.titlePiramide}/> */}
                    <NewDiv
                      ownerState={{
                        style: "titleItalic",
                      }}
                      dangerouslySetInnerHTML={{ __html: titulo.title }}
                    />
                    <NewDiv
                      ownerState={{
                        style: "titlePiramide",
                      }}
                      dangerouslySetInnerHTML={{ __html: titulo.texto }}
                    />
                  </NewDiv>
                </GridItem>
              </GridContainer>
            </NewDiv>
          </>
        </ParallaxView>
      )}
    </>
  )
}
