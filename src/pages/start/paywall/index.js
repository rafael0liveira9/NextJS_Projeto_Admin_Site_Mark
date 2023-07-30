import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import PaywallComponent from "../../../@core/pages/components/paywallComponent";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Button, CircularProgress } from "@mui/material";
import toast from "react-hot-toast";
import Icon from "src/@core/components/icon";
import Typography from "@mui/material/Typography";
import { PackagesHooks } from "src/hooks/PackagesHooks";
import { PaymentsRepo } from "src/repository/payments.repo";

export async function getServerSideProps(ctx) {
  let tokenLead;
  let jwt;
  let clientChoice;
  let newUserToken;
  let newCompanyToken;

  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch {
    tokenLead = null;
  }

  try {
    jwt = JSON.parse(nookies.get(ctx).jwt);
  } catch {
    jwt = null;
  }

  try {
    newUserToken = JSON.parse(nookies.get(ctx).newUserToken);
  } catch {
    newUserToken = null;
  }

  try {
    newCompanyToken = JSON.parse(nookies.get(ctx).newCompanyToken);
  } catch {
    newCompanyToken = null;
  }

  try {
    clientChoice = JSON.parse(nookies.get(ctx).clientChoice);
  } catch {
    clientChoice = null;
  }




  // try {
  //   getNewUser = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}user`, {
  //     headers: {
  //       Authorization: jwt,
  //     },
  //   })
  // } catch {
  //   getNewUser = null;
  //   console.log("catch getNewuser")
  // }




  return {
    props: {
      tokenLead: tokenLead,
      jwt: jwt,
      clientChoice: clientChoice,
      newUserToken: newUserToken,
      newCompanyToken: newCompanyToken
    },
  };
}



const Paywall = ({ tokenLead, jwt, newUserToken, clientChoice, newCompanyToken }) => {
  const router = useRouter();
  const contextPackage = PackagesHooks();

  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {

    if (!isLoading) {
      setIsLoading(true);

      let finalData = contextPackage.finalClientData;

      if (finalData.packageType === "package") {
        try {
          const myPromise = await PaymentsRepo.buyNewPackage(
            {
              "package": finalData.packageId,
              "companieId": finalData.company,
              "contratedServiceId": 1,
              "paymentMethod": {
                "creditCard": {
                  "holderName": "Rafael Teste",
                  "number": "5162306219378829",
                  "expiryMonth": "05",
                  "expiryYear": "2024",
                  "ccv": "318"
                }
              }
            },
            jwt
          )
          toast.success(`Plano ${finalData.packageName} contratado com sucesso`);
          console.log(myPromise)
          return myPromise;

        } catch (error) {
          toast.error(`Erro ao contratar plano`)
          console.log(error)
        }
      } else if (finalData.packageType === "custom") {
        try {
          const myPromise = await PaymentsRepo.buyNewPackage(
            {
              "services": [
                finalData.services.map((e) => (e.id))
              ],
              "companieId": finalData.company,
              "contratedServiceId": 1,
              "paymentMethod": {
                "creditCard": {
                  "holderName": "Rafael Teste",
                  "number": "5162306219378829",
                  "expiryMonth": "05",
                  "expiryYear": "2024",
                  "ccv": "318"
                }
              }
            },
            jwt
          )
          toast.success(`Plano ${finalData.packageName} contratado com sucesso`);
          console.log(myPromise)
          return myPromise;

        } catch (error) {
          toast.error(`Erro ao contratar plano`)
          console.log(error)
        }
      } else {
        try {
          const myPromise = await PaymentsRepo.buyNewPackage(
            {
              "service": finalData.services[0].id,
              "contratedServiceId": 1,
              "installments": finalData.maxInstallments,
              "paymentMethod": {
                "creditCard": {
                  "holderName": "Rafael Teste",
                  "number": "5162306219378829",
                  "expiryMonth": "05",
                  "expiryYear": "2024",
                  "ccv": "318"
                }
              }
            },
            jwt
          )
          toast.success(`Serviço ${finalData.packageName} contratado com sucesso`);
          console.log(myPromise)
          return myPromise;

        } catch (error) {
          toast.error(`Erro ao contratar Serviço`)
          console.log(error)
        }
      }
    }
    setIsLoading(false);
  }



  return (
    <>
      <div class="full-page-start">
        <div class="section-paywall">
          <div>
            <PaywallComponent ctx={contextPackage} userToken={newUserToken} companyToken={newCompanyToken} clientToken={clientChoice} />
          </div>
          <Button
            onClick={handleClick}
            variant="contained"
            style={{
              cursor: "pointer",
              marginTop: "20px",
              width: "250px",
              height: "50px",
            }}
            color="secondary"
          >
            {isLoading ? <CircularProgress></CircularProgress> : "CONCLUIR PAGAMENTO"}
          </Button>
        </div>
        <StepsShow step={4}></StepsShow>
      </div>
    </>
  );
};

Paywall.anonUser = true;
Paywall.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Paywall;

