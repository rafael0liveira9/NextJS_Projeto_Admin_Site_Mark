import React, { useEffect, useState } from "react";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiOutlineCheck, AiOutlineClose, AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  TextField,
  Button,
  FormControlLabel,
  Switch,
  CircularProgress,
} from "@mui/material";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { UsersRepo } from "src/repository/users.repo";
import { PackagesHooks } from "src/hooks/PackagesHooks";
import toast from "react-hot-toast";

export async function getServerSideProps(ctx) {
  let tokenLead;
  let jwt;
  let newUserToken;

  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch {
    tokenLead = {
      name: "",
      email: "",
      phone: "",
    };
  }

  try {
    newUserToken = JSON.parse(nookies.get(ctx).newUser);
  } catch {
    newUserToken = null;
  }

  try {
    jwt = JSON.parse(nookies.get(ctx).jwt);
  } catch {
    jwt = null;
  }

  return {
    props: {
      tokenLead: tokenLead,
      jwt: jwt,
      newUserToken: newUserToken
    },
  };
}

const Login = (props) => {
  const router = useRouter();
  const packagesHooks = PackagesHooks();

  const [email, setEmail] = useState("rafaelmsdasdo@pinolab.com.br");
  const [password, setPassword] = useState("Amanda2211@");
  const [error, setError] = useState(false);

  const [isLoading1, setIsLoading1] = useState(false);

  const [passMask, setPassMask] = useState(false);

  const FormCheking = () => {
    if (email, password) {
      return true;
    } else {
      return false;
    }
  };

  const onSubmit = async (email, password) => {
    if (!isLoading1) {

      setIsLoading1(true);

      try {
        let newLogin = (await UsersRepo.postLogin(email, password));

        console.log("AQUI ", newLogin)

        nookies.set(null, "jwt", JSON.stringify(newLogin.jwt), {
          maxAge: 28800 * 3 * 7,
          path: "/",
        });

        nookies.set(null, "newUserToken", JSON.stringify(newLogin.data), {
          maxAge: 28800 * 3 * 7,
          path: "/",
        });

        packagesHooks.setNewClient({
          name: newLogin.data.name,
          document: newLogin.data.document,
          documentType: newLogin.data.documentType,
          email: newLogin.data.User.email,
          phone: newLogin.data.phone,
          companiesId: newLogin.data.companiesId
        })

        setError(false);
        toast.success("Login efetuado com Sucesso");
        router.push("/start/paywall");
      } catch (error) {
        setError(true);
        toast.error("Erro fazer Login, tente novamente...");
      }
    }

    setIsLoading1(false);
  };

  useEffect(() => {
    FormCheking();
  }, [email, password]);

  return (
    <>
      <div class="full-page-start">
        <div class="register-lead">
          <img src="/images/favicon.png" width={130}></img>
          <h3>Digite seus Dados:</h3>

          <TextField
            required
            id="form-props-required"
            name="email"
            label="E-mail"
            default=""
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            sx={{ margin: "5px" }}
          />


          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <TextField
              required
              id="form-props-required"
              name="password"
              type={passMask ? "" : "password"}
              label="Senha"
              defaultValue=""
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              sx={{ margin: "5px 0", maxWidth: "80%" }}
            />
            <div
              onClick={() => passMask === false ? setPassMask(true) : setPassMask(false)}
              style={{
                maxWidth: "15%",
                padding: "0px 2.5%",
                borderRadius: "10px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
              {passMask ? <AiFillEyeInvisible fill="red" size={20}></AiFillEyeInvisible> : <AiFillEye size={20}></AiFillEye>}
            </div>
          </div>

          <div class="div-button-submit">
            {email.length < 4 || password.length < 4 ? (
              <Button
                variant="contained"
                disabled
                style={{ cursor: "pointer", width: "250px", height: "50px" }}
                color="secondary"
              >
                {isLoading1 ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "ENTRAR"
                )}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => onSubmit(email, password)}
                style={{ cursor: "pointer", width: "250px", height: "50px" }}
                color="secondary"
              >
                {isLoading1 ? (
                  <CircularProgress></CircularProgress>
                ) : (
                  "ENTRAR"
                )}
              </Button>
            )}
            {error ? (
              <h3 class="error-global">
                Dados incorretos, revise e tente novamente...
              </h3>
            ) : (
              ""
            )}
            <Button
              variant="outlined"
              onClick={() => router.push('/start/register')}
              style={{ cursor: "pointer", width: "250px", height: "50px" }}
              color="secondary"
            >
              CADASTRAR-SE
            </Button>
          </div>
        </div>
        <StepsShow step={3}></StepsShow>
      </div>
    </>
  );
};

Login.anonUser = true;
Login.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Login;
