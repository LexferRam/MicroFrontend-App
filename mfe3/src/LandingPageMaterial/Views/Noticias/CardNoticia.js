import React from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import { Link } from "gatsby"

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

export default function CardNoticia({ node, index }) {
  const getFinalImage = (src) => {
    const image = getImage(src)
    return image
  }
  return (
    <GridItem xs={12} sm={4} md={4} key={index}>
      <Card plain blog>
        <CardHeader plain image>
          <Link to={`/noticias/${node.id}`}>
            <NewImg
              loading="lazy"
              image={getFinalImage(node.imagen_alterna.localFile)}
              alt={node.titulo_noticia}
            />
          </Link>
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
          <NewH4>
            <Link to={`/noticias/${node.id}`}>{node.titulo_noticia}</Link>
          </NewH4>
          <NewDiv
            ownerState={{
              style: "description",
            }}
          >
            {/*<ReactMarkdown className={classes.description} source={`${node.cuerpo_noticia.substring(0,175)}...`} />*/}
            <NewDiv
              ownerState={{
                style: "description",
              }}
              dangerouslySetInnerHTML={{
                __html: `${node.cuerpo_noticia.data.cuerpo_noticia.substring(0, 175)}...`,
              }}
            />
            <Typography variant="caption" color="primary">
              <Link to={`/noticias/${node.id}`}>Continuar...</Link>
            </Typography>
          </NewDiv>
        </CardBody>
      </Card>
    </GridItem>
  )
}
