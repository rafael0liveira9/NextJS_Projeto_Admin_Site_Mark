import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/services/ServiceContratedTable";
import { useRouter } from "next/router";
import { ServicesRepo } from "src/repository/services.repo";
import { AiOutlineFolderView } from "react-icons/ai";
import { SiteRepo } from "src/repository/site.repo";

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = (
      await ServicesRepo.siteServiceById(
        ctx.req.cookies.accessToken,
        ctx.query.service
      )
    ).data;
  } catch (error) { }

  return {
    props: {
      services: data,
      token: ctx.req.cookies.accessToken,
    },
  };
};

export default function ServicePage({ services, token }) {
  const router = useRouter();

  async function sendLayout() {
    const data = {
      id: 1,
      images: [
        {
          name: "Teste",
          imageId: 1,
        },
      ],
    };

    try {
      const serviceData = await SiteRepo.sendLayout(data, token);

      console.log(serviceData.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendLayoutFinished() {
    const data = {
      id: 1,
      imageId: 1,
    };

    try {
      const serviceData = await SiteRepo.sendLayoutFinished(data, token);
      console.log(serviceData.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function setServicePublish() {
    const data = {
      id: 1,
    };

    try {
      const serviceData = await SiteRepo.setServicePublished(data, token);
      console.log(serviceData.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={
          <Typography variant="h5">Serviços - {services.status}</Typography>
        }
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir serviços!
          </Typography>
        }
        button={"Adicionar Serviço"}
        onTap={() => {
          router.push(`${router.pathname}/add`);
        }}
      />
      {/* {JSON.stringify(services)} */}
      {/* {console.log(services)} */}
      <Grid item>
        <Typography>
          Publicado: {services.isPublished ? "Sim" : "Não"}
        </Typography>
      </Grid>
      {services.SiteBriefing && (
        <Grid item>
          <Typography fontSize={20} fontWeight={700}>
            Briefing
          </Typography>
          <Typography>
            Dados de Contato: {services.SiteBriefing.contactData}
          </Typography>
          <Typography>Logo: {services.SiteBriefing.logo}</Typography>
          <Typography>
            Referências: {services.SiteBriefing.references.join(", ")}
          </Typography>
          <Typography>
            Modelo do Site: {services.SiteBriefing.siteModel}
          </Typography>
          <Typography>
            Midias Sociais: {services.SiteBriefing.socialMidia}
          </Typography>
          <Typography>Link do Site: {services.SiteBriefing.url}</Typography>
        </Grid>
      )}
      {services.SiteLayoutBase.length > 0 && (
        <Grid item>
          <Typography fontSize={20} fontWeight={700}>
            Layout Enviados para Escolha:
          </Typography>
          {services.SiteLayoutBase.map((x) => {
            return (
              <Container>
                <img src={x.Layout.url} width={300} height="auto" />
              </Container>
            );
          })}
        </Grid>
      )}
      {services.SiteLayoutSelected && (
        <Grid item>
          <Typography fontSize={20} fontWeight={700}>
            Layout Escolhido:
          </Typography>
          <Container>
            <img
              src={services.SiteLayoutSelected.LayoutSelected.url}
              width={300}
              height="auto"
            />
          </Container>
        </Grid>
      )}
      {services.SiteLayoutFinished && (
        <Grid item>
          <Typography fontSize={20} fontWeight={700}>
            Layout Finalizado:
          </Typography>
          <Typography>
            Aprovado: {services.SiteLayoutFinished.isApproved ? "Sim" : "Não"}
          </Typography>
          {services.SiteLayoutFinished.reasonRefuse &&
            services.SiteLayoutFinished.isApproved == false && (
              <Typography>
                Motivo da Recusa:{" "}
                {services.SiteLayoutFinished.isApproved ? "Sim" : "Não"}
              </Typography>
            )}
          <Container>
            <img
              src={services.SiteLayoutFinished.LayoutFinshed.url}
              width={300}
              height="auto"
            />
          </Container>
        </Grid>
      )}
    </Grid>
  );
}
