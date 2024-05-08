/* eslint-disable */
import React, { useState, useEffect } from "react"
// nodejs library to set properties for components
import PropTypes from "prop-types"
// react components for routing our app without refresh
// import { graphql, Link, useStaticQuery } from "gatsby"
// import "./styles.scss"
// @mui components
import { styled } from "@mui/material/styles"
import { useTheme } from "@mui/material/styles"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import Icon from "@mui/material/Icon"
import Apps from "@mui/icons-material/Apps"
import ViewDay from "@mui/icons-material/ViewDay"
// import logoNew from "../../../../../static/nuevoIcon.png"
// core components
import CustomDropdown from "../CustomDropdown/CustomDropdown.js"
// import CustomButton from "components/material-kit-pro-react/components/CustomButton"
import CustomButton from "../../components/CustomButton"
// import { navigate } from "gatsby"
import Axios from "axios"
// import { initAxiosInterceptors } from "utils/axiosConfig"
// import { useDialog } from "context/DialogContext"
// import { useLoading } from "context/LoadingContext"
import headerLinksStyle from "./headerLinksStyle"
import Link from "next/link.js"

const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
//const insuranceCompany = 'piramide'

const keyUrlClub = "URL_CLUB"
const keyNameClub = "CLUB_NAME"

const NewList = styled(List)(({ theme }) => {
  const newListStyles = headerLinksStyle(theme)
  return {
    ...newListStyles.list,
    ...newListStyles.mlAuto,
  }
})

const NewListItem = styled(ListItem)(({ theme }) => {
  const newStyles = headerLinksStyle(theme)
  return {
    ...newStyles.listItem,
  }
})

const NewA = styled("a")(({ theme }) => {
  const newStyles = headerLinksStyle(theme)
  return {
    ...newStyles.links,
  }
})

const NewLink = styled(Link)(({ theme, className }) => ({
  ...className,
}))

const NewIcon = styled(Icon)(({ theme, className }) => ({
  ...className,
}))


export default function HeaderLinks(props) {
  const theme = useTheme()
  // const dialog = useDialog()
  // const loading = useLoading()
  const styles = headerLinksStyle(theme)
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2
    if (t < 1) return (c / 2) * t * t + b
    t--
    return (-c / 2) * (t * (t - 2) - 1) + b
  }

  const [PWAEvent, setPWAEvent] = useState(null)
  const [showButtton, setShowButton] = useState(false)
  const [urlClub, setUrlClub] = useState(false)
  const [nameClub, setNameClub] = useState(false)
  const [letterColor, setLetterColor] = useState('')

  const handleLetterColor = (company) => {
    const lc = (company === 'OCEANICA') ? 'black' : 'grey'
    setLetterColor(lc)

  }

  const handlePWAEvent = (e = null) => {
    e && e.preventDefault()
    e && setPWAEvent(e)
    setShowButton(true)
  }

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => handlePWAEvent(e))
    window.addEventListener("appinstalled", (evt) => {
      setShowButton(false)
    })
    return () => {
      window.removeEventListener("beforeinstallprompt", () => handlePWAEvent())
      window.removeEventListener("appinstalled", (evt) => {
        setShowButton(false)
      })
    }
  }, [])

  useEffect(() => {
    handleLetterColor(insuranceCompany)
    // initAxiosInterceptors(dialog, loading)
    const params = { p_key_name: keyUrlClub }
    const paramsName = { p_key_name: keyNameClub }
    const getValues = async () => {
      try {
        const { data } = await Axios.post(
          "/dbo/toolkit/get_constant_value",
          params
        )
        const result = await Axios.post(
          "/dbo/toolkit/get_constant_value",
          paramsName
        )
        setUrlClub(data.result)
        setNameClub(result.data.result)
      } catch (error) {
        console.log(error)
      }
    }
    getValues()
  }, [])

  const handleInstallPWA = () => {
    PWAEvent.prompt()
    PWAEvent.userChoice.then((choiceResult) => {
      if (choiceResult) {
        setShowButton(false)
      } else {
      }
    })
  }

  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20

    var animateScroll = function () {
      currentTime += increment
      var val = easeInOutQuad(currentTime, start, change, duration)
      element.scrollTop = val
      if (currentTime < duration) {
        setTimeout(animateScroll, increment)
      }
    }
    animateScroll()
  }

  const { dropdownHoverColor } = props
  const data = []
  // useStaticQuery(
  //   graphql`
  //     query {
  //       allStrapiSegmentosProductos: allStrapiSegmentosProducto(
  //         sort: { fields: orden, order: ASC }
  //       ) {
  //         edges {
  //           node {
  //             nombre_segmento
  //             codigo_segmento
  //             orden
  //             icono
  //           }
  //         }
  //       }
  //       allStrapiPerfiles: allStrapiPerfile(
  //         sort: { fields: orden, order: ASC }
  //       ) {
  //         edges {
  //           node {
  //             nombre_perfil
  //             icono_perfil
  //           }
  //         }
  //       }
  //     }
  //   `
  // )

  /*const accessOptions =
  [
    {nombre_segmento: 'Ingresa',icono:'lock_open', link_to: 'login'},
    {nombre_segmento: 'Regístrate',icono:'how_to_reg', link_to: 'register'},
  ];*/

  return (
    <NewList>
      {/* <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Servicios"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={data.allStrapiPerfiles.edges.map( ({node}) => (
            <Link to={`/Servicios/${node.nombre_perfil}`} className={classes.dropdownLink}>
              <Icon className={classes.dropdownIcons}>{node.icono_perfil}</Icon>{node.nombre_perfil}
            </Link>
          ))}
        />
      </ListItem> */}
      {/* {urlClub && (
        <NewListItem>
          <NewA rel="noreferrer noopener" target="_blank" href={urlClub}>
            <CustomButton
              color="primary"
              simple
              textColor="primary"
              className={styles.navLink}
            >
              <Icon color="primary">fiber_new</Icon>
              {nameClub}
            </CustomButton>
          </NewA>
        </NewListItem>
      )} */}


      {/* {insuranceCompany == "OCEANICA" && ( */}
      <NewListItem>
        <CustomButton
          simple
          textColor={letterColor}
          color="transparent"
          className={styles.navLink}
          // onClick={() => navigate("/InformacionCorporativa")}
          onClick={() => {}}
        >
          <Icon>group</Icon>
          Quiénes Somos
        </CustomButton>
      </NewListItem>
      {/* )} */}

      <NewListItem>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Productos"
          buttonProps={{
            className: styles.navLink,
            color: "transparent",
          }}
          buttonIcon={ViewDay}
          // dropdownList={data.allStrapiSegmentosProductos.edges.map(
          //   ({ node }) => (
          //     <NewLink
          //       href={`/Productos/${node.codigo_segmento}`}
          //       className={styles.dropdownLink}
          //     >
          //       <NewIcon className={styles.dropdownIcons}>{node.icono}</NewIcon>
          //       {node.nombre_segmento}
          //     </NewLink>
          //   )
          // )}
        />
      </NewListItem>
      <NewListItem>
        <CustomButton
          simple
          textColor={letterColor}
          color="transparent"
          className={styles.navLink}
          onClick={() => navigate("/pagos")}
        >
          <Icon>payment</Icon>
          Paga en Linea
        </CustomButton>
      </NewListItem>
      <NewListItem>
        <CustomButton
          simple
          textColor={letterColor}
          color="transparent"
          className={styles.navLink}
          onClick={() => navigate("/login")}
        >
          <Icon>lock_open</Icon>
          Ingresa
        </CustomButton>
      </NewListItem>
      <NewListItem>
        <CustomButton
          simple
          textColor={letterColor}
          color="transparent"
          className={styles.navLink}
          onClick={() => navigate("/register")}
        >
          <Icon>how_to_reg</Icon>
          Regístrate
        </CustomButton>
      </NewListItem>
      <NewListItem>
        <CustomButton
          simple
          textColor={letterColor}
          color="transparent"
          className={styles.navLink}
          onClick={() => navigate("/telemedicina")}
        >
          <>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
            />
            <Icon className="material-symbols-outlined">health_and_safety</Icon>
          </>
          Telemedicina
        </CustomButton>
      </NewListItem>
      {insuranceCompany === "OCEANICA" && (
        <NewListItem >
          <div className="agrandar">
          <NewA  rel="noreferrer noopener" target="_blank"  href={"https://oceanicadeseguros.com/aliados"}>
            <CustomButton
              color="primary"
              simple
              textColor={letterColor}
              className={styles.navLink}
              // styles={}
            >
              {/* <span style={{position:"absolute",color:"red",marginBottom:"15px",fontSize:"6px",width:"100%",display:"flex",justifyContent:"right",marginRight:"10px"}}>Nuevo</span> */}
              <Icon >search</Icon>
              {"Nuestros Aliados"}
              <img style={{width:"35px",height:"35px",transform:"rotate(90deg)"}} src={logoNew} alt="Descripción de la imagen"></img>
            </CustomButton>
          </NewA>
          </div>
        </NewListItem>


      )}
      {showButtton && (
        <NewListItem>
          <CustomButton
            simple
            textColor={letterColor}
            color="transparent"
            className={styles.navLinkApp}
            onClick={() => handleInstallPWA()}
          >
            <Apps />
            Instalar App
          </CustomButton>
        </NewListItem>
      )}
    </NewList>
  )
}

HeaderLinks.defaultProps = {
  hoverColor: "primary",
}

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose",
  ]),
}
