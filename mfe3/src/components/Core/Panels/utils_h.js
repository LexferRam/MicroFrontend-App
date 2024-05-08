import React from "react"
import {COLUMNS_TABLE} from './constants_h'


const handleRemoveColumn = (keyToFind, columns) => {
  const resultColumns = [...columns]
  let indexToFind = columns.findIndex(element => element.field === keyToFind)
  if (indexToFind !== -1) resultColumns.splice(indexToFind, 1)
  return resultColumns
}

const handleFilteredColumns = (data, process) => {
  let newColumns = [...COLUMNS_TABLE]
  console.log('Filtramos las columnas en el proceso: ' + process)

  if (data && data.length > 0) {
    let dataProperties = Object.keys(data[0]);
    COLUMNS_TABLE.forEach(elem => {
      if (!dataProperties.includes(elem.field)) {
        newColumns = handleRemoveColumn(elem.field, newColumns);
      }
    });
  }

  if (process !== 0) {
    newColumns = handleRemoveColumn("SERVICIO", newColumns)
  }

  return newColumns
}

export { handleFilteredColumns }
