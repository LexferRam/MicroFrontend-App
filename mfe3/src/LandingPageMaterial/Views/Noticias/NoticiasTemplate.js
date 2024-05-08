import React from "react"
import { styled } from "@mui/material/styles"
import { graphql } from "gatsby"
import LandingPage from "../../Layout/LandingPage"
import Parallax from "components/material-kit-pro-react/components/Parallax/Parallax"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import NoticiaTexto from "./NoticiaTexto"
import NoticiaStyle from "./noticiaStyle"
import CustomButton from "components/material-kit-pro-react/components/CustomButton"

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

const NewDiv = styled("div")(({ theme, className }) => ({
  ...className,
}))

const NewH1 = styled("h1")(({ theme, className }) => ({
  ...className,
}))

export default ({ data }) => {
  const noticia = data.strapiNoticias
  return (
    <LandingPage noLinks={checkPath() ? undefined : true} pageTitle={noticia.titulo_noticia}  >
      <Parallax
        image={noticia.imagen_principal.localFile.childImageSharp.gatsbyImageData.images.fallback.src}
        filter="dark"
        small
      >
        <NewDiv className={NoticiaStyle.container}>
          <GridContainer justify="center">
            <GridItem md={8} className={NoticiaStyle.textCenter}>
              <NewH1 className={NoticiaStyle.title}>
                {noticia.titulo_noticia}
              </NewH1>
            </GridItem>
          </GridContainer>
        </NewDiv>
      </Parallax>
      <NewDiv className={NoticiaStyle.main}>
        <NewDiv className={NoticiaStyle.container}>
          <NoticiaTexto noticia={noticia} />
          <GridContainer
            justify="center"
            className={NoticiaStyle.buttonPadding}
          >
            {checkPath() && (
              <CustomButton round color="primary" onClick={handleBack}>
                Regresar
              </CustomButton>
            )}
          </GridContainer>
        </NewDiv>
      </NewDiv>
    </LandingPage>
  )
}

export const query = graphql`
  query ($id: String!) {
    strapiNoticias: strapiNoticia (id: { eq: $id }) {
      autor
      cuerpo_noticia {
        data {
          cuerpo_noticia
        }
      }
      fecha_publicacion(formatString: "DD/MM/YYYY")
      titulo_noticia
      imagen_principal {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 98, layout: CONSTRAINED)
          }
        }
      }
      imagen_alterna {
        localFile {
          childImageSharp {
            gatsbyImageData(quality: 98, layout: CONSTRAINED)
          }
        }
      }
    }
  }
`
