/*eslint-disable*/
import React from "react"
// import { graphql, useStaticQuery } from "gatsby"
// @material-ui/core components
import { styled } from "@mui/material/styles"
import WhatsAppIcon from "@mui/icons-material/WhatsApp"
import InstagramIcon from "@mui/icons-material/Instagram"
import FacebookIcon from "@mui/icons-material/Facebook"
import TwitterIcon from "@mui/icons-material/Twitter"
import YouTubeIcon from "@mui/icons-material/YouTube"

// core components
// import GridContainer from "../../components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridContainer from "../../components/Grid/GridContainer.js"
// import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import GridItem from "../../components/Grid/GridItem.js"
// import CustomButton from "components/material-kit-pro-react/components/CustomButton"
import CustomButton from "../../components/CustomButton"
import Footer from "./Footer"
// import LogoPiramide from "../../../../../static/icono_piramide.svg"
// import LogoOceanica from "../../../../../static/icon_mask_oceanica.png"
import styles from "./footerSectionStyle"

let socialTw = ""
let socialIg = ""
let socialFb = ""

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...styles[style] }
})

const NewP = styled("p")(({ theme }) => {
  return { ...styles.copyRightSize }
})

const NewImg = styled("img")(({ theme }) => {
  return { ...styles.logo }
})

const NewUl = styled("ul")(({ theme }) => {
  return { ...styles.linksVertical }
})


export default function FooterSection() {
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  if (insuranceCompany !== "OCEANICA") {
    socialTw = "https://twitter.com/SegPiramide?s=20"
    socialIg =
      "https://instagram.com/piramidesegurosoficial?igshid=obklqxqunbsw"
    socialFb = "https://www.youtube.com/channel/UC0hcuzQt11uutCSDLn34hkg"
  } else if (insuranceCompany === "OCEANICA") {
    socialTw = "https://twitter.com/"
    socialIg = "https://www.instagram.com/oceanicadesegurosve/?hl=es-la"
    socialFb = "https://www.youtube.com/channel/UC8pqzSfrMDlST2kv104weJQ"
  }

  const data = []
  //  useStaticQuery(graphql`
  //   query {
  //     allStrapiSegmentosProductos: allStrapiSegmentosProducto(sort: { fields: orden }) {
  //       edges {
  //         node {
  //           nombre_segmento
  //           codigo_segmento
  //         }
  //       }
  //     }
  //     allStrapiPerfiles: allStrapiPerfile(sort: { fields: orden }) {
  //       edges {
  //         node {
  //           nombre_perfil
  //         }
  //       }
  //     }
  //   }
  // `)

  return (
    <Footer
      theme="dark"
      content={
        <>
          <div>
            <div>
              <NewP>
                &copy; {1900 + new Date().getYear()}{" "}
                {insuranceCompany == "OCEANICA"
                  ? "Oceánica de Seguros"
                  : "Pirámide Seguros"}
                , C.A -{" "}
                {insuranceCompany == "OCEANICA"
                  ? "Todos los derechos reservados, RIF. J-306206329. Inscrita en la Superintendencia de la Actividad Aseguradora bajo el número 117. Publicidad aprobada por la Superintendencia de la Actividad Aseguradora bajo el N° 1054-2015"
                  : "Todos los derechos reservados, RIF. J-00106474-5. Inscrita en la Superintendencia de la Actividad Aseguradora bajo el número 80. Publicidad aprobada por la Superintendencia de la Actividad Aseguradora bajo el N° 15.091"}
              </NewP>
            </div>
          </div>
        </>
      }
    >
      <GridContainer style={{ textAlign: "center" }}>
        <GridItem xs={12} sm={12} md={4}>
          <NewDiv
            ownerState={{
              style: "logoPosition",
            }}
          >
            <CustomButton
              href="#"
              className={styles.button__logo}
              color="transparent"
            >
              {insuranceCompany == "OCEANICA" ? (
                <NewImg
                  width={50}
                  src={''}
                  alt="Oceánica de Seguros"
                />
              ) : (
                <NewImg
                  width={50}
                  src={''}
                  alt="Pirámide Seguros"
                />
              )}
            </CustomButton>
          </NewDiv>
        </GridItem>
        {/*<GridItem xs={6} sm={3} md={2}>
            <h5>Servicios</h5>
            <ul className={classes.linksVertical}>
              {data.allStrapiPerfiles.edges.map(({ node }, index) => (
                <li key={index}>
                  <a href={`/Servicios/${node.nombre_perfil}`}>{node.nombre_perfil}</a>
                </li>

              ))}
            </ul>
              </GridItem>*/}
        <GridItem xs={6} sm={4} md={2}>
          <h5>Productos</h5>
          <NewUl>
            {data?.allStrapiSegmentosProductos.edges.map(({ node }, index) => (
              <li key={index}>
                <a href={`/Productos/${node.codigo_segmento}`}>
                  {node.nombre_segmento}
                </a>
              </li>
            ))}
          </NewUl>
        </GridItem>
        <GridItem xs={6} sm={4} md={2}>
          <h5>Contáctanos</h5>
          <GridContainer>
            <GridItem xs={6} style={{ textAlign: "right", paddingRight: "0" }}>
              <span style={{ fontSize: "23px" }}>0800</span>
            </GridItem>
            <GridItem
              xs={6}
              style={{
                paddingLeft: "5px",
                textAlign: "left",
                fontSize: "12px",
              }}
            >
              {insuranceCompany !== "OCEANICA" ? (
                <>
                  <span>SPIRAMI</span>
                  <br />
                  <span>7747264</span>
                </>
              ) : (
                <>
                  <span>OCEANIC</span>
                  <br />
                  <span>6232642</span>
                </>
              )}
            </GridItem>
          </GridContainer>
          {insuranceCompany !== "OCEANICA" ? (
            <>
              <GridContainer>
                <GridItem
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "0" }}
                >
                  <span style={{ fontSize: "23px" }}>0212</span>
                </GridItem>
                <GridItem
                  xs={6}
                  style={{
                    padding: "8px 0 0 5px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <span>2190400</span>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "0" }}
                >
                  <span style={{ fontSize: "23px" }}>0212</span>
                </GridItem>
                <GridItem
                  xs={6}
                  style={{
                    padding: "8px 0 0 5px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <span>2193698</span>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "0" }}
                >
                  <span style={{ fontSize: "23px" }}>0212</span>
                </GridItem>
                <GridItem
                  xs={6}
                  style={{
                    padding: "8px 0 0 5px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <span>3194940</span>
                </GridItem>
              </GridContainer>
            </>
          ) : (
            <>
              <GridContainer>
                <GridItem
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "0" }}
                >
                  <span style={{ fontSize: "23px" }}>0212</span>
                </GridItem>
                <GridItem
                  xs={6}
                  style={{
                    padding: "8px 0 0 5px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <span>3003800</span>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "0" }}
                >
                  <span style={{ fontSize: "23px" }}>0212</span>
                </GridItem>
                <GridItem
                  xs={6}
                  style={{
                    padding: "8px 0 0 5px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <span>2193699</span>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem
                  xs={6}
                  style={{ textAlign: "right", paddingRight: "0" }}
                >
                  <span style={{ fontSize: "23px" }}>0212</span>
                </GridItem>
                <GridItem
                  xs={6}
                  style={{
                    padding: "8px 0 0 5px",
                    textAlign: "left",
                    fontSize: "12px",
                  }}
                >
                  <span>3194930</span>
                </GridItem>
              </GridContainer>
            </>
          )}
        </GridItem>
        <GridItem xs={6} sm={4} md={2}>
          <h5>Síguenos</h5>
          <NewDiv
            ownerState={{
              style: "socialFeed",
            }}
          >
            <div>
              {insuranceCompany !== "OCEANICA" && (
                <a
                  href={socialTw}
                  target="_blank"
                  rel="noopener"
                  style={{ paddingRight: "5px" }}
                >
                  <TwitterIcon style={{ color: "white" }} />
                </a>
              )}
              <a
                href={socialIg}
                target="_blank"
                rel="noopener"
                style={{ paddingRight: "5px" }}
              >
                <InstagramIcon style={{ color: "white" }} />
              </a>
              <a href={socialFb} target="_blank" rel="noopener">
                <YouTubeIcon style={{ color: "white" }} />
              </a>
            </div>
          </NewDiv>
        </GridItem>
      </GridContainer>
    </Footer>
  )
}
