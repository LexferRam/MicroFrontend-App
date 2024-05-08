/* Import modules */
import React from "react";
import Axios from "axios";

import { useDialog } from "context/DialogContext";

const useClientCardPanelThirdAccountForm = () => {
    const dialog = useDialog();

    const getCustomerTypeAccounts = async () => {
        try {
            let service = `/dbo/customers/get_tipocta`;
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
    const getCustomerBanks = async () => {
        try {
            let service = `/dbo/customers/get_bank_customer`;
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
    const getCustomerAccounts = async (clientCode) => {
        try {
            let service = `/dbo/customers/get_account_customer`;
            let params = {
                centfinan: null,
                cctamoneda: null,
                ctipocuenta: null,
                ccodmoneda: null,
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
                    description: "No se han podido obtener las cuentas del cliente. Por favor recargue la página e intente de nuevo."
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
                description: "No se han podido obtener las cuentas del cliente. Por favor recargue la página e intente de nuevo."
            });
            return [];
        }
    };
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

    return {
        getCustomerTypeAccounts,
        getCustomerBanks,
        getCustomerAccounts,
        updateCustomerAccount
    };
};

export default useClientCardPanelThirdAccountForm;
