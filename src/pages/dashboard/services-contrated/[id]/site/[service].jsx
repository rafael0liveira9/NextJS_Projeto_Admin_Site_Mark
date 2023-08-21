import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  FormControl,
  Input,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/services/ServiceContratedTable";
import { useRouter } from "next/router";
import { ServicesRepo } from "src/repository/services.repo";
import { AiOutlineFolderView } from "react-icons/ai";
import { SiteRepo } from "src/repository/site.repo";
import { PackagesHooks } from "src/hooks/PackagesHooks";
import toast from "react-hot-toast";
import { ImagesRepo } from "src/repository/images.repo";

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = (
      await ServicesRepo.siteServiceById(
        ctx.req.cookies.accessToken,
        ctx.query.service
      )
    ).data;
  } catch (error) {}

  return {
    props: {
      services: data,
      token: ctx.req.cookies.accessToken,
      serviceId: ctx.query.service,
    },
  };
};

export default function ServicePage({ services, token, serviceId }) {
  const router = useRouter();
  const statusFy = PackagesHooks();
  const [isLoading, setIsLoading] = React.useState(false);

  const [fileLayoutFinished, setFileLayoutFinished] = React.useState([]);
  const [filesLayoutSelect, setFilesLayoutSelect] = React.useState([]);

  async function toPlan() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const toPlanData = await SiteRepo.toPlan(+serviceId, token);
        setIsLoading(false);
        toast.success("Serviço atualizado!");
        router.reload();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Ocorreu um erro: " + error?.response?.data?.message);
      }
    }
  }

  async function sendLayout() {
    if (!filesLayoutSelect.length) {
      toast.error("Adicione pelo menos um layout");
      return;
    }
    if (!isLoading) {
      setIsLoading(true);
      try {
        let initialData = filesLayoutSelect;

        if (initialData.length) {
          var bodyFormData = new FormData();
          for (let i = 0; i < initialData.length; i++) {
            bodyFormData.append("file", initialData[i].image);
            const data = await ImagesRepo.sendFile(bodyFormData, token);
            const image = await ImagesRepo.sendImage(
              { url: data.data.path },
              token
            );
            initialData[i].imageId = image.data.id;
            delete initialData[i].image;
          }
        }

        const serviceData = await SiteRepo.sendLayout(
          {
            images: initialData,
            id: +serviceId,
          },
          token
        );

        setIsLoading(false);
        toast.success("Layout enviado com sucesso.");
        router.reload();
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }

  async function sendLayoutFinished() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        var bodyFormData = new FormData();
        bodyFormData.append("file", fileLayoutFinished);
        const data = await ImagesRepo.sendFile(bodyFormData, token);
        const image = await ImagesRepo.sendImage(
          { url: data.data.path },
          token
        );

        const serviceData = await SiteRepo.sendLayoutFinished(
          {
            id: serviceId,
            imageId: image.data.id,
          },
          token
        );
        setIsLoading(false);
        toast.success("Layout enviado com sucesso.");
        router.reload();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  async function setServicePublish() {
    const data = {
      id: +serviceId,
    };

    if (!isLoading) {
      setIsLoading(true);
      try {
        const serviceData = await SiteRepo.setServicePublished(data, token);
        setIsLoading(false);
        toast.success("Layout enviado com sucesso.");
        router.reload();
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error("Ocorreu um erro ao atualizar o serviço");
      }
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
        button={
          services.status == 2
            ? "Mudar para Em Planejamento"
            : statusFy.returnStatus("site", services.status)
        }
        onTap={async () => {
          if (services.status == 2) {
            await toPlan();
          }
          if (services.status == 9) {
            await setServicePublish();
          }
        }}
      />
      {services.SiteBriefing && (
        <Grid item>
          <Card
            style={{
              padding: 20,
            }}
          >
            <Typography fontSize={20} fontWeight={700}>
              Briefing
            </Typography>
            {services.SiteBriefing.url != null ? (
              <>
                <Typography>
                  Site do Domínio: {services.SiteBriefing.urlName}
                </Typography>
                <Typography>
                  URL do Domínio: {services.SiteBriefing.url}
                </Typography>
                <Typography>
                  Login do Domínio: {services.SiteBriefing.urlLogin}
                </Typography>
                <Typography>
                  Password do Domínio: {services.SiteBriefing.urlPass}
                </Typography>
                <br></br>
              </>
            ) : (
              <>
                <Typography>Sem Domínio</Typography>
              </>
            )}
            {services.SiteBriefing.host != null ? (
              <>
                <Typography>
                  Site da Hospedagem: {services.SiteBriefing.host}
                </Typography>
                <Typography>
                  Login da Hospedagem: {services.SiteBriefing.hostLogin}
                </Typography>
                <Typography>
                  Password da Hospedagem: {services.SiteBriefing.hostPass}
                </Typography>
                <br></br>
              </>
            ) : (
              <>
                <Typography>Sem Hospedagem</Typography>
              </>
            )}
            <Typography>
              Dados de Contato: {services.SiteBriefing.contactData}
            </Typography>
            <Typography>Logo: {services.SiteBriefing.logo}</Typography>
            <Typography>
              Referências: {services.SiteBriefing.references.join(", ")}
            </Typography>
            <Typography>
              Cores:{" "}
              {services.SiteBriefing.colors.map((x) => (
                <div
                  style={{
                    height: 10,
                    width: 10,
                    backgroundColor: x,
                  }}
                ></div>
              ))}
            </Typography>
            <Typography>
              Midias Sociais: {services.SiteBriefing.socialMidia}
            </Typography>
            <Typography>
              Arquivos do Usuário: [<br></br>
              {services.SiteBriefing.archives.map((x) => (
                <>
                  <a href={x.url}>{x.url}</a>
                  <br></br>
                </>
              ))}
              ]
            </Typography>
            <Typography>
              Briefing Do usuário: {services.SiteBriefing.briefing.url}
            </Typography>
            <Typography>Link do Site: {services.SiteBriefing.url}</Typography>
          </Card>
        </Grid>
      )}
      {services.status == 4 && (
        <>
          <Grid item>
            <Card
              sx={{
                padding: 10,
              }}
            >
              <Typography fontSize={20} fontWeight={700}>
                Enviar Layouts para seleção pelo usuário
              </Typography>
              <br></br>
              {filesLayoutSelect.map((x, y) => {
                return (
                  <Stack>
                    <TextField
                      name="name"
                      placeholder="Nome do Layout"
                      onChange={(e) => {
                        let initialData = filesLayoutSelect;
                        initialData[y].name = e.target.value;
                        setFilesLayoutSelect([...initialData]);
                      }}
                    ></TextField>
                    <Input
                      type="file"
                      key={y}
                      onChange={(e) => {
                        let initialData = filesLayoutSelect;
                        initialData[y].image = e.target.files[0];
                        setFilesLayoutSelect([...initialData]);
                      }}
                    ></Input>
                    <Button
                      onClick={() => {
                        let initialData = filesLayoutSelect;
                        initialData.splice(y, 1);
                        setFilesLayoutSelect([...initialData]);
                      }}
                    >
                      Apagar
                    </Button>
                  </Stack>
                );
              })}
              <Button
                onClick={() => {
                  let initialData = filesLayoutSelect;
                  initialData.push({
                    name: null,
                    image: null,
                    imageId: null,
                  });
                  setFilesLayoutSelect([...initialData]);
                }}
              >
                Adicionar Layout
              </Button>
              <Button
                onClick={async () => {
                  await sendLayout();
                }}
              >
                Enviar Layout
              </Button>
            </Card>
          </Grid>
        </>
      )}
      {services.SiteLayoutSelected != null && (
        <Grid item>
          <Card
            sx={{
              padding: 10,
            }}
          >
            <Typography fontSize={20} fontWeight={700}>
              Layout Selecionado pelo Usuário
            </Typography>
            <img
              src={services.SiteLayoutSelected.LayoutSelected.url}
              alt=""
              height={120}
            />
          </Card>
        </Grid>
      )}
      {services.status == 6 && (
        <Grid item>
          <Card
            sx={{
              padding: 10,
            }}
          >
            <Input
              type="file"
              onChange={(e) => {
                setFileLayoutFinished(e.target.files[0]);
              }}
            ></Input>
            <Button
              onClick={async () => {
                await sendLayoutFinished();
              }}
            >
              Enviar Layout para aprovação
            </Button>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
