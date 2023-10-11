// ** React Imports
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  AiOutlineDollar,
  AiOutlineMinus,
  AiOutlineOrderedList,
  AiOutlineCheck,
} from "react-icons/ai";
import { PackagesHooks } from "src/hooks/PackagesHooks";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import FormControlLabel from "@mui/material/FormControlLabel";

// ** Third Party Imports
import Payment from "payment";
import Cards from "react-credit-cards";

// ** Icon Imports
import Icon from "src/@core/components/icon";

// ** Styled Component Imports
import CardWrapper from "src/@core/styles/libs/react-credit-cards";

// ** Util Import
import {
  formatCVC,
  formatExpirationDate,
  formatCreditCardNumber,
} from "src/@core/utils/format";

// ** Styles Import
import "react-credit-cards/es/styles-compiled.css";
import Link from "src/@core/theme/overrides/link";

// Styled component for the Box wrappers in Delivery Options' accordion
const BoxWrapper = styled(Box)(({ theme }) => ({
  borderWidth: 1,
  display: "flex",
  cursor: "pointer",
  borderStyle: "solid",
  padding: theme.spacing(5),
  borderColor: theme.palette.divider,
  "&:first-of-type": {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderTopRightRadius: theme.shape.borderRadius,
  },
  "&:last-of-type": {
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
  },
}));

const PaywallComponent = ({ ctx, userToken, clientToken, companyToken }) => {
  const router = useRouter();
  const check = PackagesHooks();

  const [cvc, setCvc] = useState("");
  const [name, setName] = useState("");
  const [focus, setFocus] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [option, setOption] = useState("express");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [expanded, setExpanded] = useState("panel3");

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleBlur = () => setFocus("");

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(
        target.value.substring(0, 19),
        Payment
      );
      setCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
      setExpiry(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value, cardNumber, Payment);
      setCvc(target.value);
    }
  };

  const finalClientData = {
    name: ctx.newClient?.name ? ctx.newClient?.name : userToken?.name,
    document: ctx.newClient?.document
      ? ctx.newClient?.document
      : userToken?.document,
    email: ctx.newClient?.email ? ctx.newClient?.email : userToken?.User?.email,
    company: ctx.newClient?.companyID
      ? ctx.newClient?.companyID
      : userToken?.companiesId
        ? userToken?.companiesId
        : companyToken?.id,
    packageId: ctx.clientChoice?.packageId
      ? ctx.clientChoice?.packageId
      : clientToken?.packageId,
    packageName: ctx.clientChoice?.packageName
      ? ctx.clientChoice?.packageName
      : clientToken?.packageName,
    packageType: ctx.clientChoice?.packageType
      ? ctx.clientChoice?.packageType
      : clientToken?.packageType,
    services:
      ctx.clientChoice?.services > 0
        ? ctx.clientChoice?.services
        : clientToken?.services,
    totalValue: ctx.clientChoice?.totalValue
      ? ctx.clientChoice?.totalValue
      : clientToken?.totalValue,
    maxInstallments: ctx.clientChoice?.maxInstallments
      ? ctx.clientChoice?.maxInstallments
      : clientToken?.maxInstallments,
    ccName: name,
    ccExpiry: expiry,
    ccNumber: cardNumber,
    ccCode: cvc,
  };

  useEffect(() => {
    check.setFinalClientData({
      clientName: finalClientData.name,
      document: finalClientData.document,
      email: finalClientData.email,
      company: finalClientData.company,
      packageId: finalClientData.packageId,
      packageName: finalClientData.packageName,
      packageType: finalClientData.packageType,
      services: finalClientData.services,
      totalValue: finalClientData.totalValue,
      maxInstallments: finalClientData.maxInstallments,
      ccName: finalClientData.ccName,
      ccExpiry: finalClientData.ccExpiry,
      ccNumber: finalClientData.ccNumber,
      ccCode: finalClientData.ccCode,
    });
    check.setIsCreditCard(paymentMethod === "card" ? true : false)
  }, [name, expiry, cardNumber, cvc, paymentMethod]);


  return (
    <>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{ maxWidth: "90% !important" }}
      >
        {/* ******************************************************************************** CONTA */}

        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<Icon icon="mdi:chevron-down" />}
            id="form-layouts-collapsible-header-2"
            aria-controls="form-layouts-collapsible-content-2"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Olá,{" "}
                <span style={{ color: "#751fc5", fontSize: "22px" }}>
                  {finalClientData.name}
                </span>
              </Typography>
            </div>
          </AccordionSummary>
          <Divider sx={{ m: "0 !important" }} />
          <AccordionDetails sx={{ pt: 6, pb: 6 }}>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-around",
                backgroundColor: " #eeeeee",
                padding: "5px",
                borderRadius: "12px",
              }}
            >
              <Box sx={{ width: "95%", wordWrap: "inherit" }}>
                <span class="profile-paywall-section">
                  <h1>Nome: </h1>
                  <h2>{finalClientData.name}</h2>
                </span>
                <span class="profile-paywall-section">
                  <h1>Documento: </h1>
                  <h2>{finalClientData.document}</h2>
                </span>
                <span class="profile-paywall-section">
                  <h1>E-mail: </h1>
                  <h2>{finalClientData.email}</h2>
                </span>
              </Box>
              {/* <Box sx={{ width: '30%', display: "flex", justifyContent: "center" }}>
                            <Avatar src={"/images/avatars/1.png"} sx={{ mb: 4, width: 80, height: 80 }} />
                        </Box> */}
            </Box>
            <Box sx={{ width: "100%", marginTop: 10 }}>
              {finalClientData.name &&
                finalClientData.document &&
                finalClientData.email ? (
                ""
              ) : (
                <Button
                  size="large"
                  type="submit"
                  variant="outlined"
                  sx={{ mr: 4, fontSize: 12, width: "100%" }}
                >
                  Logar
                </Button>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>

        {/* ******************************************************************************** PLANO */}

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<Icon icon="mdi:chevron-down" />}
            id="form-layouts-collapsible-header-2"
            aria-controls="form-layouts-collapsible-content-2"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontSize: "14px" }}
              >
                {`Plano Selecionado: ${finalClientData.packageName}`}
              </Typography>
            </div>
          </AccordionSummary>
          <Divider sx={{ m: "0 !important" }} />
          <AccordionDetails sx={{ pt: 6, pb: 6 }}>
            <BoxWrapper
              onClick={() => setOption("express")}
              sx={option === "express" ? { borderColor: "primary.main" } : {}}
            >
              <Radio
                value="express"
                checked={option === "express"}
                name="form-layouts-collapsible-options-radio"
                inputProps={{ "aria-label": "Express Delivery" }}
                sx={{ mr: 2, ml: -2.5, mt: -2.5, alignItems: "flex-start" }}
              />
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: 600 }}
                  >{`Pode pagar em até ${finalClientData.maxInstallments}X`}</Typography>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "12px",
                      minWidth: 96,
                      backgroundColor: "#751fc5",
                      borderRadius: 30,
                      color: "#FFFFFF",
                      textAlign: "center",
                    }}
                  >
                    {`R$${(
                      finalClientData.totalValue /
                      finalClientData.maxInstallments
                    ).toFixed(2)}`}
                  </Typography>
                </Box>
                <Typography variant="body2">{`O Plano ${finalClientData.packageName} é composto por: `}</Typography>
                {finalClientData?.services?.map((e, y) => {
                  return (
                    <Typography
                      sx={{
                        backgroundColor: "#dadada",
                        fontSize: "12px",
                        margin: "10px 0",
                        width: "100%",
                        fontWeight: "bold",
                        borderRadius: "10px",
                        padding: "5px 0 5px 5px",
                      }}
                    >
                      {e.Service?.description}
                    </Typography>
                  );
                })}
                <Typography variant="body2" sx={{ fontSize: "11px" }}>
                  Para ver o contrato,
                  <a
                    href="/mark/documents/contrato-mark-digital-12-meses.pdf"
                    target="_blank"
                    download="contrato-mark-digital-12-meses.pdf"
                  >
                    Clique Aqui
                  </a>
                  .
                </Typography>
              </Box>
            </BoxWrapper>
            {/* <Box sx={{ width: '100%', marginTop: 10 }}>
                            <Button size='large' type='submit' variant='outlined' sx={{ mr: 4, fontSize: 12, width: "100%" }}
                            >
                                Escolher Outro
                            </Button>
                        </Box> */}
          </AccordionDetails>
        </Accordion>

        {/* ******************************************************************************** PAGAMENTO */}

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<Icon icon="mdi:chevron-down" />}
            id="form-layouts-collapsible-header-3"
            aria-controls="form-layouts-collapsible-content-3"
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, fontSize: "14px" }}
              >
                Método de Pagamento
              </Typography>
            </div>
          </AccordionSummary>
          <Divider sx={{ m: "0 !important" }} />
          <AccordionDetails>
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <Grid container spacing={6}>
                  <Grid item xs={12}>
                    <RadioGroup
                      row
                      value={paymentMethod}
                      aria-label="payment type"
                      name="form-layouts-collapsible-payment-radio"
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Cartão de Crédito"
                      />
                      <FormControlLabel
                        value="cash"
                        control={<Radio />}
                        label="Pix / Boleto"
                      />
                    </RadioGroup>
                  </Grid>
                  {paymentMethod === "card" ? (
                    <Grid item xs={12}>
                      <Grid container spacing={6}>
                        <Grid item xs={12}>
                          <CardWrapper>
                            <Cards
                              cvc={cvc}
                              focused={focus}
                              expiry={expiry}
                              name={name}
                              number={cardNumber}
                            />
                          </CardWrapper>
                        </Grid>
                        <Grid item xs={12} md={8} xl={6} sx={{ mt: 2 }}>
                          <Grid container spacing={6}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name="number"
                                value={cardNumber}
                                autoComplete="off"
                                label="Numero do Cartão"
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                placeholder="0000 0000 0000 0000"
                                onFocus={(e) => setFocus(e.target.name)}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                name="name"
                                value={name}
                                label="Nome no Cartão"
                                autoComplete="off"
                                onBlur={handleBlur}
                                placeholder="Digite o seu nome..."
                                onFocus={(e) => setFocus(e.target.name)}
                                onChange={(e) => setName(e.target.value)}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                name="expiry"
                                value={expiry}
                                autoComplete="off"
                                label="Validade do Cartão"
                                placeholder="MM/YY"
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                inputProps={{ maxLength: "5" }}
                                onFocus={(e) => setFocus(e.target.name)}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                name="cvc"
                                value={cvc}
                                label="CVC"
                                autoComplete="off"
                                onBlur={handleBlur}
                                onChange={handleInputChange}
                                onFocus={(e) => setFocus(e.target.name)}
                                placeholder={
                                  Payment.fns.cardType(cardNumber) === "amex"
                                    ? "1234"
                                    : "123"
                                }
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  ) :
                    <Grid item xs={12}>
                      <div style={{ display: "flex", alignItems: "center", width: '100%' }}>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, fontSize: "14px", textAlign: "justify" }}
                        >
                          ATENÇÃO: O pagamento poderá ser efetuado por Pix ou Boleto, após clicar em "Concluir Pagamento" receberá um e-mail com as instruções para finalizar a compra.
                        </Typography>
                      </div>
                    </Grid>
                  }
                </Grid>
              </Grid>
            </Grid>
          </AccordionDetails>
          <Divider sx={{ m: "0 !important" }} />
          <AccordionDetails>
            {/* <Button size='large' type='submit' variant='contained' sx={{ mr: 4 }}>
                        Place Order
                    </Button>
                    <Button type='reset' size='large' variant='outlined' color='secondary'>
                        Reset
                    </Button> */}
            {/* <Button type='reset' size='large' variant='outlined' color='primary' sx={{ fontSize:12, width:"100%", marginTop:"10px" }}>
                            Ver Contrato
                    </Button> */}
          </AccordionDetails>
        </Accordion>
      </form>
    </>
  );
};

export default PaywallComponent;
