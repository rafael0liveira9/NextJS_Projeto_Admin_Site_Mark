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
import { SocialRepo } from "src/repository/social.repo";

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = (
      await ServicesRepo.socialServiceById(
        ctx.req.cookies.accessToken,
        ctx.query.service
      )
    ).data;
  } catch (error) {}

  return {
    props: {
      services: data,
      token: ctx.req.cookies.accessToken,
    },
  };
};

export default function ServicePage({ services, token }) {
  const router = useRouter();

  async function socialToShow() {
    const data = {
      id: services.id,
      feed: [
        {
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
        },
        {
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
        },
        {
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
        },
        {
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
        },
        {
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
        },
        {
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
        },
      ],
    };

    try {
      const socialService = (await SocialRepo.sendShow(data, token)).data;
    } catch (error) {
      console.log(error);
    }
  }

  async function socialToApprove() {
    const data = {
      id: services.id,
      allApproved: false,
      isRefused: false,
      feed: [
        {
          id: 19,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: false,
          image: 1,
        },
        {
          id: 20,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: false,
          image: 1,
        },
        {
          id: 21,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: false,
          image: 1,
        },
        {
          id: 22,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: false,
          image: 1,
        },
        {
          id: 23,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: false,
          image: 1,
        },
        {
          id: 24,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: false,
          image: 1,
        },
      ],
    };

    try {
      const socialService = (await SocialRepo.sendApprove(data, token)).data;
    } catch (error) {
      console.log(error);
    }
  }

  async function updateShow() {
    const data = {
      id: services.id,
      allApproved: true,
      isRefused: false,
      feed: [
        {
          id: 19,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: true,
        },
        {
          id: 20,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: true,
        },
        {
          id: 21,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: true,
        },
        {
          id: 22,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: true,
        },
        {
          id: 23,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: true,
        },
        {
          id: 24,
          text: "adawdawdawdawdawdawdwa",
          type: "VIDEO",
          approved: true,
        },
      ],
    };

    try {
      const socialService = (await SocialRepo.updateShow(data, token)).data;
    } catch (error) {
      console.log(error);
    }
  }

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
        onTap={() => {
          router.push(`${router.pathname}/add`);
        }}
      />
      {console.log(services)}
      {services.SocialBriefing && (
        <Grid item>
          <Typography fontSize={22} fontWeight={700}>
            Briefing
          </Typography>
          <Typography>
            Dias e Horas: {services.SocialBriefing.dayHours}
          </Typography>
          <Typography>
            Base das Imagens: {services.SocialBriefing.imageBase}
          </Typography>
          <Typography>
            Quantidade de Material: {services.SocialBriefing.materialQuant}
          </Typography>
          <Typography>
            Formato da Media: {services.SocialBriefing.mediaFormat}
          </Typography>
          <Typography>
            Tipo de Network: {services.SocialBriefing.networkType}
          </Typography>
          <Typography>
            Tipo de Serviço: {services.SocialBriefing.serviceType}
          </Typography>
        </Grid>
      )}
      {services.SocialShow && (
        <Grid item>
          <Typography fontSize={22} fontWeight={700}>
            Dados do Social
          </Typography>
          <Typography>
            Tudo Aprovado: {services.SocialShow.allApproved ? "Sim" : "Não"}
          </Typography>
          <Typography>Feed Adicionado:</Typography>
          <Grid container width={350} gap={2}>
            {services.SocialShow.feed.map((x, y) => {
              return (
                <Grid
                  key={y}
                  item
                  sx={{
                    width: 100,
                  }}
                >
                  {x.id}
                  {x.Images ? (
                    <img src={x.Images.url} width={"100%"} height={"100px"} />
                  ) : (
                    <Container
                      sx={{ width: 100, height: 100, backgroundColor: "#000" }}
                    ></Container>
                  )}
                  <Typography>
                    Aprovada: {x.approved ? "Sim" : "Não"}
                  </Typography>
                  {!x.approved && (
                    <Typography>Rasão da recusa: {x.reasonRefuse}</Typography>
                  )}
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
