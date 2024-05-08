/* Import modules */
import React, { useState, useEffect } from "react";
//import NumberFormat from "react-number-format";
import { PatternFormat } from 'react-number-format';

import { FormControl, InputLabel, Select, MenuItem, TextField, FormHelperText} from '@mui/material';
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

/* Import components */
import GridContainer from "components/material-kit-pro-react/components/Grid/GridContainer.js"
import GridItem from "components/material-kit-pro-react/components/Grid/GridItem.js"
import CardPanel from "components/Core/Card/CardPanel";

/* Import custom hooks */
import useBudgetCardPanelThirdAccountForm from "components/CardPanels/BudgetCardPanelThirdAccountForm/hooks/useBudgetCardPanelThirdAccountForm";

/**
 * BudgetCardPanelThirdAccountForm React Component
 * @description     This react component show card panel to update third budget accounts.
 * @props           {index} This props store if it is holder or invoiceer.
 * @props           {title} This props store card panel title to render.
 * @props           {customerInformation} This props store customer information.
 * @props           {currencyPlanChosenByClient} This props store type of budget currency choosen by client. 
 * @props           {isRequired} This props store if this form is required or not.
 * @props           {setThirdAccountDataForm} This method set third account data form from BudgetController & Cotizar components.
 * @state           {currencyTypeArray} This state store currency type array fetched.
 * @state           {accountTypeArray} This state store account type array fetched.
 * @state           {accountBankArray} This state store account bank array fetched.
 * @state           {customerAccounts} This state store all acount customer fetched.
 * @state           {accountNumberArray} This state store active customer account array.
 * @state           {dynamicMask} This state control dynamic mask used on new number account field on form.
 * @state           {currencyType} This state store currencyType field value on form.
 * @state           {accountType} This state store accountType field value on form.
 * @state           {accountBank} This state store accountBank field value on form.
 * @state           {accountNumber} This state store accountNumber field value on form.
 * @state           {showNumberAccounts} This state store the flat to show number account field and new number account field on form.
 * @state           {showNewAccount} This state store the flat to show new number account field on form.
 * @returns         React component. 
 */
const BudgetCardPanelThirdAccountForm = (props) => {
    // Props
    const {
        index,
        title,
        customerInformation,
        currencyPlanChosenByClient,
        isRequired,
        setThirdAccountDataForm
    } = props;
    // States
    const [currencyTypeArray, setCurrencyTypeArray] = useState([]);
    const [accountTypeArray, setAccountTypeArray] = useState([]);
    const [accountBankArray, setAccountBankArray] = useState([]);
    const [customerAccounts, setCustomerAccounts] = useState([]);
    const [accountNumberArray, setAccountNumberArray] = useState([]);
    const [dynamicMask, setDynamicMask] = useState("####");
    // Form fields states
    const [currencyType, setCurrencyType] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountBank, setAccountBank] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [accountNewNumber, setAccountNewNumber] = useState("");
    // Flats form fields states
    const [showNumberAccounts, setShowNumberAccounts] = useState(false);
    const [showNewAccount, setShowNewAccount] = useState(false);
    // Custom hooks
    const { 
        getBudgetCurrencyType, 
        getBudgetAccountType,
        getBudgetBanks,
        getBudgetCustomerInformation, 
        getBudgetCustomerAccounts 
    } = useBudgetCardPanelThirdAccountForm();
    // General methods
    /** 
     * @description     This method check if data is null, empty or undefined.
     * @param           {data} store data to check.
     * @returns          boolean. 
     */
    const isNotNullEmptyUndefined = (data) => {
        if(data !== null && data !== undefined && data !== "") {
            return true;
        }
        return false;
    };
    /**
     * @description     This method check if data length is equal to dataLength.
     * @param           {data} store data to check.
     * @param           {dataLength} store length data for checking.
     * @return          boolean. 
     * @returns          React component.
     */
    const isLength = (data, dataLength) => {
        if(data.length === dataLength) {
            return true;
        }
        return false;
    };
    /**  
     * @description     This method allow to get main Account from all customer accounts.
     * @returns         any. 
     */
    const getMainAccount = () => {
        let mainCustomerAccount = customerAccounts.filter(customerAccount => customerAccount.INDPRI === "S");
        if(mainCustomerAccount && mainCustomerAccount.length !== 0) {
            return mainCustomerAccount[0];
        }
        else {
            return null;
        }
    };
    // Formatter methods
    /**
     * @description     This method format number string into account number string.
     * @param           {data} string to format.
     * @returns          string.
     */
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
    // Verifier methods
    /**
     * @description     This method control all third account form validation and calls to handle this.
     * @returns         void.
     */
     const controllerFormValidation = () => {
        let clientSession = JSON.parse(sessionStorage.getItem('PROFILE'));
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
                p_ctamoneda: currencyType,
                p_portal_user_id: clientSession !== null ? JSON.parse(sessionStorage.getItem('PROFILE')).P_PORTAL_USER_ID : null
            }
        };
        setThirdAccountDataForm(dataForm);
    };
    /**
     * @description     This method check if third account form is valid or not.
     * @returns          void.
     */
    const thirdAccountFormIsValid = () => {
        let currencyTypeIsValid = isNotNullEmptyUndefined(currencyType);
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
        if(currencyTypeIsValid && accountTypeIsValid && accountBankIsValid && accountNumberIsValid) {
            return true;
        }
        else {
            return false;
        }
    };
    // Fetcher methods
    /** 
     * @description     This method fetch currency type data on budget flow.
     * @returns         void. 
     */
    const fetchBudgetCurrencyType = async () => {
        let response = await getBudgetCurrencyType();
        if(response.length !== 0) {
            setCurrencyTypeArray(response);
        }     
    };
    /** 
     * @description     This method fetch account type data on budget flow.
     * @returns         void. 
     */
    const fetchBudgetAccountType = async () => {
        let response = await getBudgetAccountType();
        if(response.length !== 0) {
            setAccountTypeArray(response);
        }     
    };
    /** 
     * @description     This method fetch account banks data on budget flow.
     * @returns         void. 
     */
    const fetchBudgetBanks = async () => {
        let response = await getBudgetBanks();
        if(response.length !== 0) {
            setAccountBankArray(response);
        }     
    };
    /** 
     * @description     This method fetch customer information from budget flow.
     * @returns         void. 
     */
    const fetchBudgetCustomerInformation = async (accountBank=null) => {
        let response = await getBudgetCustomerInformation(
            customerInformation.TIPOID.toString(), 
            customerInformation.NUMID.toString(), 
            customerInformation.TIPOID === 'J' || customerInformation.TIPOID === 'G' ? customerInformation.DVID.toString() : parseInt(customerInformation.DVID)
        );
        if(response.length !== 0) {
            let customerInfo = response[0];
            await fetchBudgetCustomerAccounts(customerInfo.CODCLI, accountBank);
        }
    };
    /** 
     * @description     This method get budget customer accounts on budget flow.
     * @param           {customerCode} This param store customer code.
     * @returns         void. 
     */
    const fetchBudgetCustomerAccounts = async (customerCode, accountBank) => {
        let response = await getBudgetCustomerAccounts(
            currencyPlanChosenByClient.toString(),
            customerCode?.toString(),
            currencyType !== "" ? currencyType : null,
            accountType !== "" ? accountType : null,
            accountBank
        );
        if(response.length !== 0) {
            setCustomerAccounts(response);
            setAccountNumberArray(response);
            setShowNewAccount(false);
        }
        else {
            setCustomerAccounts([]);
            setAccountNumberArray([]);
            setShowNewAccount(true);
        }
    };
    // Handler methods
    /** 
     * @description     This handler method control every change on inputs.
     * @returns         void. 
     */
    const handleChangeFields = (e) => {
        switch(e.target.name) {
            case "third_account_type_currency":
                (e.target.value !== null && e.target.value !== undefined && e.target.value !== "") && setCurrencyType(e.target.value);
                break;
            case "third_account_type":
                (e.target.value !== null && e.target.value !== undefined && e.target.value !== "") && setAccountType(e.target.value);
                break;
            case "third_account_bank":
                (e.target.value !== null && e.target.value !== undefined && e.target.value !== "") && setAccountBank(e.target.value);
                fetchBudgetCustomerInformation(e.target.value);
                setDynamicMask(e.target.value);
                // if(customerAccounts.length !== 0) {
                //     let tempAccounts = customerAccounts.filter(accountItem => accountItem.CTA1 === e.target.value);
                //     let mainTempCustomerAccount = tempAccounts.filter(tempAccountItem => tempAccountItem.INDPRI === "S");
                //     if(tempAccounts.length !== 0) {
                //         setAccountNumberArray(tempAccounts);
                //         if(mainTempCustomerAccount.length !== 0) {
                //             let mainTemporaryAccount = mainTempCustomerAccount[0];
                //             setCurrencyType(mainTemporaryAccount.CTAMONEDA);
                //             setAccountType(mainTemporaryAccount.TIPOCUENTA);
                //             setAccountBank(mainTemporaryAccount.CTA1);
                //             setAccountNumber(mainTemporaryAccount.NUMCUENTA);
                //             setDynamicMask(mainTemporaryAccount.CTA1);
                //             setAccountNewNumber("");
                //             setShowNewAccount(false);
                //         }
                //     }
                //     else {
                //         setAccountNumberArray([]);
                //         setDynamicMask(e.target.value);
                //         setAccountNewNumber("");
                //         setShowNewAccount(true);
                //     }
                // }
                // else {
                //     setAccountNewNumber("");
                //     setDynamicMask(e.target.value);
                // }
                break;
            case "third_account_number":
                (e.target.value !== null && e.target.value !== undefined && e.target.value !== "") && setAccountNumber(e.target.value);
                if(e.target.value === "new") {
                    setShowNewAccount(true);
                    setDynamicMask(accountBank);
                } 
                else {
                    setShowNewAccount(false);
                }
            default:
                break;
        }
    };
    // Effects
    // Execute only one time after component render
    useEffect(() => {
        fetchBudgetCurrencyType();
        fetchBudgetAccountType();
        fetchBudgetBanks();
        fetchBudgetCustomerInformation();
    }, []);
    // Execute only if customerAccounts state change
    useEffect(() => {
        if(customerAccounts && customerAccounts.length !== 0) {
            let mainAccount = getMainAccount();
            if(mainAccount) {
                setCurrencyType(mainAccount.CTAMONEDA);
                setAccountType(mainAccount.TIPOCUENTA);
                setAccountBank(mainAccount.CTA1);
                setAccountNumber(mainAccount.NUMCUENTA);
                setDynamicMask(mainAccount.CTA1);
            }
        }
        else {
            setAccountNumber("new");
            setAccountNewNumber("");
        }
    }, [customerAccounts]);
    // Execute only if currencyType, accountType & accountBank change
    useEffect(() => {
        if(currencyType !== null && currencyType !== undefined && currencyType !== "" 
            && accountType !== null && accountType !== undefined && accountType !== ""
            && accountBank !== null && accountBank !== undefined && accountBank !== "") {
            setShowNumberAccounts(true);
            if(accountNumberArray.length === 0) {
                setAccountNumber("new");
                setShowNewAccount(true);
            }
        }
        else {
            setShowNumberAccounts(false);
        }
    }, [currencyType, accountType, accountBank]);
    // Execute only if change the following properties accountType, accountBank, accountNumber and accountNewNumber 
    useEffect(() => {
        controllerFormValidation();
    }, [currencyType, accountType, accountBank, accountNumber, accountNewNumber]);
    // Rendering
    return(
        <>
                <CardPanel 
                    titulo={title} 
                    icon={<AccountBalanceWalletIcon />} 
                    iconColor="primary"
                >
                    <GridContainer>
                        <GridItem item xs={12} sm={6} md={4} lg={4}>
                            <FormControl
                                variant="standard"
                                style={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    Tipo de Moneda
                                </InputLabel>
                                <Select
                                    name="third_account_type_currency"
                                    value={currencyType}
                                    onChange={handleChangeFields}
                                    disabled={currencyTypeArray.length === 0}
                                    required
                                >
                                    {
                                        currencyTypeArray.map((currencyTypeItem, index) => (
                                            <MenuItem
                                                key={index}
                                                value={currencyTypeItem.CODIGO}
                                            >
                                                {currencyTypeItem.DESCRIP}
                                            </MenuItem>
                                        ))
                                    }
                                </Select>
                                {
                                    currencyTypeArray.length === 0 && (
                                        <FormHelperText>No se han cargado los tipos de moneda</FormHelperText>
                                    )
                                }
                            </FormControl>
                        </GridItem>
                        <GridItem item xs={12} sm={6} md={4} lg={4}>
                            <FormControl
                                variant="standard"
                                style={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    Tipo de Cuenta
                                </InputLabel>
                                <Select
                                    name="third_account_type"
                                    value={accountType}
                                    onChange={handleChangeFields}
                                    disabled={accountTypeArray.length === 0}
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
                        <GridItem item xs={12} sm={6} md={4} lg={4}>
                            <FormControl
                                variant="standard"
                                style={{
                                    width: '100%'
                                }}
                            >
                                <InputLabel>
                                    Banco
                                </InputLabel>
                                <Select
                                    name="third_account_bank"
                                    value={accountBank}
                                    onChange={handleChangeFields}
                                    disabled={accountBankArray.length === 0}
                                    required
                                >
                                    {
                                        accountBankArray.map((accountBankItem, index) => (
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
                                    accountBankArray.length === 0 && (
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
                                            variant="standard"
                                            style={{
                                                width: '100%'
                                            }}
                                        >
                                            <InputLabel>
                                                Numero de Cuenta
                                            </InputLabel>
                                            <Select
                                                name="third_account_number"
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
                                                <PatternFormat 
                                                    name="third_account_new_number"
                                                    value={accountNewNumber}
                                                    defaultValue={dynamicMask}
                                                    placeholder={dynamicMask}
                                                    customInput={TextField}
                                                    variant="standard"
                                                    mask="_"
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

export default BudgetCardPanelThirdAccountForm;
