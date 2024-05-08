import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";

import { FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText} from '@mui/material'

import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js";
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js";
import CardPanel from "components/Core/Card/CardPanel";

const ClientSubCardPanelThirdAccountForm = ({
    index,
    customerInformation,
    title,
    icon,
    iconColor,
    accountTypeArray,
    bankArray,
    accountArray,
    isRequired,
    setThirdAccount
}) => {
    const [accountNumberArray, setAccountNumberArray] = useState([]);
    const [dynamicMask, setDynamicMask] = useState("####");

    const [accountType, setAccountType] = useState("");
    const [accountBank, setAccountBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountNewNumber, setAccountNewNumber] = useState("");

    const [showNumberAccounts, setShowNumberAccounts] = useState(false);
    const [showNewAccount, setShowNewAccount] = useState(false);

    const isNotNullEmptyUndefined = (data) => {
        if(data !== null && data !== undefined && data !== "") {
            return true;
        }
        return false;
    };
    const isLength = (data, dataLength) => {
        if(data.length === dataLength) {
            return true;
        }
        return false;
    };

    const getMainAccount = (accountsObtained) => {
        let mainAccountFiltered = accountsObtained.filter(account => account.INDPRI === "S");
        if(mainAccountFiltered.length !== 0) {
            return mainAccountFiltered;
        }
        else {
            return [];
        }
    };

    const formatBankAccountNumber = (data) => {
        if(data !== "") {
            let firstFraction = data.substring(0,4);
            let secondFraction = data.substring(4,8);
            let thirdFraction = data.substring(8,10);
            let finalFraction = data.substring(10,20);
            let numberAccountFormatted = `${firstFraction}-${secondFraction}-${thirdFraction}-${finalFraction}`;
            return numberAccountFormatted;
        }
        else {
            return "";
        }
    };

    const controllerFormValidation = () => {
        let isFormValid = thirdAccountFormIsValid();
        let finalAccount = null;
        if(showNewAccount) {
            finalAccount = accountNewNumber.replaceAll("-","").trim();
        }
        else {
            finalAccount = accountNumber;
        }
        let dataForm = {
            flats: {
                index: index,
                isRequired: isRequired,
                isFormValid: isFormValid
            },
            data: {
                p_tipoid: customerInformation.TIPOID,
                p_numid: customerInformation.NUMID,
                p_dvid: customerInformation.DVID,
                p_numcuenta: finalAccount,
                p_tipocuenta: accountType,
                p_ctamoneda: index === "national" ? "NAC" : "EXT",
                p_portal_user_id: JSON.parse(sessionStorage.getItem('PROFILE')).P_PORTAL_USER_ID
            }
        }
        setThirdAccount(dataForm);
    };
    const thirdAccountFormIsValid = () => {
        let accountTypeIsValid = isNotNullEmptyUndefined(accountType);
        let accountBankIsValid = isNotNullEmptyUndefined(accountBank);
        let accountNumberIsValid = undefined;
        let finalAccount = null;
        if(showNewAccount) {
            finalAccount = accountNewNumber.replaceAll("-","").trim();
            accountNumberIsValid = isNotNullEmptyUndefined(finalAccount);
            accountNumberIsValid = isLength(finalAccount, 20);
        }
        else {
            finalAccount = accountNumber;
            accountNumberIsValid = isNotNullEmptyUndefined(accountNumber);
        }
        if(accountTypeIsValid && accountBankIsValid && accountNumberIsValid) {
            return true;
        }
        else {
            return false;
        }
    };

    const handleChangeFields = (e) => {
        switch(e.target.name) {
            case "third_account_type":
                e.target.value !== "" && setAccountType(e.target.value);
                break;
            case "third_account_bank":
                if(e.target.value !== "") {
                    if(accountArray.length === 0) {
                        setAccountBank(e.target.value);
                        setAccountNumber("new");
                        setAccountNewNumber("");
                        setShowNewAccount(true);
                        setDynamicMask(e.target.value);
                    }
                    else {
                        let tempAccountArray = accountArray.filter(account => account.CTA1 === e.target.value);
                        setAccountBank(e.target.value);
                        setAccountNumberArray(tempAccountArray);
                        setAccountNewNumber("");
                        setDynamicMask(e.target.value);
                        if(tempAccountArray.length !== 0) {
                            setShowNewAccount(false);
                        }
                        else {
                            setAccountNumber("new");
                            setShowNewAccount(true);
                        }
                    }
                }
                break;
            case "third_account_number":
                e.target.value !== "" && setAccountNumber(e.target.value);
                if(e.target.value === "new") {
                    setShowNewAccount(true);
                    setAccountNewNumber("");
                }
                else {
                    setShowNewAccount(false);
                }
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        if(accountArray.length !== 0) {
            let mainAccount = getMainAccount(accountArray)[0];
            setAccountNumberArray(accountArray);
            setAccountType(mainAccount.TIPOCUENTA);
            setAccountBank(mainAccount.CTA1);
            setAccountNumber(mainAccount.NUMCUENTA);
            setDynamicMask(mainAccount.CTA1);
        }
    }, [accountArray]);
    useEffect(() => {
        if(accountNumberArray.length !== 0) {
            let mainAccount = getMainAccount(accountNumberArray)[0];
            setAccountNumber(mainAccount.NUMCUENTA);
        }
    }, [accountBank]);
    useEffect(() => {
        if(accountType !== "" && accountBank !== "") {
            setShowNumberAccounts(true);   
        }
        else {
            setShowNumberAccounts(false);
        }
    }, [accountType, accountBank]);
    useEffect(() => {
        controllerFormValidation();
    }, [accountType, accountBank, accountNumber, accountNewNumber]);

    return(
        <>
            <CardPanel 
                titulo={title} 
                icon={icon} 
                iconColor={iconColor}
            >
                <GridContainer>
                    <GridItem item xs={12} sm={6} md={6} lg={6}>
                        <FormControl
                            style={{
                                width: '100%',
                                marginBottom:'0.6em'
                            }}
                        >
                            <InputLabel>
                                Tipo de Cuenta
                            </InputLabel>
                            <Select
                                name="third_account_type"
                                variant='standard'
                                value={accountType}
                                onChange={handleChangeFields}
                                required
                            >
                                {
                                    accountTypeArray.map((accountTypeItem, index) => (
                                        <MenuItem 
                                            key={index} 
                                            value={accountTypeItem.CODIGO}
                                        >
                                            {accountTypeItem.DESCRIP}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            {
                                accountTypeArray.length === 0 && (
                                    <FormHelperText>No se han cargado los tipos de cuenta</FormHelperText>
                                )
                            }
                        </FormControl>
                    </GridItem>
                    <GridItem item xs={12} sm={6} md={6} lg={6}>
                        <FormControl
                            style={{
                                width: '100%'
                            }}
                        >
                            <InputLabel>
                                Banco
                            </InputLabel>
                            <Select
                                name="third_account_bank"
                                variant='standard'
                                value={accountBank}
                                onChange={handleChangeFields}
                                required
                            >
                                {
                                    bankArray.map((accountBankItem, index) => (
                                        <MenuItem 
                                            key={index} 
                                            value={accountBankItem.CODENTFINAN}
                                        >
                                            {accountBankItem.DESCENTFINAN}
                                        </MenuItem>
                                    ))
                                }
                            </Select>
                            {
                                bankArray.length === 0 && (
                                    <FormHelperText>No se han cargado los bancos</FormHelperText>
                                )
                            }
                        </FormControl>
                    </GridItem>
                    {
                        showNumberAccounts && (
                            <>
                                <GridItem item xs={12} sm={6} md={6} lg={6}>
                                    <FormControl
                                        style={{
                                            width: '100%'
                                        }}
                                    >
                                        <InputLabel>
                                            Numero de Cuenta
                                        </InputLabel>
                                        <Select
                                            name="third_account_number"
                                            variant='standard'
                                            value={accountNumber}
                                            onChange={handleChangeFields}
                                            required
                                        >
                                            {
                                                accountNumberArray.map((accountNumberItem, index) => (
                                                    <MenuItem 
                                                        key={index} 
                                                        value={accountNumberItem.NUMCUENTA}
                                                    >
                                                        {formatBankAccountNumber(accountNumberItem.NUMCUENTA)}
                                                    </MenuItem>
                                                ))
                                            }
                                            <MenuItem
                                                value="new"
                                            >
                                                Nueva Cuenta
                                            </MenuItem>
                                        </Select>
                                    </FormControl>
                                </GridItem>
                                {
                                    showNewAccount && (
                                        <GridItem item xs={12} sm={6} md={6} lg={6}>
                                            <NumberFormat 
                                                value={accountNewNumber}
                                                defaultValue={dynamicMask}
                                                placeholder={dynamicMask}
                                                name="third_account_new_number"
                                                customInput={TextField}
                                                format={`${dynamicMask}-####-##-##########`}
                                                onValueChange={(values) => {
                                                    const { formattedValue, value } = values;
                                                    setAccountNewNumber(formattedValue);
                                                    setDynamicMask(accountBank);
                                                }}
                                                style={{
                                                    width: '100%',
                                                    paddingTop: '4px',
                                                    marginLeft: '-1px'
                                                }}
                                            />
                                        </GridItem>                           
                                    )
                                }
                            </>
                        )
                    }
                </GridContainer>
            </CardPanel>
        </>
    );
};

export default ClientSubCardPanelThirdAccountForm;
