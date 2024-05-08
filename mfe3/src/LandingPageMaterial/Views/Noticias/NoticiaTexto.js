import React from "react"
import { styled } from "@mui/material/styles"

import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import Card from "components/material-kit-pro-react/components/Card/Card.js"
import CardHeader from "components/material-kit-pro-react/components/Card/CardHeader.js"

import { GatsbyImage, getImage } from "gatsby-plugin-image"

import noticiaTextoStyle from "./noticiaTextoStyle"

const NewDiv = styled("div")(({ theme, className }) => ({
  ...className,
}))

const NewH5 = styled("div")(({ theme, className }) => ({
  ...className,
}))

export default function NoticiaTexto(props) {
  const { noticia } = props
  const getFinalImage = (src) => {
    const image = getImage(src)
    return image
  }

  return (
    <NewDiv className={noticiaTextoStyle.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={4} md={4}>
          <Card plain blog>
            <CardHeader plain image>
              <GatsbyImage
                loading="lazy"
                image={getFinalImage(noticia.imagen_alterna.localFile)}
                alt={noticia.titulo_noticia}
              />
              <NewDiv
                className={noticiaTextoStyle.coloredShadow}
                style={{
                  backgroundImage: `url(${noticia.imagen_alterna.localFile.childImageSharp.gatsbyImageData.images.fallback.src})`,
                  opacity: "1",
                }}
              />
            </CardHeader>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={8} md={8}>
          <NewH5 className={noticiaTextoStyle.title}>
            Por {noticia.autor} - {noticia.fecha_publicacion}
          </NewH5>
          {/*<ReactMarkdown source={noticia.cuerpo_noticia} />*/}
          <div dangerouslySetInnerHTML={{ __html: noticia.cuerpo_noticia.data.cuerpo_noticia}} />
        </GridItem>
      </GridContainer>
    </NewDiv>
  )
}
