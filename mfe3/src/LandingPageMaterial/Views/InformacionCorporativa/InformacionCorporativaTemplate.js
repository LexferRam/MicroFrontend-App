import React, { useEffect, useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import { styled } from "@mui/material/styles"
import LandingPage from "LandingPageMaterial/Layout/LandingPage"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import Parallax from "components/material-kit-pro-react/components/Parallax/Parallax.js"
import SectionTemplate from "LandingPageMaterial/Views/Sections/SectionTemplate"
import TabSimple from "components/Core/Tabs/TabSimple"
import sectionStyle from "LandingPageMaterial/Views/Sections/sectionStyle"
import SectionCoberturas from "LandingPageMaterial/Views/Products/SectionCoberturas"
import InfoArea from "components/material-kit-pro-react/components/InfoArea/InfoAreaLanding.js"

const NewDiv = styled("div")(({ theme }) => ({
  ...sectionStyle.p,
}))

const InformacionCorporativaTemplate = ({ data }) => {
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY

  const [value, setValue] = useState(0)
  const [activeBackground, setActiveBackground] = useState(0)

  const handleActiveBackground = (value) => {
    setActiveBackground(value)
  }

  const handleChange = (event, newValue) => {
    setValue(newValue)
    handleActiveBackground(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const seccionesObj = data.allStrapiSeccionesInfoCorporativas.nodes
  const informacionObj = data.allStrapiInformacionCorporativas.edges

  const navtabs = informacionObj.map(({ node }) => {
    const id = node.codigo
    const NombreTabs = node.nombre
    const secciones = seccionesObj.filter(
      (node) => node.informacion_corporativa.codigo === id
    )
    return {
      titulo: NombreTabs,
      component: tabProducto(node, secciones),
    }
  })

  function tabProducto(props, secciones) {
    const classNames = { ...sectionStyle.mrAuto, ...sectionStyle.mlAuto }
    let descrip = '';
    if(props.descripcion && 
       props.descripcion.data && 
       props.descripcion.data.descripcion){
        descrip = props.descripcion.data.descripcion
       }
    return (
      <>
        {value === 0 && (
          <GridContainer justify="center">
            <GridItem md={10} sm={10} className={classNames}>
              <br />
              <br />
              <NewDiv
                dangerouslySetInnerHTML={{
                  __html: descrip,
                }}
              />
            </GridItem>
          </GridContainer>
        )}
        <GridContainer justify="center">
          <GridItem md={10} sm={10} className={classNames}>
            {secciones.map((node, index) => (
              <>
                {node.imagen_seccion !== null ? (
                  <SectionCoberturas
                    key={index}
                    image={
                      node.imagen_seccion
                        ? node.imagen_seccion.localFile.childImageSharp
                            .gatsbyImageData.images.fallback.src
                        : null
                    }
                    title={node.nombre_seccion}
                    description={node.texto_seccion.data.texto_seccion}
                    derecha={!!(index % 2)}
                  />
                ) : (
                  <InfoArea
                    key={`${index}_acc`}
                    className={sectionStyle.infoArea}
                    icon={null}
                    title={node.nombre_seccion}
                    description={node.texto_seccion.data.texto_seccion}
                    iconColor="primary"
                    image={null}
                  />
                )}
                <br />
              </>
            ))}
          </GridItem>
        </GridContainer>
      </>
    )
  }

  return (
    <LandingPage pageTitle="Información Corporativa">
      <Parallax
        small
        image={
          informacionObj[activeBackground].node.imagen.localFile.childImageSharp.gatsbyImageData.images.fallback.src
        }
      >
        <div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}></GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <SectionTemplate>
        <TabSimple
          value={value}
          onChange={handleChange}
          variant="standard"
          centered={true}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          data={navtabs}
          handleChangeIndex={handleChangeIndex}
        />
      </SectionTemplate>
    </LandingPage>
  )
}

export const query = graphql`
  {
    allStrapiInformacionCorporativas: allStrapiInformacionCorporativa {
      totalCount
      edges {
        node {
          descripcion {
            data {
              descripcion
            }
          }
          imagen {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 95, layout: FULL_WIDTH)
              }
            }
          }
          codigo
          nombre
          orden
          id
        }
      }
    }
    allStrapiSeccionesInfoCorporativas: allStrapiSeccionesInfoCorporativa {
      nodes {
        id
        nombre_seccion
        orden
        texto_seccion {
          data {
            texto_seccion
          }
        }
        informacion_corporativa {
          codigo
          id
          nombre
          orden
        }
        imagen_seccion {
          localFile {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
            }
          }
        }
      }
    }
  }
`

export default InformacionCorporativaTemplate
