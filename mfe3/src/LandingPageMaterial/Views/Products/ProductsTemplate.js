import React from "react"
import { graphql } from "gatsby"
import { styled } from "@mui/material/styles"

import LandingPage from "../../Layout/LandingPage"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import Parallax from "components/material-kit-pro-react/components/Parallax/Parallax.js"
import SectionTemplate from "LandingPageMaterial/Views/Sections/SectionTemplate"
import TabSimple from "components/Core/Tabs/TabSimple"

import SectionCoberturas from "LandingPageMaterial/Views/Products/SectionCoberturas"

import sectionStyle from "LandingPageMaterial/Views/Sections/sectionStyle"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...sectionStyle[style] }
})

const NewH2 = styled("h2")(({ theme, className }) => ({
  ...className,
}))

const gridItemAutoClasses = {
  ...sectionStyle.mlAuto,
  ...sectionStyle.mrAuto,
}

export default ({ data }) => {
  const [activeBackground, setActiveBackground] = React.useState(0)
  const [value, setValue] = React.useState(0)

  const handleActiveBackground = (value) => {
    setActiveBackground(value)
  }

  const handleChange = (event, newValue, swiper) => {
    setValue(newValue)
    handleActiveBackground(newValue)
    if (swiper) swiper.slideTo(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const productos = data.allStrapiProductos.edges
  const coberturasT = data.allStrapiSeccionesProductos.edges
  const nombreTitlePage = productos[0].node.segmento_producto.nombre_segmento || ' Productos '

  const navtabs = productos.map(({ node }) => {
    const id = node.codigo_producto
    const coberturas = coberturasT.filter(
      ({ node }) => node.producto?.codigo_producto === id
    )
    return {
      titulo: node.nombre_producto,
      id: node.id,
      component: tabProducto(node, coberturas),
    }
  })

  return (
    <LandingPage pageTitle={nombreTitlePage} >
      <Parallax
        small
        image={
          productos[activeBackground].node.imagen_producto.localFile
            .childImageSharp.gatsbyImageData.images.fallback.src
        }
      >
        <NewDiv
          ownerState={{
            style: "container",
          }}
        >
          <GridContainer justify="center">
            <GridItem
              xs={12}
              sm={12}
              md={8}
              ownerState={{
                style: "textCenter",
              }}
            >
              {/* <h2 className={classes.title}>Productos {productos[0].node.segmento_producto.nombre_segmento}</h2> */}
            </GridItem>
          </GridContainer>
        </NewDiv>
      </Parallax>
      <SectionTemplate>
        <TabSimple
          value={value}
          onChange={handleChange}
          variant={navtabs.length > 4 ? "scrollable" : "standard"}
          centered={navtabs.length > 4 ? false : true}
          indicatorColor="primary"
          textColor="primary"
          scrollButtons="auto"
          data={navtabs}
          handleChangeIndex={handleChangeIndex}
        />
        <NewDiv
          ownerState={{
            style: "tabSpace",
          }}
        />
      </SectionTemplate>
    </LandingPage>
  )

  function tabProducto(props, coberturas) {
    return (
      <>
        <GridContainer justify="center">
          <GridItem xs={12} sm={10} md={10} className={gridItemAutoClasses}>
            <NewH2 className={sectionStyle.title}>
              {props.titulo_producto}
            </NewH2>
          </GridItem>
        </GridContainer>
        <GridContainer justify="center">
          <GridItem md={10} sm={10} className={gridItemAutoClasses}>
            <NewDiv
              ownerState={{
                style: "dSized14",
              }}
              dangerouslySetInnerHTML={{ __html: props.descripcion_producto.data.descripcion_producto }}
            />
          </GridItem>
        </GridContainer>
        <br />
        <GridContainer justify="center">
          <GridItem md={10} sm={10} className={gridItemAutoClasses}>
            {coberturas.map(({ node }, index) => (
              <SectionCoberturas
                key={index}
                image={
                  node.imagen_seccion.localFile.childImageSharp.gatsbyImageData.images.fallback.src
                }
                title={node.nombre_seccion}
                description={node.texto_seccion.data.texto_seccion}
                derecha={!!(index % 2)}
              />
            ))}
          </GridItem>
        </GridContainer>
      </>
    )
  }
}

export const query = graphql`
  query ($id: String!) {
    allStrapiProductos: allStrapiProducto (
      filter: { segmento_producto: { identificador_segmento: { eq: $id } } }
      sort: { order: ASC, fields: orden }
    ) {
      edges {
        node {
          codigo_producto
          descripcion_producto {
            data {
              descripcion_producto
            }
          }
          nombre_producto
          imagen_producto {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 95, layout: FULL_WIDTH)
              }
            }
          }
          segmento_producto {
            nombre_segmento
          }
        }
      }
    }
    allStrapiSeccionesProductos: allStrapiSeccionesProducto(
      sort: { fields: orden, order: ASC }
    ) {
      edges {
        node {
          nombre_seccion
          texto_seccion {
            data {
              texto_seccion
            }
          }
          imagen_seccion {
            localFile {
              childImageSharp {
                gatsbyImageData(quality: 80, width: 480, layout: CONSTRAINED)
              }
            }
          }
          producto {
            codigo_producto
          }
        }
      }
    }
  }
`
