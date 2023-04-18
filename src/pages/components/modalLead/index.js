import React, { useState } from 'react';
import { TextField, Button } from '@mui/material'


const ModalLead = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [inputPhone, setInputPhone] = useState();
  const [email, setEmail] = useState();
  const [inputEmail, setInputEmail] = useState();
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const nameReal = (e) => {
    setErrorName(true);
    setName(e.target.value.replace(/\d/g, "").replace(/(\D{1})(\D*)/, "$1$2"));
    if ((e.target.value.replace(/\d/g, "").length) >= 4){
      setErrorName(false);
    }
  }
  const emailReal = (e) => {
  const regex = /(\D*)(@)(\D*)(.com)(\D*)/gm; 
  let m;
  setErrorEmail(true);
  while ((m = regex.exec(e.target.value)) !== null) {    
      if (m.index === regex.lastIndex) {      
        regex.lastIndex++;
       }    
      m.forEach(() => {
         setErrorEmail(false);
      });
   }    
  setEmail(e.target.value);
  setInputEmail(e.target.value.replace(/(\D*)(@)(\D*)(.com)(\D*)/, "$1$2$3$4"));
  }
  const phoneReal = (e) => {
    setPhone(e.target.value.replace(/\D/g, ""));
    setInputPhone(e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/,"($1) $2").replace(/(\(\d{2}\)) (\d)(\d{4})(\d{4})/, "$1 $2 $3-$4"));
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
          <TextField required label='E-mail' defaultValue='' name="email" alt="input phone" onChange={emailReal} value={inputEmail} sx={{
            margin: "10px"
          }}></TextField>
          {errorEmail ? <h3 class="error-input">Insira um Email valido...</h3> : ""}
          <TextField label='Telefone' defaultValue='' name="phone" alt="input phone" onChange={phoneReal} value={inputPhone} sx={{
            margin: "10px"
          }}></TextField>
          <Button variant='contained' onClick={() => {setModalOpen(false)}} style={{ cursor: "pointer", margin:"20px"}} color='primary'>VER PROMOÇÕES</Button>
        </div>
      </div>
    )
  }
}

  export default ModalLead
