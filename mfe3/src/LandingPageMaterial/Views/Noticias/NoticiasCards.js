import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import CardNoticia from "LandingPageMaterial/Views/Noticias/CardNoticia"

export default function NoticiasCards() {
  const data = useStaticQuery(
    graphql`
      {
        allStrapiNoticias: allStrapiNoticia (
          limit: 3
          sort: { order: DESC, fields: fecha_publicacion }
          filter: {
            categoria_publicacion: { identificador_categoria: { eq: "1" } }
          }
        ) {
          edges {
            node {
              id
              autor
              titulo_noticia
              cuerpo_noticia {
                data {
                  cuerpo_noticia
                }
              }
              area_seguro_noticia {
                nombre_area_seguro
              }
              imagen_principal {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      quality: 100
                      width: 700
                      layout: CONSTRAINED
                    )
                  }
                }
              }
              imagen_alterna {
                localFile {
                  childImageSharp {
                    gatsbyImageData(
                      quality: 100
                      width: 700
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
  const noticias = data.allStrapiNoticias.edges

  return (
    <GridContainer>
      {noticias.map(({ node }, index) => (
        <CardNoticia node={node} index={index} key={index + 7} />
      ))}
    </GridContainer>
  )
}
