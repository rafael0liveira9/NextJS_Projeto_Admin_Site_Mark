// ** React Imports
import { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import { Fragment } from 'react'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Radio from '@mui/material/Radio'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import Accordion from '@mui/material/Accordion'
import TextField from '@mui/material/TextField'
import FormLabel from '@mui/material/FormLabel'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import RadioGroup from '@mui/material/RadioGroup'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import FormControlLabel from '@mui/material/FormControlLabel'
import Chip from '@mui/material/Chip'
import { PackagesHooks } from "src/hooks/PackagesHooks";

// ** Third Party Imports
import Payment from 'payment'
import Cards from 'react-credit-cards'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Styled Component Imports
import CardWrapper from 'src/@core/styles/libs/react-credit-cards'

// ** Util Import
import { formatCVC, formatExpirationDate, formatCreditCardNumber } from 'src/@core/utils/format'

// ** Styles Import
import 'react-credit-cards/es/styles-compiled.css'
import Link from 'src/@core/theme/overrides/link'

// Styled component for the Box wrappers in Delivery Options' accordion
const BoxWrapper = styled(Box)(({ theme }) => ({
    borderWidth: 1,
    display: 'flex',
    cursor: 'pointer',
    borderStyle: 'solid',
    padding: theme.spacing(5),
    borderColor: theme.palette.divider,
    '&:first-of-type': {
        borderTopLeftRadius: theme.shape.borderRadius,
        borderTopRightRadius: theme.shape.borderRadius
    },
    '&:last-of-type': {
        borderBottomLeftRadius: theme.shape.borderRadius,
        borderBottomRightRadius: theme.shape.borderRadius
    }
}))

function sendDataPack(services) {
    contextPackage.setClientChoice({
        packageType: services.length > 1 ? "Custom" : "Only",
        packageId: "",
        packageName: "Personalizado",
        totalValue: "",
        maxInstallments: maxInstallments(totalValue),
        services: ""
    });
}

const PaywallComponent = (servicesList) => {
    const router = useRouter();
    const contextPackage = PackagesHooks();
    // console.log("Client Choice", contextPackage.clientChoice)

    const [cardNumber, setCardNumber] = useState('');
    const [expanded, setExpanded] = useState('');

    const [logoselected, setLogoSelected] = useState('');
    const [logoactive, setLogoActive] = useState('');
    const [logoSelectedValue, setLogoSelectedValue] = useState(0);
    const [logoactiveValue, setLogoActiveValue] = useState(0);
    const [logoSelectedName, setLogoSelectedName] = useState('');
    const [logoactiveName, setLogoActiveName] = useState('');


    const [siteselected, setSiteSelected] = useState('');
    const [siteactive, setSiteActive] = useState('');
    const [siteSelectedValue, setSiteSelectedValue] = useState(0);
    const [siteactiveValue, setSiteActiveValue] = useState(0);
    const [siteselectedName, setSiteSelectedName] = useState('');
    const [siteactiveName, setSiteActiveName] = useState('');

    const [rsselected, setRsSelected] = useState('');
    const [rsactive, setRsActive] = useState('');
    const [rsSelectedValue, setRsSelectedValue] = useState(0);
    const [rsactiveValue, setRsActiveValue] = useState(0);
    const [rsselectedName, setRsSelectedName] = useState('');
    const [rsactiveName, setRsActiveName] = useState('');

    const [services, setServices] = useState([]);
    const [servicesValue, setServicesValue] = useState(0);
    const [useEffectControl, setUseEffectControl] = useState(0);

    const chipsDelete = (x, y) => {
        // let a = logoactiveValue ? parseInt(logoactiveValue) : 0;
        // let b = siteactiveValue ? parseInt(siteactiveValue) : 0;
        // let c = rsactiveValue ? parseInt(rsactiveValue) : 0;
        // let total = a + b + c;

        // y('');
        // valuesMath(logoactiveValue, siteactiveValue, rsactiveValue);



        console.log((servicesValue / maxInstallments(servicesValue)).toFixed(2).replace(".", ","))

    }
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    const valuesMath = (logoactiveValue, siteactiveValue, rsactiveValue) => {
        let a = logoactiveValue ? parseInt(logoactiveValue) : 0;
        let b = siteactiveValue ? parseInt(siteactiveValue) : 0;
        let c = rsactiveValue ? parseInt(rsactiveValue) : 0;
        let total = a + b + c;

        setServicesValue(total);
    }

    function maxInstallments(valor) {
        const minValue = 100;
        const maxValue = 12;

        if (valor < minValue) {
            return 0;
        }

        const installments = Math.floor(valor / minValue);
        const maxInstallments = Math.min(installments, maxValue);

        return maxInstallments;
    }
    useEffect(() => {

        setServices(
            [{
                insert: logoactive.length > 0 ? 1 : 0,
                logo: logoactive.length > 0 ? logoactive : null,
                value: logoactiveValue !== 0 ? logoactiveValue : 0,
                name: logoactiveName.length > 0 ? logoactiveName : null,
                function: setLogoActive,
                deleteSelf:
                    [{
                        insert: 0,
                        logo: null,
                        value: 0,
                        name: null,
                    },
                    {
                        insert: siteactive.length > 0 ? 1 : 0,
                        Site: siteactive > 0 ? siteactive : null,
                        value: siteactiveValue !== 0 ? siteactiveValue : 0,
                        name: siteactiveName.length > 0 ? siteactiveName : null,
                    },
                    {
                        insert: rsactive.length > 0 ? 1 : 0,
                        redes: rsactive > 0 ? rsactive : null,
                        value: rsactiveValue !== 0 ? rsactiveValue : 0,
                        name: rsactiveName.length > 0 ? rsactiveName : null,
                    }]
            },
            {
                insert: siteactive.length > 0 ? 1 : 0,
                Site: siteactive > 0 ? siteactive : null,
                value: siteactiveValue !== 0 ? siteactiveValue : 0,
                name: siteactiveName.length > 0 ? siteactiveName : null,
                function: setSiteActive,
                deleteSelf:
                    [{
                        insert: logoactive.length > 0 ? 1 : 0,
                        logo: logoactive.length > 0 ? logoactive : null,
                        value: logoactiveValue !== 0 ? logoactiveValue : 0,
                        name: logoactiveName.length > 0 ? logoactiveName : null,
                    },
                    {
                        insert: 0,
                        logo: null,
                        value: 0,
                        name: null,
                    },
                    {
                        insert: rsactive.length > 0 ? 1 : 0,
                        redes: rsactive > 0 ? rsactive : null,
                        value: rsactiveValue !== 0 ? rsactiveValue : 0,
                        name: rsactiveName.length > 0 ? rsactiveName : null,
                    }]
            },
            {
                insert: rsactive.length > 0 ? 1 : 0,
                redes: rsactive > 0 ? rsactive : null,
                value: rsactiveValue !== 0 ? rsactiveValue : 0,
                name: rsactiveName.length > 0 ? rsactiveName : null,
                function: setRsActive,
                deleteSelf:
                    [{
                        insert: logoactive.length > 0 ? 1 : 0,
                        logo: logoactive.length > 0 ? logoactive : null,
                        value: logoactiveValue !== 0 ? logoactiveValue : 0,
                        name: logoactiveName.length > 0 ? logoactiveName : null,
                    },
                    {
                        insert: siteactive.length > 0 ? 1 : 0,
                        Site: siteactive > 0 ? siteactive : null,
                        value: siteactiveValue !== 0 ? siteactiveValue : 0,
                        name: siteactiveName.length > 0 ? siteactiveName : null,
                    },
                    {
                        insert: 0,
                        logo: null,
                        value: 0,
                        name: null,
                    }]
            }]
        );

        valuesMath(logoactiveValue, siteactiveValue, rsactiveValue);

    }, [logoactive, siteactive, rsactive, useEffectControl])


    return (
        <form onSubmit={e => e.preventDefault()} style={{ maxWidth: "90% !important" }}>

            {/* ****************************** LOGO FORM */}

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-2'
                    aria-controls='form-layouts-collapsible-content-2'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: "14px" }}>
                        Selecionar Logo
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails sx={{ pt: 6, pb: 6 }}>
                    {servicesList.servicesList.map((e) => {
                        if (e.name.startsWith("Logo")) {
                            return (
                                <BoxWrapper
                                    key={e.id}
                                    onClick={() => { setLogoSelected(`${e.id}`), setLogoSelectedValue(`${e.price.toFixed(2)}`), setLogoSelectedName(`${e.name}`) }}
                                    sx={logoactive === `${e.id}` ? { borderColor: 'success.main', borderWidth: "3px" } : logoselected === `${e.id}` ? { borderColor: 'primary.main' } : {}}
                                >
                                    <Radio
                                        value={`${e.id}`}
                                        checked={logoselected === `${e.id}`}
                                        name='form-layouts-collapsible-options-radio'
                                        inputProps={{ 'aria-label': e.name }}
                                        sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                                    />
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>{e.name}</Typography>
                                            <Typography sx={{ fontWeight: 700, fontSize: "10px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center", padding: "5px" }}>
                                                R$ <span style={{ fontSize: "16px" }}>{(parseInt(e.price) / maxInstallments(parseInt(e.price))).toFixed(2).replace(".", ",")}</span></Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>
                                            {
                                                e.description +
                                                "por apenas " +
                                                maxInstallments(e.price) +
                                                "X de R$" +
                                                (parseInt(e.price) / maxInstallments(parseInt(e.price))).toFixed(2).replace(".", ",") +
                                                "."
                                            }
                                        </Typography>
                                    </Box>
                                </BoxWrapper>
                            )
                        }
                    })}

                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained'
                            color={logoactive === '' ? "primary" : logoactive !== '' && logoactive !== logoselected ? "primary" : "secondary"}
                            sx={{ mr: 4, fontSize: 12, width: "100%" }}
                            onClick={() => {
                                if (logoactive === '') {
                                    setLogoActive(logoselected);
                                    setLogoActiveValue(logoSelectedValue);
                                    setLogoActiveName(logoSelectedName);
                                } else if (logoactive !== '' && logoactive !== logoselected) {
                                    setLogoActive(logoselected);
                                    setLogoActiveValue(logoSelectedValue);
                                    setLogoActiveName(logoSelectedName);
                                } else {
                                    setLogoActive('');
                                    setLogoActiveValue(0);
                                    setLogoActiveName('');
                                }
                            }}>
                            {logoactive === '' ? "Adicionar ao Carrinho" : logoactive !== '' && logoactive !== logoselected ? "Adicionar ao Carrinho" : "Remover do Carrinho"}
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion >

            {/* ****************************** Site FORM */}

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-2'
                    aria-controls='form-layouts-collapsible-content-2'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: "14px" }}>
                        Selecionar Site
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails sx={{ pt: 6, pb: 6 }}>
                    {servicesList.servicesList.map((e) => {
                        if (e.name.startsWith("Site")) {
                            return (
                                <BoxWrapper
                                    key={e.id}
                                    onClick={() => { setSiteSelected(`${e.id}`), setSiteSelectedValue(`${e.price.toFixed(2)}`), setSiteSelectedName(`${e.name}`) }}
                                    sx={siteactive === `${e.id}` ? { borderColor: 'success.main', borderWidth: "3px" } : siteselected === `${e.id}` ? { borderColor: 'primary.main' } : {}}
                                >
                                    <Radio
                                        value={`${e.id}`}
                                        checked={siteselected === `${e.id}`}
                                        name='form-layouts-collapsible-options-radio'
                                        inputProps={{ 'aria-label': e.name }}
                                        sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                                    />
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>{e.name}</Typography>
                                            <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}>
                                                R$ <span style={{ fontSize: "16px" }}>{(parseInt(e.price) / maxInstallments(parseInt(e.price))).toFixed(2).replace(".", ",")}</span></Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>
                                            {
                                                e.description +
                                                "por apenas " +
                                                maxInstallments(e.price) +
                                                "X de R$" +
                                                (parseInt(e.price) / maxInstallments(parseInt(e.price))).toFixed(2).replace(".", ",") +
                                                "."
                                            }
                                        </Typography>
                                    </Box>
                                </BoxWrapper>
                            )
                        }
                    })}

                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained'
                            color={siteactive === '' ? "primary" : siteactive !== '' && siteactive !== siteselected ? "primary" : "secondary"}
                            sx={{ mr: 4, fontSize: 12, width: "100%" }}
                            onClick={() => {
                                if (siteactive === '') {
                                    setSiteActive(siteselected);
                                    setSiteActiveValue(siteSelectedValue);
                                    setSiteActiveName(siteselectedName);
                                } else if (siteactive !== '' && siteactive !== siteselected) {
                                    setSiteActive(siteselected);
                                    setSiteActiveValue(siteSelectedValue);
                                    setSiteActiveName(siteselectedName);
                                } else {
                                    setSiteActive('');
                                    setSiteActiveValue(0);
                                    setSiteActiveName('');
                                }
                            }}>
                            {siteactive === '' ? "Adicionar ao Carrinho" : siteactive !== '' && siteactive !== siteselected ? "Adicionar ao Carrinho" : "Remover do Carrinho"}
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* ****************************** Redes Sociais FORM */}

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-2'
                    aria-controls='form-layouts-collapsible-content-2'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: "14px" }}>
                        Selecionar Redes Sociais
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails sx={{ pt: 6, pb: 6 }}>
                    {servicesList.servicesList.map((e) => {
                        if (e.name.startsWith("Redes")) {
                            return (
                                <BoxWrapper
                                    key={e.id}
                                    onClick={() => { setRsSelected(`${e.id}`), setRsSelectedValue(`${e.price.toFixed(2)}`), setRsSelectedName(`${e.name}`) }}
                                    sx={rsactive === `${e.id}` ? { borderColor: 'success.main', borderWidth: "3px" } : rsselected === `${e.id}` ? { borderColor: 'primary.main' } : {}}
                                >
                                    <Radio
                                        value={`${e.id}`}
                                        checked={rsselected === `${e.id}`}
                                        name='form-layouts-collapsible-options-radio'
                                        inputProps={{ 'aria-label': e.name }}
                                        sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                                    />
                                    <Box sx={{ width: '100%' }}>
                                        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>{e.name}</Typography>
                                            <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}>
                                                R$ <span style={{ fontSize: "16px" }}>{(parseInt(e.price) / maxInstallments(parseInt(e.price))).toFixed(2).replace(".", ",")}</span></Typography>
                                        </Box>
                                        <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>
                                            {
                                                e.description +
                                                "por apenas " +
                                                maxInstallments(e.price) +
                                                "X de R$" +
                                                (parseInt(e.price) / maxInstallments(parseInt(e.price))).toFixed(2).replace(".", ",") +
                                                "."
                                            }
                                        </Typography>
                                    </Box>
                                </BoxWrapper>
                            )
                        }
                    })}

                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained'
                            color={rsactive === '' ? "primary" : rsactive !== '' && rsactive !== rsselected ? "primary" : "secondary"}
                            sx={{ mr: 4, fontSize: 12, width: "100%" }}
                            onClick={() => {
                                if (rsactive === '') {
                                    setRsActive(rsselected);
                                    setRsActiveValue(rsSelectedValue);
                                    setRsActiveName(rsselectedName);
                                } else if (rsactive !== '' && rsactive !== rsselected) {
                                    setRsActive(rsselected);
                                    setRsActiveValue(rsSelectedValue);
                                    setRsActiveName(rsselectedName);
                                } else {
                                    setRsActive('');
                                    setRsActiveValue(0);
                                    setRsActiveName('');
                                }
                            }}>
                            {rsactive === '' ? "Adicionar ao Carrinho" : rsactive !== '' && rsactive !== rsselected ? "Adicionar ao Carrinho" : "Remover do Carrinho"}
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* ********************************************* CARRINHO DE PAGAMENTO */}

            <div class="payment-cart">
                <div class="title-cart">Oferta:</div>
                <div class="price-cart">apenas {maxInstallments(servicesValue)}X de R$ <span style={{ fontSize: "22px", fontWeight: "600" }}>{servicesValue ? (servicesValue / maxInstallments(servicesValue)).toFixed(2).replace(".", ",") : "0,00"}</span></div>
            </div>
            <div class="services-cart">
                {services.map((e, y) => {
                    if (e.insert === 1) {

                        return (
                            <Chip key={y} label={e.name} color='primary' variant='outlined' onDelete={() => chipsDelete(e.deleteSelf, e.function)} sx={{ margin: "20px 5px", fontSize: "11px" }} />
                        )
                    }
                })}
            </div>

        </form >
    )
}

export default PaywallComponent
