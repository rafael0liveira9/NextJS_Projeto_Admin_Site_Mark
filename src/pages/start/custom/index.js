import React, { useState } from 'react';
import StepsShow from '../../components/stepsShow';
import BlankLayout from 'src/@core/layouts/BlankLayout';


const Custom = () => {

  return (
    <div class="full-page-start">

      <StepsShow step={2}></StepsShow>
    </div>
  )
}

export default Custom
Custom.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;