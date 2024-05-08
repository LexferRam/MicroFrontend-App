import React from "react"
import { navigate } from "gatsby"
import TableMaterial from "components/Core/TableMaterial/TableMaterial"
import CardPanel from "components/Core/Card/CardPanel"

const DetailTable = (props) => {
  const {
    color,
    title,
    icon,
    isLoading,
    servicesInfo,
    process,
    filteredColumns,
  } = props

  const handleClick = async (event, rowData) => {
    event.preventDefault()
    navigate(`/app/workflow/service_history/${rowData.WORKFLOW_ID}`)
  }

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
        columns={filteredColumns}
        data={servicesInfo}
        onRowClick={(event, rowData) => handleClick(event, rowData)}
      />
    </CardPanel>
  )
}

export default DetailTable
