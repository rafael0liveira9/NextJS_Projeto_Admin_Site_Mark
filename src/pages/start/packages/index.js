import React, { useState } from 'react';
import Link from 'next/link';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import StepsShow from '../../components/stepsShow';
import ModalLead from '../../components/modalLead';
import { useRouter } from "next/router";

const packageOne = {
    title: "Básico",
    products: [
        "Logo- Criação de uma Logo para a marca",
        "Site Multipage 3P- WebSite com 3 paginas, hospedagem e dominio inclusos",
        "Redes Sociais 1/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x"
    ],
    price: "R$ 299"
};
const packageTwo = {
    title: "PRO",
    products: [
        "Logo- Criação de uma Logo para a marca",
        "Site Multipage 3P- WebSite com 3 paginas, hospedagem e dominio inclusos",
        "R Sociais 3/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x"
    ],
    price: "R$ 299"
};
const packageTree = {
    title: "Premium",
    products: [
        "Logo- Criação de uma Logo para a marca",
        "Site Multipage 5P- WebSite com 3 paginas, hospedagem e dominio inclusos",
        "SM 3/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
        "ADS- Trafego pago",
    ],
    price: "R$ 399"
};

const Packages = () => {
    const router = useRouter();
    const [modalPackage, setModalPackage] = useState(false);
    const [tokenLead, setTokenLead] = useState("")
    const ModalPackage = () => {
        if (modalPackage === true) {
            return (
                <div class="full-page-modal">
                    <div class="modal-lead-confirm">
                        <div style={{ width: "100%", display: "flex", justifyContent: "flex-end"}}>
                            <div style={{ cursor:"pointer"}} onClick={() => {setModalPackage(false)}}><button style={{fontSize:"16px", borderRadius: "30px"}}>x</button></div>
                        </div>
                        <div>
                            <h1>{packageOne.title}</h1>
                            <h2><span style={{ fontSize: "14px", fontWeight: "400" }}>apenas </span>{packageOne.price}<span style={{ fontSize: "14px", fontWeight: "400" }}> por mês</span></h2>
                            <p>{packageOne.products.sort().map((e) => (
                                <div class="list-product">{e}</div>
                            ))}</p>
                        </div>
                        {/* onClick={() => router.push("/start/register")} */}
                        <div class="card-box-button" onClick={() => {setModalPackage(false)}} ><button style={{ cursor:"pointer"}} class="custom-button">SELECIONAR ESTE</button></div>
                    </div>
                </div>
            )
        };

    };
    return (
        <>
            <ModalPackage></ModalPackage>            
            {(tokenLead) ? null : <ModalLead></ModalLead>}
            <div class="full-page-start">
                {/* <div class="full-content-slider" > */}
                <h1 style={{ fontSize: "22px", color: "#FFFFFF" }}>Pacotes sugeridos para você:</h1>
                <div class="packages-container">
                    <PackItens title={packageOne.title} products={packageOne.products} price={packageOne.price} modal={() => setModalPackage(true)}></PackItens>
                    <PackItens title={packageOne.title} products={packageOne.products} price={packageOne.price} modal={() => setModalPackage(true)}></PackItens>
                    <PackItens title={packageTwo.title} products={packageTwo.products} price={packageTwo.price} modal={() => setModalPackage(true)}></PackItens>
                    <PackItens title={packageTree.title} products={packageTree.products} price={packageTree.price} modal={() => setModalPackage(true)}></PackItens>
                    <PackItens title={packageOne.title} products={packageOne.products} price={packageOne.price} modal={() => setModalPackage(true)}></PackItens>
                    <PackItens title={packageOne.title} products={packageOne.products} price={packageOne.price} modal={() => setModalPackage(true)}></PackItens>
                </div>
                <div class="card-box-button" onClick={() => router.push("/start/register")}><button class="custom-button">AVANÇAR</button></div>
                <div class="card-box-button" onClick={() => router.push("/start/custom")}><button class="custom-button">PACOTE PERSOLNALIZADO</button></div>

                {/* </div> */}
                <StepsShow step={2}></StepsShow>
            </div>
            <ModalPackage></ModalPackage>
        </>
    )



}

export default Packages

const PackItens = (props) => {

    return (
        <div class="card-box">
            <div class="package-card" onClick={props.modal}>
                <div class="package-title">{props.title}</div>
                <div class="package-midle">
                    <div class="package-price">{props.price}<span class="text-small"> /mês</span></div>
                </div>
                <div class="package-products">{props.products.sort().map((e, y) => (
                    <div class="tag-product" key={y}>{e.substring(0, e.indexOf("-"))}</div>
                ))}</div>
            </div>
        </div>

    )

}
Packages.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
