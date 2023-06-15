import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, TextField, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/package/PackageTable";
import { regexMoney, reverseRegexMoney } from "src/utils/utils";
import { ServicesRepo } from "src/repository/services.repo";

import Select from "react-select";
import { toast } from "react-hot-toast";
import Router from "next/router";

export default function PackageAddPage({ services }) {
  const [valuePackage, setValuePackage] = useState(0);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [servicesSelect, setServicesSelect] = useState([]);
  const servicesData = services.map((x) => ({
    ...x,
    label: x.name,
    value: x.id,
  }));
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const data = {
        name: name,
        price: value,
        description: description,
        dueDate: dueDate,
        services: servicesSelect.map((x) => x.id),
      };

      try {
        let packageCreate = await PackagesRepo.sendPackage(data);
        setIsLoading(false);
        Router.back();
      } catch (error) {
        setIsLoading(false);
        toast.error("Erro ao criar pacote");
      }
    }
  };

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
        onTap={async () => {
          await onSubmit();
        }}
      />
      <Grid item xs={12} xl={6}>
        <TextField
          fullWidth
          label="Nome do Pacote"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} xl={6}>
        <TextField
          fullWidth
          value={description}
          label="Descrição do Pacote"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} xl={6}>
        <TextField
          fullWidth
          type="datetime-local"
          value={dueDate}
          label="Data de Validade"
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />
      </Grid>
      <Grid item xs={12} xl={6}>
        <Select
          defaultValue={[]}
          isMulti
          options={servicesData}
          onChange={(a) => {
            setServicesSelect(a);
          }}
        />
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
            setValue(reverseRegexMoney(e.target));
          }}
        ></TextField>
      </Grid>
      {console.log(servicesSelect)}
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = await ServicesRepo.getAllServices();
  } catch (error) {}

  return {
    props: {
      services: data,
    },
  };
};
