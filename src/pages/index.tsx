import Head from "next/head";
import Image from "next/image";
import moment from "moment";
import doc from "~/utils/doc";

export type Item = {
  timestamp: string;
  name: string;
  class: string;
  phone: string;
  book: string;
  image: string;
  condition: string;
  price: string;
  sold: string;
};

export async function getStaticProps() {
  // Get items
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet?.getRows();
  const filteredRows = rows?.filter((row) => row?.get("Timestamp") !== "");
  const items = filteredRows?.map((row) => ({
    timestamp: row?.get("Timestamp") as string,
    name: row?.get("Nama") as string,
    class: row?.get("Kelas") as string,
    phone: row?.get("Nombor Telefon (Dalam format:  01X-XXXXXXX)") as string,
    book: row?.get("Nama buku yang jual") as string,
    image: row?.get("Gambar buku") as string,
    condition: row?.get("Keadaan buku") as string,
    price: row?.get("Harga") as string,
    sold: row?.get("Sold") as string,
  })) as Item[];
  return {
    props: {
      items: items,
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
        <link
          rel="icon"
          href="https://em-content.zobj.net/source/apple/354/books_1f4da.png"
        />
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
