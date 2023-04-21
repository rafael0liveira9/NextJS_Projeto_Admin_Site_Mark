import React, { useState } from 'react';
import PaywallComponent from '../../components/paywallComponent'
import StepsShow from '../../components/stepsShow';
import BlankLayout from 'src/@core/layouts/BlankLayout';
import { useRouter } from "next/router";
import nookies from 'nookies';
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { Button } from '@mui/material'
export async function getServerSideProps(ctx) {
  let tokenLead;
  try{
  tokenLead = JSON.parse(nookies.get(ctx).tokenLead)
  } catch {tokenLead = null}
  return {
      props: {
          tokenLead: tokenLead
      }
  }
}

const Paywall = (props) => {
  const router = useRouter();

    
  return (
    <>
      <div class="full-page-start">        
        <div class="section-paywall">
          <div><PaywallComponent /></div>         
          <Button variant='contained' style={{ cursor: "pointer", marginTop: "20px", width:"250px", height:"50px"}} color='secondary'>CONCLUIR PAGAMENTO</Button>
        </div>
        <StepsShow step={4}></StepsShow>
      </div>

    </>
  )

}

export default Paywall
Paywall.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Paywall.guestGuard = false;