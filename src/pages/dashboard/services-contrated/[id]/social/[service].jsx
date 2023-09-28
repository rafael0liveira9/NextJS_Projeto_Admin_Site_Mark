import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  FormLabel,
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
import { SocialRepo } from "src/repository/social.repo";
import { PackagesHooks } from "src/hooks/PackagesHooks";
import toast from "react-hot-toast";
import { ImagesRepo } from "src/repository/images.repo";

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
      serviceId: ctx.query.service,
    },
  };
};

export default function ServicePage({ services, token, serviceId }) {
  const router = useRouter();
  const statusFy = PackagesHooks();
  const [isLoading, setIsLoading] = useState(false);
  const [posts, setPosts] = useState(
      services.status == 5
        ? services?.SocialShow?.feed?.map((x) => ({
            text: x?.text,
            type: x?.type,
            id: x?.id,
            image: null,
            imageId: x?.Images?.id,
            imagePreview: x?.Images?.url,
            isSelected: false,
            reason: x.reasonRefuse,
            ...x,
          }))
        : []
    ),
    [postsApprove, setPostsApprove] = useState(
      services.status == 7 || services.status == 9
        ? services?.SocialShow?.feed?.map((x) => ({
            text: x?.text,
            type: x?.type,
            id: x?.id,
            image: null,
            imageId: x?.Images?.id,
            imagePreview: x?.Images?.url,
            isSelected: false,
            reason: x.reasonRefuse,
            ...x,
          }))
        : []
    );

  console.log(services);

  async function socialToShow() {
    if (!isLoading) {
      setIsLoading(true);

      try {
        let data = {
          id: services.id,
          feed: [],
        };

        if (posts.length) {
          let postsCopy = posts;
          var bodyFormData = new FormData();

          for (let i = 0; i < postsCopy.length; i++) {
            if (postsCopy[i].image != null) {
              bodyFormData.append("file", postsCopy[i].image);
              const dataImage = await ImagesRepo.sendFile(bodyFormData, token);
              const image = await ImagesRepo.sendImage(
                { url: dataImage.data.path },
                token
              );
              postsCopy[i].image = image.data.id;
            } else {
              delete postsCopy[i].image;
            }
          }
          data.feed = postsCopy;

          const socialService = (await SocialRepo.sendShow(data, token)).data;
          setIsLoading(false);
          toast.success("Serviço atualizado!");
          router.reload();
        } else {
          setIsLoading(false);
          toast.error("Adicione pelo menos um post");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Ocorreu um erro: " + error?.response?.data?.message);
      }
    }
  }

  async function socialToApprove() {
    const data = {
      id: services.id,
      allApproved: false,
      isRefused: false,
      feed: [],
    };

    let haveImage = true;

    if (postsApprove.some((e) => e.image == null && e.imageId == null)) {
      setIsLoading(false);
      haveImage = false;
      toast.error("Todas as postagens devem ter foto");
      return;
    }

    if (postsApprove.some((e) => e.text.length == 0)) {
      setIsLoading(false);
      toast.error("Todas as postagens devem ter texto");
      return;
    }

    if (haveImage && postsApprove.length) {
      let postsCopy = postsApprove;
      var bodyFormData = new FormData();

      for (let i = 0; i < postsCopy.length; i++) {
        if (postsCopy[i].image != null) {
          bodyFormData.append("file", postsCopy[i].image);
          const dataImage = await ImagesRepo.sendFile(bodyFormData, token);
          const image = await ImagesRepo.sendImage(
            { url: dataImage.data.path },
            token
          );
          postsCopy[i].image = image.data.id;
        } else {
          if (postsCopy[i].imageId == null) {
            setIsLoading(false);
            toast.error("Necessário que todos os posts tenham imagem");
            break;
          }
          postsCopy[i].image = postsCopy[i].imageId;
        }
      }
      data.feed = postsCopy;

      const socialService = (await SocialRepo.sendApprove(data, token)).data;
      setIsLoading(false);
      toast.success("Serviço atualizado!");
      router.reload();
    } else {
      setIsLoading(false);
      toast.error("Adicione pelo menos um post");
    }
  }

  async function updateSocialApprove() {
    const data = {
      id: services.id,
      allApproved: false,
      isRefused: false,
      feed: [],
    };

    let haveImage = true;

    if (postsApprove.some((e) => e.image == null && e.imageId == null)) {
      setIsLoading(false);
      haveImage = false;
      toast.error("Todas as postagens devem ter foto");
      return;
    }

    if (postsApprove.some((e) => e.text.length == 0)) {
      setIsLoading(false);
      toast.error("Todas as postagens devem ter texto");
      return;
    }

    if (haveImage && postsApprove.length) {
      let postsCopy = postsApprove;
      var bodyFormData = new FormData();

      for (let i = 0; i < postsCopy.length; i++) {
        if (postsCopy[i].image != null) {
          bodyFormData.append("file", postsCopy[i].image);
          const dataImage = await ImagesRepo.sendFile(bodyFormData, token);
          const image = await ImagesRepo.sendImage(
            { url: dataImage.data.path },
            token
          );
          postsCopy[i].image = image.data.id;
        } else {
          if (postsCopy[i].imageId == null) {
            setIsLoading(false);
            toast.error("Necessário que todos os posts tenham imagem");
            break;
          }
          postsCopy[i].image = postsCopy[i].imageId;
        }
      }
      data.feed = postsCopy;

      const socialService = (await SocialRepo.updateApprove(data, token)).data;
      setIsLoading(false);
      toast.success("Serviço atualizado!");
      router.reload();
    } else {
      setIsLoading(false);
      toast.error("Adicione pelo menos um post");
    }
  }

  async function updateShow() {
    if (!isLoading) {
      setIsLoading(true);

      try {
        let data = {
          id: services.id,
          allApproved: true,
          isRefused: false,
          feed: [],
        };

        if (posts.length) {
          let postsCopy = posts;
          var bodyFormData = new FormData();

          for (let i = 0; i < postsCopy.length; i++) {
            if (postsCopy[i].image != null) {
              bodyFormData.append("file", postsCopy[i].image);
              const dataImage = await ImagesRepo.sendFile(bodyFormData, token);
              const image = await ImagesRepo.sendImage(
                { url: dataImage.data.path },
                token
              );
              postsCopy[i].image = image.data.id;
            } else {
              delete postsCopy[i].image;
            }
          }
          data.feed = postsCopy;

          const socialService = (await SocialRepo.updateShow(data, token)).data;
          setIsLoading(false);
          toast.success("Serviço atualizado!");
          router.reload();
        } else {
          setIsLoading(false);
          toast.error("Adicione pelo menos um post");
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error("Ocorreu um erro: " + error?.response?.data?.message);
      }
    }
  }

  async function toPlan() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const toPlanData = await SocialRepo.toPlan(
          {
            id: +serviceId,
          },
          token
        );
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

  async function toCreate() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const toPlanData = await SocialRepo.toCreate(
          {
            id: +serviceId,
          },
          token
        );
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
  async function toPendingPublish() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const toPlanData = await SocialRepo.toPendingPublish(
          {
            id: +serviceId,
          },
          token
        );
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
  async function toPublish() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const toPlanData = await SocialRepo.toPublish(
          {
            id: +serviceId,
          },
          token
        );
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

  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Serviços</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir serviços!
          </Typography>
        }
        button={
          services.status == 2
            ? "Mudar para Em Planejamento"
            : services.status == 6
            ? "Mudar para Em Criação"
            : statusFy.returnStatus("social", services.status)
        }
        onTap={async () => {
          if (services.status == 2) {
            await toPlan();
          }

          if (services.status == 6) {
            await toCreate();
          }
          if (services.status == 10) {
            await toPendingPublish();
          }
          if (services.status == 11) {
            await toPublish();
          }
        }}
      />

      {services.SocialBriefing && (
        <Grid item>
          <Card
            style={{
              padding: 10,
            }}
          >
            <Typography fontSize={22} fontWeight={700}>
              Briefing
            </Typography>
            <Typography>
              Dias e Horas: {services.SocialBriefing.daysHours}
            </Typography>
            <Typography>
              Modelo do Material: {services.SocialBriefing.mediaType}
            </Typography>
            <Typography>
              Referencia: {services.SocialBriefing.socialMediaReference}
            </Typography>
            <Typography>
              Forma de Fala da Rede Social: {services.SocialBriefing.socialTalk}
            </Typography>
            <Typography>
              Texto do Produto: {services.SocialBriefing.socilaProductText}
            </Typography>
            <Typography fontSize={18} fontWeight={700}>
              Dia das postagens.
            </Typography>
            <Container>
              {services.SocialBriefing.timesPerWeek.map((x) => {
                return <Typography>Dia Escolhido: {x.weekDay}</Typography>;
              })}
            </Container>
            <Typography fontSize={18} fontWeight={700}>
              Imagens de Produtos
            </Typography>
            <Container>
              <div
                style={{
                  border: "1px solid black",
                  width: 100,
                  height: 100,
                }}
              >
                {services.SocialBriefing.socialProductImages.map((x) => {
                  return (
                    <img
                      src={x.url}
                      alt=""
                      srcset=""
                      width={100}
                      height={100}
                    />
                  );
                })}
              </div>
            </Container>
          </Card>
        </Grid>
      )}

      {(services.status == 5 || services.status == 3) && (
        <MlabsCopy
          posts={posts}
          funcAddNew={(e) => {
            let postCopy = posts;
            postCopy.push({
              text: "",
              type: "IMAGE",
              isSelected: false,
              imagePreview: null,
              imageFile: null,
            });
            setPosts([...postCopy]);
            toast.success(
              "Adicionado com Sucesso, lembre se de escolher uma foto."
            );
          }}
          funcEdit={(e, name) => {
            let postCopy = posts;
            postCopy[posts.findIndex((e) => e.isSelected)][name] = e;
            setPosts([...postCopy]);
          }}
          funcSelect={(e) => {
            let postCopy = posts;
            for (let i = 0; i < postCopy.length; i++) {
              postCopy[i].isSelected = false;
            }
            postCopy[e].isSelected = true;
            setPosts([...postCopy]);
          }}
          funcSend={async () => {
            if (services.status == 5) await updateShow();
            if (services.status == 3) await socialToShow();
          }}
          showReason={services.status == 5}
        ></MlabsCopy>
      )}
      {(services.status == 7 || services.status == 9) && (
        <MlabsCopy
          posts={postsApprove}
          funcAddNew={(e) => {
            let postCopy = postsApprove;
            postCopy.push({
              text: "",
              type: "IMAGE",
              isSelected: false,
              imagePreview: null,
              imageFile: null,
            });
            setPostsApprove([...postCopy]);
            toast.success(
              "Adicionado com Sucesso, lembre se de escolher uma foto."
            );
          }}
          funcEdit={(e, name) => {
            let postCopy = postsApprove;
            postCopy[postsApprove.findIndex((e) => e.isSelected)][name] = e;
            setPostsApprove([...postCopy]);
          }}
          funcSelect={(e) => {
            let postCopy = postsApprove;
            for (let i = 0; i < postCopy.length; i++) {
              postCopy[i].isSelected = false;
            }
            postCopy[e].isSelected = true;
            setPostsApprove([...postCopy]);
          }}
          funcSend={async () => {
            if (services.status == 7) await socialToApprove();
            if (services.status == 9) await updateSocialApprove();
          }}
          showReason={services.status == 9}
        ></MlabsCopy>
      )}
    </Grid>
  );
}

const MlabsCopy = ({
  posts,
  funcAddNew,
  funcEdit,
  funcSelect,
  funcSend,
  showReason = false,
}) => {
  return (
    <Grid item>
      <Stack flexDirection={"row"} gap={5}>
        <Card
          style={{
            padding: 5,
          }}
        >
          <Stack width={"400px"} alignItems={"center"}>
            <Button
              style={{
                marginBottom: "10px",
              }}
              onClick={() => {
                funcAddNew();
              }}
            >
              {posts.length > 0
                ? "Selecione ou Adicione um novo post"
                : "Adicionar um Novo Post"}
            </Button>

            {posts.length > 0 && (
              <>
                <Grid
                  item
                  columns={3}
                  container
                  width={"100%"}
                  spacing={2}
                  justifyContent={"center"}
                >
                  {posts.map((x, y) => (
                    <Grid item height={126} width={126} key={y}>
                      <div
                        onClick={() => {
                          funcSelect(y);
                        }}
                        style={{
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                          border: x.isSelected
                            ? "5px solid red"
                            : "1px solid black",
                        }}
                      >
                        {x.imagePreview && (
                          <img
                            src={x.imagePreview}
                            alt=""
                            srcset=""
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          />
                        )}
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </>
            )}
            {posts.length > 0 && (
              <Button
                onClick={async () => {
                  await funcSend();
                }}
              >
                Enviar Alteração
              </Button>
            )}
          </Stack>
        </Card>
        {posts.some((x) => x.isSelected) && (
          <Card
            style={{
              padding: 5,
            }}
          >
            <Stack width={"400px"} alignItems={"center"}>
              <Typography fontSize={22} fontWeight={700}>
                Edite o Post
              </Typography>
              <FormLabel>Texto do Post</FormLabel>
              <TextField
                sx={{
                  width: "100%",
                }}
                multiline
                rows={20}
                value={posts[posts.findIndex((e) => e.isSelected)].text}
                onChange={(e) => {
                  funcEdit(e.target.value, "text");
                }}
              />
              {showReason && (
                <Typography fontSize={16} fontWeight={700}>
                  Motivo por ser recusado:{" "}
                  {posts[posts.findIndex((e) => e.isSelected)].reason}
                </Typography>
              )}
              <Button>
                <label
                  style={{
                    width: "100%",
                    height: "100%",
                    cursor: "pointer",
                  }}
                  htmlFor="input"
                >
                  Adicionar Imagem
                </label>
              </Button>
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(a) => {
                  funcEdit(
                    URL.createObjectURL(a.target.files[0]),
                    "imagePreview"
                  );
                  funcEdit(a.target.files[0], "image");
                }}
                id="input"
              ></input>
            </Stack>
          </Card>
        )}
        {posts.some((x) => x.isSelected) && (
          <Card
            style={{
              padding: 5,
            }}
          >
            <Stack width={"400px"} alignItems={"center"}>
              <Typography fontSize={22} fontWeight={700}>
                Preview do Post
              </Typography>
              <div
                style={{
                  marginTop: 10,
                  border: "1px solid grey",
                  maxHeight: 800,
                  overflowY: "scroll",
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 50,
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                    padding: 8,
                  }}
                >
                  <div
                    style={{
                      width: 35,
                      height: 35,
                      backgroundColor: "red",
                      borderRadius: "50%",
                      marginRight: 10,
                    }}
                  ></div>
                  <div>
                    <Typography fontSize={16} fontWeight={700} p={0} m={0}>
                      Usuario
                    </Typography>
                    <Typography fontSize={12} fontWeight={400} p={0} m={0}>
                      Preview do Post
                    </Typography>
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    height: 300,
                    backgroundColor: "blue",
                  }}
                >
                  {posts[posts.findIndex((e) => e.isSelected)].imagePreview && (
                    <img
                      src={
                        posts[posts.findIndex((e) => e.isSelected)].imagePreview
                      }
                      alt=""
                      srcset=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  )}
                </div>
                <div
                  style={{
                    width: 300,
                    minHeight: 100,
                    backgroundColor: "white",
                    padding: 5,
                  }}
                >
                  <Typography
                    sx={{
                      wordBreak: "break-all",
                      width: "100%",
                      height: "100%",
                      padding: 0,
                      margin: 0,
                    }}
                  >
                    <b>Usuario</b>{" "}
                    {posts[posts.findIndex((e) => e.isSelected)].text}
                  </Typography>
                </div>
              </div>
            </Stack>
          </Card>
        )}
      </Stack>
    </Grid>
  );
};
