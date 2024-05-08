import React, { useState, useEffect } from "react"
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import providerLocationsControllerStyle from "./providerLocationsControllerStyle"
import ProviderForm from "./ProviderForm"
import Card from "components/material-kit-pro-react/components/Card/Card.js"
import CardBody from "components/material-kit-pro-react/components/Card/CardBody.js"
import CardFooter from "components/material-dashboard-pro-react/components/Card/CardFooter"
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import Icon from '@mui/material/Icon';


import ProviderSearchEngine from "./ProviderSearchEngine"
import CardsUbication from "./CardsUbication"
import smallMap from "../../../../static/map-algor.png"

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

export default function ProviderLocationsController(props) {
  //const classes = useStyles()
  const [viewManager, setViewManager] = useState("ProviderForm")
  const [searchActive, setSearchActive] = useState(false)
  const [valueLoading, setValueLoading] = useState(true)
  const [providerList, setProviderList] = useState([])
  const [providMapSearch, setProvidMapSearch] = useState([])
  const [dataProvSelected, setDataProvSelected] = useState([])
  const {setToggleFormMap} = props

console.log(setToggleFormMap)

  const providerData = data => {
    setProviderList(data)
    setViewManager("ProviderList")
  }

  const handletoggleFormMap = () => {
    setToggleFormMap(true)
  }

  /*const funcClassMsg = fontColour => {
    classArray =
      fontColour === "#FC2D22"
        ? [classes.messageMap, classes.colorMessageRed]
        : (classArray = [classes.messageMap, classes.colorMessageGreen])
    return classArray.join(" ")
  } */

  const coordProvReturned = item => {
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

  const providerSelected = item => {
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

  const markerData = item => {
    //Permite capturar las coordenadas de latitud y longitud del marcador al
    //que el usuario ha hecho click. adema de traer la url para Google maps.
  }

  const goToWithOut = () => {
    setProvidMapSearch({
      providerMap: [[6.745673, -65.275475, "Jauja-Sarisariñama"]],
    })
    setViewManager("ProviderForm")
  }

  const showLoading = () => {
    loadingTmp = valueLoading
      ? [providerLocationsControllerStyle.linealShow]
      : [providerLocationsControllerStyle.linealHide]
    return loadingTmp.join(" ")
  }

  const gotoSectionLocation = () => {
    if (props.callFrom !== "SectionLocations") {
      props.returnToForm({
        codProvider: dataProvSelected[0].CODIGO_PROVEEDOR,
        nameProvider: dataProvSelected[0].NOMBRE_PROVEEDOR,
      })
    }
  }

  const retToProvLocContr = item => {
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
      />
      {providerList?.length === 0 ? (
        <GridItem xs={12} sm={12} md={8} align="center">
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <Card background style={{ backgroundImage: `url(${smallMap})` }}>
                <CardBody background>
                  <h3>Ubicación de Aliados</h3>
                  <p>
                    Con este formulario puedes conocer la ubicación de todos
                    nuestros aliados y recibir las indicaciones de como llegar holaaaaa1.
                  </p>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </GridItem>
      ) : (
        <>
          <GridItem xs={12} sm={12} md={8}>
            {/* <ProviderMap
                  providMapSearch={providMapSearch}
                  markerData={markerData}
                /> */}
            <CardsUbication
              callFrom={props.callFrom}
              providerSelected={providerSelected}
              providMapSearch={providMapSearch}
              markerData={markerData}
              providerList={providerList}
              showLoading={showLoading}
            />
            
          </GridItem>
          {/* {props.callFrom !== "SectionLocations"
            ? <><GridContainer className={classes.containerTopLef}>
              <GridItem xs={12} sm={4} md={4}>
                <Button fullWidth onClick={goToWithOut}>
                  <Icon>fast_rewind</Icon> Regresar
                </Button>
              </GridItem>
              <GridItem xs={12} sm={7} md={7} className={classes.tCenter}>
                { fontColour === "#00838f"
                  ? <Button fullWidth color="primary" onClick={gotoSectionLocation}>
                    <Icon>check_box</Icon> Seleccionar
                    </Button>
                  :  <span className={funcClassMsg(fontColour)}>{mapMessage}</span>
                }
              </GridItem>
            </GridContainer>
            { fontColour === "#00838f" && <GridContainer className={classes.containerTopLef}>
              <GridItem xs={12} className={funcClassMsg(fontColour)}>
                {mapMessage}
              </GridItem>
            </GridContainer> }</>
            : <><GridContainer className={classes.containerTopLef}>
              <GridItem xs={12} sm={4} md={4}>
                <Button fullWidth round color="primary" onClick={goToWithOut}>
                  Regresar
                </Button>
              </GridItem>
              <GridItem xs={12} sm={7} md={7} className={funcClassMsg(fontColour)}>
                {mapMessage}
              </GridItem>
            </GridContainer></>
          } */}
        </>
      )}

      <CardFooter>
        <GridContainer justify="center">
          <Button color="secondary" onClick={handletoggleFormMap}>
            <Icon>fast_rewind</Icon> Regresar
          </Button>
        </GridContainer>
      </CardFooter>
     
    </GridContainer>
  )
}
