import React, { useState } from 'react';
import data from 'src/@fake-db/components/data';


const ModalLead = () => {
  const [modalOpen, setModalOpen] = useState(true);
  const [dataForm, setDataForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const onChangeInput = e => setDataForm({...dataForm, [e.target.name]:e.target.value});

  if (modalOpen === true) {
    return (
      <div class="full-page-modal">
        {/* <button class="button-close" type="submit" onClick={() => { setModalOpen(false) }}>X</button> */}
        <div class="modal-lead">
          <img src="/images/favicon.png" width={200}></img>
          <div class="label-lead">
          <h1>Seja Bem Vindo(a)</h1>
          <p>Deixe o seu contato para nós.</p>
          </div>
          <input class="input-lead" name="name" type="text" alt="input name" placeholder="Digite seu Nome..." onChange={onChangeInput} value={dataForm.name}></input>
          <input class="input-lead" name="email" type="name" alt="input email" placeholder="Digite seu E-mail..." onChange={onChangeInput} value={dataForm.email}></input>
          <input class="input-lead" name="phone" type="number" alt="input phone" placeholder="Digite seu Telefone..." onChange={onChangeInput} value={dataForm.phone}></input>
          <button class="button-submit" type="submit" onClick={() => { setModalOpen(false) }}>VER PLANOS</button>
        </div>
      </div>
    )
    console.log(dataForm);
  }
}

  export default ModalLead
