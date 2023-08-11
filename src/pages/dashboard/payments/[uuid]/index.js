import React from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Container, Typography, Button } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/payments/PaymentsTable";
import { useRouter } from "next/router";

import nookies from "nookies";
import { PaymentsRepo } from "src/repository/payments.repo";
import { regexMoneyText, returnDay } from "src/utils/utils";

export default function PaymentsByUUIDPage({ payment, uuid }) {
  const router = useRouter();

  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={
          <Typography variant="h5">Pagamento - ID: {payment.id}</Typography>
        }
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, exportar e modificar pagamentos!
          </Typography>
        }
      // button={"Adicionar Compania"}
      // onTap={() => {
      //   router.push(`${router.pathname}/add`);
      // }}
      />
      <Grid item width={"100%"}>
        <Card>
          <CardContent>
            <Grid container sx={{ justifyContent: "space-between", paddingRight: "100px" }}>
              <Grid item>
                <Container>
                  <Typography fontSize={20} fontWeight={700}>
                    UUID do Pagamento:
                  </Typography>{" "}
                  <Typography>{uuid}</Typography>
                </Container>
              </Grid>
              <Grid item>
                <Container>
                  <Typography fontSize={20} fontWeight={700}>
                    Status de Pagamento:{" "}
                  </Typography>
                  <Typography color={payment.status == "WAITING" ? "#C13000" : "#16C100"}>
                    {payment.status == "FINISHED_PAYMENT"
                      ? "Pagamento Recebido"
                      : payment.status == "SEND_TO_ASANA"
                        ? "Enviado para o Asana"
                        : "Aguardando Pagamento"}
                  </Typography>
                </Container>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item width={"100%"}>
        <Card>
          <CardContent>
            <Grid container sx={{ gap: "50px", justifyContent: "space-between", paddingRight: "5%" }}>
              <Grid item>
                <Container>
                  <Typography fontSize={14} fontWeight={700}>
                    Cliente:
                  </Typography>
                  <Typography>{payment.Client.name}</Typography>
                </Container>
              </Grid>
              <Grid item>
                <Container>
                  <Typography fontSize={14} fontWeight={700}>
                    Empresa:
                  </Typography>
                  <Typography>{payment.Companies.companyName}</Typography>
                </Container>
              </Grid>
              <Grid item>
                <Container>
                  <Typography fontSize={14} fontWeight={700}>
                    {payment.Client.documentType}:
                  </Typography>
                  <Typography>{payment.Client.document}</Typography>
                </Container>
              </Grid>
              <Grid item>
                <Container>
                  <Typography fontSize={14} fontWeight={700}>
                    Telefone:
                  </Typography>
                  <Typography>{payment.Client.phone}</Typography>
                </Container>
              </Grid>
              <Grid item>
                <Container>
                  <Typography fontSize={14} fontWeight={700}>
                    E-mail:
                  </Typography>
                  <Typography>{payment.Client.User.email}</Typography>
                </Container>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>


      {
        payment.PaymentsServices.length > 0 && (
          <Grid item width={"100%"}>
            <Card>
              <CardContent>
                {payment.PaymentsServices.map((x, y) => {
                  return (
                    <Grid container>
                      {!!x.Package && (
                        <Grid item display={"flex"}>
                          <Container>
                            <Typography fontSize={14} fontWeight={700}>
                              Nome do Pacote:
                            </Typography>
                            <Typography>{x.Package.name}</Typography>
                          </Container>
                          {x.Package.PackagesServices.map((x, y) => {
                            return (
                              <Container>
                                <Typography fontSize={14} fontWeight={700}>
                                  Serviços do Pacote:
                                </Typography>
                                <Typography>{x.Service.name}</Typography>
                              </Container>
                            );
                          })}
                        </Grid>
                      )}
                      {!!x.Service && (
                        <Grid item>
                          <Container>
                            <Typography fontSize={14} fontWeight={700}>
                              Nome do Serviço:
                            </Typography>
                            <Typography>
                              {x.Service.name}
                            </Typography>
                          </Container>
                        </Grid>
                      )}

                      {/* {!!x.Package && (
                      <Grid item display={"flex"}>
                        <Container>
                          <Typography fontSize={18} fontWeight={700}>
                            Valor do Pacote:
                          </Typography>
                          <Typography>
                            R${" "}
                            {regexMoneyText(
                              parseFloat(x.Package.price).toFixed(2).toString()
                            )}
                          </Typography>
                        </Container>
                      </Grid>
                    )} */}
                    </Grid>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        )
      }
      <Grid item width={"25%"}>
        <Card>
          <CardContent>
            <Typography fontSize={14} fontWeight={700}>
              Data da Compra:
            </Typography>
            <Typography>{returnDay(payment.createdAt)}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item width={"25%"}>
        <Card>
          <CardContent>
            <Typography fontSize={14} fontWeight={700}>
              Valor do Pagamento:
            </Typography>
            <Typography>
              R${" "}
              {regexMoneyText(parseFloat(payment.value).toFixed(2).toString())}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item width={"25%"}>
        <Card>
          <CardContent>
            <Typography fontSize={14} fontWeight={700}>
              Valor do Desconto:
            </Typography>
            <Typography>
              R${" "}
              {regexMoneyText(parseFloat(payment.discount).toFixed(2).toString())}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item width={"25%"} sx={{ justifyContent: "center", alignItems: "center" }}>
        <Card>
          <CardContent>
            {payment.status === "WAITING"
              ?
              <Button color="secondary" variant="contained">
                Pagamento recebido
              </Button>
              :
              <Button disabled color="primary" variant="outlined">
                Pagamento recebido
              </Button>
            }
          </CardContent>
        </Card>
      </Grid>

    </Grid >
  );
}

export const getServerSideProps = async (ctx) => {
  let data = [];
  const cookies = nookies.get(ctx);
  try {
    data = (
      await PaymentsRepo.getPaymentById(cookies.accessToken, ctx.query.uuid)
    ).data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      payment: data,
      uuid: ctx.query.uuid,
    },
  };
};
