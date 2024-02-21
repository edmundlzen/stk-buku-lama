import { type AppType } from "next/app";

import "~/styles/globals.css";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <style>
          @import
          url(&apos;https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap&apos;)
        </style>
      </Head>
      <Analytics />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
