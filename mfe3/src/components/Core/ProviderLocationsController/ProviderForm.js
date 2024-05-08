import React, { useState, useEffect } from "react"
import Axios from "axios"

//mui components
import { styled } from "@mui/material/styles"
import InputLabel from "@mui/material/InputLabel"
import Select from "@mui/material/Select"
import FormControl from "@mui/material/FormControl"
import TextField from "@mui/material/TextField"

// Core components
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import providerLocationsControllerStyle from "./providerLocationsControllerStyle"
import "./styles.scss"
import { ErrorOutlineOutlined } from "@mui/icons-material"

const NewForm = styled("form")(({ theme }) => ({
  ...providerLocationsControllerStyle.root,
}))

const NewFormControl = styled(FormControl)(({ theme }) => ({
  ...providerLocationsControllerStyle.selectFormControl,
}))

const NewSpan = styled("span")(({ theme }) => ({
  ...providerLocationsControllerStyle.errorMessage,
}))

export default function ProviderForm(props) {
  const insuranceCompany = process.env.GATSBY_INSURANCE_COMPANY
  const [category, setCategory] = useState("")
  const [service, setService] = useState("")
  const [apellido, setApellido] = useState("")
  const [lugarAtc, setLugarAtc] = useState("")
  const [address, setAddress] = useState("")
  const [providers, setProviders] = useState(null)
  const [providerServices, setProviderServices] = useState(null)
  const [providerService, setProviderService] = useState(null)
  const [providerServiceAmp, setProviderServiceAmp] = useState(null)
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [specialties, setSpecialties] = useState([])

  const [subSpecialties, setSubSpecialties] = useState([])

  const [specialty, setSpecialty] = useState("")

  const [subSpecialty, setSubSpecialty] = useState("")
  // console.log(specialties,"especialidadddddddddd")

  const [serviceSelected, setServiceSelected] = useState(false)
  const [stateSelected, setStateSelected] = useState("")
  const [citySelected, setCitySelected] = useState("")
  const [lvalProviderServices, setLvalProviderServices] = useState(null)
  const [filterCategory, setFilterCategory] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [servType, setServType] = useState("")
  const expRegular = /(\s{2,})/g
  let textCompany = ""
  let serviceTypeForValidate = undefined

  if (
    props.serviceTypeForValidate &&
    props.serviceTypeForValidate !== undefined
  ) {
    serviceTypeForValidate = props.serviceTypeForValidate
  }
  if (
    props.serviceType &&
    props.serviceType !== undefined &&
    props.serviceType === "04"
  ) {
    setServType(props.serviceType)
  }
  if (insuranceCompany === "OCEANICA") {
    textCompany =
      "Si el centro que buscas no se encuentra en el listado, por favor comunícate con el 0800-OCEANIC (6232642)"
  } else {
    textCompany =
      "Si tú búsqueda no sé encuentra en el listado, por favor comunícate con el 0800-SPIRAMI(7747264)"
  }
  async function getProviders() {
    try {
      const params = { p_service_type: serviceTypeForValidate }
      const result = await Axios.post(
        "/dbo/providers/get_providers_types_byservtype",
        params
      )
      setProviders(result.data.result)
    } catch (error) {
      console.log(error)
    }
  }

  async function getSpecialties() {
    const params = { cpCodEspe: "" }
    const result = await Axios.post(
      "dbo/medical_netword/get_medical_subspeciality",
      params
    )
    setSpecialties(result.data.p_cursor)
  }
  async function getProviderServices(listCode) {
    try {
      const params = { p_list_code: listCode }
      const result = await Axios.post("/dbo/toolkit/get_values_list", params)
      setProviderServices(result.data.p_cursor)
    } catch (error) {
      console.log(error);
    }
  }

  async function getLvalProviderServices() {
    try {
      const params = { p_list_code: "TIPCLISV" }
      const result = await Axios.post("/dbo/toolkit/get_values_list", params)
      setLvalProviderServices(result.data.p_cursor)
    } catch (error) {
      console.log(ErrorOutlineOutlined);
    }
  }

  // async function getState() {
  //   const params = { cpCodPais: "001" }
  //   const result = await Axios.post("dbo/medical_netword/get_state", params)
  //   setStates(result.data.p_cursor)
  // }

  // async function getState() {
  //   const params = { cpCodEspe: specialty,
  //   cpCodSespe: subSpecialty,
  //   // cpCodPais: "001"
  // }
  //   const result = await Axios.post("dbo/medical_netword/get_state_medical_network", params)
  //   setStates(result.data.p_cursor)
  // }

  const selectState = async event => {
    setLugarAtc("")
    setCitySelected("")
    setService("")  //nombre
    setApellido("") //apellido
    setAddress("") //direccion
    setStateSelected(event.target.value)

    const params = {
      cpCodEspe: specialty,
      cpCodSEspe: subSpecialty,
      cpCodEstado: event.target.value,
    }
    // const params2 = {
    //   cpCodClinica: "",
    //   cpCodEspe: specialty,
    //   cpCodEstado: event.target.value,
    //   cpCodCiudad: "",
    //   cpDirec: address,
    //   cpNombre: service,
    //   cpApellido: apellido,
    //   cpLugarAtc: lugarAtc,
    // }
    const params2 = {
      cpCodClinica: "",
      cpCodEspe: specialty,
      cpCodSEspe: subSpecialty,
      cpCodEstado: event.target.value,
      cpCodCiudad: "",
      cpDirec: address,
      cpNombre: service,
      cpApellido: apellido,
      cpLugarAtc: lugarAtc,
    }
    const result = await Axios.post("dbo/medical_netword/get_city_medical_network", params)

    setCities(result.data.p_cursor)

    try {
      // let apiUrl = "dbo/medical_netword/get_by_location"
      let apiUrl = "dbo/medical_netword/get_by_location_2"
      const result = await Axios.post(apiUrl, params2)
      if (result.data.p_cursor.length > 0) {
        let categoryArray = ""
        providers.map((item) => {
          if (item.PROVIDER_TYPE_CODE === category) {
            setFilterCategory(item.SEARCH_IN_MAP_AS)
            categoryArray = item.SEARCH_IN_MAP_AS
            console.log(item)
          }
          return null
        })
        props.providerData([result.data.p_cursor, categoryArray])
        setErrorMessage("")
      } else {
        props.providerData([])
        setErrorMessage("La busqueda no mostró ningún resultado")
      }
    } catch (e) {
      props.providerData("error")
      setErrorMessage("El servidor no responde. Por favor intenta más tarde")
    }
  }

  const selectSpeciality = async event => {

    
    console.log(event,'evento para probar')
    const evento = event.target.value === '' ? '' : JSON?.parse(event.target.value)
   console.log('valor de evento' + JSON.stringify(evento) )

    setSubSpecialty(evento?.CODSUBESPEC)
    setCitySelected("")
    setStateSelected("")
    setLugarAtc("")
    setService("")  //nombre
    setApellido("") //apellido
    setAddress("") //direccion
    setSpecialty(evento?.CODESPEC)

    // const params = {
    //   cpApellido: apellido,
    //   cpCodCiudad: citySelected,
    //   cpCodClinica: "",
    //   cpCodEspe: event.target.value,
    //   cpDirec: address,
    //   cpNombre: service,
    //   cpCodEstado: stateSelected,
    //   cpLugarAtc: lugarAtc,
    // }

    const params ={
      cpCodEspe:evento?.CODESPEC,
      cpCodSEspe: evento?.CODSUBESPEC
    }
                              

    const params2 = {
      cpApellido: apellido,
      cpCodEspe: evento?.CODESPEC,
      cpCodSEspe: evento?.CODSUBESPEC,
      cpCodCiudad: evento === "" ? "" : citySelected,
      cpDirec: address,
      cpNombre: service,
      cpCodEstado: evento === "" ? "" :stateSelected,
      cpLugarAtc: lugarAtc,
    }
        //nuevo
    const result = await Axios.post("dbo/medical_netword/get_state_medical_network", params)

    console.log(result, 'RESULT')
    setStates(result.data.p_cursor)

    //nuevo
    // const result = await Axios.post("dbo/medical_netword/get_medical_subspeciality", params)

    // console.log(result, 'RESULT')
    //  setSubSpecialties(result.data.p_cursor)




    try {
      // let apiUrl = "dbo/medical_netword/get_by_location"
      // const result = await Axios.post(apiUrl, params)
      let apiUrl = "dbo/medical_netword/get_by_location_2"
      const result = await Axios.post(apiUrl, params2)
      if (result.data.p_cursor.length > 0) {
        let categoryArray = ""
        providers.map(item => {
          if (item.PROVIDER_TYPE_CODE === category) {
            setFilterCategory(item.SEARCH_IN_MAP_AS)
            categoryArray = item.SEARCH_IN_MAP_A
          }
          return null
        })
        props.providerData([result.data.p_cursor, categoryArray])
        setErrorMessage("")
      } else {
        props.providerData([])
        setErrorMessage("La busqueda no mostró ningún resultado")
      }
    } catch (e) {
      props.providerData("error")
      setErrorMessage("El servidor no responde. Por favor intenta más tarde")
    }
  }

  /*Seleccionar Sub Especialidad*/

  const selectSubSpeciality = async event => {
    setCitySelected("")
    setStateSelected("")
    setLugarAtc("")
    setService("")  //nombre
    setApellido("") //apellido
    setAddress("") //direccion
    setSubSpecialty(event.target.value)

    const params = {
      cpApellido: apellido,
      cpCodCiudad: citySelected,
      cpCodClinica: "",
      cpCodEspe: specialty,
      cpCodSEspe:event.target.value,
      cpDirec: address,
      cpNombre: service,
      cpCodEstado: stateSelected,
      cpLugarAtc: lugarAtc,
    }

    try {
      let apiUrl = "dbo/medical_netword/get_by_location_2"
      const result = await Axios.post(apiUrl, params)
      if (result.data.p_cursor.length > 0) {
        let categoryArray = ""
        providers.map((item) => {
          if (item.PROVIDER_TYPE_CODE === category) {
            setFilterCategory(item.SEARCH_IN_MAP_AS)
            categoryArray = item.SEARCH_IN_MAP_A
          }
          return null
        })
        props.providerData([result.data.p_cursor, categoryArray])
        setErrorMessage("")
      } else {
        props.providerData([])
        setErrorMessage("La busqueda no mostró ningún resultado")
      }
    } catch (e) {
      props.providerData("error")
      setErrorMessage("El servidor no responde. Por favor intenta más tarde")
    }
  }

  
  const selectCity = async event => {
    setLugarAtc("")
    setService("")  //nombre
    setApellido("") //apellido
    setAddress("") //direccion
    setCitySelected(event.target.value)
    // const params2 = {
    //   cpCodClinica: "",
    //   cpCodEspe: specialty,
    //   cpCodEstado: stateSelected,
    //   cpCodCiudad: event.target.value,
    //   cpDirec: address,
    //   cpNombre: service,
    //   cpApellido: apellido,
    //   cpLugarAtc: lugarAtc,
    // }

    const params2 = {
      cpCodClinica: "",
      cpCodEspe: specialty,
      cpCodSEspe: subSpecialty,
      cpCodEstado: stateSelected,
      cpCodCiudad: event.target.value,
      cpDirec: address,
      cpNombre: service,
      cpApellido: apellido,
      cpLugarAtc: lugarAtc,
    }

    try {
      // let apiUrl = "dbo/medical_netword/get_by_location"
      let apiUrl = "dbo/medical_netword/get_by_location_2"
      const result = await Axios.post(apiUrl, params2)
      if (result.data.p_cursor.length > 0) {
        let categoryArray = ""
        providers.map((item) => {
          if (item.PROVIDER_TYPE_CODE === category) {
            setFilterCategory(item.SEARCH_IN_MAP_AS)
            categoryArray = item.SEARCH_IN_MAP_AS
          }
          return null
        })
        props.providerData([result.data.p_cursor, categoryArray])
        setErrorMessage("")
      } else {
        props.providerData([])
        setErrorMessage("La busqueda no mostró ningún resultado")
      }
    } catch (e) {
      props.providerData("error")
      setErrorMessage("El servidor no responde. Por favor intenta más tarde")
    }
  }

  const selectTypeServices = async (event) => {
    setProviderServiceAmp(event.target.value)
    const params = {
      p_service_type_for_scales_val: servType,
      p_name_to_find: service,
      p_direction_to_find: address,
      p_provider_type: category,
      p_service_code: event.target.value,
      p_tipopreadmin: serviceTypeForValidate,
    }
    try {
      let apiUrl = serviceTypeForValidate
        ? "/dbo/providers/get_providers_info_by_tipopreadmin"
        : "/dbo/providers/get_providers_info"
      const result = await Axios.post(apiUrl, params)
      if (result.data.result.length > 0) {
        let categoryArray = ""
        providers.map((item) => {
          if (item.PROVIDER_TYPE_CODE === category) {
            categoryArray = item.SEARCH_IN_MAP_AS
            setFilterCategory(item.SEARCH_IN_MAP_AS)
          }
          return null
        })
        props.providerData([result.data.result, categoryArray])
        setErrorMessage("")
      } else {
        props.providerData([])
        setErrorMessage("La busqueda no mostró ningún resultado")
      }
    } catch (e) {
      props.providerData("error")
      setErrorMessage("El servidor no responde. Por favor intenta más tarde")
    }
  }

  useEffect(() => {
    //getState()
    getProviders()
    getLvalProviderServices()
    getSpecialties()
  }, [props.callFrom])

  const changeInput = async (event) => {
    if (event.target.name === "category") {
      setService("")
      setApellido("")
      setAddress("")
      setProviderServiceAmp("")
    }
    let valueEvent = event.target.value
    setSpecialty("")
    setSubSpecialty("")
    setStateSelected("")
    setCitySelected("")
    setLugarAtc("")
    event.preventDefault()
    setServiceSelected(true)
    event.target.name === "provider_service" &&
      setProviderService(event.target.value)

    // event.target.name === "category" && setCategory(event.target.value); 
    event.target.name === "category" && setCategory(event.target.value); props.setCategory(event.target.value)
    event.target.name === "service"  && setService(event.target.value)
    event.target.name === "address"  && setAddress(event.target.value)
    //Los Servicios asociados a los Proveedores de cargan solo si se encuentran configurados en 'TIPCLISV'. Ej. AMP/SERVCLIN
    if (
      event.target.name === "category" &&
      event.target.value &&
      lvalProviderServices &&
      lvalProviderServices.length > 0
    ) {
      const searchLval = lvalProviderServices.filter(
        (inputParam) => inputParam.VALOR === event.target.value
      )
      if (searchLval[0] && searchLval[0].DESCRIPCION) {
        getProviderServices(searchLval[0].DESCRIPCION.toUpperCase())
      } else {
        setProviderServices(null)
      }
    }

    if (event.target.name === "category" && event.target.value != "MP") {
      const params = {
        p_service_type_for_scales_val: servType,
        p_name_to_find: service,
        p_direction_to_find: address,
        p_provider_type: event.target.value,
        p_service_code: providerServiceAmp,
        p_tipopreadmin: serviceTypeForValidate,
      }
      try {
        let apiUrl = serviceTypeForValidate
          ? "/dbo/providers/get_providers_info_by_tipopreadmin"
          : "/dbo/providers/get_providers_info"
        const result = await Axios.post(apiUrl, params)
        if (result.data.result.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === valueEvent) {
              categoryArray = item.SEARCH_IN_MAP_AS
              setFilterCategory(item.SEARCH_IN_MAP_AS)
            }
            return null
          })
          props.providerData([result.data.result, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {
        props.providerData("error")
        setErrorMessage("El servidor no responde. Por favor intenta más tarde")
      }
    } else {
      // const params2 = {
      //   cpCodClinica: "",
      //   cpCodEspe: "",
      //   cpCodEstado: "",
      //   cpCodCiudad: "",
      //   cpDirec: "",
      //   cpNombre: "",
      //   cpApellido: "",
      //   cpLugarAtc: "",
      // }

      const params2 = {
        cpCodClinica: "",
        cpCodEspe: "",
        cpCodSEspe: "",
        cpCodEstado: "",
        cpCodCiudad: "",
        cpDirec: "",
        cpNombre: "",
        cpApellido: "",
        cpLugarAtc: "",
      }

      try {
        // let apiUrl = "dbo/medical_netword/get_by_location"
        let apiUrl = "dbo/medical_netword/get_by_location_2"
        const result = await Axios.post(apiUrl, params2)
        if (result.data.p_cursor.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (
              item.PROVIDER_TYPE_CODE === category ||
              item.PROVIDER_TYPE_CODE === valueEvent
            ) {
              setFilterCategory(item.SEARCH_IN_MAP_AS)
              categoryArray = item.SEARCH_IN_MAP_AS
            }
            return null
          })
          props.providerData([result.data.p_cursor, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {
        props.providerData("error")
        setErrorMessage("El servidor no responde. Por favor intenta más tarde")
      }
    }
  }

  const changeTextSearchClinic = async (nameInput) => {
    if (category === "MP") {
      // const params2 = {
      //   cpCodClinica: "",
      //   cpCodEspe: specialty,
      //   cpCodEstado: stateSelected,
      //   cpCodCiudad: citySelected,
      //   cpDirec: address,
      //   cpNombre: service,
      //   cpApellido: apellido,
      //   cpLugarAtc: nameInput,
      // }

      const params2 = {
        cpCodClinica: "",
        cpCodEspe: specialty,
        cpCodSEspe: subSpecialty,
        cpCodEstado: stateSelected,
        cpCodCiudad: citySelected,
        cpDirec: address,
        cpNombre: service,
        cpApellido: apellido,
        cpLugarAtc: nameInput,
      }
      try {
        // let apiUrl = "dbo/medical_netword/get_by_location"
        let apiUrl = "dbo/medical_netword/get_by_location_2"
        const result = await Axios.post(apiUrl, params2)
        if (result.data.p_cursor.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              setFilterCategory(item.SEARCH_IN_MAP_AS)
              categoryArray = item.SEARCH_IN_MAP_AS
            }
            return null
          })
          props.providerData([result.data.p_cursor, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {
        props.providerData("error")
        setErrorMessage("El servidor no responde. Por favor intenta más tarde")
      }
    } else {
      const params = {
        p_service_type_for_scales_val: servType,
        p_name_to_find: nameInput,
        p_direction_to_find: address,
        p_provider_type: category,
        p_service_code: providerServiceAmp,
        p_tipopreadmin: serviceTypeForValidate,
      }
      try {
        let apiUrl = serviceTypeForValidate
          ? "/dbo/providers/get_providers_info_by_tipopreadmin"
          : "/dbo/providers/get_providers_info"
        const result = await Axios.post(apiUrl, params)
        if (result.data.result.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              categoryArray = item.SEARCH_IN_MAP_AS
              setFilterCategory(item.SEARCH_IN_MAP_AS)
            }
            return null
          })
          props.providerData([result.data.result, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {}
    }
  }

  const changeTextSearchName = async (nameInput) => {
    if (category === "MP") {
      let nombreAux = nameInput?.trim()
      let nombreSinEspacios = nombreAux?.replace(expRegular, " ")
      setService(nombreSinEspacios)
      // const params2 = {
      //   cpCodClinica: "",
      //   cpCodEspe: specialty,
      //   cpCodEstado: stateSelected,
      //   cpCodCiudad: citySelected,
      //   cpDirec: address,
      //   cpNombre: nombreSinEspacios,
      //   cpApellido: apellido,
      //   cpLugarAtc: lugarAtc,
      // }
      const params2 = {
        cpCodClinica: "",
        cpCodEspe: specialty,
        cpCodSEspe: subSpecialty,
        cpCodEstado: stateSelected,
        cpCodCiudad: citySelected,
        cpDirec: address,
        cpNombre: nombreSinEspacios,
        cpApellido: apellido,
        cpLugarAtc: lugarAtc,
      }
      try {
        // let apiUrl = "dbo/medical_netword/get_by_location"
        let apiUrl = "dbo/medical_netword/get_by_location_2"
        const result = await Axios.post(apiUrl, params2)
        if (result.data.p_cursor.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              setFilterCategory(item.SEARCH_IN_MAP_AS)
              categoryArray = item.SEARCH_IN_MAP_AS
            }
            return null
          })
          props.providerData([result.data.p_cursor, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {
        props.providerData("error")
        setErrorMessage("El servidor no responde. Por favor intenta más tarde")
      }
    } else {
      const params = {
        p_service_type_for_scales_val: servType,
        p_name_to_find: nameInput,
        p_direction_to_find: address,
        p_provider_type: category,
        p_service_code: providerServiceAmp,
        p_tipopreadmin: serviceTypeForValidate,
      }
      try {
        let apiUrl = serviceTypeForValidate
          ? "/dbo/providers/get_providers_info_by_tipopreadmin"
          : "/dbo/providers/get_providers_info"
        const result = await Axios.post(apiUrl, params)
        if (result.data.result.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              categoryArray = item.SEARCH_IN_MAP_AS
              setFilterCategory(item.SEARCH_IN_MAP_AS)
            }
            return null
          })
          props.providerData([result.data.result, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {}
    }
  }
  const changeTextSearchApellido = async (nameInput) => {
    let apellidoAux = nameInput?.trim()
    let apellidoSinEspacios = apellidoAux?.replace(expRegular, " ")
    setApellido(apellidoSinEspacios)
    if (category === "MP") {
      // const params2 = {
      //   cpCodClinica: "",
      //   cpCodEspe: specialty,
      //   cpCodEstado: stateSelected,
      //   cpCodCiudad: citySelected,
      //   cpDirec: address,
      //   cpNombre: service,
      //   cpApellido: apellidoSinEspacios,
      //   cpLugarAtc: lugarAtc,
      // }
      const params2 = {
        cpCodClinica: "",
        cpCodEspe: specialty,
        cpCodSEspe: subSpecialty,
        cpCodEstado: stateSelected,
        cpCodCiudad: citySelected,
        cpDirec: address,
        cpNombre: service,
        cpApellido: apellidoSinEspacios,
        cpLugarAtc: lugarAtc,
      }
      try {
        // let apiUrl = "dbo/medical_netword/get_by_location"
        let apiUrl = "dbo/medical_netword/get_by_location_2"
        const result = await Axios.post(apiUrl, params2)
        if (result.data.p_cursor.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              setFilterCategory(item.SEARCH_IN_MAP_AS)
              categoryArray = item.SEARCH_IN_MAP_AS
            }
            return null
          })
          props.providerData([result.data.p_cursor, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {
        props.providerData("error")
        setErrorMessage("El servidor no responde. Por favor intenta más tarde")
      }
    } else {
      const params = {
        p_service_type_for_scales_val: servType,
        p_name_to_find: nameInput,
        p_direction_to_find: address,
        p_provider_type: category,
        p_service_code: providerServiceAmp,
        p_tipopreadmin: serviceTypeForValidate,
      }
      try {
        let apiUrl = serviceTypeForValidate
          ? "/dbo/providers/get_providers_info_by_tipopreadmin"
          : "/dbo/providers/get_providers_info"
        const result = await Axios.post(apiUrl, params)
        if (result.data.result.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              categoryArray = item.SEARCH_IN_MAP_AS
              setFilterCategory(item.SEARCH_IN_MAP_AS)
            }
            return null
          })
          props.providerData([result.data.result, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {}
    }
  }

  const changeTextSearchAddress = async (addressInput) => {
    if (category === "MP") {
      // const params2 = {
      //   cpCodClinica: "",
      //   cpCodEspe: specialty,
      //   cpCodEstado: stateSelected,
      //   cpCodCiudad: citySelected,
      //   cpDirec: addressInput,
      //   cpNombre: service,
      //   cpApellido: apellido,
      //   cpLugarAtc: lugarAtc,
      // }
      const params2 = {
        cpCodClinica: "",
        cpCodEspe: specialty,
        cpCodEstado: stateSelected,
        cpCodSEspe: subSpecialty,
        cpCodCiudad: citySelected,
        cpDirec: addressInput,
        cpNombre: service,
        cpApellido: apellido,
        cpLugarAtc: lugarAtc,
      }
      try {
        // let apiUrl = "dbo/medical_netword/get_by_location"
        let apiUrl = "dbo/medical_netword/get_by_location_2"
        const result = await Axios.post(apiUrl, params2)
        if (result.data.p_cursor.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              categoryArray = item.SEARCH_IN_MAP_AS
              setFilterCategory(item.SEARCH_IN_MAP_AS)
            }
            return null
          })
          props.providerData([result.data.p_cursor, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {
        props.providerData("error")
        setErrorMessage("El servidor no responde. Por favor intenta más tarde")
      }
    } else {
      const params = {
        p_service_type_for_scales_val: servType,
        p_name_to_find: service,
        p_direction_to_find: addressInput,
        p_provider_type: category,
        p_service_code: providerServiceAmp,
        p_tipopreadmin: serviceTypeForValidate,
      }
      try {
        let apiUrl = serviceTypeForValidate
          ? "/dbo/providers/get_providers_info_by_tipopreadmin"
          : "/dbo/providers/get_providers_info"
        const result = await Axios.post(apiUrl, params)
        if (result.data.result.length > 0) {
          let categoryArray = ""
          providers.map((item) => {
            if (item.PROVIDER_TYPE_CODE === category) {
              setFilterCategory(item.SEARCH_IN_MAP_AS)
              categoryArray = item.SEARCH_IN_MAP_AS
            }
            return null
          })
          props.providerData([result.data.result, categoryArray])
          setErrorMessage("")
        } else {
          props.providerData([])
          setErrorMessage("La busqueda no mostró ningún resultado")
        }
      } catch (e) {}
    }
  }

  const handleSubmitProviders = async (e) => {
    e.preventDefault()
    if (service.length > 0 && address.length > 0) {
      setErrorMessage("No debe ingresar nombre y dirección de forma simultánea")
      return undefined
    } else if (
      (!servType || servType.length === 0) &&
      (!service || service.length === 0) &&
      (!address || address.length === 0) &&
      (!category || category.length === 0) &&
      (!providerService || providerService.length === 0)
    ) {
      setErrorMessage("Debe ingresar al menos un parámetro de búsqueda")
      return undefined
    }

    const params = {
      p_service_type_for_scales_val: servType,
      p_name_to_find: service,
      p_direction_to_find: address,
      p_provider_type: category,
      p_service_code: providerServiceAmp,
      p_tipopreadmin: serviceTypeForValidate,
    }
    try {
      let apiUrl = serviceTypeForValidate
        ? "/dbo/providers/get_providers_info_by_tipopreadmin"
        : "/dbo/providers/get_providers_info"
      const result = await Axios.post(apiUrl, params)
      if (result.data.result.length > 0) {
        let categoryArray = ""
        providers.map((item) => {
          if (item.PROVIDER_TYPE_CODE === category) {
            setFilterCategory(item.SEARCH_IN_MAP_AS)
            categoryArray = item.SEARCH_IN_MAP_AS
          }
          return null
        })
        props.providerData([result.data.result, categoryArray])
      } else {
        props.providerData([])
        setErrorMessage("La busqueda no mostró ningún resultado")
      }
    } catch (e) {
      props.providerData("error")
      setErrorMessage("El servidor no responde. Por favor intenta más tarde")
    }
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => changeTextSearchName(service), 600)
    return () => clearTimeout(timeOutId)
  }, [service])
  useEffect(() => {
    const timeOutId = setTimeout(() => changeTextSearchApellido(apellido), 600)
    return () => clearTimeout(timeOutId)
  }, [apellido])

  useEffect(() => {
    const timeOutId = setTimeout(() => changeTextSearchClinic(lugarAtc), 600)
    return () => clearTimeout(timeOutId)
  }, [lugarAtc])

  useEffect(() => {
    const timeOutId = setTimeout(() => changeTextSearchAddress(address), 600)
    return () => clearTimeout(timeOutId)
  }, [address])

  return (
    <GridItem
      xs={12}
      sm={12}
      md={4}
      className={providerLocationsControllerStyle.pTop30}
    >
      <NewForm onSubmit={handleSubmitProviders}>
        <NewFormControl
          fullWidth
          variant="standard"
          sx={{ marginBottom: "20px" }}
        >
          <InputLabel htmlFor="my-id-category">¿Qué deseas ubicar?</InputLabel>
          <Select
            id="my-id-category"
            fullWidth
            native
            value={category}
            onChange={changeInput}
            inputProps={{
              name: "category",
              id: "my-id-category",
            }}
          >
            <option key="" aria-label="None" value="" />
            {providers &&
              providers.map((item, index) => (
                <option key={`abc__${index}`} value={item.PROVIDER_TYPE_CODE}>
                  {item.PROVIDER_TYPE_DESCRIPTION}
                </option>
              ))}
          </Select>
        </NewFormControl>
        {serviceSelected && category === "MP" && (
          <NewFormControl
            fullWidth
            variant="standard"
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="provider_service_id">
              Seleccione Especialidad
            </InputLabel>
            <Select
              id="provider_service_id"
              fullWidth
              native
              // value={specialty}
              onChange={selectSpeciality}
              inputProps={{
                name: "provider_service",
                id: "provider_service_id",
              }}
            >
              <option key="" aria-label="None" value="" />
              {providerServices &&
                specialties.map((item, index) => (
                  // console.log(item)
                  <option key={`abc__${index}`} value={JSON.stringify(item)}>
                    {item.DESCESPE}
                  </option>
                ))}
            </Select>
          </NewFormControl>
        )}


{/* --------------------------- subSpecialties ----------------------------------*/}

{/* {specialty && category === "MP" && (
          <NewFormControl
            fullWidth
            variant="standard" 
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="provider_service_id">
              Seleccione Sub Especialidad
            </InputLabel>
            <Select
              id="provider_service_id_sub_especialidad"
              fullWidth
              native
             value={subSpecialty}
             onChange={selectSubSpeciality}
              inputProps={{
                name: "provider_service",
                id: "provider_service_id",
              }}
            >
              <option key="" aria-label="None" value="" />
              {providerServices &&
                subSpecialties?.map((item, index) => (
                  <option key={`abc__${index}`} value={item.CODIGO}>
                    {item.DESCESPE}
                  </option>
                ))}
            </Select>                   
          </NewFormControl>
        )} */}


{/* AQUI HAY UN CAMBIO */}
        {  specialty && serviceSelected && category === "MP" ? (
          <NewFormControl
            fullWidth
            variant="standard"
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="provider_state">
              Seleccione el Estado
            </InputLabel>
            <Select
              id="provider_state_id"
              fullWidth
              native
              value={stateSelected}
              onChange={selectState}
              inputProps={{
                name: "provider_state",
                id: "provider_state_id",
              }}
            >
              <option key="" aria-label="None" value="" />
              {states &&
                states.map((item, index) => (
                  <option key={`abc__${index}`} value={item.CODESTADO}>
                    {item.DESCESTADO}
                  </option>
                ))}
            </Select>
          </NewFormControl>
        ) : null}
        {stateSelected && (
          <NewFormControl
            fullWidth
            variant="standard"
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="provider_state">
              Seleccione la Ciudad
            </InputLabel>
            <Select
              id="provider_state_id"
              fullWidth
              native
              value={citySelected}
              onChange={selectCity}
              inputProps={{
                name: "provider_state",
                id: "provider_state_id",
              }}
            >
              <option key="" aria-label="None" value="" />
              {cities &&
                cities.map((item, index) => (
                  <option key={`abc__${index}`} value={item.CODCIUDAD}>
                    {item.DESCCIUDAD}
                  </option>
                ))}
            </Select>
          </NewFormControl>
        )}
        {category === "AP" && (
          <NewFormControl
            fullWidth
            variant="standard"
            style={{ marginBottom: "20px" }}
          >
            <InputLabel htmlFor="provider_state">Tipo de Servicio</InputLabel>
            <Select
              id="provider_type_services"
              fullWidth
              native
              value={providerServiceAmp}
              onChange={selectTypeServices}
              inputProps={{
                name: "provider_type_services",
                id: "provider_type_services_id",
              }}
            >
              <option key="" aria-label="None" value="" />
              {providerServices &&
                providerServices.map((item, index) => (
                  <option key={`abc__${index}`} value={item.VALOR}>
                    {item.DESCRIPCION}
                  </option>
                ))}
            </Select>
          </NewFormControl>
        )}
        {category === "MP" && (
          <>
            <TextField
              id="lugarAtc"
              name="lugarAtc"
              variant="standard"
              value={lugarAtc}
              label="Clínica o lugar de atención"
              onChange={(event) => setLugarAtc(event.target.value)}
            />
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: "10px",
              }}
            >
              <TextField
                id="service"
                name="service"
                variant="standard"
                value={service}
                label="Buscar por Nombre"
                onChange={(event) => setService(event.target.value)}
              />
              <TextField
                id="service"
                name="service"
                variant="standard"
                value={apellido}
                label="Buscar por Apellido"
                onChange={(event) => setApellido(event.target.value)}
              />
            </div>
          </>
        )}
        {category != "MP" && (
          <TextField
            id="service"
            name="service"
            variant="standard"
            value={service}
            label="Buscar por nombre"
            onChange={(event) => setService(event.target.value)}
          />
        )}
        <TextField
          id="address"
          name="address"
          variant="standard"
          value={address}
          label="Buscar por dirección"
          onChange={(event) => setAddress(event.target.value)}
        />
        <NewSpan className=" blink_me">{errorMessage}</NewSpan>
      </NewForm>
    </GridItem>
  )
}
