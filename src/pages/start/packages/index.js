import React, { useEffect, useState } from "react";
import Link from "next/link";
import BlankLayout from "src/@core/layouts/BlankLayout";
import StepsShow from "../../../@core/pages/components/stepsShow";
import ModalLead from "../../../@core/pages/components/modalLead";
import { useRouter } from "next/router";
import nookies from "nookies";
import { Button } from "@mui/material";
import { AiOutlineCheck } from "react-icons/ai";
import { check } from "prettier";
import { PackagesRepo } from "src/repository/packages.repo";
import toast from "react-hot-toast";

export async function getServerSideProps(ctx) {
  let tokenLead;
  let packageChose;
  let packages;
  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch (error) {
    tokenLead = null
  }

  try {
    packageChose = JSON.parse(nookies.get(ctx).packageChose);
  } catch (error) {
    packageChose = {
      sliderValue: 39990,
      questionOne: true,
      questionTwo: true,
      questionTree: true
    };
  }

  try {
    packages = (await PackagesRepo.getPackagesBySearch({ packageChose }));

  } catch {
    packages = null
  }

  return {
    props: {
      tokenLead: tokenLead,
      packageChose: packageChose,
      packages: packages,
    },
  };
}

// const xx = async ({ packageChose }) => {

//   let data;
//   console.log(packageChose)
//   try {
//     console.log("try", data)
//     packages = (await PackagesRepo.getPackagesBySearch(
//       {
//         "value": 500,
//         "haveLogo": {
//           "isSelected": false,
//           "needModification": false
//         },
//         "haveSite": {
//           "isSelected": false,
//           "needModification": false
//         },
//         "haveSocialMidia": {
//           "isSelected": false,
//           "needModification": false
//         }
//       }
//     ));
//   } catch (error) { console.log("catch", data, error), data = "NUUUMDEU" }

//   return data;
// }

// const f = [
//   {
//     id: 1,
//     title: "Básico Brand",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Branding- Criação e estruturação do branding de marca, mockups e estratégias",
//       "Redes Sociais 1/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "6 Meses- Contrato",
//     ],
//     price: "R$ 199",
//     recurrence: "Contrato de 6 meses",
//   },
//   {
//     id: 2,
//     title: "Site e Redes Soc",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Site Multipage 3P- WebSite com 3 paginas, Estratégia, Criação, hospedagem e dominio inclusos",
//       "R Sociais 1/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "6 Meses- Contrato",
//     ],
//     price: "R$ 299",
//     recurrence: "Contrato de 6 meses",
//   },
//   {
//     id: 3,
//     title: "PRO Site e Redes",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Site Multipage 3P- WebSite com 3 paginas, Estratégia, Criação, hospedagem e dominio inclusos",
//       "SM 3/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "6 Meses- Contrato",
//     ],
//     price: "R$ 399",
//     recurrence: "Contrato de 6 meses",
//   },
//   {
//     id: 4,
//     title: "Básico Site + Blog",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Site Multipage 4P- WebSite com 4 paginas, Blog, Estratégia, Criação, hospedagem e dominio inclusos",
//       "Redes Sociais 3/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "Blog- Criação de Conteúdo para postagem em Blog e LinkedIn, 2x por mês.",
//       "12 Meses- Contrato",
//     ],
//     price: "R$ 499",
//     recurrence: "Contrato de 12 meses",
//   },
//   {
//     id: 5,
//     title: "Premium",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Branding- Criação e estruturação do branding de marca, mockups e estratégias",
//       "Site Multipage 5P- WebSite com 5 paginas, Blog, Estratégia, Criação, hospedagem e dominio inclusos",
//       "Redes Sociais 3/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "Blog- Criação de Conteúdo para postagem em Blog e LinkedIn, 4x por mês.",
//       "12 Meses- Contrato",
//     ],
//     price: "R$ 699",
//     recurrence: "Contrato de 12 meses",
//   },
//   {
//     id: 6,
//     title: "Premium",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Branding- Criação e estruturação do branding de marca, mockups e estratégias",
//       "Site Multipage 5P- WebSite com 5 paginas, Blog, Estratégia, Criação, hospedagem e dominio inclusos",
//       "Redes Sociais 4/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "Blog- Criação de Conteúdo para postagem em Blog e LinkedIn, 4x por mês.",
//       "ADS- Gerenciamento de tráfego pagoe  impusionamento de vendas",
//       "12 Meses- Contrato",
//     ],
//     price: "R$ 1299",
//     recurrence: "Contrato de 12 meses",
//   },
//   {
//     id: 7,
//     title: "Premium",
//     products: [
//       "Logo- Criação de uma Logo para a marca",
//       "Branding- Criação e estruturação do branding de marca, mockups e estratégias",
//       "Site Multipage 5P- WebSite com 5 paginas, Blog, Estratégia, Criação, hospedagem e dominio inclusos",
//       "Redes Sociais 4/sem- Aqui vai uma descrição sobre o serviço Redes Sociais 3x",
//       "Blog- Criação de Conteúdo para postagem em Blog e LinkedIn, 4x por mês.",
//       "ADS- Gerenciamento de tráfego pagoe  impusionamento de vendas",
//       "12 Meses- Contrato",
//     ],
//     price: "R$ 1299",
//     recurrence: "Contrato de 12 meses",
//   },
// ];




const Packages = ({ tokenLead, packages, packageChose }) => {
  const router = useRouter();
  const [modalPackage, setModalPackage] = useState(false);
  const [descriptiion, setDescriptiion] = useState({});
  const [checked, setChecked] = useState({});
  const [packageSelected, setPackageSelected] = useState(null);

  const ModalPackage = (e) => {
    useEffect(() => {
      descriptiion;
    }, [descriptiion]);

    if (modalPackage === true) {
      return (
        <div class="full-page-modal">
          <div class="modal-lead-confirm">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{ cursor: "pointer" }}
                onClick={(y) => {
                  setModalPackage(false);
                }}
              >
                <button style={{ fontSize: "16px", borderRadius: "30px" }}>
                  x
                </button>
              </div>
            </div>
            <div>
              <h1>{descriptiion.name}</h1>
              <h2>
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  apenas{" "}R$
                </span>
                {descriptiion.price}
                <span style={{ fontSize: "14px", fontWeight: "400" }}>
                  {" "}
                  por mês
                </span>
              </h2>
              <div style={{ maxHeight: "40vh", overflow: "auto" }}>
                {descriptiion.PackagesServices.sort().map((e) => (
                  <p class="list-product">{e.Service.ServiceType.name}</p>
                ))}
              </div>
            </div>

            <div class="card-box-button">
              <Button
                variant="contained"
                onClick={() => {
                  setModalPackage(false);
                  setChecked(descriptiion);
                  setPackageSelected(descriptiion);
                  console.log(packageSelected);
                }}
                style={{ cursor: "pointer", margin: "20px" }}
                color="primary"
              >
                ESCOLHER ESTE
              </Button>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <ModalPackage></ModalPackage>
      {/* {tokenLead ? null : <ModalLead></ModalLead>} */}
      <div class="full-page-start">
        {/* <div class="full-content-slider" > */}
        <h1 style={{ fontSize: "22px", color: "#FFFFFF" }}>
          Planos sugeridos para você:
        </h1>
        <div class="packages-container">
          {packages.sort().map((e, y) => (
            <PackItens
              key={y}
              cardClass={
                packages.length <= 3
                  ? "cardClass100"
                  : packages.length % 2 !== 0 && y == packages.length - 1
                    ? "cardClassLast"
                    : "cardClass50"
              }
              data={e}
              style={
                e.id == checked.id
                  ? { borderColor: "#22FF00", borderWidth: 3 }
                  : { borderColor: "#FFFFFF" }
              }
              icon={e.id == checked.id ? true : false}
              modal={() => {
                setModalPackage(true);
              }}
              handleChange={setDescriptiion}
            ></PackItens>
          ))}
        </div>
        <Button
          variant="contained"
          onClick={() => {
            if (packageSelected == null) {
              toast.error("Você precisa escolher um Produto!");
            } else {
              toast.success("Preparando seu Pedido...");
              router.push("/start/register/")
            }

          }}
          style={{
            cursor: "pointer",
            marginTop: "20px",
            width: "250px",
            height: "50px",
          }}
          color="secondary"
        >
          ESCOLHER ESTE AGORA
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.push("/start/custom")}
          style={{
            cursor: "pointer",
            margin: "20px",
            width: "250px",
            height: "35px",
          }}
          color="blackOrWhite"
        >
          VER OUTROS PRODUTOS
        </Button>
        <StepsShow step={2}></StepsShow>
      </div>
    </>
  );
};

export default Packages;

const PackItens = (props) => {
  return (
    <div class={props.cardClass}>
      {props.icon ? (
        <div class="checked-icon-div">
          <AiOutlineCheck size={40} color="#22FF00" />
        </div>
      ) : null}
      <div
        class="package-card"
        onClick={() => {
          props.handleChange(props.data);
          props.modal();
        }}
        style={props.style}
      >
        <div class="package-title">{props.data.name}</div>
        <div class="package-midle">
          <div class="package-price">
            {props.data.price}
            <span class="text-small"> /mês</span>
          </div>
        </div>
        <div class="package-products">
          {props.data.PackagesServices.map((e, y) => (
            <div class="tag-product" key={y}>
              {/* {e.Service.ServiceType.name.substring(0, e.Service.ServiceType.name.indexOf("-"))} */}
              {e.Service.ServiceType.name}
            </div>
          ))}
        </div>
        <div class="package-footer">CLIQUE PARA VER</div>
      </div>
    </div>
  );
};

Packages.guestGuard = true;
Packages.authGuard = true;

Packages.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
