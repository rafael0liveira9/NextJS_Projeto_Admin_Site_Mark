import React, { useState } from "react";
import PaywallComponent from "../../../@core/pages/components/customComponent";
import StepsShow from "../../../@core/pages/components/stepsShow";
import BlankLayout from "src/@core/layouts/BlankLayout";
import { useRouter } from "next/router";
import nookies from "nookies";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Button } from "@mui/material";
import { ServicesRepo } from "src/repository/services.repo";

export async function getServerSideProps(ctx) {
  let tokenLead;
  let servicesList = [];

  try {
    tokenLead = JSON.parse(nookies.get(ctx).tokenLead);
  } catch {
    tokenLead = null;
  }

  try {
    servicesList = await ServicesRepo.getAllServices();

  } catch {
    servicesList = [{
      numdeu: "um"
    }];
  }

  return {
    props: {
      tokenLead: tokenLead,
      servicesList: servicesList
    },
  };
}

const Custom = ({ servicesList }) => {
  const router = useRouter();

  return (
    <>
      <div class="full-page-start">
        <div class="section-paywall">
          <div>
            <PaywallComponent servicesList={servicesList} />
          </div>
          <Button
            variant="contained"
            style={{
              cursor: "pointer",
              marginTop: "20px",
              width: "250px",
              height: "50px",
            }}
            color="secondary"
            onClick={() => router.push("/start/paywall/")}
          >
            IR PARA PAGAMENTO
          </Button>
        </div>
        <StepsShow step={4}></StepsShow>
      </div>
    </>
  );
};



Custom.anonUser = true;
Custom.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export default Custom;