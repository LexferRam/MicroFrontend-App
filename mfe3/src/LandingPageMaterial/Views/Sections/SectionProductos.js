import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

//mui components
import { styled } from "@mui/material/styles"
import Extension from "@mui/icons-material/Extension"

//Core components
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import InfoArea from "components/material-kit-pro-react/components/InfoArea/InfoAreaLanding.js"
import CustomButton from "components/material-kit-pro-react/components/CustomButton"
import featuresStyle from "./sectionStyle"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style, index } = ownerState
  if (style) {
    return { ...featuresStyle[style] }
  } else {
    const imageClass120 = (myIndex) => {
      let theClass = null
      if (myIndex === 0) {
        theClass = {
          ...featuresStyle.imgContainer,
          ...featuresStyle.mTop120,
        }
      } else if (myIndex === 1) {
        theClass = {
          ...featuresStyle.imgContainer,
          ...featuresStyle.mTop60,
        }
      } else if (myIndex === 2) {
        theClass = {
          ...featuresStyle.imgContainer,
        }
      } else {
        theClass = {
          ...featuresStyle.imgContainer,
          ...featuresStyle.imgSize,
        }
      }
      return theClass
    }
    return { ...imageClass120(index) }
  }
})

const NewH2 = styled("h2")(({ theme }) => ({
  ...featuresStyle.propTitle,
}))

const NewSpan = styled("span")(({ theme }) => ({
  ...featuresStyle.propTitleOcea,
}))

export default function SectionProductos({ ...rest }) {
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY

  const data = useStaticQuery(graphql`
    {
      allStrapiSegmentosProductos: allStrapiSegmentosProducto (sort: { fields: orden, order: ASC }) {
        edges {
          node {
            identificador_segmento
            nombre_segmento
            codigo_segmento
            orden
            icono
            descripcion {
              data {
                descripcion
              }
            }
            imagen_segmento {
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 90, width: 650, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
      allStrapiProductos: allStrapiProducto (sort: { fields: orden, order: ASC }) {
        edges {
          node {
            nombre_producto
            descripcion_producto {
               data {
                descripcion_producto
               }
            }
            segmento_producto {
              identificador_segmento
            }
            icono {
              localFile {
                childImageSharp {
                  gatsbyImageData(quality: 95, width: 250, layout: CONSTRAINED)
                }
              }
            }
          }
        }
      }
      allStrapiPerfiles: allStrapiPerfile (sort: { fields: orden, order: DESC }) {
        edges {
          node {
            nombre_perfil
            icono_perfil
          }
        }
      }
    }
  `)

  const productos = data.allStrapiProductos.edges
  const segmentos = data.allStrapiSegmentosProductos.edges
  const definitivo = []
  console.log(productos)
  segmentos.map((node, index) => {
    const id = segmentos[index].node.identificador_segmento
    const orden = segmentos[index].node.orden
    segmentos[index].node.hijos = productos.filter(({ node }) =>
      node.segmento_producto.identificador_segmento.includes(id)
    )
    if (orden < 3 && insuranceCompany !== "OCEANICA") {
      definitivo.push(segmentos[index])
    }
    if (insuranceCompany === "OCEANICA") {
      definitivo.push(segmentos[index])
    }
  })

  const marginTL30 = () => {
    let mtl30 = {
      ...featuresStyle.mTop30,
      ...featuresStyle.mLeft30,
      ...featuresStyle.smallScreenBtn,
    }
    return mtl30
  }

  const getFinalImage = (src) => {
    const image = getImage(src)
    return image
  }

  return (
    <>
      {insuranceCompany !== "OCEANICA" ? (
        <div className="cd-section" {...rest}>
          <NewDiv
            ownerState={{
              style: "container",
            }}
          >
            {definitivo.map(({ node }, index) => (
              <NewDiv
                ownerState={{
                  style: "features6",
                }}
                key={`${index}_ab`}
              >
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6}>
                    <NewDiv
                      ownerState={{
                        index: index,
                      }}
                    >
                      <GatsbyImage
                        loading="lazy"
                        image={getFinalImage(node.imagen_segmento.localFile)}
                        alt={` Productos ${node.nombre_segmento}`}
                      />
                    </NewDiv>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6}>
                    <NewH2>{`Productos ${node.nombre_segmento}`}</NewH2>
                    {node.hijos.map(
                      ({ node }, index) =>
                        index <= 1 && (
                          <InfoArea
                            key={`${index}_acc`}
                            className={featuresStyle.infoArea}
                            icon={
                              node.icono.localFile.childImageSharp
                                .gatsbyImageData.images.fallback.src
                                ? null
                                : Extension
                            }
                            title={node.nombre_producto}
                            description={node.descripcion_producto.data.descripcion_producto}
                            iconColor="primary"
                            justificar
                            image={
                              node.icono.localFile.childImageSharp
                                .gatsbyImageData.images.fallback.src
                                ? node.icono.localFile.childImageSharp
                                    .gatsbyImageData.images.fallback.src
                                : null
                            }
                          />
                        )
                    )}
                    <GridItem xs={6} sm={5} md={3} className={marginTL30()}>
                      <Link to={`/Productos/${node.codigo_segmento}`}>
                        <CustomButton
                          className={featuresStyle.buttonLanding}
                          round
                          block
                          color="primary"
                        >
                          Leer más
                        </CustomButton>
                      </Link>
                    </GridItem>
                  </GridItem>
                </GridContainer>
              </NewDiv>
            ))}
          </NewDiv>
        </div>
      ) : (
        <NewDiv
          ownerState={{
            style: "mTop60",
          }}
        >
          <div className="cd-section" {...rest}>
            <NewDiv
              ownerState={{
                style: "container",
              }}
            >
              {definitivo.map(({ node }, index) => (
                <NewDiv
                  ownerState={{
                    style: "features6",
                  }}
                  key={`${index}_ab`}
                >
                  <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={6}>
                      <NewDiv
                        ownerState={{
                          index: 3,
                        }}
                      >
                        <GatsbyImage
                          loading="lazy"
                          fluid={
                            node.imagen_segmento.localFile.childImageSharp
                              .gatsbyImageData
                          }
                          alt={node.nombre_segmento}
                        />
                      </NewDiv>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={6}>
                      <NewSpan>
                        {node.nombre_segmento}
                      </NewSpan>
                      <InfoArea
                        key={`${index}_acc`}
                        className={featuresStyle.infoArea}
                        icon={null}
                        title={node.nombre_producto}
                        description={node.descripcion.data.descripcion}
                        iconColor="primary"
                        justificar
                        image={
                          node.imagen_icono
                            ? node.imagen_icono.localFile.childImageSharp
                                .gatsbyImageData.src
                            : null
                        }
                      />

                      <GridItem xs={6} sm={5} md={3} className={marginTL30()}>
                        <Link to={`/Productos/${node.codigo_segmento}`}>
                          <CustomButton
                            round
                            block
                            color="primary"
                          >
                            Leer más
                          </CustomButton>
                        </Link>
                      </GridItem>
                    </GridItem>
                  </GridContainer>
                </NewDiv>
              ))}
            </NewDiv>
          </div>
        </NewDiv>
      )}
    </>
  )
}
