import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/services/ContratedServiceTable";
import { useRouter } from "next/router";
import { ServicesRepo } from "src/repository/services.repo";


export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = (await ServicesRepo.contratedServices(ctx.req.cookies.accessToken))
      .data;
  } catch (error) { }

  return {
    props: {
      services: data,
    },
  };
};

export default function ServicePage({ services }) {
  const router = useRouter();
  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Serviços Contratados</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver as Empresas, acessar, aprovar ou enviar dados para aprovação.
          </Typography>
        }
      // button={"Adicionar Serviço"}
      // onTap={() => {
      //   router.push(`${router.pathname}/add`);
      // }}
      />
      <Grid item xs={12}>
        <TableFilter rowsData={services} />
      </Grid>
    </Grid>
  );
}
