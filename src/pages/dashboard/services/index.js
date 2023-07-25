import React, { Fragment, useState } from "react";
import Grid from "@mui/material/Grid";
import Icon from "src/@core/components/icon";
import {
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { PackagesRepo } from "src/repository/packages.repo";
import PageHeader from "src/@core/components/page-header";
import TableFilter from "src/@core/components/pages/services/ServiceTable";
import { useRouter } from "next/router";
import { ServicesRepo } from "src/repository/services.repo";
import toast from "react-hot-toast";

export default function ServicePage({ services, token }) {
  const router = useRouter();
  const [open2, setOpen2] = useState(false);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  async function deleteService() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const deleteData = await ServicesRepo.deleteService(id, token);
        toast.success("Deletado com sucesso.");
        setTimeout(() => {
          setIsLoading(false);
          router.reload();
        }, 3000);
      } catch (error) {
        toast.error(
          `Ocorreu um erro ao deletar: ${error.response.data.Message}`
        );
        setIsLoading(false);
        handleClose2();
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
        button={"Adicionar Novo Serviço"}
        onTap={() => {
          router.push(`${router.pathname}/add`);
        }}
      />

      <Fragment>
        <Dialog
          open={open2}
          onClose={handleClose2}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Deletar</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deseja excluir? Apos confirmar, esta ação não pode ser desfeita.
            </DialogContentText>
          </DialogContent>

          <DialogActions className="dialog-actions-dense">
            <Button onClick={handleClose2}>Cancelar</Button>
            <Button
              onClick={async () => {
                await deleteService();
              }}
            >
              {!isLoading ? "Deletar" : <CircularProgress></CircularProgress>}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      <Grid item xs={12}>
        <TableFilter
          rowsData={services}
          removeFunction={(id) => {
            // console.log(id);
            setId(id);
            handleClickOpen2();
          }}
        />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data;
  try {
    data = await ServicesRepo.getAllServices();
  } catch (error) { }
  let token = ctx.req.cookies.accessToken ?? "";

  return {
    props: {
      services: data,
      token,
    },
  };
};
