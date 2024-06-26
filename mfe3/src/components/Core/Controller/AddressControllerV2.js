import React, { Fragment, useState, useEffect } from 'react'
import Axios from 'axios'
import SelectSimpleController from './SelectSimpleController'
import InputController from './InputController'
import { listCountries } from 'utils/longList'
import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js"


export default function AddressControllerV2(props) {
    const { objForm, showCountry, showUrbanization, showDetails, index,
        countryId, estateId, cityId, municipalityId, urbanizationId, readOnly, enableUpdateOnUrbanization, showAddressInput, classes } = props
    const [initial, setInitial] = useState(true)
    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState(null)
    const [states, setStates] = useState([])
    const [state, setState] = useState(null)
    const [cities, setCities] = useState([])
    const [city, setCity] = useState(null)
    const [municipalities, setMunicipalities] = useState([])
    const [municipality, setMunicipality] = useState(null)
    const [urbanizations, setUrbanizations] = useState([])
    const [urbanization, setUrbanization] = useState(null)
    const [postalCode, setPostalCode] = useState(null)
    const columnsQuantityOnScreen = (showUrbanization) ? 3 : 4

    async function getCountries() {
        const result = await Axios.post('/dbo/toolkit/get_list_of_countries')
        setCountries(result.data.p_cursor)
    }

    async function getStates() {
        const params = { p_country_id: country }
        const result = await Axios.post('/dbo/toolkit/get_list_of_states', params)
        setStates(result.data.p_cursor)
    }

    async function getCities() {
        const params = { p_country_id: country, p_state_id: state }
        const result = await Axios.post('/dbo/toolkit/get_list_of_cities', params)
        setCities(result.data.p_cursor)
    }

    async function getMunicipalities() {
        const params = { p_country_id: country, p_state_id: state, p_city_id: city }
        const result = await Axios.post('/dbo/toolkit/get_list_of_municipalities', params)
        setMunicipalities(result.data.p_cursor)
    }

    async function getUrbanizations() {
        const params = { p_country_id: country, p_state_id: state, p_city_id: city, p_municipality_id: municipality }
        const result = await Axios.post('/dbo/toolkit/get_list_of_postal_code', params)
        setUrbanizations(result.data.p_cursor)
        setInitial(false)
    }

    function getPostalCode() {
        if (urbanizations) {
            const postal = urbanizations.find(element => element.CODIGO === urbanization)
            setPostalCode(postal.ZONAPOSTAL)
            objForm.setValue(`p_postal_code_${index}`, postal.ZONAPOSTAL)
        }
    }

    useEffect(() => {
        if (urbanization) {
            getPostalCode();
        } else {
            if (!initial) {
                setPostalCode(null)
                objForm.setValue(`p_postal_code_${index}`, "")
            }
        }
    }, [urbanization])

    useEffect(() => {
        if (municipality) {
            getUrbanizations()
            if (!initial) {
                setUrbanization(null)
                objForm.setValue(`p_urbanization_id_${index}`, "")
            }
        } else {
            setUrbanizations(null)
            setUrbanization(null)
        }
    }, [municipality])

    useEffect(() => {
        if (city) {
            getMunicipalities();
            if (!initial) {
                setMunicipality(null)
                objForm.setValue(`p_municipality_id_${index}`, "")
            }
        } else {
            setMunicipalities(null)
            setMunicipality(null)
        }
    }, [city])

    useEffect(() => {
        if (state) {
            getCities()
            if (!initial) {
                setCity(null)
                objForm.setValue(`p_city_id_${index}`, "")
            }
        } else {
            setCities(null)
            setCity(null)
        }
    }, [state])

    useEffect(() => {
        if (country) {
            getStates()
            if (!initial) {
                setState(null)
                objForm.setValue(`p_state_id_${index}`, "")
            }
        } else {
            setStates(null)
            setState(null)
        }
    }, [country])

    useEffect(() => {
        setCountries(listCountries)
        countryId ? setCountry(countryId) : setCountry('001')
        setState(estateId)
        setCity(cityId)
        setMunicipality(municipalityId)
        setUrbanization(urbanizationId)
    }, [])

    return (
        <GridContainer>
            {showCountry &&
                <GridItem item xs={12} sm={12} md={4} lg={4} >
                    <SelectSimpleController
                        {...objForm}
                        label="País"
                        defaultValue="001"
                        name={`p_country_id_${index}`}
                        array={countries}
                        onChange={v => setCountry(v)}
                        readonly={readOnly}
                    />
                </GridItem>
            }
            <GridItem item xs={12} sm={12} md={columnsQuantityOnScreen} lg={columnsQuantityOnScreen} >
                <SelectSimpleController
                    {...objForm}
                    label="Estado"
                    name={`p_state_id_${index}`}
                    array={states}
                    onChange={v => setState(v)}
                    readonly={readOnly}
                    sx={classes.containerSelect}
                />
            </GridItem>
            <GridItem item xs={12} sm={12} md={columnsQuantityOnScreen} lg={columnsQuantityOnScreen} >
                <SelectSimpleController
                    {...objForm}
                    label="Ciudad"
                    name={`p_city_id_${index}`}
                    array={cities}
                    onChange={v => setCity(v)}
                    readonly={readOnly}
                    sx={classes.containerSelect}
                />
            </GridItem>
            <GridItem item xs={12} sm={12} md={columnsQuantityOnScreen} lg={columnsQuantityOnScreen} >
                <SelectSimpleController
                    {...objForm}
                    label="Municipio"
                    name={`p_municipality_id_${index}`}
                    array={municipalities}
                    onChange={v => setMunicipality(v)}
                    readonly={readOnly}
                    sx={classes.containerSelect}
                />
            </GridItem>
            {showUrbanization &&
                <GridItem item xs={12} sm={12} md={columnsQuantityOnScreen} lg={columnsQuantityOnScreen} >
                    <SelectSimpleController
                        {...objForm}
                        label="Urbanización"
                        name={`p_urbanization_id_${index}`}
                        array={urbanizations}
                        onChange={v => setUrbanization(v)}
                        readonly={(enableUpdateOnUrbanization) ? false : readOnly}
                    />
                </GridItem>
            }
            {showDetails &&
                <GridItem item xs={12} sm={12} md={4} lg={4} >
                    <InputController readonly={readOnly} {...objForm} label="Avenida/Calle" name={`p_street_${index}`} />
                    <InputController readonly={readOnly} {...objForm} label="Edificio/Casa" name={`p_house_${index}`} />
                    <InputController readonly={readOnly} {...objForm} label="Piso/No Casa" name={`p_house_number_${index}`} />
                </GridItem>
            }
            {showAddressInput &&
                <GridItem item xs={12} sm={12} md={12} lg={12}  >
                    <InputController className={classes.containerLargeTextInput} readonly={readOnly} {...objForm} label="Dirección" name={`p_address_${index}`} />
                </GridItem>
            }
        </GridContainer>
    )
}
