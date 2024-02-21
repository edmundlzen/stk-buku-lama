import type { NextApiRequest, NextApiResponse } from "next";
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

type ResponseData = {
  items: Item[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  // Ensure method is GET
  if (req.method !== "GET") {
    res.status(405);
    return;
  }

  // Get items
  const sheet = doc.sheetsByIndex[0];
  const rows = await sheet?.getRows();
  const filteredRows = rows?.filter((row) => row?.get("Timestamp") !== "");

  console.log(rows?.[0]?.get("Timestamp"));
  // Return the rows as JSON
  res.status(200).json({
    items: filteredRows?.map((row) => ({
      timestamp: row?.get("Timestamp") as string,
      name: row?.get("Nama") as string,
      class: row?.get("Kelas") as string,
      phone: row?.get("Nombor Telefon") as string,
      book: row?.get("Nama buku yang jual") as string,
      image: row?.get("Gambar buku") as string,
      condition: row?.get("Keadaan buku") as string,
      price: row?.get("Harga") as string,
      sold: row?.get("Sold") as string,
    })) as Item[],
  });
}
