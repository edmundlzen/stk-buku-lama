import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];

const jwt = new JWT({
  email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  key: process.env.GOOGLE_PRIVATE_KEY,
  scopes: SCOPES,
});

const doc = new GoogleSpreadsheet(
  "1A0Uv1PFWw-84jtBv1_AJsBvb-vTPe7xBEC2uLNrErNs",
  jwt,
);

const voucher_doc = new GoogleSpreadsheet(
  "12qXdnBbBF4Q-X-iL130S06IVGS8xgJLH-vA0p73svDQ",
  jwt,
);

await doc.loadInfo();
await voucher_doc.loadInfo();

export default doc;
export { voucher_doc };
