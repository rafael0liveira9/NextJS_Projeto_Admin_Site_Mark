import React from "react";
import Head from "next/head";

export default function SEO({ title }) {
  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title>{title} - MKT PROMO</title>
    </Head>
  );
}
