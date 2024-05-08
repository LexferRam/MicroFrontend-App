import React, { useState, useEffect } from "react";

import GridContainer from "components/material-dashboard-pro-react/components/Grid/GridContainer.js";
import GridItem from "components/material-dashboard-pro-react/components/Grid/GridItem.js";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

import CardPanel from "components/Core/Card/CardPanel";
import ClientSubCardPanelThirdAccountForm from "components/CardPanels/ClientCardPanelThirdAccountForm/components/ClientSubCardPanelThirdAccountForm";

import useClientCardPanelThirdAccountForm from "components/CardPanels/ClientCardPanelThirdAccountForm/hooks/useClientCardPanelThirdAccountForm";

const ClientCardPanelThirdAccountForm = ({
    customerInformation,
    isRequired,
    setThirdNationalAccount,
    setThirdForeignAccount
}) => {
    const [accountTypeArray, setAccountTypeArray] = useState([]);
    const [bankArray, setBankArray] = useState([]);
    const [nationalAccountArray, setNationalAccountArray] = useState([]);
    const [foreignAccountArray, setForeignAccountArray] = useState([]);

    const {
        getCustomerTypeAccounts,
        getCustomerBanks,
        getCustomerAccounts
    } = useClientCardPanelThirdAccountForm();

    const formatCustomerAccountArray = (dataAccountArray) => {
        if(dataAccountArray.length !== 0) {
            let customerAccountNacArray = dataAccountArray.filter(account => account.CTAMONEDA === "NAC");
            let customerAccountExtArray = dataAccountArray.filter(account => account.CTAMONEDA === "EXT");
            customerAccountNacArray.length !== 0 && setNationalAccountArray(customerAccountNacArray);
            customerAccountExtArray.length !== 0 && setForeignAccountArray(customerAccountExtArray);
        }
    };

    const fetchCustomerTypeAccounts = async () => {
        let response = await getCustomerTypeAccounts();
        if(response.length !== 0) {
            setAccountTypeArray(response);
        }
    };
    const fetchCustomerBanks = async () => {
        let response = await getCustomerBanks();
        if(response.length !== 0) {
            setBankArray(response);
        }
    };
    const fetchCustomerAccounts = async () => {
        let response = await getCustomerAccounts(customerInformation.CODCLI);
        if(response.length !== 0) {
            formatCustomerAccountArray(response);
        }
    };

    useEffect(() => {
        fetchCustomerTypeAccounts();
        fetchCustomerBanks();
        fetchCustomerAccounts();
    }, []);

    return(
        <>
            <GridItem item xs={12} sm={12} md={12} lg={12}>
                <GridContainer>
                    <GridItem item xs={12} sm={12} md={12} lg={12}>
                        <CardPanel 
                            titulo="Cuentas Bancarias del Cliente" 
                            icon={<AccountBalanceIcon />} 
                            iconColor="primary"
                        >
                            <GridContainer>
                                <GridItem item xs={12} sm={12} md={12} lg={12}>
                                    {
                                        customerInformation && accountTypeArray && bankArray && nationalAccountArray && (
                                            <ClientSubCardPanelThirdAccountForm
                                                index="national" 
                                                customerInformation={customerInformation}
                                                title="Cuenta Nacional"
                                                icon={<AccountBalanceWalletIcon />}
                                                iconColor="primary"
                                                accountTypeArray={accountTypeArray}
                                                bankArray={bankArray}
                                                accountArray={nationalAccountArray}
                                                isRequired={isRequired}
                                                setThirdAccount={setThirdNationalAccount}
                                            />
                                        )
                                    }
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem item xs={12} sm={12} md={12} lg={12}>
                                    {
                                        customerInformation && accountTypeArray && bankArray && nationalAccountArray && (
                                            <ClientSubCardPanelThirdAccountForm 
                                                index="foreign"
                                                customerInformation={customerInformation}
                                                title="Cuenta Extranjera"
                                                icon={<MonetizationOnIcon />}
                                                iconColor="warning"
                                                accountTypeArray={accountTypeArray}
                                                bankArray={bankArray}
                                                accountArray={foreignAccountArray}
                                                isRequired={isRequired}
                                                setThirdAccount={setThirdForeignAccount}
                                            />
                                        )
                                    }
                                </GridItem>
                            </GridContainer>
                        </CardPanel>
                    </GridItem>
                </GridContainer>
            </GridItem>
        </>
    );
};

export default ClientCardPanelThirdAccountForm;
