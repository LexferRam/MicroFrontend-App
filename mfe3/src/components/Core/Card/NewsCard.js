import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

//@mui components
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

//Core components
import Card from "components/material-kit-pro-react/components/Card/Card.js"
import CardBody from "components/material-kit-pro-react/components/Card/CardBody.js"
import CardHeader from "components/material-kit-pro-react/components/Card/CardHeader.js"
import Info from "components/material-kit-pro-react/components/Typography/Info.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"

import styles from "LandingPageMaterial/Views/Sections/sectionNoticiasStyle"

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...styles[style] }
})

const NewImg = styled(GatsbyImage)(({ theme }) => {
  return { ...styles.cardImg }
})

const NewH6 = styled("h6")(({ theme }) => {
  return { ...styles.cardCategory }
})

const NewH4 = styled("h4")(({ theme }) => {
  return { ...styles.cardTitle }
})

const NewTypography = styled(Typography)(({ theme }) => {
  return { ...styles.link }
})

export default function NewsCard({ node, index, mdSize }) {
 
  const getFinalImage = (src) => {
    const image = getImage(src)
    return image
  }

  const goToNews = (node) => {
    window.open(`${window.location.origin}/noticias_asesor/${node.id}`)
  }

  return (
    <GridItem xs={12} sm={4} md={mdSize} key={index}>
      <Card plain blog>
        <CardHeader plain image>
          <NewDiv
            ownerState={{
              style: "imgContainer",
            }}
            onClick={() => goToNews(node)}
          >
            <NewImg
              loading="lazy"
              image={getFinalImage(node.imagen_alterna.localFile)}
              alt={node.titulo_noticia}
            />
          </NewDiv>
          <NewDiv
            ownerState={{
              style: "coloredShadow",
            }}
            style={{
              backgroundImage: `url(${node.imagen_alterna.localFile.childImageSharp.gatsbyImageData.images.fallback.src})`,
              opacity: "1",
            }}
          />
        </CardHeader>
        <CardBody plain>
          <Info>
            <NewH6>{node.area_seguro_noticia.nombre_area_seguro}</NewH6>
          </Info>
          <NewH4 onClick={() => goToNews(node)}>
            {node.titulo_noticia}
          </NewH4>
          <NewDiv
            ownerState={{
              style: "description",
            }} onClick={() => goToNews(node)}>
            {/*<ReactMarkdown className={classes.description} source={`${node.cuerpo_noticia.substring(0,175)}...`}/>*/}
            <NewDiv
              ownerState={{
                style: "description",
              }}
              dangerouslySetInnerHTML={{
                __html: `${node.cuerpo_noticia.data.cuerpo_noticia.substring(0, 175)}...`,
              }}
            />
            <NewTypography variant="p" color="primary">
              Leer más
            </NewTypography>
          </NewDiv>
        </CardBody>
      </Card>
    </GridItem>
  )
}
