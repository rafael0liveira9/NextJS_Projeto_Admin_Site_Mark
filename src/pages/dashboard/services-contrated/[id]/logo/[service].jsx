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
import { LogoRepo } from "src/repository/logo.repo";

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = (
      await ServicesRepo.logoServiceById(
        ctx.req.cookies.accessToken,
        ctx.query.service
      )
    ).data;
  } catch (error) {}

  return {
    props: {
      service: data,
      token: ctx.req.cookies.accessToken,
      serviceId: ctx.query.service,
    },
  };
};

export default function ServicePage({ service, token, serviceId }) {
  const router = useRouter();

  async function sendProof() {
    try {
      const data = await LogoRepo.sendProof(
        {
          id: +serviceId,
          proof: 1,
          mockups: [1],
        },
        token
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function sendArchives() {
    try {
      const data = await LogoRepo.sendArchives({}, token);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(service);

  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={
          <Typography variant="h5">Serviços - {service.status}</Typography>
        }
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir serviços!
          </Typography>
        }
        button={
          service.status == "CRIACAO"
            ? "Enviar Provas"
            : service.status == "PROVAS" &&
              service.LogoProof.isApproved == false &&
              service.LogoProof.userSended == false
            ? "Aguardando revisão"
            : (service.status == "AVALIACAO" || service.status == "PROVAS") &&
              service.LogoProof.isApproved == true
            ? "Enviar Arquivos da Logo"
            : service.status == "CONCLUSAO"
            ? "Finalizado!"
            : "Aguardando Briefing"
        }
        onTap={async () => {
          if (service.status == "CRIACAO") {
            await sendProof();
          }
        }}
      />
      {service.LogoBriefing ? (
        <Grid item>
          <Typography fontSize={24} fontWeight={600}>
            Briefing do Usuário:
          </Typography>
          {/* {JSON.stringify(service.LogoBriefing)} */}
          <Typography fontSize={18}>
            Formato: {service.LogoBriefing.format}
          </Typography>
          <Typography fontSize={18}>
            Tipografia Escolhida: {service.LogoBriefing.typography}
          </Typography>
          <Typography fontSize={18}>
            Especificação Escolhida: {service.LogoBriefing.especification}
          </Typography>
          <Typography fontSize={18}>
            Descrição: {service.LogoBriefing.description}
          </Typography>
          <Typography fontSize={18}>
            Referências: {service.LogoBriefing.references}
          </Typography>
          <Typography fontSize={18}>
            Mockups: {service.LogoBriefing.mockups}
          </Typography>
        </Grid>
      ) : (
        <Grid item>
          <Typography>Aguardando Briefing...</Typography>
        </Grid>
      )}
      {service.LogoFeedback && (
        <Grid item md={5}>
          <Typography fontSize={24} fontWeight={600}>
            Feedback do Usuário:
          </Typography>
          {/* {JSON.stringify(service.LogoFeedback)} */}
          <Typography>Comentários: {service.LogoFeedback.comments}</Typography>
          <Typography>Estrelas: {service.LogoFeedback.stars}</Typography>
        </Grid>
      )}
      {service.LogoProof && (
        <Grid item md={5}>
          <Typography fontSize={24} fontWeight={600}>
            Provas da Logo:
          </Typography>
          {service.LogoProof.userSended && (
            <Typography>
              Aprovado: {service.LogoProof.isApproved ? "Sim" : "Não"}
            </Typography>
          )}
          {!service.LogoProof.isApproved &&
            !!service.LogoProof.reasonRefuse &&
            service.LogoProof.userSended(
              <Typography>
                Motivo de Recusa: {service.LogoProof.reasonRefuse}
              </Typography>
            )}
          {service.LogoProof.Mockups.map((x) => {
            return (
              <div
                style={{
                  padding: 10,
                  border: "1px solid purple",
                  minWidth: 350,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src={x?.image?.url} width={300} height={"auto"}></img>
              </div>
            );
          })}
        </Grid>
      )}
      {service.LogoArchives.length > 0 && (
        <Grid item md={5}>
          <Typography>Arquivos da Logo:</Typography>
          {service.LogoArchives.map((x) => {
            return (
              <div>
                <img src={x?.preview?.url} width={300}></img>
              </div>
            );
          })}
        </Grid>
      )}
    </Grid>
  );
}
