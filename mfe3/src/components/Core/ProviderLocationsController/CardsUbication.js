import React, { useState, useMemo } from "react"

import { styled } from "@mui/material/styles"

import "./styles.scss"
import "../../../styles/leaflet-markers-cluster.min.css"
import Icon from "@mui/material/Icon"
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
//import ProviderMap from "./ProviderMap"
import LinearProgress from "@mui/material/LinearProgress"
import TableMaterial from "../../../components/Core/TableMaterial/TableMaterial"

import Axios from "axios"
import moment from "moment"
import ProviderMapNew from "./ProviderMapNew"

//import MaterialReactTable from "material-react-table"

const useStyles = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid gray",
    borderRadius: "8px",
    width: "65%",
    minHeight: "45vh",
    maxHeight: "80vh",
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "80%",
    display: "flex",
    marginBottom: "2px",
    flexDirection: "column",
    "@media (max-width: 900px)": {
      width: "90%",
    },
    "@media (max-width: 500px)": {
      width: "90%",
      display: "flex",
      flexDirection: "column",
      height: "85%",
      overflow: "auto",
    },
  },
  paperPhone: {
    backgroundColor: theme.palette.background.paper,
    border: "1px solid gray",
    borderRadius: "8px",
    width: "65%",
    maxWidth: "400px",
    minHeight: "45vh",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 2, 2),
  },
  actionButtonRound: {
    width: "30px",
    height: "30px",
    minWidth: "auto",
  },
  actionButton: {
    margin: "0 0 0 5px",
    padding: "5px",
    "& svg,& .fab,& .fas,& .far,& .fal,& .material-icons": {
      marginRight: "0px",
    },
  },
  icon: {
    verticalAlign: "middle",
    width: "17px",
    height: "17px",
    top: "-1px",
    position: "relative",
  },
})

const NewModal = styled(Modal)(({ theme }) => {
  const styles = useStyles(theme)
  return { ...styles.modal }
})

const NewBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: -1,
}))

const NewDiv = styled("div")(({ theme, ownerState }) => {
  const styles = useStyles(theme)
  const { style } = ownerState
  return { ...styles[style] }
})

const NewLinearProgress = styled(LinearProgress)(({ theme, ownerState }) => {
  const { style } = ownerState
  return { ...style }
})

export default function CardsUbication(props) {
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY

  let arrTmp = []
  let zoom = 12
  let markersBulk = [[6.745673, -65.275475, "Jauja-Sarisariñama"]]
  let boundsActive = [[6.745673, -65.275475, "Jauja-Sarisariñama"]]
  let lat = ""
  let lng = ""
  let dataMap = ""
  let urlString = ""
  const [openModalInfo, SetOpenModalInfo] = useState(false)
  const [openModalPhone, SetOpenModalPhone] = useState(false)
  const [openModalHours, SetOpenModalHours] = useState(false)
  const [phoneSelected, SetPhoneSelected] = useState(null)
  const [infoSelected, SetInfoSelected] = useState(null)
  const [listHorarios, setListHorarios] = useState([])

  // console.log(props?.providerList, 'infooooooooooooooooooooo')

  const HandlerOpenModal = () => {
    SetOpenModalInfo(false)
    SetOpenModalPhone(false)
    SetOpenModalHours(false)
    setListHorarios([])
  }

  if (props.providMapSearch.providerMap) {
    arrTmp = []
    props.providMapSearch.providerMap.map((pms) => {
      arrTmp.push(pms)
      return null
    })
    markersBulk = arrTmp
    boundsActive = arrTmp
  }

  const gotoUrl = (e) => {
    lat = e.target._latlng.lat
    lng = e.target._latlng.lng
    window.open(
      "https://www.google.co.ve/maps/search/" +
      lat +
      ",+" +
      lng +
      "/@" +
      lat +
      "," +
      lng +
      ",17z",
      "_blank"
    )
    urlString =
      "https://www.google.co.ve/maps/search/" +
      lat +
      ",+" +
      lng +
      "/@" +
      lat +
      "," +
      lng +
      ",17z"
    dataMap = { lat: lat, lng: lng, url: urlString }
    props.markerData(dataMap)
  }

  const newColumns = useMemo(
    () => [
      {
        accessorKey: "DIAS", //simple recommended way to define a column
        header: "Días de Atención",
        muiTableHeadCellProps: {
          align: "left",
          sx: {
            fontWeight: 700,
            fontSize: "13px",
          },
        }, //custom props
        muiTableBodyCellProps: {
          align: "left",
          sx: {
            width: "15%",
            fontSize: "12px",
          },
        },
        Cell: ({ cell }) => (
          <NewDiv
            ownerState={{
              style: "containerTitle",
            }}
          >
            {cell
              .getValue()
              ?.split("|")
              .map((item, index) => {
                return (
                  <span>
                    {item === "LU"
                      ? "Lunes "
                      : item === "MA"
                        ? "Martes "
                        : item === "MI"
                          ? "Miercoles "
                          : item === "JU"
                            ? "Jueves "
                            : item === "VI"
                              ? "Viernes "
                              : item === "SA"
                                ? "Sabado "
                                : item === "DO"
                                  ? "Domingo "
                                  : " "}
                  </span>
                )
              })}
          </NewDiv>
        ), //optional custom cell render
      },
      {
        header: "Horario de Inicio",
        accessorKey: "DESDE",
        muiTableHeadCellProps: {
          align: "center",
          sx: {
            fontWeight: 700,
            fontSize: "13px",
          },
        },
        muiTableBodyCellProps: {
          align: "center",
          sx: {
            width: "20%",
            fontSize: "12px",
          },
        },
        Cell: ({ cell }) => (
          <span>
            <span>
              {cell.getValue()?.indexOf(" ") === -1
                ? moment(cell.getValue(), "HH:mm a").format("hh:mm A")
                : cell.getValue()}
            </span>
          </span>
        ),
      },
      {
        header: "Horario de Cierre",
        accessorKey: "HASTA",
        muiTableHeadCellProps: {
          align: "center",
          sx: {
            fontWeight: 700,
            fontSize: "13px",
          },
        },
        muiTableBodyCellProps: {
          align: "center",
          sx: {
            width: "20%",
            fontSize: "12px",
          },
        },
        Cell: ({ cell }) => (
          <span>
            {cell.getValue()?.indexOf(" ") === -1
              ? moment(cell.getValue(), "HH:mm a").format("hh:mm A")
              : cell.getValue()}
          </span>
        ),
      },
    ],
    []
  )

  const windowGlobal = typeof window !== "undefined" && window
  if (windowGlobal) {
    const L = require("leaflet")
    delete L.Icon.Default.prototype._getIconUrl
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
      iconUrl: require("leaflet/dist/images/marker-icon.png"),
      shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
    })

    const HandlerModalPhone = (item) => {
      SetPhoneSelected(item)
      SetOpenModalPhone(true)
    }

    const HandlerModalHours = (item) => {
      getMedicalCareHours(item.IDCONSRM)
      SetInfoSelected(item)
      SetOpenModalHours(true)
    }

    const HandlerModalInfo = (item) => {
      props.providerSelected([item, props.providerList[1]])
      SetInfoSelected(item)
      SetOpenModalInfo(true)
    }

    const getMedicalCareHours = async (id) => {
      let params = {
        npidconsrm: id,
      }
      try {
        const response = await Axios.post(
          `${process.env.GATSBY_API_URL}/asg-api/dbo/medical_netword/get_medical_care_hours`,
          params
        )

        setListHorarios(response.data.p_cursor)
      } catch (error) {
        console.log(error)
      }
    }

    /*const columns = {
      some: [
        {
          title: "Dias de Atención",
          field: "DIAS",
          headerStyle: {
            textAlign: "left",
            fontWeight: 700,
            fontSize: "13px",
          },
          cellStyle: { width: "15%", fontSize: "12px" },
          render: (rowData) => (
            <div className={classes.containerTitle}>
              {rowData.DIAS?.split("|").map((item, index) => {
                return (
                  <span>
                    {item === "LU"
                      ? "Lunes "
                      : item === "MA"
                      ? "Martes "
                      : item === "MI"
                      ? "Miercoles "
                      : item === "JU"
                      ? "Jueves "
                      : item === "VI"
                      ? "Viernes "
                      : item === "SA"
                      ? "Sabado "
                      : item === "DO"
                      ? "Domingo "
                      : " "}
                  </span>
                )
              })}
            </div>
          ),
        },
        {
          title: "Horario de Inicio",
          field: "DESDE",
          headerStyle: {
            textAlign: "center",
            fontWeight: 700,
            fontSize: "13px",
          },
          cellStyle: {
            width: "20%",
            textAlign: "center",
            fontSize: "12px",
          },
          render: (rowData) => (
            <span>
              <span>
                {rowData?.DESDE?.indexOf(" ") === -1
                  ? moment(rowData?.DESDE, "HH:mm a").format("hh:mm A")
                  : rowData?.DESDE}
              </span>
            </span>
          ),
        },
        {
          title: "Horario de Cierre",
          field: "HASTA",
          headerStyle: {
            textAlign: "center",
            fontWeight: 700,
            fontSize: "13px",
          },
          cellStyle: {
            width: "20%",
            textAlign: "center",
            fontSize: "12px",
          },
          render: (rowData) => (
            <span>
              {rowData?.HASTA?.indexOf(" ") === -1
                ? moment(rowData?.HASTA, "HH:mm a").format("hh:mm A")
                : rowData?.HASTA}
            </span>
          ),
        },
      ],
    }*/

    return (
      <div className="container-directions">
        {openModalInfo ? (
          <NewModal
            open={openModalInfo}
            onClose={HandlerOpenModal}
            closeAfterTransition
            BackdropComponent={NewBackdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={true}>
              <NewDiv
                ownerState={{
                  style: "paper",
                }}
                className="prueba"
              >
                {infoSelected?.NOMBRE_PROVEEDOR ? (
                  <div
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      mb: "20px",
                      textAlign: "center",
                      color:
                        insuranceCompany === "PIRAMIDE"
                          ? "#b9202e"
                          : "#47c0b6",
                      fontSize: "17px",
                      backgroundColor: "#f2efe942",
                      pb: "15px",
                      pt: "15px",
                      borderBottom:
                        insuranceCompany === "PIRAMIDE"
                          ? "solid 1px #b9202e"
                          : "solid 1px #47c0b6",
                    }}
                  >
                    {infoSelected?.NOMBRE_PROVEEDOR}
                  </div>
                ) : (
                  <div
                    color="primary"
                    style={{
                      fontWeight: "bold",
                      mb: "20px",
                      textAlign: "center",
                      color:
                        insuranceCompany === "PIRAMIDE"
                          ? "#b9202e"
                          : "#47c0b6",
                      fontSize: "17px",
                      backgroundColor: "#f2efe942",
                      pb: "15px",
                      pt: "15px",
                      borderBottom:
                        insuranceCompany === "PIRAMIDE"
                          ? "solid 1px #b9202e"
                          : "solid 1px #47c0b6",
                    }}
                  >
                    {infoSelected?.NOMCLINICA}

                  </div>
                )}
                <div
                  className="info-item-location"
                  style={{
                    border:
                      insuranceCompany === "PIRAMIDE"
                        ? " solid 1px #b9202e"
                        : "solid 1px #47c0b6",
                  }}
                >
                  <div >
                    {infoSelected?.DIRECCION_PROVEEDOR ? (
                      <p>
                        <span>Direccion:</span> {infoSelected?.DIRECCION_PROVEEDOR}
                      </p>
                    ) : (
                      <p>
                        <span>Direccion:</span> <span>{infoSelected?.DIRECCION}</span>
                      </p>
                    )}

                    {infoSelected?.PISO ? (
                      <p>
                        <span>Piso: </span> <span>{infoSelected?.PISO}</span>
                      </p>
                    ) : null}

                    {infoSelected?.LUGARATC ? (
                      <p>
                        <span>Lugar de Atención: </span> <span>{infoSelected?.LUGARATC}</span>
                      </p>
                    ) : null}

                    {infoSelected?.MUNICIPIO_PROVEEDOR ? (
                      <p>
                        <span>Municipio:</span>{" "}
                        <span>{infoSelected?.MUNICIPIO_PROVEEDOR}</span>
                      </p>
                    ) : null}

                    {infoSelected?.CIUDAD_PROVEEDOR ? (
                      <p>
                        <span>Ciudad:</span> <span>{infoSelected?.CIUDAD_PROVEEDOR}</span>
                      </p>
                    ) : null}

                    {infoSelected?.ESTADO_PROVEEDOR ? (
                      <p>
                        <span>Estado:</span> <span>{infoSelected?.ESTADO_PROVEEDOR}</span>
                      </p>
                    ) : (
                      <p>
                        <span>Estado:</span> <span>{infoSelected?.DESCESTADO}</span>
                      </p>
                    )}

                    {infoSelected?.RIF_PROVEEDOR ? (
                      <p>
                        <span>Rif:</span> <span>{infoSelected?.RIF_PROVEEDOR}</span>
                      </p>
                    ) : null}
                  </div>
                  <div>
                    {infoSelected?.NOMTER && infoSelected?.APETER ? (
                      <p>
                        <span>Especialista: </span> <span>{infoSelected?.NOMTER}{" "}</span>
                        {infoSelected?.APETER}
                      </p>
                    ) : null}
                    {infoSelected?.DESCESPE ? (
                      <p>
                        <span>Especialidad:</span> <span>{infoSelected?.DESCESPE}{" "}</span>
                      </p>
                    ) : null}
                    {infoSelected?.TIPOATENCION ? (
                      <p>
                        <span>Tipo de Cita: </span> <span>{infoSelected?.TIPOATENCION}{" "}</span>
                      </p>
                    ) : null}
                    {infoSelected?.DESCESP ? (
                      <p>
                        <span>Especialidad: </span> <span>{infoSelected?.DESCESP}{" "}</span>
                      </p>
                    ) : null}
                    {infoSelected?.DESCSUBESP ? (
                      <p>
                        <span>Subespecialidad: </span> <span>{infoSelected?.DESCSUBESP}{" "}</span>
                      </p>
                    ) : null}
                    {infoSelected?.DIAS ? (
                      <p>
                        <span>Días de Atención: </span>{" "}
                        {infoSelected.DIAS?.split("|").map((item, index) => {
                          return (
                            <>
                              {item === "LU"
                                ? "Lunes "
                                : item === "MA"
                                  ? "Martes "
                                  : item === "MI"
                                    ? "Miercoles "
                                    : item === "JU"
                                      ? "Jueves "
                                      : item === "VI"
                                        ? "Viernes "
                                        : item === "SA"
                                          ? "Sabado "
                                          : item === "DO"
                                            ? "Domingo "
                                            : " "}
                            </>
                          )
                        })}{" "}
                      </p>
                    ) : null}
                    {infoSelected?.TELFLOCAL ? (
                      <p>
                        <span>Teléfono Local: </span> <span>{infoSelected?.TELFLOCAL}{" "}</span>
                      </p>
                    ) : null}
                    {infoSelected?.CELULAR ? (
                      <p>
                        <span>Teléfono celular: </span> <span>{infoSelected?.CELULAR}{" "}</span>
                      </p>
                    ) : null}
                  </div>


                </div>
                {/* <div> */}
                {typeof window !== 'undefined' ? <ProviderMapNew
                  datos={infoSelected}
                  category={props.category}
                /> : null}

                {/* </div> */}
              </NewDiv>
            </Fade>
          </NewModal>
        ) : null}
        {openModalPhone ? (
          <NewModal
            open={openModalPhone}
            onClose={HandlerOpenModal}
            closeAfterTransition
            BackdropComponent={NewBackdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={true}>
              <NewDiv
                ownerState={{
                  style: "paperPhone",
                }}
              >
                <div className="title-phone">Teléfonos de Contacto</div>
                {phoneSelected?.CELULAR || phoneSelected?.TELFLOCAL ? (
                  <p className="phones-numbers">
                    {phoneSelected?.CELULAR
                      ? "Celular: " + phoneSelected?.CELULAR
                      : "No Disponible "}
                    <br /> <br />
                    {phoneSelected?.TELFLOCAL
                      ? "Local " + phoneSelected?.TELFLOCAL
                      : "No Disponible "}
                  </p>
                ) : (
                  <p className="phones-numbers">
                    {phoneSelected?.TELEFONOS
                      ? phoneSelected?.TELEFONOS
                      : "No Disponible"}
                  </p>
                )}
              </NewDiv>
            </Fade>
          </NewModal>
        ) : null}

        {openModalHours ? (
          <NewModal
            open={openModalHours}
            onClose={HandlerOpenModal}
            closeAfterTransition
            BackdropComponent={NewBackdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={true}>
              <NewDiv
                ownerState={{
                  style: "paperPhone",
                }}
              >
                <div className="title-phone">Horarios</div>
                <TableMaterial
                  options={{
                    pageSize: 5,
                    cellStyle: { textAlign: "right" },
                    sorting: false,
                    actionsColumnIndex: -1,
                    search: false,
                    toolbar: false,
                    paging: false,
                  }}
                  localization={{
                    body: {
                      emptyDataSourceMessage: "Sin resultados para mostrar",
                    },
                  }}
                  data={listHorarios}
                  columns={[
                    {
                      title: "Dias de Atención",
                      field: "DIAS",
                      headerStyle: {
                        textAlign: "left",
                        fontWeight: 700,
                        fontSize: "13px",
                      },
                      cellStyle: { width: "15%", fontSize: "12px" },
                      render: (rowData) => (
                        <NewDiv
                          ownerState={{
                            style: "containerTitle",
                          }} >
                          {rowData.DIAS?.split("|").map((item, index) => {
                            return (
                              <span>
                                {item === "LU"
                                  ? "Lunes "
                                  : item === "MA"
                                    ? "Martes "
                                    : item === "MI"
                                      ? "Miercoles "
                                      : item === "JU"
                                        ? "Jueves "
                                        : item === "VI"
                                          ? "Viernes "
                                          : item === "SA"
                                            ? "Sabado "
                                            : item === "DO"
                                              ? "Domingo "
                                              : " "}
                              </span>
                            )
                          })}
                        </NewDiv>
                      ),
                    },
                    {
                      title: "Horario de Inicio",
                      field: "DESDE",
                      headerStyle: {
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "13px",
                      },
                      cellStyle: {
                        width: "20%",
                        textAlign: "center",
                        fontSize: "12px",
                      },
                      render: (rowData) => (
                        <span>
                          <span>
                            {rowData?.DESDE?.indexOf(" ") === -1
                              ? moment(rowData?.DESDE, "HH:mm a").format(
                                "hh:mm A"
                              )
                              : rowData?.DESDE}
                          </span>
                        </span>
                      ),
                    },
                    {
                      title: "Horario de Cierre",
                      field: "HASTA",
                      headerStyle: {
                        textAlign: "center",
                        fontWeight: 700,
                        fontSize: "13px",
                      },
                      cellStyle: {
                        width: "20%",
                        textAlign: "center",
                        fontSize: "12px",
                      },
                      render: (rowData) => (
                        <span>
                          {rowData?.HASTA?.indexOf(" ") === -1
                            ? moment(rowData?.HASTA, "HH:mm a").format(
                              "hh:mm A"
                            )
                            : rowData?.HASTA}
                        </span>
                      ),
                    },
                  ]}
                />
              </NewDiv>
            </Fade>
          </NewModal>
        ) : null}

        {props.providerList[0]?.map((item, index) => {
          // console.log(item, 'itemmmmm')
          // {item.DIRECCION_PROVEEDOR !== null ? : null }
          return (
            // item.DIRECCION_PROVEEDOR !== null ?
            <div key={index} className="provider-item">
              {item.NOMBRE && item.APELLIDO ? (
                <p className="title-provider title-doctor" style={{ background: process.env.GATSBY_INSURANCE_COMPANY === 'PIRAMIDE' ? "#c15f5f" : "#47c0b6" }}>
                  {item.NOMBRE} {item.APELLIDO}
                </p>
              ) : null}

              {item.NOMBRE_PROVEEDOR !== undefined
                ?
                <p className="title-provider title-doctor" style={{ background: process.env.GATSBY_INSURANCE_COMPANY === 'PIRAMIDE' ? "#c15f5f" : "#47c0b6" }} >
                  {item.NOMBRE_PROVEEDOR}
                </p>
                : null}

              <div style={{ padding: "10px" }}>

                {item.NOMBRE_PROVEEDOR === undefined
                  ?
                  <p className="title-provider" >
                    {item.NOMCLINICA}
                  </p>
                  : null}

                <p className="info-provider">
                  <span style={{ textAlign: "left", paddingLeft: "5px" }}>
                    {props.category === 'MP' ?
                      <>
                        <strong>Dirección: {" "} </strong> {item.DIRECCION}
                        {/* <>  <strong>Dirección: {" "}</strong> {item.DIRECCION}</> */}
                      </>
                      : <><strong>Dirección: {" "} </strong> {item.AVENIDA_PROVEEDOR}, {item.CIUDAD_PROVEEDOR}, Estado {item.ESTADO_PROVEEDOR} </>
                    }

                  </span>
                </p>
                {item.INDCONVENIDA ?
                  <p>
                    <span className="parpadea text" >{item.INDCONVENIDA === 'N' ? "No Convenida" : null}  </span>
                    {item.INDCONVENIDA === 'N' ?
                      <>
                        <hr style={{ borderBottom: process.env.GATSBY_INSURANCE_COMPANY === 'PIRAMIDE' ? "1px solid #d32a2a" : "1px solid #47c0b6", margin: "10px 0px 10px 0px" }}></hr>
                        <a class="tooltip" data-tooltip="Cuando usted decide seleccionar una clínica no convenida, pueden existir montos que no están amparados
                    Por nuestra compañia"></a>
                      </>

                      : null}


                  </p>
                  : null}
                <div>

                  {item.DIAS && item.DIAS ? (
                    <p className="info-provider">
                      Días de Atención:{" "}
                      {item.DIAS?.split("|").map((item, index) => {
                        return (
                          <span>
                            {item === "LU"
                              ? "Lunes "
                              : item === "MA"
                                ? "Martes "
                                : item === "MI"
                                  ? "Miercoles "
                                  : item === "JU"
                                    ? "Jueves "
                                    : item === "VI"
                                      ? "Viernes "
                                      : item === "SA"
                                        ? "Sabado "
                                        : item === "DO"
                                          ? "Domingo "
                                          : " "}
                          </span>
                        )
                      })}
                      .
                    </p>
                  ) : null}
                  <p className="info-provider">
                    {item.TIPOATENCION && item.TIPOATENCION ? (
                      <span >
                        <strong>Tipo de Cita:  </strong>
                        {item.TIPOATENCION}
                      </span>
                    ) : null}
                  </p>
                  <p className="info-provider">
                    {item.LUGARATC && item.LUGARATC ? (
                      < span style={{ textAlign: "left" }} >
                        <strong>Lugar de Atención:  </strong>
                        {item.LUGARATC}
                      </span>
                    ) : null}
                  </p>
                  {item.DESCSUBESP ? (
                    <p
                      className="title-provider"
                      style={{
                        color:
                          insuranceCompany === "PIRAMIDE" ? "#ED1C24" : "#47c0b6",
                        paddingBottom: "80px"
                      }}
                    >
                      {item.DESCSUBESP}
                    </p>
                  ) : null}
                  <div className="container-buttons">
                    {item.IDCONSRM ? (
                      <div
                        className="button-hours"
                        onClick={() => HandlerModalHours(item)}
                      >
                        Ver Horarios
                      </div>
                    ) : null}
                    <div className="container-options">
                      <Icon
                        onClick={() => HandlerModalInfo(item)}
                        className="icon-info .icon-location"
                        style={{
                          fontSize: 22,
                          color:
                            insuranceCompany === "PIRAMIDE" ? "#ED1C24" : "#47c0b6",
                        }}
                      >
                        room
                      </Icon>
                      <Icon
                        onClick={() => HandlerModalPhone(item)}
                        className="icon-phone .icon-location"
                        style={{
                          fontSize: 22,
                          color:
                            insuranceCompany === "PIRAMIDE" ? "#ED1C24" : "#47c0b6",
                        }}
                      >
                        phone
                      </Icon>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            // : null
          )
        })}
      </div>
    )
  }
}
