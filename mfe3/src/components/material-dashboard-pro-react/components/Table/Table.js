import React from "react"
import PropTypes from "prop-types"
import { styled, useTheme } from "@mui/material/styles"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import tableStyles from "./tableStyle"

export default function CustomTable(props) {
  const {
    tableHead,
    tableData,
    tableHeaderColor,
    hover,
    colorsColls,
    coloredColls,
    customCellClasses,
    customClassesForCells,
    striped,
    tableShopping,
    customHeadCellClasses,
    customHeadClassesForCells,
  } = props

  const theme = useTheme()
  const tStyles = tableStyles(theme)

  return (
    <div sx={{ ...tStyles.tableResponsive }}>
      <Table sx={{ ...tStyles.table }}>
        {tableHead !== undefined ? (
          <TableHead sx={{ ...tStyles[tableHeaderColor] }}>
            <TableRow sx={{ ...tStyles.tableRow, ...tStyles.tableRowHead }}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    key={key}
                    sx={{
                      ...tStyles.tableHeadCell,
                      ...tStyles.tableCell,
                      ...customHeadCellClasses[customHeadClassesForCells.indexOf(key)],
                      [customHeadCellClasses[customHeadClassesForCells.indexOf(key)]]: customHeadClassesForCells.indexOf(key) !== -1,
                      [tStyles.tableShoppingHead]: tableShopping,
                      [tStyles.tableHeadFontSize]: !tableShopping,
                    }}
                  >
                    {prop}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            var rowColor = ""
            var rowColored = false
            if (prop.color !== undefined) {
              rowColor = prop.color
              rowColored = true
              prop = prop.data
            }
            if (prop.total) {
              return (
                <TableRow
                  key={key}
                  hover={hover}
                  sx={{
                    [tStyles.tableRowBody]: true,
                    [tStyles.tableRowHover]: hover,
                    [tStyles[rowColor + "Row"]]: rowColored,
                    [tStyles.tableStripedRow]: striped && key % 2 === 0,
                  }}
                >
                  <TableCell
                    sx={{ ...tStyles.tableCell }}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    sx={{
                      ...tStyles.tableCell,
                      ...tStyles.tableCellTotal,
                    }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    sx={{
                      ...tStyles.tableCell,
                      ...tStyles.tableCellAmount,
                    }}
                  >
                    {prop.amount}
                  </TableCell>
                  {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                    <TableCell
                      sx={{ ...tStyles.tableCell }}
                      colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                    />
                  ) : null}
                </TableRow>
              )
            }
            if (prop.purchase) {
              return (
                <TableRow
                  key={key}
                  hover={hover}
                  sx={{
                    [tStyles.tableRowBody]: true,
                    [tStyles.tableRowHover]: hover,
                    [tStyles[rowColor + "Row"]]: rowColored,
                    [tStyles.tableStripedRow]: striped && key % 2 === 0,
                  }}
                >
                  <TableCell
                    sx={{ ...tStyles.tableCell }}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    sx={{ ...tStyles.tableCell, ...tStyles.right }}
                    colSpan={prop.col.colspan}
                  >
                    {prop.col.text}
                  </TableCell>
                </TableRow>
              )
            }
            return (
              <TableRow
                key={key}
                hover={hover}
                sx={{
                  ...tStyles.tableRow,
                  [tStyles.tableRowBody]: true,
                  [tStyles.tableRowHover]: hover,
                  [tStyles[rowColor + "Row"]]: rowColored,
                  [tStyles.tableStripedRow]: striped && key % 2 === 0,
                }}
              >
                {prop.map((prop, key) => {
                  return (
                    <TableCell
                      key={key}
                      sx={{
                        ...tStyles.tableCell,
                        ...customCellClasses[customClassesForCells.indexOf(key)],
                        [tStyles[colorsColls[coloredColls.indexOf(key)]]]:
                          coloredColls.indexOf(key) !== -1,
                        [customCellClasses[customClassesForCells.indexOf(key)]]:
                          customClassesForCells.indexOf(key) !== -1,
                      }}
                    >
                      {prop}
                    </TableCell>
                  )
                })}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: [],
}

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.object),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.object),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool,
}
