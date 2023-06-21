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

export default function ServiceAddPage({ services }) {
  const [valuePackage, setValuePackage] = useState(0);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [value, setValue] = useState(0);
  const [dueDate, setDueDate] = useState(null);
  const [servicesSelect, setServicesSelect] = useState(null);
  const servicesData = [
    {
      label: "Site",
      value: 1,
    },
    {
      label: "Logo",
      value: 2,
    },
    {
      label: "Social",
      value: 3,
    },
  ];
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: null,
    description: null,
    value: null,
    dueDate: null,
    services: null,
  });

  console.log(value);

  const verifyInputs = () => {
    console.log(
      servicesSelect == null,
      name == null,
      description == null,
      value == 0
    );
    if (
      name == null ||
      description == null ||
      value == 0 ||
      servicesSelect == null
    ) {
      console.log("Caiu Aqui");
      setErrors({
        name:
          name == null || name == "" ? "Coloque um nome para o serviço" : null,
        description:
          description == null || description == ""
            ? "Digite uma descrição para o serviço"
            : null,
        value: value == 0 ? "Digite um valor" : null,
        dueDate: null,
        services:
          servicesSelect == null ? "Selecione pelo menos um serviços" : null,
      });
      setIsLoading(false);
      return false;
    } else {
      return true;
    }
  };

  const onSubmit = async () => {
    if (!isLoading && verifyInputs()) {
      setIsLoading(true);
      const data = {
        serviceTypeId: servicesSelect.value,
        name: name,
        price: value,
        description: description,
      };

      try {
        let serviceCreate = await ServicesRepo.sendService(data);
        setIsLoading(false);
        Router.back();
      } catch (error) {
        setIsLoading(false);
        toast.error("Erro ao criar serviço");
      }
    } else {
      toast.error("Preencha todos os campos");
    }
  };

  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Serviços</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir serviços!
          </Typography>
        }
        button={"Adicionar Serviço"}
        onTap={async () => {
          await onSubmit();
        }}
      />
      <Grid item xs={12} xl={6}>
        <TextField
          fullWidth
          label="Nome do Serviço"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            verifyInputs();
          }}
          required
          error={errors.name}
          helperText={errors.name}
        />
      </Grid>
      <Grid item xs={12} xl={6}>
        <TextField
          fullWidth
          value={description}
          label="Descrição do Serviço"
          onChange={(e) => {
            setDescription(e.target.value);
            verifyInputs();
          }}
          required
          error={errors.description}
          helperText={errors.description}
        />
      </Grid>
      <Grid item xs={12} xl={6}>
        <Select
          styles={{
            input: (styles) => ({
              ...styles,
              height: 39.5,
            }),
            menu: (styles) => ({ ...styles, zIndex: 999999 }),
          }}
          required
          defaultValue={[]}
          placeholder="Selecione o tipo do serviço"
          options={servicesData}
          onChange={(a) => {
            setServicesSelect(a);
            verifyInputs();
          }}
        />
        {errors.description && (
          <Typography
            style={{
              color: "#f00",
              marginTop: 10,
              marginLeft: 10,
            }}
            fontSize={12}
          >
            {errors.description}
          </Typography>
        )}
      </Grid>
      <Grid item xs={12} xl={3}>
        <TextField
          fullWidth
          inputProps={{
            style: {
              textAlign: "end",
            },
          }}
          label="Valor do Serviço"
          required
          InputProps={{
            startAdornment: "R$",
          }}
          value={valuePackage}
          onChange={(e) => {
            setValuePackage(regexMoney(e.target));
            setValue(reverseRegexMoney(e.target));
            verifyInputs();
          }}
          error={errors.value}
          helperText={errors.value}
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
