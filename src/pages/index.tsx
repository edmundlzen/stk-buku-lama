import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>MPPT6 STK - Buku Lama</title>
        <meta
          name="description"
          content="Buku buku lama untuk pelajar tingkatan 6 STK"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="heropattern-leaf-slate-300 flex min-h-screen flex-col items-center justify-start bg-slate-200">
        <h1 className="mt-8 text-3xl font-medium text-slate-800">
          MPPT6 STK Buku Lama
        </h1>
      </main>
    </>
  );
}
