import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Button, Card, TextField, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/package/PackageTable";
import { regexMoney, regexMoneyText, reverseRegexMoney } from "src/utils/utils";
import { ServicesRepo } from "src/repository/services.repo";

import Select from "react-select";
import { toast } from "react-hot-toast";
import Router from "next/router";

export const getServerSideProps = async (ctx) => {
  let data;
  let packageData;
  try {
    data = await ServicesRepo.getAllServices();
  } catch (error) { }

  let token = ctx.req.cookies.accessToken ?? "";

  packageData = await PackagesRepo.getPackageById(ctx.query.id, token);

  return {
    props: {
      services: data,
      packageData: packageData,
      token: token,
    },
  };
};

export default function PackageAddPage({ services, token, packageData }) {


  const [valuePackage, setValuePackage] = useState(
    regexMoneyText(parseFloat(packageData?.price).toFixed(2))
  );

  const [name, setName] = useState(packageData?.name);
  const [description, setDescription] = useState(packageData?.description);
  const [value, setValue] = useState(packageData?.price);
  const [dueDate, setDueDate] = useState(
    /(^\d+\-\d+\-\d+T\d+:\d+):\d+\.\d+Z/gi.exec(
      new Date(packageData?.dueDate).toISOString()
    )[1]
  );
  const [servicesSelect, setServicesSelect] = useState(
    packageData?.PackagesServices?.map((x) => {
      return {
        ...x,
        packageId: x.id,
        ...x.Service,
        label: x.Service.name,
        value: x.Service.id,
      };
    })
  );
  const servicesData = services?.map((x) => ({
    ...x,
    label: x.name,
    value: x.id,
  }));
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
      servicesSelect.length == 0
    ) {
      setErrors({
        name:
          name == null || name == "" ? "Coloque um nome para o pacote" : null,
        description:
          description == null || description == ""
            ? "Digite uma descrição para o pacote"
            : null,
        value: value == 0 ? "Digite um valor" : null,
        dueDate: null,
        services:
          servicesSelect.length == 0
            ? "Selecione pelo menos um serviços"
            : null,
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
        id: packageData.id,
        name: name,
        price: value,
        description: description,
        dueDate: dueDate,
        servicesUp: servicesSelect.map((x) => ({
          id: x.packageId ?? null,
          service: x.value,
        })),
      };

      try {
        let packageCreate = await PackagesRepo.updatePackage(data, token);
        toast.success("Pacote atualizado com sucesso!");
        setTimeout(() => {
          setIsLoading(false);
          Router.back();
        }, []);
      } catch (error) {
        setIsLoading(false);
        toast.error(`Erro ao atualizar pacote: ${error.response.data.Message}`);
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
        button={"Atualizar Pacote"}
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
          label="Descrição do Pacote"
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
        <TextField
          fullWidth
          type="datetime-local"
          value={dueDate}
          label="Data de Validade"
          onChange={(e) => {
            setDueDate(e.target.value);

            verifyInputs();
          }}
          error={errors.dueDate}
          helperText={errors.dueDate}
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
          isMulti
          placeholder="Selecione os Serviços"
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
          label="Valor do Pacote"
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
    </Grid>
  );
}
