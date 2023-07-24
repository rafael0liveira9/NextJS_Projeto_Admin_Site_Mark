// ** React Imports
import { useState } from 'react'
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



//             <Chip label='Basic' variant='outlined' onDelete={handleDelete} />
//             <Chip label='Primary' color='primary' variant='outlined' onDelete={chipsDelete} />
//             <Chip label='Secondary' color='secondary' variant='outlined' onDelete={handleDelete} />
//           </div>
//           <Typography sx={{ mt: 4, fontWeight: 500 }}>Custom</Typography>
//           <div className='demo-space-x'>
//             <Chip label='Basic' onDelete={handleDelete} deleteIcon={<Icon icon='mdi:delete-outline' />} />
//             <Chip label='Primary' color='primary' onDelete={handleDelete} deleteIcon={<Icon icon='mdi:delete-outline' />} />
//             <Chip
//               label='Secondary'
//               color='secondary'
//               onDelete={handleDelete}
//               deleteIcon={<Icon icon='mdi:delete-outline' />}
//             />

const PaywallComponent = () => {
    const router = useRouter();
    const [cardNumber, setCardNumber] = useState('')
    const [expanded, setExpanded] = useState('')
    const [logoselected, setLogoSelected] = useState('logo1')
    const [logoactive, setLogoActive] = useState('')
    const [siteselected, setSiteSelected] = useState('Site1')
    const [siteactive, setSiteActive] = useState('')
    const [rsselected, setRsSelected] = useState('rs1')
    const [rsactive, setRsActive] = useState('')
    const [blogselected, setBlogSelected] = useState('blog1')
    const [blogactive, setBlogActive] = useState('')
    const [adsselected, setAdsSelected] = useState('ads1')
    const [adsactive, setAdsActive] = useState('')
    const [custom, setCustom] = useState([])
    const chipsDelete = () => {
        alert('You clicked the delete icon.')
    }
    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }
    const handleBlur = () => setFocus('')

    const handleInputChange = ({ target }) => {
        if (target.name === 'number') {
            target.value = formatCreditCardNumber(target.value, Payment)
            setCardNumber(target.value)
        } else if (target.name === 'expiry') {
            target.value = formatExpirationDate(target.value)
            setExpiry(target.value)
        } else if (target.name === 'cvc') {
            target.value = formatCVC(target.value, cardNumber, Payment)
            setCvc(target.value)
        }
    }

    return (
        <form onSubmit={e => e.preventDefault()} style={{ maxWidth: "90% !important" }}>
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
                    <BoxWrapper
                        onClick={() => setLogoSelected('logo1')}
                        sx={logoactive === 'logo1' ? { borderColor: 'success.main' } : logoselected === 'logo1' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='logo1'
                            checked={logoselected === 'logo1'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Logo Simples' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Logo Simples</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>249,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de criação da Arte para Logo Marca; Valor a Vista, pode ser parcelado dentro de um Plano.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setLogoSelected('logo2')}
                        sx={logoactive === 'logo2' ? { borderColor: 'success.main' } : logoselected === 'logo2' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='logo2'
                            checked={logoselected === 'logo2'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Logo com brand' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Logo com Brand</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>399,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de criação da Arte para Logo Marca, Mockups e identidade visual para Marca; Valor a Vista, pode ser parcelado dentro de um Plano.</Typography>
                        </Box>
                    </BoxWrapper>
                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained' sx={{ mr: 4, fontSize: 12, width: "100%" }} onClick={() => { setLogoActive(logoselected); setCustom(...logoactive); console.log(custom) }}>
                            Adicionar este Serviço
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

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
                    <BoxWrapper
                        onClick={() => setSiteSelected('Site1')}
                        sx={siteactive === 'Site1' ? { borderColor: 'success.main' } : siteselected === 'Site1' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='Site1'
                            checked={siteselected === 'Site1'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Site One Page Simples' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Site One-Page</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>999,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de criação de Site, Uma pagina, isntitucional, Promocional ou de Divulgação; Valor a Vista, pode ser parcelado dentro de um Plano.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setSiteSelected('Site2')}
                        sx={siteactive === 'Site2' ? { borderColor: 'success.main' } : siteselected === 'Site2' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='Site2'
                            checked={siteselected === 'Site2'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Site Multipage Simples' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Site Multi-Page</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>1.299,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de criação de Site, até 3 paginas, isntitucional, Promocional ou de Divulgação; Valor a Vista, pode ser parcelado dentro de um Plano.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setSiteSelected('Site3')}
                        sx={siteactive === 'Site3' ? { borderColor: 'success.main' } : siteselected === 'Site3' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='Site3'
                            checked={siteselected === 'Site3'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Site Multipage Completo' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Site Completo</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>1.499,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de criação de Site, até 5 paginas, isntitucional, Promocional, de Divulgação ou Blog; Valor a Vista, pode ser parcelado dentro de um Plano.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setSiteSelected('Site4')}
                        sx={siteactive === 'Site4' ? { borderColor: 'success.main' } : siteselected === 'Site4' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='Site4'
                            checked={siteselected === 'Site4'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Standard Delivery' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Site Completo com Loja</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>1.799,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de criação de Site, 5 paginas ou mais, isntitucional, Promocional, de Divulgação, Blog, E-commerce e DropShippping; Valor a Vista, pode ser parcelado dentro de um Plano.</Typography>
                        </Box>
                    </BoxWrapper>
                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained' sx={{ mr: 4, fontSize: 12, width: "100%" }} onClick={() => { setSiteActive(siteselected); setCustom(...siteactive); console.log(custom) }}>
                            Adicionar este Serviço
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

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
                    <BoxWrapper
                        onClick={() => setRsSelected('rs1')}
                        sx={rsactive === 'rs1' ? { borderColor: 'success.main' } : rsselected === 'rs1' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='rs1'
                            checked={rsselected === 'rs1'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Redes Sociais 1x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 1x por Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>199,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Redes Sociais, Instagram e Facebook, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setRsSelected('rs2')}
                        sx={rsactive === 'rs2' ? { borderColor: 'success.main' } : rsselected === 'rs2' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='rs2'
                            checked={rsselected === 'rs2'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Redes Sociais 2x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 2x por Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>299,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Redes Sociais, Instagram e Facebook, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setRsSelected('rs3')}
                        sx={rsactive === 'rs3' ? { borderColor: 'success.main' } : rsselected === 'rs3' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='rs3'
                            checked={rsselected === 'rs3'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Redes Sociais 3x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 3x por Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>399,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Redes Sociais, Instagram e Facebook, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setRsSelected('rs4')}
                        sx={rsactive === 'rs4' ? { borderColor: 'success.main' } : rsselected === 'rs4' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='rs4'
                            checked={rsselected === 'rs4'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Redes Sociais 4x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 4x por Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>499,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Redes Sociais, Instagram e Facebook, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained' sx={{ mr: 4, fontSize: 12, width: "100%" }} onClick={() => { setRsActive(rsselected); setCustom(...rsactive); console.log(custom) }}>
                            Adicionar este Serviço
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-2'
                    aria-controls='form-layouts-collapsible-content-2'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: "14px" }}>
                        Selecionar Postagens em Blog
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails sx={{ pt: 6, pb: 6 }}>
                    <BoxWrapper
                        onClick={() => setBlogSelected('blog1')}
                        sx={blogactive === 'blog1' ? { borderColor: 'success.main' } : blogselected === 'blog1' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='blog1'
                            checked={blogselected === 'blog1'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Blog 1x por Mês' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 1x por Mês</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>99,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Blog, em Site ou LinkedIn, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setBlogSelected('blog2')}
                        sx={blogactive === 'blog2' ? { borderColor: 'success.main' } : blogselected === 'blog2' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='blog2'
                            checked={blogselected === 'blog2'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Blog 2x por Mês' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 2x por Mês</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>149,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Blog, em Site ou LinkedIn, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setBlogSelected('blog3')}
                        sx={blogactive === 'blog3' ? { borderColor: 'success.main' } : blogselected === 'blog3' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='blog3'
                            checked={blogselected === 'blog3'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Blog 1x por Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 1x por Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>199,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Blog, em Site ou LinkedIn, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setBlogSelected('blog4')}
                        sx={blogactive === 'blog4' ? { borderColor: 'success.main' } : blogselected === 'blog4' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='blog4'
                            checked={blogselected === 'blog4'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'Blog 2x por Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Postagem 2x por Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>299,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de postagens em Blog, em Site ou LinkedIn, Disponibilizamos a Arte, a Redação e fazemos a postagem; Valor Mensal, Contrato minimo de 6 meses.</Typography>
                        </Box>
                    </BoxWrapper>
                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained' sx={{ mr: 4, fontSize: 12, width: "100%" }} onClick={() => { setBlogActive(blogselected); setCustom(...blogactive); console.log(custom) }}>
                            Adicionar este Serviço
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                <AccordionSummary
                    expandIcon={<Icon icon='mdi:chevron-down' />}
                    id='form-layouts-collapsible-header-2'
                    aria-controls='form-layouts-collapsible-content-2'
                >
                    <Typography variant='subtitle1' sx={{ fontWeight: 500, fontSize: "14px" }}>
                        Selecionar Tráfego Pago
                    </Typography>
                </AccordionSummary>
                <Divider sx={{ m: '0 !important' }} />
                <AccordionDetails sx={{ pt: 6, pb: 6 }}>
                    <BoxWrapper
                        onClick={() => setAdsSelected('ads1')}
                        sx={adsactive === 'ads1' ? { borderColor: 'success.main' } : adsselected === 'ads1' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='ads1'
                            checked={adsselected === 'ads1'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'ADS 1x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Impulcionamento 1x Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>199,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de impulcionamento de propagandas e postagens,  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  ; Valor mensal, apenas pelo gerenciamento, valor a ser inserido é por conta do cliente.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setAdsSelected('ads2')}
                        sx={adsactive === 'ads2' ? { borderColor: 'success.main' } : adsselected === 'ads2' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='ads2'
                            checked={adsselected === 'ads2'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'ADS 2x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Impulcionamento 2x Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>299,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de impulcionamento de propagandas e postagens,  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  ; Valor mensal, apenas pelo gerenciamento, valor a ser inserido é por conta do cliente.</Typography>
                        </Box>
                    </BoxWrapper>
                    <BoxWrapper
                        onClick={() => setAdsSelected('ads3')}
                        sx={adsactive === 'ads3' ? { borderColor: 'success.main' } : adsselected === 'ads3' ? { borderColor: 'primary.main' } : {}}
                    >
                        <Radio
                            value='ads3'
                            checked={adsselected === 'ads3'}
                            name='form-layouts-collapsible-options-radio'
                            inputProps={{ 'aria-label': 'ADS 3x Semana' }}
                            sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: 'flex-start' }}
                        />
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                <Typography sx={{ fontWeight: 600, fontSize: "12px" }}>Impulcionamento 3x Semana</Typography>
                                <Typography sx={{ fontWeight: 700, fontSize: "12px", minWidth: 96, backgroundColor: "#751fc5", borderRadius: 30, color: "#FFFFFF", textAlign: "center" }}> R$ <span style={{ fontSize: "16px" }}>399,00</span></Typography>
                            </Box>
                            <Typography sx={{ fontWeight: 600, fontSize: "12px" }} variant='body2'>Serviço de impulcionamento de propagandas e postagens,  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  Lorem Ipsum  ; Valor mensal, apenas pelo gerenciamento, valor a ser inserido é por conta do cliente.</Typography>
                        </Box>
                    </BoxWrapper>
                    <Box sx={{ width: '100%', marginTop: 10 }}>
                        <Button size='large' type='submit' variant='contained' sx={{ mr: 4, fontSize: 12, width: "100%" }} onClick={() => { setAdsActive(adsselected); setCustom(...adsactive); console.log(custom) }}>
                            Adicionar este Serviço
                        </Button>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* ********************************************* CARRINHO DE PAGAMENTO */}

            <div class="payment-cart">
                <div class="title-cart">Plano Customizado:</div>
                <div class="price-cart">R$ <span style={{ fontSize: "22px", fontWeight: "600" }}>0,00</span></div>
            </div>
            <div class="services-cart">
                <Chip label='Logo Simples' color='primary' variant='outlined' onDelete={chipsDelete} sx={{ margin: "3px", fontSize: "11px" }} />
                <Chip label='Redes Sociais 1x Sem' color='primary' variant='outlined' onDelete={chipsDelete} sx={{ margin: "3px", fontSize: "11px" }} />
                <Chip label='Impulcionamento 1x Semana' color='primary' variant='outlined' onDelete={chipsDelete} sx={{ margin: "3px", fontSize: "11px" }} />
            </div>

        </form>
    )
}

export default PaywallComponent
