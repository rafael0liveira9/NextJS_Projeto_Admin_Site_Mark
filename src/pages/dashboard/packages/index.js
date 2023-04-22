import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/package/PackageTable";

export default function PackagePage() {
  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Pacotes</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir pacotes!
          </Typography>
        }
        button={"Adicionar Pacote"}
        onTap={() => {
          console.log("Adicionando...");
        }}
      />
      <Grid item xs={12}>
        <TableFilter />
      </Grid>
    </Grid>
  );
}
