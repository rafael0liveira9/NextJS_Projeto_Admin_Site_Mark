import React, { useEffect, useState } from "react";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { TextField, Button, FormControlLabel, Switch, CircularProgress } from "@mui/material";
import { Cookies } from "next/dist/server/web/spec-extension/cookies";
import { UsersRepo } from "src/repository/users.repo";
import toast from "react-hot-toast";

export async function getServerSideProps(ctx) {
  let tokenLead;
  let jwt;
  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch {
    tokenLead = {
      name: "",
      email: "",
      phone: ""
    };
  };

  try {
    jwt = JSON.parse(nookies.get(ctx).jwt);
  } catch {
    jwt = null
  };


  return {
    props: {
      tokenLead: tokenLead,
      jwt: jwt
    },
  };
}

const Register = (props) => {
  const router = useRouter();
  const [name, setName] = useState(props.tokenLead.name || "");
  const [errorName, setErrorName] = useState(false);
  const [cpf, setCpf] = useState("");
  const [errorCpf, setErrorCpf] = useState(false);
  const [phone, setPhone] = useState(props.tokenLead.phone || "");
  const [errorPhone, setErrorPhone] = useState(false);
  const [email, setEmail] = useState(props.tokenLead.email || "");
  const [errorEmail, setErrorEmail] = useState(false);
  const [cep, setCEP] = useState("");
  const [errorCep, setErrorCep] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");
  const [errorPasswordAny, setErrorpasswordAny] = useState(false);
  const [errorPasswordConf, setErrorpasswordConf] = useState(false);
  const [errorPassword9c, setErrorpassword9c] = useState(false);
  const [errorPasswordEsp, setErrorpasswordEsp] = useState(false);
  const [errorPasswordLet, setErrorpasswordLet] = useState(false);
  const [errorPasswordNum, setErrorpasswordNum] = useState(false);
  const [errorCheck1, setErrorCheck1] = useState(false);
  const [errorCheck2, setErrorCheck2] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);


  const FormCheking = () => {
    if (name && cpf && email && phone && password && passwordConf) {
      return true;
    } else {
      return false;
    }
  };

  const nameReal = (e) => {
    if (e.target.value.length > 0) {
      setErrorName(true);
    } else {
      setErrorName(false);
    }
    setName(e.target.value.replace(/\d/g, "").replace(/(\D{1})(\D*)/, "$1$2"));
    if (e.target.value.replace(/\d/g, "").length >= 4) {
      setErrorName(false);
    }
    setName(e.target.value.replace(/\d/g, "").replace(/(\D{1})(\D*)/, "$1$2"));
    if (e.target.value.replace(/\d/g, "").length >= 4) {
      setErrorName(false);
    }
  };

  const cpfReal = (e) => {
    if (e.target.value.length > 0) {
      setErrorCpf(true)
    } else {
      setErrorCpf(false)
    }

    if (e.target.value.length > 11) {
      setCpf(
        e.target.value
          .replace(/\D/g, "")
          .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5")
      );
    } else {
      setCpf(
        e.target.value
          .replace(/\D/g, "")
          .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
      );
    }
  };

  const formatCEP = (e) => {
    const regex = /(\d{5})(\d{3})/gm;
    let m;
    if (e.target.value.length > 0) {
      setErrorCep(true)
    } else {
      setErrorCep(false)
    }

    if (e.target.value.length !== 0 && !/^\d{5}-\d{3}$/.test(e.target.value)) {
      setErrorCep(true);
    } else {
      setErrorCep(false);
    }


    while ((m = regex.exec(e.target.value)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach(() => {
        setErrorCep(false);
      });
    }

    setCEP(e.target.value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2"));
  };


  const emailReal = (e) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]{2,}\.[a-z]{2,}(\.[a-z]{2,})?$/;

    if (e.target.value.length > 0) {
      setErrorEmail(!regex.test(e.target.value));
    } else {
      setErrorEmail(false);
    }


    setEmail(e.target.value);
  };

  const phoneReal = (e) => {
    const regex = /\(?(\(\d{2}\))\)?\ ?(\d)\ ?(\d{4})\-?(\d{4})/gm;
    let m;
    if (e.target.value.length > 0) {
      setErrorPhone(true)
    } else {
      setErrorPhone(false)
    }

    if (e.target.value.length !== 0 && !/\(?(\(\d{2}\))\)?\ ?(\d)\ ?(\d{4})\-?(\d{4})/.test(e.target.value)) {
      setErrorPhone(true);
    } else {
      setErrorPhone(false);
    }

    while ((m = regex.exec(e.target.value)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach(() => {
        setErrorPhone(false);
      });
    }

    setPhone(
      e.target.value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\(\d{2}\)) (\d)(\d{4})(\d{4})/, "$1 $2 $3-$4")
    );
  };

  const passwordReal = (e) => {
    const regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/gm;
    const regex9c = /^.{8,}$/gm;
    const regexEsp = /[\$\*&@#]/gm;
    const regexLet = /[A-Z]/gm;
    const regexNum = /\d/gm;
    let m;

    {
      if (e.target.value.length !== 0) {
        setErrorpasswordAny(!regex.test(e.target.value));
        setErrorpasswordConf(passwordConf !== e.target.value);
        setErrorpassword9c(!regex9c.test(e.target.value));
        setErrorpasswordEsp(!regexEsp.test(e.target.value));
        setErrorpasswordLet(!regexLet.test(e.target.value));
        setErrorpasswordNum(!regexNum.test(e.target.value));
      } else {
        setErrorpasswordAny(false);
        setErrorpasswordConf(false);
        setErrorpassword9c(false);
        setErrorpasswordEsp(false);
        setErrorpasswordLet(false);
        setErrorpasswordNum(false);
      }
    }

    setPassword(e.target.value);
  };
  const passwordRealConf = (e) => {
    {
      password.length > 0
        ? setErrorpasswordConf(password !== e.target.value)
        : setErrorpasswordConf(false);
    }

    setPasswordConf(e.target.value);
  };

  const onSubmit = async (name, email, password, cpf, phone, cep) => {
    if (!isLoading1) {
      setIsLoading1(true);
      const regex = /[\s_\-()[\]{}!#$%^&*+=\\|:;"'<>,?/~`]/g;
      let newUser;
      let data = {
        "email": email,
        "password": password,
        "name": name,
        "document": cpf,
        "documentType": cpf.length > 11 ? "CNPJ" : "CPF",
        "phone": phone.replace(regex, ""),
        "firebaseToken": "123123123",
        "cep": "81730070"
      }

      if (props.jwt === null) {
        try {
          newUser = (await UsersRepo.postUserClient(data)).data;
          nookies.set(null, "jwt", JSON.stringify(newUser.jwt), {
            maxAge: (28800 * 3) * 7,
            path: "/",
          });
          toast.success("Cadastro criado com sucesso!");
          router.push("/start/paywall");
        } catch (error) {
          toast.error("Erro ao se cadastrar, tente novamente.")
        }
      } else {
        router.push("/start/paywall");
      }
    }
    setIsLoading1(false);
  }

  useEffect(() => {
    FormCheking()
  }, [name, cpf, phone, email, cep, password, passwordConf])

  return (
    <>
      <div class="full-page-start">
        <div class="register-lead">
          {/* <img src="/images/favicon.png" width={70}></img> */}
          <h3>Preencha o Cadastro:</h3>
          {!name && !errorName ? (
            <TextField
              required
              id="form-props-required"
              autoFocus={true}
              name="name"
              label="Nome"
              defaultValue=""
              onChange={nameReal}
              value={name}
              sx={{ margin: "5px" }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              autoFocus={true}
              name="name"
              label="Nome"
              defaultValue=""
              onChange={nameReal}
              value={name}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          )}
          {errorName ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Insira um Nome valido
            </h3>
          ) : (
            ""
          )}

          {/* sx={{ margin: "5px"}}
          sx={{ margin: "5px" ,"& .MuiOutlinedInput-root": {"& > fieldset": { borderColor: "#83E542", borderWidth: "2px" }}}} */}
          {!cpf && !errorCpf ? (
            <TextField
              required
              id="form-props-required"
              name="document"
              label="CPF"
              defaultValue=""
              onKeyUp={(e) => {
                const regex = e.target.value.length > 11 ?
                  /(\d{2})\.?(\d{3})\.?(\d{3})\/?(\d{4})\-?(\d{2})/gm
                  :
                  /(\d{3})\.?(\d{3})\.?(\d{3})\-?(\d{2})/gm

                if (regex.test(e.target.value)) {
                  console.log(regex)
                  setErrorCpf(false);
                }
              }}
              onChange={cpfReal}
              value={cpf}
              sx={{ margin: "5px" }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              name="document"
              label="CPF"
              defaultValue=""
              onKeyUp={(e) => {
                console.log(e.target.value.length)
                if (e.target.value.length > 14) {
                  const regex = /(\d{2})\.?(\d{3})\.?(\d{3})\/?(\d{4})\-?(\d{2})/gm
                  if (regex.test(e.target.value)) {
                    console.log(regex)
                    setErrorCpf(false);
                  }
                } else if (e.target.value.length === 14 || e.target.value.length === 11) {
                  const regex = /(\d{3})\.?(\d{3})\.?(\d{3})\-?(\d{2})/gm
                  // console.log(regex.test(e.target.value))
                  if (regex.test(e.target.value)) {
                    console.log(regex)
                    setErrorCpf(false);
                  }
                }
              }}
              onChange={cpfReal}
              value={cpf}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          )}
          {errorCpf ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Insira um CPF valido
            </h3>
          ) : (
            ""
          )}

          {!email && !errorEmail ? (
            <TextField
              required
              id="form-props-required"
              name="email"
              label="E-mail"
              default=""
              onChange={emailReal}
              value={email}
              sx={{ margin: "5px" }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              name="email"
              label="E-mail"
              default=""
              onChange={emailReal}
              value={email}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          )}
          {errorEmail ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Insira um E-mail valido
            </h3>
          ) : (
            ""
          )}

          {!phone && !errorPhone ? (
            <TextField
              required
              id="form-props-required"
              name="phone"
              label="Telefone"
              defaultValue=""
              onKeyUp={(e) => {
                const regex = /\(?(\(\d{2}\))\)?\ ?(\d)\ ?(\d{4})\-?(\d{4})/gm;
                if (regex.test(e.target.value)) {
                  setErrorPhone(false);
                }
              }}
              onChange={phoneReal}
              value={phone}
              sx={{ margin: "5px" }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              name="phone"
              label="Telefone"
              defaultValue=""
              onKeyUp={(e) => {
                const regex = /\(?(\(\d{2}\))\)?\ ?(\d)\ ?(\d{4})\-?(\d{4})/gm;
                if (regex.test(e.target.value)) {
                  setErrorPhone(false);
                }
              }}
              onChange={phoneReal}
              value={phone}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          )}
          {errorPhone ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Insira um Telefone valido
            </h3>
          ) : (
            ""
          )}

          {/* {!cep && !errorCep ? (
            <TextField
              required
              id="form-props-required"
              name="cep"
              label="Cep"
              defaultValue=""
              onChange={formatCEP}
              value={cep}
              sx={{ margin: "5px" }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              name="cep"
              label="Cep"
              defaultValue=""
              onChange={formatCEP}
              value={cep}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          )}
          {errorCep ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Insira um Cep valido
            </h3>
          ) : (
            ""
          )} */}

          {password && errorPasswordAny === false ? (
            <TextField
              required
              id="form-props-required"
              name="password"
              label="Senha"
              defaultValue=""
              onChange={passwordReal}
              value={password}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              name="password"
              label="Senha"
              defaultValue=""
              onChange={passwordReal}
              value={password}
              sx={{ margin: "5px" }}
            />
          )}

          {passwordConf && errorPasswordConf === false ? (
            <TextField
              required
              id="form-props-required"
              name="passwordConfirm"
              label="Confirmar Senha"
              defaultValue=""
              onChange={passwordRealConf}
              value={passwordConf}
              sx={{
                margin: "5px",
                "& .MuiOutlinedInput-root": {
                  "& > fieldset": {
                    borderColor: "#83E542",
                    borderWidth: "2px",
                  },
                },
              }}
            />
          ) : (
            <TextField
              required
              id="form-props-required"
              name="passwordConfirm"
              label="Confirmar Senha"
              defaultValue=""
              onChange={passwordRealConf}
              value={passwordConf}
              sx={{ margin: "5px" }}
            />
          )}

          {errorPasswordAny || errorPasswordConf ? (
            <h3 class="error-input">Requisitos para Senha:</h3>
          ) : (
            ""
          )}
          {errorPasswordConf === true &&
            (errorPasswordAny === true || passwordConf !== password) ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> As senhas devem ser iguais
            </h3>
          ) : errorPasswordConf === false && errorPasswordAny === true ? (
            <h3 class="nonError-input">
              <AiOutlineCheck size={9} /> As senhas são iguais
            </h3>
          ) : (
            ""
          )}
          {errorPasswordEsp === true &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Um Caractere Especial
            </h3>
          ) : errorPasswordEsp === false &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="nonError-input">
              <AiOutlineCheck size={9} /> Um Caractere Especial
            </h3>
          ) : (
            ""
          )}
          {errorPasswordLet === true &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Uma Letra Maiuscula
            </h3>
          ) : errorPasswordLet === false &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="nonError-input">
              <AiOutlineCheck size={9} /> Uma Letra Maiuscula
            </h3>
          ) : (
            ""
          )}
          {errorPasswordNum === true &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> Um Numero
            </h3>
          ) : errorPasswordNum === false &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="nonError-input">
              <AiOutlineCheck size={9} /> Um Numero
            </h3>
          ) : (
            ""
          )}
          {errorPassword9c === true &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="error-input">
              <AiOutlineClose size={9} /> 8 Caracteres
            </h3>
          ) : errorPassword9c === false &&
            (errorPasswordAny || errorPasswordConf === true) ? (
            <h3 class="nonError-input">
              <AiOutlineCheck size={9} /> 8 Caracteres
            </h3>
          ) : (
            ""
          )}
          <div class="div-checkbox1">
            <FormControlLabel
              control={
                <Switch
                  checked={errorCheck1}
                  onClick={() => {
                    setErrorCheck1(!errorCheck1);
                  }}
                />
              }
            />
            <p>
              Concordo com os <a href="#">Termos de Utilização</a>
            </p>
          </div>
          <div class="div-checkbox2">
            <FormControlLabel
              control={
                <Switch
                  checked={errorCheck2}
                  onClick={() => {
                    setErrorCheck2(!errorCheck2);
                  }}
                />
              }
            />
            <p>
              Concordo com a <a href="#">Politica de Privacidade</a>
            </p>
          </div>
          <div class="div-button-submit">
            {!FormCheking() ||
              errorPasswordAny ||
              errorName ||
              errorCpf ||
              errorEmail ||
              errorPhone ||
              errorCep ||
              !errorCheck1 ||
              !errorCheck2 ||
              errorPasswordConf ? (
              <Button
                variant="contained"
                disabled
                style={{ cursor: "pointer", width: "250px", height: "50px" }}
                color="primary"
              >
                {isLoading1 ? <CircularProgress></CircularProgress> : "CADASRTAR-SE"}
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => onSubmit(name, email, password, cpf, phone, cep)}
                style={{ cursor: "pointer", width: "250px", height: "50px" }}
                color="primary"
              >
                {isLoading1 ? <CircularProgress></CircularProgress> : "CADASRTAR-SE"}
              </Button>
            )}
            {errorPasswordAny ||
              errorName ||
              errorCpf ||
              errorEmail ||
              errorPhone ||
              errorPasswordConf ? (
              <h3 class="error-global">
                Formulário incompleto, revise e tente novamente...
              </h3>
            ) : (
              ""
            )}
            <Button
              variant="outlined"
              // onClick={onSubmit({ name: { name }, email: { email }, password: { password }, document: { document }, phone: { phone }, cep: { cep } })}
              style={{ cursor: "pointer", width: "250px", height: "35px" }}
              color="primary"
            >
              {isLoading2 ? <CircularProgress></CircularProgress> : "ESCOLHER ESTE AGORA"}
            </Button>
          </div>
        </div>
        <StepsShow step={3}></StepsShow>
      </div>
    </>
  );
};

Register.guestGuard = true;
Register.authGuard = true;
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Register;

