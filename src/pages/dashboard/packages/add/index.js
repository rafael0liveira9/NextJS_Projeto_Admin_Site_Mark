import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, TextField, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/package/PackageTable";
import { regexMoney } from "src/utils/utils";

export default function PackageAddPage() {
  const [valuePackage, setValuePackage] = useState(0);
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
      <Grid item xs={12} xl={6}>
        <TextField fullWidth label="Nome do Pacote"></TextField>
      </Grid>
      <Grid item xs={12} xl={6}>
        <TextField fullWidth label="Serviços deste pacote"></TextField>
      </Grid>
      <Grid item xs={12} xl={3}>
        <TextField
          fullWidth
          inputProps={{
            style: {
              textAlign: "end",
            },
          }}
          label="Valor do Pacote"
          InputProps={{
            startAdornment: "R$",
          }}
          value={valuePackage}
          onChange={(e) => {
            setValuePackage(regexMoney(e.target));
          }}
        ></TextField>
        {console.log(valuePackage.split("."))}
      </Grid>
    </Grid>
  );
}
