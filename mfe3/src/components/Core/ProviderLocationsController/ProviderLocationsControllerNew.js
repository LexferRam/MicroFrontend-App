import React, { useState, useEffect } from "react"
import CardsUbication from "./CardsUbication"
import providerLocationsControllerStyle from "./providerLocationsControllerStyle"
import ProviderSearchEngine from "./ProviderSearchEngine"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import ProviderForm from "./ProviderForm"
import Card from "components/material-kit-pro-react/components/Card/Card.js"
import CardBody from "components/material-kit-pro-react/components/Card/CardBody.js"
import PiramideMap from "../../../../static/mapa_piramide.jpg"
import OceanicaMap from "../../../../static/mapa_oceanica.jpg"
import QRPiramideAliados from "../../../../static/QR_Aliados_Piramide.png"

const Company = process.env.GATSBY_INSURANCE_COMPANY
// console.log("VALOR DE COMPANYYYY",Company)
let searchLevel = 0
let mapMessage = ""
let mapMessageAddress =
  "Direcciones cercanas. Colocando el ratón sobre los indicadores\
                        de color azúl, puede ver la dirección de cada uno. Haga click \
                        sobre estos para recibir instrucciones de como llegar. \
                        Los de color verde muestran más direcciones."
let mapMessageName =
  "Sitio encontrado. Colocando el ratón sobre los indicadores \
                          de color azúl, puede ver la dirección de cada uno. Haga \
                          click sobre estos para recibir instrucciones de como llegar. \
                          Los de color verde muestran más direcciones."
let mapMessageRed = "No es posible indicar una calle o avenida cercana."
let fontColour = ""
let fontColourRed = "#FC2D22"
let fontColourGreen = "#00838f"
let classArray = []
let loadingTmp = ""
let engineStatus = false

const ProviderLocationsControllerNew = (props) => {
  const [viewManager, setViewManager] = useState("ProviderForm")
  const [searchActive, setSearchActive] = useState(false)
  const [valueLoading, setValueLoading] = useState(true)
  const [providerList, setProviderList] = useState([])
  const [providMapSearch, setProvidMapSearch] = useState([])
  const [dataProvSelected, setDataProvSelected] = useState([])
  const [category, setCategory] = useState("")

  const providerData = (data) => {
    setProviderList(data)
    setViewManager("ProviderList")
  }

  const coordProvReturned = (item) => {
    if (item.statusType === "empty" && searchLevel === 0) {
      searchLevel = 1
      setValueLoading(true)
      setSearchActive(true)
    } else if (item.statusType === "address" && searchLevel === 1) {
      setProvidMapSearch(item)
      searchLevel = 2
      mapMessage = mapMessageAddress
      fontColour = fontColourGreen
      setValueLoading(false)
      engineStatus = false
      setSearchActive(true)
    } else if (item.statusType === "name" && searchLevel === 0) {
      setProvidMapSearch(item)
      searchLevel = 2
      mapMessage = mapMessageName
      fontColour = fontColourGreen
      setValueLoading(false)
      engineStatus = false
      setSearchActive(true)
    } else {
      setProvidMapSearch({
        providerMap: [[6.745673, -65.275475, "Jauja-Sarisariñama"]],
      })
      searchLevel = 2
      mapMessage = mapMessageRed
      fontColour = fontColourRed
      setValueLoading(false)
      engineStatus = false
      setSearchActive(true)
    }
  }

  const providerSelected = (item) => {
    if (!engineStatus) {
      searchLevel = 0
      setDataProvSelected(item)
      mapMessage = ""
      fontColour = ""
      setValueLoading(true)
      engineStatus = true
      setSearchActive(true)
    } else {
    }
  }
  const markerData = (item) => {
    //Permite capturar las coordenadas de latitud y longitud del marcador al
    //que el usuario ha hecho click. adema de traer la url para Google maps.
  }
  const showLoading = () => {
    loadingTmp = valueLoading
      ? [providerLocationsControllerStyle.linealShow]
      : [providerLocationsControllerStyle.linealHide]
    return loadingTmp.join(" ")
  }
  const retToProvLocContr = (item) => {
    if (props.callFrom !== "SectionLocations") {
      props.returnToForm(item)
    }
  }

  useEffect(() => {
    if (searchActive) {
      ProviderSearchEngine({
        item: dataProvSelected,
        searchLevel: searchLevel,
        coordProvReturned: coordProvReturned,
      })
      setSearchActive(false)
    }
  }, [searchActive])

  return (
    <GridContainer>
      <ProviderForm
        serviceType={props.serviceType}
        callFrom={props.callFrom}
        providerData={providerData}
        retToProvLocContr={retToProvLocContr}
        serviceTypeForValidate={props.serviceTypeForValidate}
        setCategory={setCategory}
      />

      {providerList?.length === 0 ? (
        <GridItem xs={12} sm={12} md={8} align="center">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card
                background
                style={{
                  backgroundImage:
                    Company === "PIRAMIDE"
                      ? `url(${PiramideMap})`
                      : `url(${OceanicaMap})`,

                  height: "75%",
                }}
              >
                <CardBody background style={{ marginTop: "-34px" }}>
                  <h3>Ubicación de Aliados</h3>
                  {Company === "PIRAMIDE" ? (
                    <img
                      src={QRPiramideAliados}
                      alt="QR"
                      style={{ width: "33%" }}
                    />
                  ) : null}

                  {Company === "PIRAMIDE" ? (
                    <p>
                      Escanea el código QR y obtén el formulario para conocer la
                      ubicación e indicaciones de cómo llegar.
                    </p>
                  ) : (
                    <p>
                      Con este formulario puedes conocer la ubicación de todos
                      nuestros aliados y recibir las indicaciones de cómo
                      llegar.
                    </p>
                  )}
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      ) : (
        <>
          <GridItem xs={12} sm={12} md={8}>
            <CardsUbication
              callFrom={props.callFrom}
              providerSelected={providerSelected}
              providMapSearch={providMapSearch}
              markerData={markerData}
              providerList={providerList}
              showLoading={showLoading}
              category={category}
            />
          </GridItem>
        </>
      )}
    </GridContainer>
  )
}

export default ProviderLocationsControllerNew
