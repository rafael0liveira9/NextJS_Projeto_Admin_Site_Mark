import React, { useState } from 'react';
import StepsShow from '../../components/stepsShow';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { useRouter } from "next/router";
import { regex } from 'src/utils/regex';
import { match } from 'stylis';
import { TextField } from '@mui/material'


const Register = () => {
    const router = useRouter();
    const [error, setError] = useState({
        cpfError: false,
        emailError: false,
        phoneError: false,  
    });
    const [dataForm, setDataForm] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        companyName: ''
    });
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    const onChangeInput = e => {
        setCompany(e.target.value );
    }
    const cpfReal = (e) => {
        let inputCpf = e.target.value;
        setCpf(e.target.value.replace(/\D/g, "").replace(/(\d{3})(\d{3})(\d{3})(\d{2})/,"$1.$2.$3-$4"));
    }
    const phoneReal = (e) => {
        let inputPhone = e.target.value;
        setPhone(e.target.value.replace(/\D/g, "").replace(/(\d{2})(\d)/,"($1) $2").replace(/(\(\d{2}\)) (\d)(\d{4})(\d{4})/, "$1 $2 $3-$4"));
    }
    const emailReal = (e) => {
        let inputEmail = e.target.value;
        setEmail(e.target.value.replace(/(\D*)(@)(\D*)(.com)(\D*)/, "$1$2$3$4"));
        if(inputEmail.length !==0 || inputEmail === email){console.log(inputEmail, email, "Ok")} else {console.log("inputEmail, email, não OK")}
    }
    return (
        <>
            <div class="full-page-modal">
                <div class="register-lead">
                    <img src="/images/favicon.png" width={100}></img>
                    <h3>Preencha</h3>
                    <TextField required id='form-props-required' name="name" label='Nome' defaultValue='' onChange={(e) => setName(e.target.value)} value={name}/>
                    <TextField required id='form-props-required' name="document" label='CPF/CNPJ' defaultValue='' onChange={cpfReal} value={cpf}/>
                    {error.cpfError ? <h3 class="error-input">Insira um CPF valido...</h3> : ""}
                    <input class="input-lead" name="email" type="name" alt="input email" placeholder="E-mail..." onChange={emailReal} value={email}></input>
                    {error.emailError ? <h3 class="error-input">Insira um E-mail valido...</h3> : ""}
                    <input class="input-lead" name="phone" type="tel" alt="input phone" placeholder="Telefone..." onChange={phoneReal} value={phone}></input>
                    {error.phoneError ? <h3 class="error-input">Insira um Telefone valido...</h3> : ""}
                    <input class="input-lead" name="companyName" type="text" alt="input companyName" placeholder="Nome da Empresa..." onChange={company} value={dataForm.companyName}></input>
                    <div class="div-checkbox" ><input style={{ cursor:"pointer"}} class="button-checkbox" type="checkbox"></input><p>Li e Concordo com os termos e Politica de Privacidade.</p></div>
                    <div class="div-button-submit">
                        <button onClick={() => router.push("/start/paywall")} style={{ cursor:"pointer"}} class="button-submit-register" type="submit">CADASTRAR-SE</button>
                        <button onClick={() => router.push("/login/")} style={{ cursor:"pointer"}} class="button-submit-user" type="submit">LOGIN</button>
                        {error.cpfError || error.emailError || error.phoneError ? <h3 class="error-global">Algum dos dados digitados está incorreto, revise e tente novamente...</h3> : ""}
                    </div>
                </div>
                <StepsShow step={3}></StepsShow>
            </div>

        </>
    )
    console.log(dataForm);

}

export default Register
Register.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
