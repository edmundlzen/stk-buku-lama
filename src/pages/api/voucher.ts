import type { NextApiRequest, NextApiResponse } from "next";
import { voucher_doc } from "~/utils/doc";

type ResponseData = {
  message: string;
  voucherCode?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method not allowed" });
    return;
  }

  const { id_delima, ic } = req.body as {
    id_delima: string;
    ic: string;
  };

  if (!id_delima || !ic) {
    res.status(400).json({ message: "Missing ID Delima or IC parameter" });
    return;
  }

  try {
    const sheet = voucher_doc.sheetsByIndex[0];
    const rows = await sheet?.getRows();
    const matching_rows = rows
      ?.filter(
        (row) =>
          (row?.get("KAD PENGENALAN") as string).trim().replaceAll("-", "") ===
          ic.trim().replaceAll("-", ""),
      )
      .filter(
        (row) =>
          (row?.get("ID DELIMA") as string).trim().toUpperCase() ===
          id_delima.trim().toUpperCase(),
      );

    if (!matching_rows || matching_rows?.length < 1) {
      res.status(404).json({ message: "No matching data found" });
      return;
    }

    // Return the voucher code
    const voucherCode =
      (matching_rows[0]?.get("CODE BAUCAR") as string) ?? "Not Found";
    res.status(200).json({ message: "Success", voucherCode });
  } catch (error) {
    console.error("Error accessing Google Sheets:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
