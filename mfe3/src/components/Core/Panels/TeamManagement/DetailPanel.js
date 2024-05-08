import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IconButton from "@mui/material/IconButton"
import TableMaterial from "components/Core/TableMaterial/TableMaterial"
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js"
import { useDialog } from "context/DialogContext"
import ModalReassignment from './Modal/ModalReassignment';

const DetailPanel = (props) => {
    const { rowData, handleGetTeamData } = props
    const [detail, setDetail] = useState([])
    const [rowSelected, setRowSelected] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [userSelected, setUserSelected] = useState(null)
    const [groupSelected, setGroupSelected] = useState(null)
    const [assignmentSelected, setAssignmentSelected] = useState(null)
    const dialog = useDialog();

    const handleOpenDialog = () => {
        setOpenDialog(!openDialog)
    }
    
  async function handleReassignment() {
    try {
      const params = {
        P_USER_ID: userSelected,
        P_ASSIGNMENT_ID: rowSelected.ASSIGNMENT_ID,
        P_GROUP_ID: groupSelected
      }
      const { data } = await Axios.post('/dbo/team_manager/manual_assignment', params);

      if (data.P_ANSWER === 'OK') {
        handleGetTeamData()
        dialog({
          variant: 'info',
          catchOnCancel: false,
          title: "Alerta",
          description: 'Caso reasignado con éxito!.'
        })
      }
      else
        dialog({
          variant: 'info',
          catchOnCancel: false,
          title: "Alerta",
          description: 'Ocurrió un error durante el proceso!'
        })

      handleOpenDialog()
    } catch (error) {
      console.log(error);
    }
  }

    function handleSelections(id, value) {
      id === 'USER' ? setUserSelected(value) : id === 'GROUP' ? setGroupSelected(value) : setAssignmentSelected(value)
    }

    function actionsModal(v) {
      setOpenDialog(v)
    }
    const handleGetData = async () => {
      try {
        const params = {
          P_LEADER_ID: rowData.rowData.LEADER_ID,
          P_USER_ID: rowData.rowData.USER_ID
        }
        const { data } = await Axios.post('/dbo/team_manager/get_workload_detail', params);
        setDetail(data.p_cur_data);
        setIsLoading(false)
      } catch (error) {
        console.log(error);
      }
    }

    const handleClick = (event, rowData) => {
        console.log(rowData)
        setRowSelected(rowData)
        handleOpenDialog()
      }

    useEffect(() => {
      handleGetData()
    }, [])

    return (
        <GridContainer >
            <GridItem xs={12}>
                <h4>Casos a Reasignar</h4>
            </GridItem>
            <GridItem xs={12}>
                <TableMaterial
                    options={{
                        pageSize: 2,
                        search: false,
                        toolbar: false,
                        sorting: false,
                        headerStyle: { textAlign: 'center' },
                        actionsColumnIndex: -1
                    }}
                    columns={[
                        { title: 'Servicio', field: 'PROCESS_DESCRIPTION', cellStyle: { textAlign: 'center' } },
                        { title: 'Número de Caso', field: 'NUMCASE', cellStyle: { textAlign: 'center' } },
                        { title: 'Fecha de Asignación', field: 'ASSIGNMENT_DATE', cellStyle: { textAlign: 'center' } }
                    ]}
                    data={detail}
                    actions={[
                        rowData => ({
                            icon: () =>
                                <IconButton color="primary" component="span">
                                    <AutorenewIcon />
                                </IconButton>,
                            tooltip: 'Reasignar',
                            onClick: (event, rowData) => handleClick(event, rowData),
                        })
                    ]}
                    isLoading={isLoading}
                />

            </GridItem>
            {openDialog &&
                <ModalReassignment
                    open={openDialog}
                    handleClose={handleOpenDialog}
                    rowData={rowSelected}
                    handleReassignment={handleReassignment}
                    handleSelections={handleSelections}
                    groupSelected={groupSelected}
                    userSelected={userSelected} />}
        </GridContainer>
    )
  }

  export default DetailPanel