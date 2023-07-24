import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, TextField, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/package/PackageTable";
import {
  regexMoney,
  regexMoneyText,
  reverseRegexMoney,
  reverseRegexMoneyText,
} from "src/utils/utils";
import { ServicesRepo } from "src/repository/services.repo";

import Select from "react-select";
import { toast } from "react-hot-toast";
import Router from "next/router";

export default function ServiceAddPage({ service, token, id }) {
  const [valuePackage, setValuePackage] = useState(
    regexMoneyText(parseFloat(service.price).toFixed(2))
  );
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
  const [name, setName] = useState(service?.name);
  const [description, setDescription] = useState(service?.description);
  const [value, setValue] = useState(service?.value);
  const [dueDate, setDueDate] = useState(service?.dueDate);
  const [servicesSelect, setServicesSelect] = useState(
    servicesData[
    servicesData.findIndex((e) => e.value == service.serviceTypeId)
    ]
  );

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: null,
    description: null,
    value: null,
    dueDate: null,
    services: null,
  });

  const verifyInputs = () => {
    if (
      name == null ||
      description == null ||
      value == 0 ||
      servicesSelect == null
    ) {
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
        let serviceCreate = await ServicesRepo.updateService(data, id, token);
        toast.success("Serviço atualizado com sucesso.");
        setTimeout(() => {
          setIsLoading(false);
          Router.back();
        }, 3000);
      } catch (error) {
        setIsLoading(false);
        toast.error(
          `Erro ao atualizar serviço: ${error?.response?.data?.Message}`
        );
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
        button={"Atualizar Serviço"}
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
          defaultValue={servicesSelect}
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
      {/* {console.log(servicesSelect)} */}
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data = {};
  try {
    data = (
      await ServicesRepo.getServiceById(
        ctx.req.cookies.accessToken,
        ctx.query.id
      )
    ).data;
  } catch (error) {
    console.log(error);
  }

  let token = ctx.req.cookies.accessToken ?? "";

  return {
    props: {
      service: data,
      token,
      id: ctx.query.id,
    },
  };
};
