import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PaywallComponent from "../../../@core/pages/components/paywallComponent";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import toast from "react-hot-toast";
import Icon from "src/@core/components/icon";
import Typography from "@mui/material/Typography";
import { PackagesHooks } from "src/hooks/PackagesHooks";
import { PaymentsRepo } from "src/repository/payments.repo";

export async function getServerSideProps(ctx) {
  let tokenLead;
  let jwt;
  let clientChoice;
  let newUserToken;
  let newCompanyToken;

  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch {
    tokenLead = null;
  }

  try {
    jwt = JSON.parse(nookies.get(ctx).jwt);
  } catch {
    jwt = null;
  }

  try {
    newUserToken = JSON.parse(nookies.get(ctx).newUserToken);
  } catch {
    newUserToken = null;
  }

  try {
    newCompanyToken = JSON.parse(nookies.get(ctx).newCompanyToken);
  } catch {
    newCompanyToken = null;
  }

  try {
    clientChoice = JSON.parse(nookies.get(ctx).clientChoice);
  } catch {
    clientChoice = null;
  }


  return {
    props: {
      tokenLead: tokenLead,
      jwt: jwt,
      clientChoice: clientChoice,
      newUserToken: newUserToken,
      newCompanyToken: newCompanyToken,
    },
  };
}

const Paywall = ({
  tokenLead,
  jwt,
  newUserToken,
  clientChoice,
  newCompanyToken,
}) => {
  const router = useRouter();
  const contextPackage = PackagesHooks();
  const [open, setOpen] = useState(false);
  const social = !!clientChoice?.services ? clientChoice?.services.filter((e) => e.Service?.serviceTypeId === 3) : []


  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);

  const [finalInstallments, setFinalinstallments] = useState(
    contextPackage.finalClientData.maxInstallments
      ? contextPackage.finalClientData.maxInstallments
      : 1
  );

  const handleClick = async () => {
    if (!isLoading) {
      setIsLoading(true);

      let finalData = contextPackage.finalClientData;
      console.log(finalData);
      let myPromise;
      let creditCard = {
        billingType: "CREDIT_CARD",
        creditCard: {
          holderName: finalData.ccName,
          number: finalData.ccNumber,
          expiryMonth: finalData.ccExpiry.split("/")[0],
          expiryYear: "20" + finalData.ccExpiry.split("/")[1],
          ccv: finalData.ccCode,
        }
      }

      if (finalData.packageType === "package") {
        try {
          if (social.length > 0) {
            // COMPRA DE Package, NO CC COM SOCIAL / RECORRENCIA
            myPromise = await PaymentsRepo.buyNewPackage(
              {
                package: finalData.packageId,
                companieId: finalData.company,
                contractTime: finalInstallments,
                paymentMethod: {
                  ...creditCard
                },
              },
              jwt
            );
          } else {
            // COMPRA DE Package, NO CC SEM SOCIAL / PARCELADO OU A VISTA
            myPromise = await PaymentsRepo.buyNewPackage(
              {
                package: finalData.packageId,
                companieId: finalData.company,
                installments: finalInstallments,
                paymentMethod: {
                  ...creditCard
                },
              },
              jwt
            );
          }
          toast.success(
            `Pedido de Plano ${finalData?.packageName} criado com sucesso! Aguardando Pagamento.`
          );

          setIsLoading(false);
          router.push("/start/tankyou/");
          return myPromise;
        } catch (error) {
          setIsLoading(false);
          toast.error(`Erro ao contratar plano, revise os dados de pagamento`);
          console.log(error);
        }
      } else if (finalData.packageType === "custom" && finalData?.services?.length > 0) {
        try {
          let myPromise;
          if (social.length > 0) {
            // COMPRA DE Custom, NO CC COM SOCIAL / RECORRENCIA
            myPromise = await PaymentsRepo.buyNewPackage(
              {
                services: [finalData.services.map((e) => e.id)],
                companieId: finalData.company,
                contractTime: finalInstallments,
                paymentMethod: {
                  ...creditCard
                },
              },
              jwt
            );
          } else {
            // COMPRA DE Custom, mais de 1 Serviço, NO CC SEM SOCIAL / PARCELADO OU A VISTA
            myPromise = await PaymentsRepo.buyNewPackage(
              {
                services: [finalData?.services.map((e) => e.id)],
                companieId: finalData.company,
                installments: finalInstallments,
                paymentMethod: {
                  ...creditCard
                },
              },
              jwt
            );
          }
          toast.success(
            `Pedido de Serviços ${finalData.packageName} criado com sucesso! Aguardando Pagamento.`
          );
          setIsLoading(false);
          router.push("/start/tankyou/");
          return myPromise;
        } catch (error) {
          setIsLoading(false)
          toast.error(`Erro ao contratar plano`);
          console.log(error);
        }
      } else {
        try {
          // COMPRA DE Custom, 1 Serviço, NO CC SEM SOCIAL / PARCELADO OU A VISTA
          const myPromise = await PaymentsRepo.buyNewPackage(
            {
              service: finalData.services[0].id,
              installments: finalInstallments,
              paymentMethod: {
                ...creditCard
              },
            },
            jwt
          );
          toast.success(
            `Pedido de Serviço ${finalData.packageName} criado com sucesso! Aguardando Pagamento.`
          );
          setIsLoading(false);
          return myPromise;
        } catch (error) {
          setIsLoading(false);
          toast.error(`Erro ao contratar Serviço`);
          console.log(error);
        }
      }
      setIsLoading(false)
    }
  };


  return (
    <>
      <Fragment>
        <Dialog
          fullWidth
          maxWidth={"sm"}
          open={open}
          onClose={handleClose}
          style={{
            transition: "all 0.3s ease",
          }}
        >
          <DialogTitle id="form-dialog-title">Compra finalizada!</DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja ir para o app?
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-actions-dense">
            <Button onClick={() => { }} color="secondary">
              {!isLoading ? (
                "Ainda não."
              ) : (
                <CircularProgress></CircularProgress>
              )}
            </Button>
            <Button onClick={() => { }} color="primary">
              {!isLoading ? "Claro!" : <CircularProgress></CircularProgress>}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
      <div class="full-page-start">
        <div class="section-paywall">
          <div>
            <PaywallComponent
              ctx={contextPackage}
              userToken={newUserToken}
              companyToken={newCompanyToken}
              clientToken={clientChoice}
            />
          </div>
          {contextPackage.isCreditCard === true ? (
            <>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2%",
                  margin: "20px 0 0 0",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  boxShadow:
                    "0px 2px 1px -1px rgba(76, 78, 100, 0.2), 0px 1px 1px 0px rgba(76, 78, 100, 0.14), 0px 1px 3px 0px rgba(76, 78, 100, 0.12)",
                  borderRadius: "10px",
                }}
              >
                <Select
                  value={finalInstallments}
                  style={{ textAlign: "center" }}
                  onChange={(e) => {
                    setFinalinstallments(e.target.value);
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((x, y) => (
                    <MenuItem key={y} style={{ textAlign: "center" }} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
                <Typography
                  style={{
                    textAlign: "center",
                    width: "150px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    color: "#777777",
                    border: "1px solid #E7E7EA",
                    borderRadius: "8px",
                  }}
                >
                  R${" "}
                  {(
                    contextPackage.finalClientData.totalValue /
                    finalInstallments
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </Typography>
              </Grid>
              <Button
                onClick={contextPackage.isCreditCard === true ? handleClick : ""}
                variant="contained"
                style={{
                  cursor: "pointer",
                  marginTop: "20px",
                  width: "250px",
                  height: "50px",
                }}
                color="secondary"
              >
                {isLoading ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "CONCLUIR PAGAMENTO"
                )}
              </Button>
            </>
          ) : (
            <>
              <Grid
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2%",
                  margin: "20px 0 0 0",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  boxShadow:
                    "0px 2px 1px -1px rgba(76, 78, 100, 0.2), 0px 1px 1px 0px rgba(76, 78, 100, 0.14), 0px 1px 3px 0px rgba(76, 78, 100, 0.12)",
                  borderRadius: "10px",
                }}
              >
                <Select
                  value={finalInstallments}
                  style={{ textAlign: "center" }}
                  onChange={(e) => {
                    setFinalinstallments(e.target.value);
                  }}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((x, y) => (
                    <MenuItem key={y} style={{ textAlign: "center" }} value={x}>
                      {x}
                    </MenuItem>
                  ))}
                </Select>
                <Typography
                  style={{
                    textAlign: "center",
                    width: "150px",
                    height: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "24px",
                    color: "#777777",
                    border: "1px solid #E7E7EA",
                    borderRadius: "8px",
                  }}
                >
                  R${" "}
                  {(
                    contextPackage.finalClientData.totalValue /
                    finalInstallments
                  )
                    .toFixed(2)
                    .replace(".", ",")}
                </Typography>
              </Grid>
              <Button
                onClick={handleClick}
                variant="contained"
                style={{
                  cursor: "pointer",
                  marginTop: "20px",
                  width: "250px",
                  height: "50px",
                }}
                color="secondary"
              >
                {isLoading ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "CONCLUIR PAGAMENTO"
                )}
              </Button>
            </>
          )}
        </div>
        <StepsShow step={4}></StepsShow>
      </div>
    </>
  );
};

Paywall.anonUser = true;
Paywall.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Paywall;
