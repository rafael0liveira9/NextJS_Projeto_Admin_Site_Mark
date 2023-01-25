import React, { useState } from "react";

import styles from "assets/jss/nextjs-material-dashboard/views/loginStyle.js";
import {
  Button,
  CircularProgress,
  IconButton,
  makeStyles,
  TextField,
} from "@material-ui/core";
import CustomInput from "../../../components/CustomInput/CustomInput";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import Router from "next/router";
import { toast, Toaster } from "react-hot-toast";
import SEO from "../../../components/Seo/SEO";

export default function Login() {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const [email, setEmail] = useState(),
    [isVisible, setIsVisible] = useState(false),
    [isLoading, setIsLoading] = useState(false),
    [password, setPassword] = useState();

  const submit = async () => {
    if (!isLoading) {
      setIsLoading(true);
      const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (data.status == 200) {
        const userData = await data.json();
        setIsLoading(false);
        if (userData.roleTypeId == 3) {
          toast.success("Logado com Sucesso");
          toast.success("Redirecionando...");
          Router.push("/admin/dashboard");
        } else {
          toast.error("Sem Permissão");
        }
      } else {
        toast.error("Email ou Senha incorreto");
      }
    }
  };

  return (
    <div className={classes.mainPanel}>
      <SEO title={"Login"}></SEO>
      <div className={classes.mainContent}>
        <div className={classes.container}>
          <h1 className={classes.logoPlaceholder}>MKT PROMO</h1>
          <div className={classes.inputBox}>
            <p>Email</p>
            <TextField
              fullWidth
              onChange={(e) => setEmail(e.target.value)}
              className={classes.input}
              color="#fff"
              value={email}
              variant="outlined"
            ></TextField>
          </div>
          <div className={classes.inputBox}>
            <p>Senha</p>
            <TextField
              type={isVisible ? "text" : "password"}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              className={classes.input}
              color="#fff"
              variant="outlined"
              value={password}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => setIsVisible(!isVisible)}>
                    {isVisible ? (
                      <Visibility></Visibility>
                    ) : (
                      <VisibilityOff></VisibilityOff>
                    )}
                  </IconButton>
                ),
              }}
            ></TextField>
          </div>

          <Button
            className={classes.buttonBox}
            fullWidth
            onClick={() => submit()}
          >
            {isLoading ? <CircularProgress></CircularProgress> : "Logar"}
          </Button>
        </div>
      </div>
      <Toaster></Toaster>
    </div>
  );
}
