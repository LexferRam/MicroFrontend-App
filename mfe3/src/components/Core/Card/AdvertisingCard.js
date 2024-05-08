import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

//@mui components
import { styled } from "@mui/material/styles"

//Core components
import Card from "components/material-kit-pro-react/components/Card/Card.js"
import CardBody from "components/material-kit-pro-react/components/Card/CardBody.js"
import CardHeader from "components/material-kit-pro-react/components/Card/CardHeader.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"

import styles from "LandingPageMaterial/Views/Sections/sectionNoticiasStyle"


const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...styles[style] }
})

const NewImg = styled(GatsbyImage)(({ theme }) => {
  return { ...styles.cardImg }
})

const NewH4 = styled("h4")(({ theme }) => {
  return { ...styles.cardTitle }
})

export default function CardNoticia({ node, index, mdSize }) {

  const getTabImage = () => {
    window.open(
      `${window.location.origin}/publicaciones_asesor_detalle?imgsrc=${node.imagen_alterna.childImageSharp.fluid.src}`,
      "_blank"
    )
  }

  const getToAdvertising = (node) => {
    window.open(`${window.location.origin}/publicaciones_asesor/${node.id}`)
  }

  const getFinalImage = (src) => {
    const image = getImage(src)
    return image
  }

 

  return (
    <GridItem xs={12} sm={4} md={mdSize} key={index}>
      <Card plain blog>
        <CardHeader plain image>
          <NewDiv
            ownerState={{
              style: "imgContainer",
            }}
            onClick={() => getToAdvertising(node)}
          >
            <NewImg
              loading="lazy"
              image={getFinalImage(node.imagen_principal.localFile)}
              alt={node.titulo_publicidad}
            />
          </NewDiv>
          <NewDiv
            ownerState={{
              style: "coloredShadow",
            }}
            style={{
              backgroundImage: `url(${node.imagen_principal.localFile.childImageSharp.gatsbyImageData.images.fallback.src})`,
              opacity: "1",
            }}
          />
        </CardHeader>
        <CardBody plain>
          <NewH4
            onClick={() => getToAdvertising(node)}
          >
            {node.titulo_publicidad}
          </NewH4>
        </CardBody>
      </Card>
    </GridItem>
  )
}
