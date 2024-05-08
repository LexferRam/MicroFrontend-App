import React, { useState, useEffect } from "react"
import Axios from 'axios'
import { useForm } from "react-hook-form"
import { styled, useTheme } from '@mui/material/styles';
import Modal from "@mui/material/Modal"
import Backdrop from "@mui/material/Backdrop"
import Fade from "@mui/material/Fade"
import IconButton from "@mui/material/IconButton"
import Icon from "@mui/material/Icon"
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js"
import CardBody from "components/material-dashboard-pro-react/components/Card/CardBody.js"
import Button from "components/material-dashboard-pro-react/components/CustomButtons/Button.js"
import SelectSimpleController from "components/Core/Controller/SelectSimpleController"


import { useDialog } from 'context/DialogContext'

const useStylesFunc = (theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    width: "35%",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 2, 2),
    borderRadius: "20px",
    position:'relative'
  },
  alignButton:{
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'end'
  },
  textCenter:{
    textAlign: 'center'
  },
  buttonClose:{
    position: 'absolute',
    top: 0,
    right: 0
  }
})

const NewModal = styled(Modal)(({ theme }) => {
  const styles2get = useStylesFunc(theme)
  return {...styles2get.modal}
})

const NewBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: -1
}))
const DivStyled = styled("div")(({ theme, ownerState }) => {
  const stylesGet = useStylesFunc(theme)
  const { style } = ownerState
  return {
      ...stylesGet[style],
  }
})
const NewH3 = styled("h3")(({ theme }) => {
  const styles2get = useStylesFunc(theme)
  return {...styles2get.textCenter}
})


const  ModalReassignment = (props) => {
  const { open,
    handleClose,
    rowData,
    handleReassignment,
    handleSelections,
    groupSelected,
    userSelected
  } = props
  const [arrayUsers, setArrayUsers] = useState([]);
  const [arrayGroups, setArrayGroups] = useState([]);
  const dialog = useDialog()

  const theme = useTheme()
  const styles2use = useStylesFunc(theme)
  
  const { handleSubmit,...objForm } = useForm()
  
  const getUsersByLeader = async () => {
    try {
      const params = {
        P_LEADER_ID: rowData.LEADER_ID,
        P_USER_ID: rowData.USER_ID,
        P_ASSIGNMENT_ID: rowData.ASSIGNMENT_ID
      }
      const { data } = await Axios.post('/dbo/team_manager/get_users_reassignment', params);
      setArrayUsers(data.p_cur_data);
    } catch (error) {
      console.log(error);
    }
  }

  const getGroupsByAssignment = async () => {
    try {
      const params = {
        P_ASSIGNMENT_ID: rowData.ASSIGNMENT_ID,
        P_USER_ID: rowData.USER_ID
      }
      console.log('getGroupsByAssignment')
      console.log(params)
      const { data } = await Axios.post('/dbo/team_manager/get_groups_reassignment', params);
      setArrayGroups(data.p_cur_data)
    } catch (error) {
      console.log();
    }
  }

  const checkSubmit = async (dataform) => {

    try{
     await handleReassignment()
      handleClose();
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    getUsersByLeader()
    getGroupsByAssignment()
    }, [])

  return (
    <>
      <NewModal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={NewBackdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <DivStyled
            ownerState={{
              style: "paper"
            }} >
            <DivStyled
              ownerState={{
                style: "buttonClose"
              }} >
              <IconButton onClick={handleClose}>
                <Icon style={{ fontSize: 32 }}>clear</Icon>
              </IconButton>
            </DivStyled>
            <GridContainer>
              <GridItem xs={12} className={styles2use.modal}>
                <GridContainer justify="center">
                  <GridItem xs={12}>
                    <NewH3>Selección de Usuario</NewH3>
                  </GridItem>
                  <GridItem xs={12}>
                    <CardBody>
                      <form autoComplete="off" onSubmit={handleSubmit(checkSubmit)}>
                        <GridContainer spacing={2}>
                          <GridItem xs={12}>
                            <SelectSimpleController
                              array={arrayUsers}
                              control={objForm.control}
                              label="Usuarios"
                              name={`p_cod_user`}
                              
                              onChange={v => handleSelections('USER',v)}
                            />
                          </GridItem>

                          <GridItem xs={12}>
                            <SelectSimpleController
                              array={arrayGroups}
                              control={objForm.control}
                              label="Grupos"
                              name={`p_group_id`}
                              onChange={v => handleSelections('GROUP',v)}
                            />
                          </GridItem>

                          <GridItem xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5em' }}>
                            <Button type="submit" color="success" round>
                              Reasignar
                            </Button>
                            <Button color="primary" round onClick={() => handleClose()}>
                              Cancelar
                            </Button>
                          </GridItem>
                        </GridContainer>
                      </form>
                    </CardBody>
                  </GridItem>
                </GridContainer>
              </GridItem>
            </GridContainer>
          </DivStyled>
        </Fade>
      </NewModal>
    </>
  )
}


export default ModalReassignment