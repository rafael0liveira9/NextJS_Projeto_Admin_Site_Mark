import React from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
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
import { LogoRepo } from "src/repository/logo.repo";
import { PackagesHooks } from "src/hooks/PackagesHooks";
import { ImagesRepo } from "src/repository/images.repo";
import toast from "react-hot-toast";

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
      companieId: ctx.query.id,
      serviceId: ctx.query.service,
    },
  };
};

export default function ServicePage({ service, companieId, token, serviceId }) {
  const router = useRouter();
  const statusFy = PackagesHooks();
  const [isLoading, setIsLoading] = React.useState(false);
  const [mainFile, setMainFile] = React.useState();
  const [mainFilePreview, setMainFilePreview] = React.useState();
  const [mockupsFile, setMockupsFile] = React.useState();
  const [mockupsFilePreview, setMockupsFilePreview] = React.useState([]);
  const mockupsRef = React.useRef(),
    mainRef = React.useRef();

  const [proofMockupFiles, setProofMockupFiles] = React.useState(
    service?.LogoProof?.Mockups?.map((x) => ({
      id: x.id,
      image: x.imagesId,
      imageData: x.image,
    })) ?? []
  );

  const [archives, setArchives] = React.useState([]);

  async function sendProof() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        let proofImage,
          mockupsImages = [];
        if (mainFile != null) {
          var bodyFormData = new FormData();
          bodyFormData.append("file", mainFile[0]);
          const data = await ImagesRepo.sendFile(bodyFormData, token);
          const image = await ImagesRepo.sendImage(
            { url: data.data.path },
            token
          );
          proofImage = image.data.id;
        }

        if (mockupsFile != null) {
          var bodyFormData = new FormData();
          for (let i = 0; i < mockupsFile.length; i++) {
            bodyFormData.append("file", mockupsFile[i]);
            const data = await ImagesRepo.sendFile(bodyFormData, token);
            const image = await ImagesRepo.sendImage(
              { url: data.data.path },
              token
            );
            mockupsImages.push(image.data.id);
          }
        }

        const data = await LogoRepo.sendProof(
          {
            id: +serviceId,
            proof: proofImage,
            mockups: mockupsImages,
          },
          token
        );

        setIsLoading(false);
        router.reload();
        toast.success("Provas enviadas com sucesso!");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
  }

  async function updateProof() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        let proofImage,
          mockupsImages = proofMockupFiles;
        if (mainFile != null) {
          var bodyFormData = new FormData();
          bodyFormData.append("file", mainFile[0]);
          const data = await ImagesRepo.sendFile(bodyFormData, token);
          const image = await ImagesRepo.sendImage(
            { url: data.data.path },
            token
          );
          proofImage = image.data.id;
        }

        if (mockupsFile != null) {
          var bodyFormData = new FormData();
          for (let i = 0; i < mockupsFile.length; i++) {
            bodyFormData.append("file", mockupsFile[i]);
            const data = await ImagesRepo.sendFile(bodyFormData, token);
            const image = await ImagesRepo.sendImage(
              { url: data.data.path },
              token
            );
            mockupsImages.push(image.data.id);
          }
        }

        mockupsImages = mockupsImages.map((x) =>
          typeof x == "number"
            ? {
                id: null,
                image: x,
              }
            : x
        );

        console.log(mockupsImages);

        const data = await LogoRepo.updateProof(
          {
            id: serviceId,
            proof: proofImage || service.LogoProof.imagesId,
            mockupsUp: mockupsImages,
          },
          token
        );

        console.log(data);
        setIsLoading(false);
        router.reload();
        toast.success("Provas enviadas com sucesso!");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  async function sendArchives() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        if (archives != null) {
          var bodyFormData = new FormData();
          for (let i = 0; i < archives.length; i++) {
            bodyFormData.append("file", archives[i].previewImageId);
            const data = await ImagesRepo.sendFile(bodyFormData, token);
            const image = await ImagesRepo.sendImage(
              { url: data.data.path },
              token
            );
            archives[i].previewImage = image.data.id;
          }

          const data = await LogoRepo.sendArchives(
            { id: +serviceId, archives, companieId: companieId },
            token
          );
          setIsLoading(false);
          router.reload();
          toast.success("Provas enviadas com sucesso!");
        }
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }
  }

  return (
    <Grid container spacing={6} className="match-height">
      <Grid
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
          width: "100%",
        }}
      >
        <Button
          sx={{ padding: "15px" }}
          onClick={() => {
            router.push(`/dashboard/services-contrated/`);
          }}
        >
          Visualizar outra Empresa
        </Button>
      </Grid>

      <>
        <PageHeader
          title={
            <Typography variant="h5">
              Logo -{" "}
              {service.LogoBriefing.titlefirst
                ? service.LogoBriefing.titlefirst
                : "Sem Titulo"}{" "}
              - {service.status}
            </Typography>
          }
          subtitle={
            <Typography variant="body2">
              Aqui você pode gerenciar o andamento desse serviço.
            </Typography>
          }
          button={
            service.status == 2
              ? "Mudar para Em Criação"
              : service.status == 6
              ? "Mudar para a enviar arquivos"
              : statusFy.returnStatus("logo", service.status)
          }
          onTap={async () => {
            if (service.status == 2) {
              if (!isLoading) {
                try {
                  setIsLoading(true);
                  await LogoRepo.toPlan(
                    {
                      id: +serviceId,
                    },
                    token
                  );
                  toast.success("Serviço atualizado!");
                  router.reload();
                } catch (error) {
                  toast.error("Ocorreu um erro ao atualizar o serviço");
                  setIsLoading(false);
                }
              }
            }
            if (service.status == 6) {
              if (!isLoading) {
                try {
                  setIsLoading(true);
                  await LogoRepo.toArchives(
                    {
                      id: +serviceId,
                    },
                    token
                  );
                  toast.success("Serviço atualizado!");
                  router.reload();
                } catch (error) {
                  toast.error("Ocorreu um erro ao atualizar o serviço");
                  setIsLoading(false);
                }
              }
            }
          }}
        />
        {service.LogoBriefing ? (
          <Card
            sx={{
              margin: 5,
              padding: 5,
            }}
          >
            <Grid item>
              <Typography fontSize={24} fontWeight={600}>
                Briefing do Usuário:
              </Typography>
              {/* {JSON.stringify(service.LogoBriefing)} */}
              <Typography fontSize={18}>
                Titulo:{" "}
                {service.LogoBriefing.titlefirst
                  ? service.LogoBriefing.titlefirst
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                SubTitulo:{" "}
                {service.LogoBriefing.titlefirst
                  ? service.LogoBriefing.titlefirst
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                Formato:{" "}
                {service.LogoBriefing.format
                  ? service.LogoBriefing.format
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                Tipografia Escolhida:{" "}
                {service.LogoBriefing.typography
                  ? service.LogoBriefing.typography
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                Especificação Escolhida:{" "}
                {service.LogoBriefing.especification
                  ? service.LogoBriefing.especification
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                Descrição:{" "}
                {service.LogoBriefing.description
                  ? service.LogoBriefing.description
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                Referências:{" "}
                {service.LogoBriefing.references
                  ? service.LogoBriefing.references
                  : "Não Preencheu"}
              </Typography>
              <Typography fontSize={18}>
                Mockups:{" "}
                {service.LogoBriefing.mockups
                  ? service.LogoBriefing.mockups
                  : "Não Preencheu"}
              </Typography>
            </Grid>
          </Card>
        ) : (
          <Grid item>
            <Typography>Aguardando Briefing...</Typography>
          </Grid>
        )}

        {service.status == 3 && (
          <Grid item>
            <Card
              sx={{
                margin: 5,
                padding: 5,
              }}
            >
              <Typography fontSize={24} fontWeight={600}>
                Enviar Provas
              </Typography>

              <Button
                onClick={() => {
                  mainRef.current.click();
                }}
              >
                {mainFile ? "Editar imagem de prova" : "Enviar imagem de prova"}
              </Button>
              <Button
                onClick={() => {
                  mockupsRef.current.click();
                }}
              >
                {mockupsFile
                  ? "Editar imagem de Mockup"
                  : "Enviar imagem de Mockup"}
              </Button>

              <input
                type="file"
                ref={mainRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={(a) => {
                  setMainFile(a.target.files);
                  setMainFilePreview(URL.createObjectURL(a.target.files[0]));
                }}
              ></input>
              <input
                multiple
                type="file"
                accept="image/*"
                ref={mockupsRef}
                style={{ display: "none" }}
                onChange={(a) => {
                  setMockupsFile(a.target.files);
                  setMockupsFilePreview([]);
                  let mockupsFileBackup = [];
                  for (let i = 0; i < a.target.files.length; i++) {
                    mockupsFileBackup.push(
                      URL.createObjectURL(a.target.files[i])
                    );
                  }
                  setMockupsFilePreview([...mockupsFileBackup]);
                }}
              ></input>

              <Button
                onClick={async () => {
                  await sendProof();
                }}
              >
                {isLoading ? "Enviando" : "Enviar provas"}
              </Button>
            </Card>
          </Grid>
        )}

        {service.status == 5 && (
          <Grid item width={"100%"}>
            <Card
              sx={{
                margin: 5,
                padding: 5,
              }}
            >
              <Grid container>
                <Grid item xs={8}>
                  <Typography fontSize={24} fontWeight={600}>
                    Provas Reprovadas
                  </Typography>

                  <Typography fontSize={18} fontWeight={500}>
                    Aprovado: {service.LogoProof.isApproved ? "Sim" : "Não"}
                  </Typography>
                  <Typography fontSize={18} fontWeight={500}>
                    Motivo da Recusa: {service.LogoProof.reasonRefuse}
                  </Typography>

                  <Typography>Imagem principal enviada:</Typography>

                  <img
                    src={service.LogoProof.proofImage.url}
                    alt=""
                    srcset=""
                  />

                  <Typography fontSize={18} fontWeight={500}>
                    Mockups enviados:
                  </Typography>
                  <Grid>
                    {service.LogoProof.Mockups.map((x) => {
                      return (
                        <Grid item>
                          <img src={x.image.url} alt="" height={100} />
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
                <Grid item xs={4}>
                  {proofMockupFiles &&
                    proofMockupFiles?.map((x, y) => {
                      return (
                        <div>
                          <img
                            src={x?.imageData?.url}
                            alt=""
                            srcset=""
                            height={100}
                          />
                          <button
                            onClick={() => {
                              let data = proofMockupFiles;
                              data.splice(y, 1);
                              setProofMockupFiles([...data]);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                </Grid>
                <Grid item xs={4}>
                  <Button
                    onClick={() => {
                      mainRef.current.click();
                    }}
                  >
                    {mainFile
                      ? "Editar imagem de prova"
                      : "Enviar imagem de prova"}
                  </Button>
                  <Button
                    onClick={() => {
                      mockupsRef.current.click();
                    }}
                  >
                    {mockupsFile
                      ? "Editar imagem de Mockup"
                      : "Enviar imagem de Mockup"}
                  </Button>
                  <input
                    type="file"
                    ref={mainRef}
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(a) => {
                      setMainFile(a.target.files);
                      setMainFilePreview(
                        URL.createObjectURL(a.target.files[0])
                      );
                    }}
                  ></input>
                  <input
                    multiple
                    type="file"
                    accept="image/*"
                    ref={mockupsRef}
                    style={{ display: "none" }}
                    onChange={(a) => {
                      setMockupsFile(a.target.files);
                      setMockupsFilePreview([]);
                      let mockupsFileBackup = [];
                      for (let i = 0; i < a.target.files.length; i++) {
                        mockupsFileBackup.push(
                          URL.createObjectURL(a.target.files[i])
                        );
                      }
                      setMockupsFilePreview([...mockupsFileBackup]);
                    }}
                  ></input>
                </Grid>
              </Grid>
              <Button
                onClick={async () => {
                  await updateProof();
                }}
              >
                {isLoading ? "Enviando..." : "Enviar correção"}
              </Button>
            </Card>
          </Grid>
        )}
      </>

      {service.status == 7 && (
        <Grid container item width={"100%"}>
          <Card
            sx={{
              margin: 5,
              padding: 5,
            }}
          >
            <Grid item>
              <Typography fontSize={24} fontWeight={600}>
                Enviar Arquivos
              </Typography>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{
                marginY: 5,
              }}
            >
              {archives.map((x, y) => {
                return (
                  <Grid item xs={4}>
                    <Stack>
                      <TextField
                        value={x.name}
                        onChange={(e) => {
                          let initialData = archives;
                          initialData[y][e.target.name] = e.target.value;
                          setArchives([...initialData]);
                        }}
                        name="name"
                        placeholder="Nome do Arquivo"
                      ></TextField>
                      <TextField
                        value={x.type}
                        onChange={(e) => {
                          let initialData = archives;
                          initialData[y][e.target.name] = e.target.value;
                          setArchives([...initialData]);
                        }}
                        name="type"
                        placeholder="Tipo (.EXTENSÃO)"
                      ></TextField>
                      <TextField
                        value={x.url}
                        onChange={(e) => {
                          let initialData = archives;
                          initialData[y][e.target.name] = e.target.value;
                          setArchives([...initialData]);
                        }}
                        name="url"
                        placeholder="https://"
                      ></TextField>
                      <Input
                        type="file"
                        onChange={(a) => {
                          let initialData = archives;
                          console.log(
                            "🚀 ~ file: [service].jsx:602 ~ {archives.map ~ initialData:",
                            initialData[y]
                          );
                          initialData[y].previewImageId = a.target.files[0];
                          const type = a.target.files[0].type.split("/");
                          initialData[y].type = `${type[0]} (.${type[1]})`;
                          initialData[y].previewImage = URL.createObjectURL(
                            a.target.files[0]
                          );
                          setArchives([...initialData]);
                        }}
                      ></Input>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
            <Stack flexDirection={"row"}>
              <Button
                onClick={() => {
                  let initialData = {
                    name: null,
                    type: null,
                    url: null,
                    previewImage: null,
                    previewImageId: null,
                  };
                  let archivesInitial = archives;
                  archivesInitial.push(initialData);
                  setArchives([...archivesInitial]);
                }}
              >
                Adicionar arquivo
              </Button>

              <Button
                onClick={async () => {
                  await sendArchives();
                }}
              >
                {isLoading ? "Enviando" : "Enviar provas"}
              </Button>
            </Stack>
          </Card>
        </Grid>
      )}
    </Grid>
  );
}
