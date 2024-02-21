import Head from "next/head";
import { Item } from "./api/get-items";
import Image from "next/image";
import moment from "moment";

// export type Item = {
//   timestamp: string;
//   name: string;
//   class: string;
//   phone: string;
//   book: string;
//   image: string;
//   condition: string;
//   price: string;
//   sold: string;
// };

export async function getStaticProps() {
  const items = (await fetch(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/get-items"
      : "https://stk-buku-lama.vercel.app/api/get-items",
  ).then((res) => res.json())) as { items: Item[] };

  return {
    props: {
      items: items.items,
    },
    revalidate: 5,
  };
}

export default function Home({ items }: { items: Item[] }) {
  return (
    <>
      <Head>
        <title>MPPT6 STK - Buku Lama</title>
        <meta
          name="description"
          content="Buku buku lama untuk pelajar tingkatan 6 STK"
        />
        <link rel="icon" href="https://emojipedia.org/apple/ios-16.4/books" />
      </Head>
      <main className="heropattern-leaf-slate-300 flex min-h-screen flex-col items-center justify-start bg-slate-200">
        <h1 className="mt-8 text-3xl font-semibold text-slate-900">
          MPPT6 STK Buku Lama
        </h1>
        <button className="mt-4 w-3/4 rounded-md bg-slate-800 p-2 text-white">
          <a href="https://forms.gle/FN6iUyVFPu67J8DG9" target="_blank">
            Sell your book
          </a>
        </button>
        <div className="m-6 mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-start justify-start rounded-md bg-slate-100 p-4 shadow-md"
            >
              <Image
                src={`https://drive.google.com/uc?export=view&id=${
                  item.image.split("id=")[1]
                }`}
                alt={item.book}
                width={200}
                height={200}
                className="rounded-md"
              />
              <div className="mt-4">
                <h2 className="text-xl font-semibold text-slate-800">
                  {item.book}
                </h2>
                <p className="mt-2 text-pretty text-slate-700">
                  <span className="font-bold">Condition: </span>
                  {item.condition}
                </p>
                <p className="mt-2 text-slate-700">
                  <span className="font-bold">Price: </span>
                  {item.price}
                </p>
                <p className="mt-2 text-slate-700">
                  <span className="font-bold">Listed by: </span>
                  {item.name}
                </p>
                <p className="mt-2 text-slate-700">
                  <span className="font-bold">Listed: </span>
                  {/* {2/19/2024 15:34:56} */}
                  {moment(item.timestamp, "M/D/YYYY HH:mm:ss").fromNow()}
                </p>
                <button
                  className="mt-4 rounded-md bg-slate-800 p-2 text-white"
                  onClick={() => {
                    window.open(
                      `whatsapp://send?phone=+60${item.phone.replace(/-/g, "")}`,
                    );
                  }}
                >
                  Contact on whatsapp
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
