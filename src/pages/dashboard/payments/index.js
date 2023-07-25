import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/payments/PaymentsTable";
import { useRouter } from "next/router";

import nookies from "nookies";
import { PaymentsRepo } from "src/repository/payments.repo";

export default function PaymentsPage({ payments }) {
  const router = useRouter();
  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Pagamentos</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver todos os pagamentos pendentes e concluidos.
          </Typography>
        }
      // button={"Adicionar Compania"}
      // onTap={() => {
      //   router.push(`${router.pathname}/add`);
      // }}
      />
      <Grid item xs={12}>
        <TableFilter
          rowsData={payments}
          onView={(e) => {
            router.push(`${router.pathname}/${e.uuid}`);
          }}
        />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data = [];
  const cookies = nookies.get(ctx);
  try {
    data = (await PaymentsRepo.getAllPayments(cookies.accessToken)).data;
  } catch (error) {
    console.log(error);
  }
  console.log(data);

  return {
    props: {
      payments: data,
    },
  };
};
