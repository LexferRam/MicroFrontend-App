import React from "react"
import Badge from "components/material-dashboard-pro-react/components/Badge/Badge"
import TrafficLight from "./TrafficLight"
import { Icon, IconButton, Tooltip } from "@mui/material"

const checkStatus = (value) => {
  if (value === "M") {
    return "info"
  } else if (value === "A") {
    return "rose"
  }
}

const checkStatusName = (value) => {
  if (value === "M") {
    return "Manual"
  } else if (value === "A") {
    return "Autom."
  }
}
const COLUMNS_TABLE = [
  {
    title: "Servicios",
    field: "SERVICIO",
    sorting: false,
  },
  {
    title: "Tipo de Operación",
    field: "OPERACION_NOMBRE",
    sorting: false,
  },
  { title: "Fec. Recepción", field: "FECHA_RECEPCION", sorting: false },
  {
    title: "Fec. Asignación",
    field: "FECHA_ASIGNACION",
    sorting: false,
  },
  {
    title: "Fec. Aprobación",
    field: "FECHA_APROB",
    sorting: false,
  },
  {
    title: "Fec. Estatus",
    field: "FECSTATUS",
    sorting: false,
  },
  {
    title: "Fec. Pago",
    field: "FECHA_PAGO",
    sorting: false,
  },
  {
    title: "Motivo de anulación",
    field: "MOTIVO_ANUL",
    sorting: false,
  },
  {
    title: "Operador",
    field: "OPERADOR",
    sorting: false,
  },
  {
    title: "Num. Liquidación",
    field: "IDEPREADMIN",
    sorting: false,
  },
  {
    title: "Asesor",
    field: "ASESOR",
    sorting: false,
  },
  {
    title: "Recaudos Pendientes",
    field: "REQUISITOS_PEND",
    sorting: false,

    render: (rowData) =>
      parseInt(rowData.REQUISITOS_PEND) !== 0 ? (
        <Tooltip title="Requisitos pendientes" placement="left-start" arrow>
          <IconButton color="primary" onClick={() => console.log("Hola!")}>
            <Icon color="primary" style={{ fontSize: 24 }}>
              assignment
            </Icon>
          </IconButton>
        </Tooltip>
      ) : null,
    disableClick: true,
  },

  {
    title: "Prioridad",
    field: "SEMAFORO",
    sorting: false,
    render: (rowData) => <TrafficLight typeLight={rowData.SEMAFORO} />,
  },
  {
    title: "Asignación",
    field: "TIPO_ASIG",
    sorting: false,
    render: (rowData) => (
      <Badge color={checkStatus(rowData.TIPO_ASIG)}>
        {" "}
        {checkStatusName(rowData.TIPO_ASIG)}{" "}
      </Badge>
    ),
  },
]

export { COLUMNS_TABLE }
