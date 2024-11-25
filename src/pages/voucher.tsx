/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Head from "next/head";
import Image from "next/image";
import moment from "moment";
import doc from "~/utils/doc";
import { useState } from "react";

export default function Voucher() {
  const [ic, setIc] = useState("");
  const [idDelima, setIdDelima] = useState("");
  const [voucherCode, setVoucherCode] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCopy = () => {
    if (voucherCode) {
      void navigator.clipboard.writeText(voucherCode).then(() => {
        alert("Voucher code copied to clipboard");
      });
    }
  };

  const handleLookup = async () => {
    setLoading(true);
    setMessage(null);
    setVoucherCode(null);

    try {
      const response = await fetch("/api/voucher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_delima: idDelima, ic }),
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = await response.json();

      if (response.ok) {
        setVoucherCode(data.voucherCode);
        setMessage(data.message);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Penebusan Baucar Buku YDN 2024</title>
        <meta
          name="description"
          content="Penebusan Baucar Buku YDN 2024 untuk pelajar tingkatan 6 STK"
        />
        <link
          rel="icon"
          href="https://em-content.zobj.net/source/apple/354/books_1f4da.png"
        />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-start bg-slate-100 p-6 text-center heropattern-leaf-slate-200">
        <h1 className="text-2xl font-semibold text-slate-900">
          Penebusan Baucar Buku YDN 2024
        </h1>
        <div className="mt-4 flex flex-col items-start font-bold">
          <label id="ic" className="w-full text-left">
            IC:
          </label>
          <input
            id="ic"
            value={ic}
            onChange={(e) => {
              setIc(e.currentTarget.value);
            }}
            className="rounded-sm border border-black font-normal"
          />
        </div>
        <div className="mt-3 flex flex-col items-start font-bold">
          <label id="delima" className="w-full text-left">
            ID Delima:
          </label>
          <input
            id="delima"
            value={idDelima}
            onChange={(e) => {
              setIdDelima(e.currentTarget.value);
            }}
            className="rounded-sm border border-black font-normal"
          />
        </div>
        <button
          className="mt-4 w-3/4 rounded-md bg-slate-800 p-2 text-white"
          onClick={() => {
            void handleLookup();
          }}
          disabled={loading}
        >
          {loading ? "Looking up..." : "Lookup"}
        </button>
        {message && (
          <p style={{ marginTop: "1em", color: voucherCode ? "green" : "red" }}>
            {message}
          </p>
        )}
        {voucherCode && (
          <div
            style={{
              marginTop: "1em",
              padding: "1em",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
            }}
          >
            <strong>Voucher Code:</strong> {voucherCode}
            <button
              onClick={handleCopy}
              style={{
                marginLeft: "1em",
                padding: "0.3em 0.6em",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>
        )}
      </main>
    </>
  );
}
