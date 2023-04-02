import React, { useState } from 'react';
import Link from 'next/link';
import { IconName } from "react-icons/ai";
import BlankLayout from 'src/@core/layouts/BlankLayout';

const packageOne = { title: "Standart 12 meses", products: ["Arte Logo", "Site Multipage", "Social Media 3x Semanal"], price: "R$ 299,00" };
const packageTwo = { title: "Standart 12 meses", products: ["Arte Logo", "Site Multipage", "Social Media 3x Semanal"], price: "R$ 299,00" };
const packageTree = { title: "Professional 12 meses", products: ["Arte Logo", "Branding", "Site Multipage", "Social Media 3x Semanal", "Blog Semanal", "Arte Logo e Site Multipage e texto longo para teste", "Arte Logo", "Site Multipage"], price: "R$ 399,00" };


const Packages = () => {

    return (
        <div class="full-page-start">
            <div class="full-content-slider">
                <PackItens></PackItens>
                <div class="custom-button"><Link href={`http://localhost:3000/start/custom/`}>Pacote Personalizado +</Link></div>

            </div>
        </div>
    )
}

export default Packages

const PackItens = () => {

    return (
        <>
            <div class="card-box">
                <div class="package-card">
                    <div class="package-title">{"Pacote " + packageOne.title}</div>
                    <div class="package-midle">
                        <div class="package-icon"></div>
                        <div class="package-price">{packageOne.price}<span class="text-small"> /mês</span></div>
                    </div>
                    <div class="package-products">{packageOne.products.sort().map((e) => (
                        <div class="tag-product">{e}</div>
                    ))}</div>
                </div>
                <div class="package-card">
                    <div class="package-title">{"Pacote " + packageTwo.title}</div>
                    <div class="package-midle">
                        <div class="package-icon"></div>
                        <div class="package-price">{packageTwo.price}<span class="text-small"> /mês</span></div>
                    </div>
                    <div class="package-products">{packageTwo.products.sort().map((e) => (
                        <div class="tag-product">{e}</div>
                    ))}</div>
                </div>
                <div class="package-card">
                    <div class="package-title">{"Pacote " + packageTree.title}</div>
                    <div class="package-midle">
                        <div class="package-icon"></div>
                        <div class="package-price">{packageTree.price}<span class="text-small"> /mês</span></div>
                    </div>
                    <div class="package-products">{packageTree.products.sort(function (a, b) {
                        if (a.length > b.length) {
                            return 1
                        } else {
                            return -1
                        }                        
                    }).map((e) => (
                        <div class="tag-product">{e}</div>
                    ))}</div>
                </div>
            </div>
        </>
    )

}
Packages.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
