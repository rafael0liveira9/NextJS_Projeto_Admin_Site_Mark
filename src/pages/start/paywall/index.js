import React, { useState } from "react";
import Box from "@mui/material/Box";
import PaywallComponent from "../../../@core/pages/components/paywallComponent";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import Icon from "src/@core/components/icon";
import Typography from "@mui/material/Typography";
export async function getServerSideProps(ctx) {
  let tokenLead;
  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch {
    tokenLead = null;
  }
  return {
    props: {
      tokenLead: tokenLead,
    },
  };
}

const Paywall = (props) => {
  const router = useRouter();

  const handleClick = () => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.5) {
          resolve("foo");
        } else {
          reject("fox");
        }
      }, 1000);
    });

    return toast.promise(myPromise, {
      loading: "Carregando",
      success: "Obrigado pela compra!",
      error: "Erro ao concluir solicitação.",
    });
  };

  return (
    <>
      <div class="full-page-start">
        <div class="section-paywall">
          <div>
            <PaywallComponent />
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
            CONCLUIR PAGAMENTO
          </Button>
        </div>
        <StepsShow step={4}></StepsShow>
      </div>
    </>
  );
};

export default Paywall;
Paywall.guestGuard = false;
Paywall.authGuard = false;
Paywall.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
