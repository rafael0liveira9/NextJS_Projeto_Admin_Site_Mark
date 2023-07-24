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
import TableFilter from "src/@core/components/pages/package/PackageTable";
import { useRouter } from "next/router";
import nookies from "nookies";
import toast from "react-hot-toast";

export default function PackagePage({ packages, token }) {
  const router = useRouter();
  const [open2, setOpen2] = useState(false);
  const [id, setId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleClickOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  async function deletePackage() {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const deleteData = await PackagesRepo.deletePackage(id, token);
        toast.success("Deletado com sucesso.");
        setTimeout(() => {
          setIsLoading(false);
          router.reload();
        }, 3000);
      } catch (error) {
        console.log(error);
        toast.error(
          `Ocorreu um erro ao deletar: ${error?.response?.data?.Message}`
        );
        setIsLoading(false);
        handleClose2();
      }
    }
  }
  return (
    <Grid container spacing={6} className="match-height">
      <PageHeader
        title={<Typography variant="h5">Pacotes</Typography>}
        subtitle={
          <Typography variant="body2">
            Aqui você pode ver, adicionar e excluir pacotes!
          </Typography>
        }
        button={"Adicionar Pacote"}
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
                await deletePackage();
              }}
            >
              {!isLoading ? "Deletar" : <CircularProgress></CircularProgress>}
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>

      <Grid item xs={12}>
        <TableFilter
          rowsData={packages}
          removeFunction={(id) => {
            setId(id);
            handleClickOpen2();
          }}
        />
      </Grid>
    </Grid>
  );
}

export const getServerSideProps = async (ctx) => {
  let data = [];
  const cookies = nookies.get(ctx);
  try {
    data = (await PackagesRepo.getAllPackages(cookies.accessToken)).data;
  } catch (error) { }

  return {
    props: {
      packages: data,
      token: cookies.accessToken,
    },
  };
};
