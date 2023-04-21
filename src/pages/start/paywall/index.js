import React, { useState } from 'react';
import StepsShow from '../../components/stepsShow';
import BlankLayout from 'src/@core/layouts/BlankLayout';


const Paywall = () => {

  return (
    <div class="full-page-start">

      <StepsShow step={4}></StepsShow>
    </div>
  )
}

export default Paywall
Paywall.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;
Paywall.guestGuard = false;