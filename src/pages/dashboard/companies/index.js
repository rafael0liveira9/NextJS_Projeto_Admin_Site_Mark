import React from "react";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/users/CompaniesTable";
import { useRouter } from "next/router";
import { UsersRepo } from "src/repository/users.repo";

import nookies from "nookies";

export default function CompaniesPage({ companies }) {
  const router = useRouter();
  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Companhias</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir companhias!
          </Typography>
        }
        button={"Adicionar Compania"}
        onTap={() => {
          router.push(`${router.pathname}/add`);
        }}
      />
      <Grid item xs={12}>
        <TableFilter rowsData={companies} />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data = [];
  const cookies = nookies.get(ctx);
  try {
    data = (await UsersRepo.getAllCompanies(cookies.accessToken)).data;
  } catch (error) {
    console.log(error);
  }
  console.log(data);

  return {
    props: {
      companies: data,
    },
  };
};
