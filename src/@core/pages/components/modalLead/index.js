import React, { useState } from 'react';
import { TextField, Button } from '@mui/material'
import nookies from "nookies";
import { stringify } from 'stylis';
import { LeadsRepo } from "src/repository/leads.repo";



const ModalLead = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [errorSubmit, setErrorSubmit] = useState(false);
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPhone, setErrorPhone] = useState(false);

  const submitLead = async () => {
    try {
      let data = {
        "name": name,
        "email": email,
        "phone": phone
      }
      console.log(data)
      createLead = (await LeadsRepo.sendLeads(data));
      nookies.set(null, "tokenLead", JSON.stringify({ name, email, phone }), {
        maxAge: 28800,
        path: "/",
      });
      setModalOpen(false)
    } catch (error) {
      setErrorSubmit(true)
    }
  }

  const nameReal = (e) => {
    { if (e.target.value.length > 0) { setErrorName(true); } else { setErrorName(false) } }
    setName(e.target.value.replace(/\d/g, "").replace(/(\D{1})(\D*)/, "$1$2"));
    if ((e.target.value.replace(/\d/g, "").length) >= 4) {
      setErrorName(false);
    }
  }


  const emailReal = (e) => {
    const regex = /^[a-z0-9.]+@[a-z0-9]{2,}\.[a-z]{2,}(\.[a-z]{2,})?$/;

    { if (e.target.value.length > 0) { setErrorEmail(!regex.test(e.target.value)) } else { setErrorEmail(false) }; }

    setEmail(e.target.value);
  }

  const phoneReal = (e) => {
    const regex = /(\(\d{2}\)) (\d)(\d{4})(\d{4})/gm;
    let m;
    { if (e.target.value.length > 0) { setErrorPhone(true) } else { setErrorPhone(false) }; }
    while ((m = regex.exec(e.target.value)) !== null) {
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      m.forEach(() => {
        setErrorPhone(false);
      });

    }
    if (e.target.value.length < 16) { setPhone(e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2").replace(/(\(\d{2}\)) (\d)(\d{4})(\d{4})/, "$1 $2 $3-$4")) }
  }

  if (modalOpen === true) {
    return (
      <div class="full-page-modal">
        <div class="modal-lead">
          <div class="label-lead">
            <h1>Deixe seu contato</h1>
          </div>
          <TextField required label='Nome' defaultValue='' name="name" alt="input name" onChange={nameReal} value={name} sx={{
            margin: "10px"
          }}></TextField>
          {errorName ? <h3 class="error-input">Insira um Nome valido...</h3> : ""}
          <TextField required label='E-mail' defaultValue='' name="email" alt="input phone" onChange={emailReal} value={email} sx={{
            margin: "10px"
          }}></TextField>
          {errorEmail ? <h3 class="error-input">Insira um Email valido...</h3> : ""}
          <TextField label='Telefone' defaultValue='' name="phone" alt="input phone" onChange={phoneReal} value={phone} sx={{
            margin: "10px"
          }}></TextField>
          <Button variant='contained' onClick={() => { submitLead() }} style={{ cursor: "pointer", margin: "20px", width: "200px", height: "50px" }} color='primary'>VER PROMOÇÕES
          </Button>
          {errorSubmit ? <h3 class="error-input">Erro ao cadastrar dados, tente novamente...</h3> : ""}
        </div>
      </div>
    )
  }
}


export default ModalLead
