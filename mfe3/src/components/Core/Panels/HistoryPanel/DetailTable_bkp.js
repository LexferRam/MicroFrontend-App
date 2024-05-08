import React, { useEffect, useState } from "react"
import Axios from "axios"
import { MTableToolbar } from "material-table"
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import TableMaterial from "components/Core/TableMaterial/TableMaterial"
import CardPanel from "components/Core/Card/CardPanel"
import { navigate } from "gatsby"

import { handleFilteredColumns, pauseUsersColumnsTable } from "../utils"
import { COLUMNS_TABLE } from "../constants"
import trafficStyle from "../trafficStyle"
import { Icon } from "@mui/material"

const DetailTable = (props) => {
  const {
    color,
    title,
    dataTable,
    icon,
    label,
    handleDownload,
    isLoading,
    process,
  } = props
  const [filteredColumns, setFilteredColumns] = useState(COLUMNS_TABLE)

  const handleTypeColumn = (label) => {
    if (label === "Operadores en pausa") {
      return pauseUsersColumnsTable
    } else {
      return filteredColumns
    }
  }

  const handleClick = async (event, rowData) => {
    event.preventDefault()
    const params = {
      p_task_id: rowData.TASK_ID,
    }
    const { data } = await Axios.post(
      "/dbo/workflow/get_workflow_id_by_task",
      params
    )
    navigate(`/app/workflow/history_service/${data.result}`)
  }

  useEffect(() => {
    if (dataTable.length > 0) {
      const result = handleFilteredColumns(dataTable, process)
      setFilteredColumns(result)
    }
  }, [dataTable, process])

  return (
    <CardPanel
      titulo={title}
      icon={icon ? icon : "delete"}
      backgroundIconColor={color}
    >
      <TableMaterial
        options={{
          search: true,
          toolbar: true,
          sorting: false,
          pageSize: 5,
          cellStyle: { textAlign: "center", fontSize: "12px" },
          draggable: false,
          headerStyle: {
            backgroundColor: color,
            color: "white",
            textAlign: "center",
          },
        }}
        isLoading={isLoading}
        columns={handleTypeColumn(label)}
        data={dataTable}
        onRowClick={(event, rowData) => handleClick(event, rowData)}
        components={{
          Toolbar: (props) => (
            <Box sx={{ ...trafficStyle.containerToolbar }}>
              <Button
                onClick={() => handleDownload()}
                className={trafficStyle.buttons}
                color="success"
              >
                <Icon>download</Icon> Excel
              </Button>
              <Box sx={{ ...trafficStyle.containerLight }}>
                <Box sx={{ ...trafficStyle.circleRed }} />
                <Box sx={{ ...trafficStyle.circleOrange }} />
                <Box sx={{ ...trafficStyle.circleGreen }} />
              </Box>
              <MTableToolbar {...props} />
            </Box>
          ),
        }}
      />
    </CardPanel>
  )
}

export default DetailTable
