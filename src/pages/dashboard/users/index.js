import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/users/UsersTable";
import { useRouter } from "next/router";
import { ServicesRepo } from "src/repository/services.repo";
import { UsersRepo } from "src/repository/users.repo";

export default function UsersPage({ users }) {
  const router = useRouter();
  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Usuários</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir usuários!
          </Typography>
        }
        button={"Adicionar Usuário"}
        onTap={() => {
          router.push(`${router.pathname}/add`);
        }}
      />
      <Grid item xs={12}>
        <TableFilter rowsData={users} />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = await UsersRepo.getAllUsers();
  } catch (error) {}

  console.log(data);

  return {
    props: {
      users: data,
    },
  };
};
