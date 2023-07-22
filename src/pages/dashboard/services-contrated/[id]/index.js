import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import { Box, Button, Card, CardHeader, Table, Typography } from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/services/ServiceContratedTable";
import Router, { useRouter } from "next/router";
import { ServicesRepo } from "src/repository/services.repo";
import { AiOutlineFolderView } from "react-icons/ai";
import spacing from "src/@core/theme/spacing";

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = (
      await ServicesRepo.contratedServicesById(
        ctx.req.cookies.accessToken,
        ctx.query.id
      )
    ).data;
  } catch (error) { }

  return {
    props: {
      services: data,
    },
  };
};

const columnsLogo = [
  {
    flex: 0.275,
    minWidth: 290,
    field: "package_name",
    headerName: "Nome da Empresa",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {renderClient(params)} */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.id}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "status",
    headerName: "Status",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.LogoService?.status}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "feedback",
    headerName: "Feedback enviado?",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.LogoService?.feedbackSended ? "Sim" : "Não"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "approved",
    headerName: "Logo Aprovada?",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.LogoService?.LogoProof &&
                row?.LogoService?.LogoProof.isApproved
                ? "Sim"
                : "Não"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 50,
    headerName: "Editar",
    field: "edit",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        <Button
          onClick={() => {
            Router.push(`${Router.asPath}logo/${params.row.id}`);
          }}
        >
          <AiOutlineFolderView></AiOutlineFolderView>
        </Button>
      </Typography>
    ),
  },
];
const columnsSocial = [
  {
    flex: 0.275,
    minWidth: 290,
    field: "package_name",
    headerName: "Nome do Serviço",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {renderClient(params)} */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.id}
            </Typography>
          </Box>
        </Box>
      );
    },
  },

  {
    flex: 0.15,
    minWidth: 120,
    field: "status",
    headerName: "Status do Serviço",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.SocialService?.status}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.275,
    minWidth: 290,
    field: "approved",
    headerName: "Tudo Aprovado?",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {renderClient(params)} */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.SocialShow?.allApproved ? "Sim" : "Não"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 50,
    headerName: "Visualizar",
    field: "edit",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        <Button
          onClick={() => {
            Router.push(`${Router.asPath}social/${params.row.id}`);
          }}
        >
          <AiOutlineFolderView></AiOutlineFolderView>
        </Button>
      </Typography>
    ),
  },
];
const columnsSite = [
  {
    flex: 0.275,
    minWidth: 290,
    field: "package_name",
    headerName: "Nome do Serviço",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* {renderClient(params)} */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row.id}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "status",
    headerName: "Status do Serviço",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.SiteService?.status}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "published",
    headerName: "Publicado?",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.SiteService?.isPublished ? "Sim" : "Não"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "layoutselected",
    headerName: "Layout Selecionado",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.SiteService?.SiteLayoutSelected &&
                row?.SiteService?.siteLayoutSelectedId
                ? row?.SiteService?.siteLayoutSelectedId
                : "Nenhum"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "layoutfinished",
    headerName: "Layout Finalizado",
    renderCell: (params) => {
      const { row } = params;

      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              noWrap
              variant="body2"
              sx={{ color: "text.primary", fontWeight: 600 }}
            >
              {row?.SiteService?.SiteLayoutFinished &&
                row?.SiteService?.siteLayoutFinishedId
                ? row?.SiteService?.siteLayoutFinishedId
                : "Nenhum"}
            </Typography>
          </Box>
        </Box>
      );
    },
  },
  {
    flex: 0.1,
    minWidth: 50,
    headerName: "Visualizar",
    field: "edit",
    renderCell: (params) => (
      <Typography variant="body2" sx={{ color: "text.primary" }}>
        <Button
          onClick={() => {
            Router.push(`${Router.asPath}site/${params.row.id}`);
          }}
        >
          <AiOutlineFolderView></AiOutlineFolderView>
        </Button>
      </Typography>
    ),
  },
];

export default function ServicePage({ services }) {
  const router = useRouter();
  console.log(services)
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
      <Grid item xs={12}>

        <Card
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: 5
          }}
        >
          <Typography
            fontSize={20}
            fontWeight={700}
          >
            {`Empresa Selecionada : ${services.Companies.companyName}`}
          </Typography>
          <Button>Trocar Empresa</Button>
        </Card>
      </Grid>
      <Grid item xs={12} sx={{ marginBottom: 10 }}>
        <Typography
          fontSize={20}
          fontWeight={700}
          marginBottom={5}
          color={"#6A21AE"}
        >
          Logo
        </Typography>
        <Card
          sx={{
            width: "100%",
          }}
        >
          <TableFilter
            rowsData={services?.LogoContratedItems}
            columns={columnsLogo}
          />
        </Card>
      </Grid>
      {/* <Grid item xs={12} sx={{ marginBottom: 10 }}>
        <Typography
          fontSize={20}
          fontWeight={700}
          marginBottom={5}
          color={"#6A21AE"}
        >
          Site
        </Typography>
        <Card
          sx={{
            width: "100%",
          }}
        >
          <TableFilter
            rowsData={services?.SiteContratedItems}
            columns={columnsSite}
          />
        </Card>
      </Grid> */}
      {/* <Grid item xs={12} sx={{ marginBottom: 5 }}>
        <Typography
          fontSize={20}
          marginBottom={5}
          fontWeight={700}
          color={"#6A21AE"}
        >
          Redes Sociais
        </Typography>
        <Card
          sx={{
            width: "100%",
          }}
        >
          <TableFilter
            rowsData={services?.SocialContratedItems}
            columns={columnsSocial}
          />
        </Card>
      </Grid> */}
    </Grid>
  );
}
