/* Import modules */
import React from "react";
import Axios from "axios";

/* Import custom hooks */
import { useDialog } from "context/DialogContext";

/**
 * useBudgetCardPanelThirdAccountForm React Custom Hook.
 * @description     This custom hooks allow to consume service for BudgetCardPanelThirdAccountForm react component.
 * @returns         React custom hook.
 */
const useBudgetCardPanelThirdAccountForm = () => {
    // Custom hooks
    const dialog = useDialog();
    // Custom hooks methods
    /** 
     * @description     This method get currency type for budget flow.
     * @return          array.
     */
    const getBudgetCurrencyType = async () => {
        try {
            let service = `/dbo/budgets/get_ctamoneda`;
            let result = await Axios.post(service);
            if(result.status === 200 && result.data.p_cursor) {
                return result.data.p_cursor;
            }
            else {
                dialog({
                    variant: "info",
                    catchOnCancel: false,
                    title: "Alerta",
                    description: "No se ha podido obtener la información de los tipos de moneda. Por favor recargue la página e intente de nuevo."
                });
                return [];
            }
        }
        catch(error) {
            console.log(error);
            dialog({
                variant: "info",
                catchOnCancel: false,
                title: "Alerta",
                description: "No se ha podido obtener la información de los tipos de moneda. Por favor recargue la página e intente de nuevo."
            });
            return [];
        }
    };
    /** 
     * @description     This method get account types.
     * @returns         array.
     */
    const getBudgetAccountType = async () => {
        try {
            let service = `/dbo/budgets/get_tipocta`;
            let result = await Axios.post(service);
            if(result.status === 200 && result.data.p_cursor) {
                return result.data.p_cursor;
            }
            else {
                dialog({
                    variant: "info",
                    catchOnCancel: false,
                    title: "Alerta",
                    description: "No se ha podido obtener la información de los tipos de cuentas. Por favor recargue la página e intente de nuevo."
                });
                return [];
            }
        }
        catch(error) {
            console.log(error);
            dialog({
                variant: "info",
                catchOnCancel: false,
                title: "Alerta",
                description: "No se ha podido obtener la información de los tipos de cuentas. Por favor recargue la página e intente de nuevo."
            });
            return [];
        }
    };
    /** 
     * @description     This method get banks for budget flow.
     * @returns         array. 
     */
    const getBudgetBanks = async () => {
        try {
            let service = `/dbo/budgets/get_bank_budget`;
            let result = await Axios.post(service);
            if(result.status === 200 && result.data.result) {
                return result.data.result;
            }
            else {
                dialog({
                    variant: "info",
                    catchOnCancel: false,
                    title: "Alerta",
                    description: "No se ha podido obtener la información de los bancos. Por favor recargue la página e intente de nuevo."
                });
                return [];
            }
        }
        catch(error) {
            console.log(error);
            dialog({
                variant: "info",
                catchOnCancel: false,
                title: "Alerta",
                description: "No se ha podido obtener la información de los bancos. Por favor recargue la página e intente de nuevo."
            });
            return [];
        }
    };
    /** 
     * @description     This method get customer information. 
     * @param           {typeid} customer type identificator.    
     * @param           {numid} customer number identificator.    
     * @param           {dvid} customer number divider identificator.    
     * @returns         array.
     */
    const getBudgetCustomerInformation = async (typeid, numid, dvid) => {
        try {          
            let service = `/dbo/budgets/get_customer`;
            let params = {
                p_identification_type: typeid,
                p_identification_number: numid,
                p_identification_verified: dvid
            };
            let result = await Axios.post(service, params);
            if(result.status === 200 && result.data.p_cursor) {
                return result.data.p_cursor;
            }
            else {
                dialog({
                    variant: "info",
                    catchOnCancel: false,
                    title: "Alerta",
                    description: "No se ha podido obtener la información del cliente. Por favor recargue la página e intente de nuevo."
                });
                return [];
            }
        }
        catch(error) {
            console.log(error);
            dialog({
                variant: "info",
                catchOnCancel: false,
                title: "Alerta",
                description: "No se ha podido obtener la información del cliente. Por favor recargue la página e intente de nuevo."
            });
            return [];
        }
    };
    /**
     * @description     Method to get accounts client.
     * @param           {currency} type of currency.
     * @param           {clientCode} client code.              
     * @returns         array.
     */
     const getBudgetCustomerAccounts = async (currency, clientCode, currencyType, accountType, accountBank) => {
        try {
            let service = `/dbo/budgets/get_account_budget`;
            let params = {
                centfinan: accountBank,
                cctamoneda: currencyType,
                ctipocuenta: accountType,
                ccodmoneda: currency,
                p_client_code: clientCode,
                p_portal_user_id: null
            };
            let result = await Axios.post(service, params, {
                headers: {
                    "Authorization": `Bearer ${null}`
                }
            });
            if(result.status === 200 && result.data.result) {
                return result.data.result;
            }
            else {
                dialog({
                    variant: "info",
                    catchOnCancel: false,
                    title: "Alerta",
                    description: "No se ha podido obtener la información de las cuentas del cliente. Por favor recargue la página e intente de nuevo."
                });
                return [];
            }
        }
        catch(error) {
            console.log(error);
            dialog({
                variant: "info",
                catchOnCancel: false,
                title: "Alerta",
                description: "No se ha podido obtener la información de las cuentas del cliente. Por favor recargue la página e intente de nuevo."
            });
            return [];
        }
    };
    /**
     * @description     Method to update customer account.
     * @param           {data} dataform to update.   
     * @returns         void. 
     */
    const updateCustomerAccount = async (data) => {
            try {
                let service = `/dbo/customers/actualiza_cte_cot_cli`;
                let params = {
                    p_tipoid: data.p_tipoid,
                    p_numid: data.p_numid,
                    p_dvid: data.p_dvid,
                    p_numcuenta: data.p_numcuenta,
                    p_tipocuenta: data.p_tipocuenta,
                    p_ctamoneda: data.p_ctamoneda,
                    p_portal_user_id: data.p_portal_user_id
                };
                let result = await Axios.post(service, params);
                if(result.status === 200 && result.data.p_cmensaje) {
                    return result.data.p_cmensaje;
                }
            }
            catch(error) {
                console.log(error);
                return "failed";
            }
    };
    // Returning methods & values
    return {
        getBudgetCurrencyType,
        getBudgetAccountType, 
        getBudgetBanks,
        getBudgetCustomerInformation,
        getBudgetCustomerAccounts,
        updateCustomerAccount
    };
};

export default useBudgetCardPanelThirdAccountForm;
