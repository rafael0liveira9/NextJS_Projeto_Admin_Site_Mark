import React, { useState } from 'react';
import Link from 'next/link';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import StepsShow from '../../components/stepsShow';
import ModalLead from '../../components/modalLead';

const packageOne = { title: "Standart 12 meses", products: ["Arte Logo", "Site Multipage", "Social Media 3x Semanal"], price: "R$ 299,00" };
const packageTwo = { title: "Standart 12 meses", products: ["Arte Logo", "Site Multipage", "Social Media 3x Semanal"], price: "R$ 299,00" };
const packageTree = { title: "Professional 12 meses", products: ["Arte Logo", "Branding", "Site Multipage", "Social Media 3x Semanal", "Blog Semanal", "Arte Logo e Site Multipage e texto longo", "Arte Logo", "Site Multipage"], price: "R$ 399,00" };

const Packages = () => {
        return (
            <div class="full-page-start">
                <ModalLead></ModalLead>
                <div class="full-content-slider">
                <h1>Pacotes sugeridos para você:</h1>
                    <PackItens title={packageOne.title} products={packageOne.products} price={packageOne.price}></PackItens>
                    <PackItens title={packageTwo.title} products={packageTwo.products} price={packageTwo.price}></PackItens>
                    <PackItens title={packageTree.title} products={packageTree.products} price={packageTree.price}></PackItens>
                    <div class="card-box"><button class="custom-button">Pacote Personalizado</button></div>
    
                </div>
                <StepsShow step={2}></StepsShow>
            </div>
        )
    


}

export default Packages

const PackItens = (props) => {

    return (
        <>
            <div class="card-box">
                <div class="package-card">
                    <div class="package-title">{"Pacote " + props.title}</div>
                    <div class="package-midle">
                        <div class="package-icon"></div>
                        <div class="package-price">{props.price}<span class="text-small"> /mês</span></div>
                    </div>
                    <div class="package-products">{props.products.sort().map((e) => (
                        <div class="tag-product">{e}</div>
                    ))}</div>
                </div>
            </div>
        </>
    )

}
Packages.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
