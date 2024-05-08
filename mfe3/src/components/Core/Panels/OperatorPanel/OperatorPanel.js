import React, { useState, useEffect } from "react"
import Axios from "axios"
import dayjs from "dayjs"
import { useDialog } from "context/DialogContext"
import { useForm } from "react-hook-form"
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js"
import TabAreas from "./TabsAreas"
import ReasonDialog from "./Dialogs/ReasonDialog"
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import Switch from "components/Core/Switch/Switch"
import IdentificationController from "components/Core/Controller/IdentificationController"
import DateMaterialPickerController from "components/Core/Controller/DateMaterialPickerController"
import NumberController from "components/Core/Controller/NumberController"
import SelectSimpleController from "components/Core/Controller/SelectSimpleController"
import AdvisorController from "components/Core/Controller/AdvisorController"
import ContractingController from "components/Core/Controller/ContractingController"
import ProvidersController from "components/Core/Controller/ProvidersController"
import { Box } from "@mui/material"
import { getDateForSearch } from "utils/utils"

const CLASS_STYLES = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    '*':{
      margin: "0.25em",
    }
  },
  containerSwitchers: {
    display: "flex",
    justifyContent: "flex-end",
    justifyItems: "center",
  },
  containerSwitch: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    margin: "0 1.5em",
  },
  containerInputs: {
    display: "flex",
    alignItems: "center",
    marginBottom: "1em",
  },
  containerFilters: {
    marginBottom: "1.75em",
  },
}

const date = dayjs(new Date())
const dateEnd = date
const dateStart = date.add(-1,'month')

const OperatorPanel = () => {
  const [allProcesses, setAllProcesses] = useState([])
  const [statusPause, setStatusPause] = useState(false)
  const [openReasonDialog, setOpenReasonDialog] = useState(false)
  const [brokerSelected, setBrokerSelected] = useState(null)
  const [contractingSelected, setContractingSelected] = useState(null)
  const [providerSelected, setProviderSelected] = useState(null)
  const [legentValue, setLegentValue] = useState(null)
  const [showFilters, setShowFilters] = useState(true)
  const dialog = useDialog()
  const [searching, setSearching] = useState(false)
  const { handleSubmit, ...objForm } = useForm()

  const { control } = objForm

  const getTabPanels = async () => {
    try {
      const { data } = await Axios.post("/dbo/workflow/get_operator_processes")
      setAllProcesses(data.p_cursor)
    } catch (error) {
      console.error(error)
    }
  }

  const getStatusUser = async () => {
    try {
      const { data } = await Axios.post(
        "/dbo/workflow/get_status_user_workflow"
      )
      if (data.result === "ENABLED") {
        getTabPanels()
      }
      setStatusPause(data.result)
      data.result === 'ENABLED' ? setLegentValue('Operador Activo') : setLegentValue('Operador en Pausa') 
    } catch (error) {
      console.error(error)
    }
  }

  const onCloseReason = () => {
    setOpenReasonDialog(false)
  }

  const handleOpenReasonDialog = value => {
    setOpenReasonDialog(value)
  }

  const handleSubmitSuspension = async dataform => {
    const params = {
      p_observation: dataform.p_observation,
    }
    try {
      const { data } = await Axios.post(
        "/dbo/workflow/pause_action_group_user",
        params
      )
      await getStatusUser()
      dialog({
        variant: "info",
        title: "Notificación",
        description: data.p_result,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handlePauseUser = async () => {
        
    if (statusPause !== "ENABLED") {
      await handleActivateUser()
    } else {
      handleOpenReasonDialog(true)
    }
  }


  const handleActivateUser = async () => {
    try {
      const { data } = await Axios.post("/dbo/workflow/start_action_group_user")
      await getStatusUser()
      dialog({
        variant: "info",
        title: "Notificación",
        description: data.p_result,
      })
    } catch (error) {
      console.error(error)
    }
  }

  const getPanelCards = async (process, level, parent = null) => {
    const dataform = objForm.getValues()
    try {
      const params = {
        start_date: getDateForSearch(dataform.start_date),
        end_date: getDateForSearch(dataform.end_date) ,
        process_id: process,
        identification: dataform.identification,
        idepreadmin: dataform.idepreadmin,
        type_panel: 3,
        codproveedor: dataform.codproveedor,
        contratante: dataform.contratante,
        tiposusc: dataform.tiposusc,
        codinter: dataform.codinter,
        level: level,
        parent: parent,
      }
      const result = {
        p_json_params: JSON.stringify(params),
      }
      const { data } = await Axios.post("/dbo/workflow/get_panel_cards", result)
      return data
    } catch (error) {
      console.error(error)
    }
  }

  async function getCardDetail(process, idDetail) {
    const dataform = objForm.getValues()
    const params = {
      start_date: getDateForSearch(dataform.start_date),
      end_date: getDateForSearch(dataform.end_date) ,
      process_id: process,
      detail: idDetail,
      identification: dataform.identification,
      idepreadmin: dataform.idepreadmin,
      type_panel: 3,
      codproveedor: dataform.codproveedor,
      contratante: dataform.contratante,
      tiposusc: dataform.tiposusc,
      codinter: dataform.codinter,
    }
    const result = {
      p_json_params: JSON.stringify(params),
    }
    const { data } = await Axios.post(
      "/dbo/workflow/get_card_panel_detail",
      result
    )
    return data
  }

  async function handleTriggerParams() {
    setSearching(searching === false ? true : false)
  }

  const resetForm = () => {
    setShowFilters(false)
    setBrokerSelected(null)
    setProviderSelected(null)
    setContractingSelected(null)
    objForm.reset({})
  }

  // efectos

  useEffect(() => {
    getTabPanels()
    getStatusUser()
  }, [])

  useEffect(() => {
    if (showFilters === false) {
      setShowFilters(true)
    }
  }, [showFilters])

  return (
    <>
      <GridContainer>
        <GridItem xs={6}>
          <h3>Solicitudes por servicio</h3>
        </GridItem>
        {/*<GridItem xs={6} className={CLASS_STYLES.containerSwitchers}>
          <Box sx={{...CLASS_STYLES.containerSwitch}}>
            {statusPause === "PAUSED" ? (
              <p style={{ marginBottom: "0" }}>Iniciar Jornada Laboral</p>
            ) : (
              <p style={{ marginBottom: "0" }}>Pausar Jornada Laboral</p>
            )}

            <Switch
              size="medium"
              checked={statusPause === "PAUSED" ? false : true}
              name="STATUS_USER"
              onClick={handlePauseUser}
            />
          </Box>
            </GridItem>*/}
        <GridItem xs={12} md={6} lg={12}>
          <h4>Tablero servicios</h4>
        </GridItem>
        {showFilters ? (
          <GridContainer justify="center" className={CLASS_STYLES.containerFilters}>
            <GridItem xs={12} md={6} lg={4} className={CLASS_STYLES.container}>
              <DateMaterialPickerController
                fullWidth
                control={control}
                label="Fecha desde"
                name="start_date"
                defaultValue={dateStart}
                required={false}
              />
              <DateMaterialPickerController
                fullWidth
                control={control}
                label="Fecha hasta"
                name="end_date"
                defaultValue={dateEnd}
                required={false}
              />
            </GridItem>
            <GridItem xs={12} md={6} lg={2} className={CLASS_STYLES.containerInputs}>
              <NumberController
                control={control}
                label="N° Liquidación"
                name="idepreadmin"
                required={false}
              />
            </GridItem>
            <GridItem xs={12} md={6} lg={2} className={CLASS_STYLES.containerInputs}>
              <IdentificationController
                control={control}
                label="N° Identif."
                name="identification"
                required={false}
              />
            </GridItem>
            <GridItem xs={12} md={6} lg={2} className={CLASS_STYLES.containerInputs}>
              <SelectSimpleController
                control={control}
                label="T. de Poliza"
                name={`tiposusc`}
                array={[
                  {
                    value: "I",
                    label: "Individual",
                  },
                  {
                    value: "C",
                    label: "Colectiva",
                  },
                ]}
                required={false}
              />
            </GridItem>
            <GridItem xs={12} md={6} lg={3} className={CLASS_STYLES.containerInputs}>
              <ProvidersController
                control={control}
                label="Proveedor"
                name={"codproveedor"}
                onChange={e => setProviderSelected(e)}
              />
            </GridItem>
            <GridItem xs={12} md={6} lg={3} className={CLASS_STYLES.containerInputs}>
              <ContractingController
                control={control}
                label="Contratante"
                name={"contratante"}
                onChange={e => setContractingSelected(e)}
              />
            </GridItem>
            <GridItem xs={12} md={6} lg={2} className={CLASS_STYLES.containerInputs}>
              <AdvisorController
                control={control}
                label="Asesor"
                name={"codinter"}
                onChange={e => setBrokerSelected(e)}
              />
            </GridItem>
            <GridItem xs={12} lg={1} className={CLASS_STYLES.containerInputs}>
              <GridContainer justify="center">
                <Button color="primary" onClick={() => handleTriggerParams()}>
                  Buscar
                </Button>
              </GridContainer>
            </GridItem>
            <GridItem xs={12} lg={1} className={CLASS_STYLES.containerInputs}>
              <GridContainer justify="center">
                <Button color="warning" onClick={() => resetForm()}>
                  Borrar
                </Button>
              </GridContainer>
            </GridItem>
          </GridContainer>
        ) : null}

        {allProcesses.length > 0  && (
          <GridItem xs={12}>
            <TabAreas
              allProcesses={allProcesses}
              parameters={objForm}
              getPanelCards={getPanelCards}
              getCardDetail={getCardDetail}
              searching={searching}
            />

             
              
          </GridItem>
        )}
        
      </GridContainer>
      {openReasonDialog && (
        <ReasonDialog
          openDialog={openReasonDialog}
          onSubmit={handleSubmitSuspension}
          handleOpenDialog={handleOpenReasonDialog}
          onClose={onCloseReason}
        />
      )}
    </>
  )
}

export default OperatorPanel
