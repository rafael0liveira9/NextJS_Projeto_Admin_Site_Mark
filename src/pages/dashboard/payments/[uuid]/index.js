import React from "react";
import Grid from "@mui/material/Grid";
import { Card, CardContent, Container, Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/payments/PaymentsTable";
import { useRouter } from "next/router";

import nookies from "nookies";
import { PaymentsRepo } from "src/repository/payments.repo";
import { regexMoneyText } from "src/utils/utils";

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
      <Grid item>
        <Container>
          <Typography fontSize={20} fontWeight={700}>
            UUID do Pagamento:
          </Typography>{" "}
          <Typography>{uuid}</Typography>
        </Container>
        <Container>
          <Typography fontSize={20} fontWeight={700}>
            Status de Pagamento:{" "}
          </Typography>
          <Typography>
            {payment.status == "FINISHED_PAYMENT"
              ? "Pagamento Finalizado"
              : payment.status == "SEND_TO_ASANA"
              ? "Enviado para o Asana"
              : "Aguardando Pagamento"}
          </Typography>
        </Container>
      </Grid>
      <Grid item>
        <Container>
          <Typography fontSize={18} fontWeight={700}>
            Nome do Cliente:
          </Typography>
          <Typography>{payment.Client.name}</Typography>
        </Container>
        <Container>
          <Typography fontSize={18} fontWeight={700}>
            Nome da Compania:
          </Typography>
          <Typography>{payment.Companies.companyName}</Typography>
        </Container>
      </Grid>
      <Grid item>
        <Card>
          <CardContent>
            <Typography fontSize={18} fontWeight={700}>
              Valor do Pagamento:
            </Typography>
            <Typography>
              R${" "}
              {regexMoneyText(parseFloat(payment.value).toFixed(2).toString())}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
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
