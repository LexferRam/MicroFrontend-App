import React from "react"
import { styled } from "@mui/material/styles"
import { graphql, useStaticQuery } from "gatsby"
import TabSimpleFormLanding from "components/Core/Tabs/TabSimpleFormLanding"
import BudgetVehiclePublic from "Portal/Views/Budget/BudgetVehicle/BudgetVehiclePublic"
import BudgetPersonsPublic from "Portal/Views/Budget/BudgetPersons/BudgetPersonsPublic"
import BudgetTravelPublic from "Portal/Views/Budget/BudgetTravel/BudgetTravelPublic"
import BudgetPatrimonialPublic from "Portal/Views/Budget/BudgetPatrimonial/BudgetPatrimonialPublic"
import BudgetPetsPublic from "Portal/Views/Budget/BudgetPets/initPublic/BudgetPetsPublic"
import BudgetPersonalAccidentsPublic from 'Portal/Views/Budget/BudgetPersonalAccidents/BudgetPersonalAccidentsPublic'
import styles from "./pestanasCotizadoresStyle"
import BudgetHomePublic from "Portal/Views/Budget/BudgetHome/BudgetHomePublic"

export default function ScrollableTabsButtonForce(props) {
  const { updateTitle } = props

  const NewP = styled("p")(({ theme }) => ({
    color: theme.palette.primary.main,
    opacity: "0.9",
    fontSize: "17px",
    margin: 0,
    textAlign: "center",
  }))

  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    updateTitle && updateTitle(tabs[newValue], newValue)
  }

  const data = useStaticQuery(
    graphql`
      query {
        allStrapiCotizadores: allStrapiCotizadore(sort: { fields: orden }) {
          edges {
            node {
              id
              orden
              codigo_cotizador
              nombre_cotizador
              texto_principal {
                data {
                  texto_principal
                }
              }
              texto_secundario {
                data {
                  texto_secundario
                }
              }
              imagen_fondo {
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                  }
                }
              }
              imagen_tablet {
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                  }
                }
              }
              imagen_movil {
                localFile {
                  childImageSharp {
                    gatsbyImageData(quality: 100, layout: FULL_WIDTH)
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const tabs = []
  const cotizadores = data.allStrapiCotizadores.edges
  const arrayReturn = cotizadores.map((node) => {
    tabs.push({
      id: node.node.id,
      titulo: node.node.nombre_cotizador,
      value: node.node.orden,
      texto_principal: node.node.texto_principal.data.texto_principal,
      texto_secundario: node.node.texto_secundario.data.texto_secundario,
      imagen:
        node.node.imagen_fondo.localFile.childImageSharp.gatsbyImageData.images
          .fallback.src,
      imagen_movil:
        node.node.imagen_movil.localFile.childImageSharp.gatsbyImageData.images
          .fallback.src,
      imagen_tablet:
        node.node.imagen_tablet.localFile.childImageSharp.gatsbyImageData.images
          .fallback.src,
      component:
        node.node.codigo_cotizador === "COT_AUTO" ? (
          <BudgetVehiclePublic />
        ) : node.node.codigo_cotizador === "COT_SALUD" ? (
          <BudgetPersonsPublic />
        ) : node.node.codigo_cotizador === "COT_HOGAR" ? (
          <BudgetHomePublic />
        ) : node.node.codigo_cotizador === "COT_MASC" ? (
          <BudgetPetsPublic />
        ) : node.node.codigo_cotizador === "COT_VIAJE" ? (
          <BudgetTravelPublic />
        ) : node.node.codigo_cotizador === "COT_PYME" ? (
          <BudgetPatrimonialPublic />
        ) : node.node.codigo_cotizador === "COT_APIN" ? (
          <BudgetPersonalAccidentsPublic />
        ) :null,
    })
  })
  return (
    <div style={{ ...styles.container }}>
      <NewP>Póliza de forma rápida y sencilla</NewP>

      <TabSimpleFormLanding
        value={value}
        onChange={handleChange}
        variant={tabs.length > 2 ? "scrollable" : "standard"}
        centered={tabs.length > 2 ? false : true}
        indicatorColor="primary"
        textColor="primary"
        scrollButtons="auto"
        data={tabs}
      />
    </div>
  )
}
