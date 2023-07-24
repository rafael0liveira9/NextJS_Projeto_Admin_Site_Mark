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
  } catch (error) { }

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

  // console.log(service);

  return (
    <Grid container spacing={6} className="match-height">
      <Grid sx={{ display: "flex", justifyContent: "flex-end", marginTop: 10, width: "100%" }}>
        <Button
          sx={{ padding: "15px" }}
          onClick={() => {
            router.push(`/dashboard/services-contrated/`);
          }}>Visualizar outra Empresa</Button>
      </Grid>

      <PageHeader
        title={
          <Typography variant="h5">Logo - {service.LogoBriefing.titlefirst ? service.LogoBriefing.titlefirst : "Sem Titulo"} - {service.status}</Typography>
        }
        subtitle={
          <Typography variant="body2">
            Aqui você pode gerenciar o andamento desse serviço.
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
        <Grid item sx={{ backgroundColor: "#FFFFFF", margin: "15px", borderRadius: "12px", boxShadow: "0px 2px 10px 0px rgba(76, 78, 100, 0.22)", padding: "10px 10px 20px 10px" }}>
          <Typography fontSize={24} fontWeight={600}>
            Briefing do Usuário:
          </Typography>
          {/* {JSON.stringify(service.LogoBriefing)} */}
          <Typography fontSize={18}>
            Titulo: {service.LogoBriefing.titlefirst ? service.LogoBriefing.titlefirst : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            SubTitulo: {service.LogoBriefing.titlefirst ? service.LogoBriefing.titlefirst : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            Formato: {service.LogoBriefing.format ? service.LogoBriefing.format : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            Tipografia Escolhida: {service.LogoBriefing.typography ? service.LogoBriefing.typography : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            Especificação Escolhida: {service.LogoBriefing.especification ? service.LogoBriefing.especification : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            Descrição: {service.LogoBriefing.description ? service.LogoBriefing.description : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            Referências: {service.LogoBriefing.references ? service.LogoBriefing.references : "Não Preencheu"}
          </Typography>
          <Typography fontSize={18}>
            Mockups: {service.LogoBriefing.mockups ? service.LogoBriefing.mockups : "Não Preencheu"}
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
