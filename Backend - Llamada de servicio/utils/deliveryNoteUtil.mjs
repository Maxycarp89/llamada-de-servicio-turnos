import { clienteAxios } from "./clienteAxios.mjs";
import "dotenv/config";

export const deliveryNoteUtil = async (req) => {
  const { invoiceBody } = req.body;
  try {
    const loginUserWithAllPTICode = await clienteAxios.post("/b1s/v1/Login", {
      CompanyDB: process.env.NODE_DATABASE_SAP,
      Password: process.env.NODE_DEFAULT_PASSWORD_SAP,
      UserName: process.env.NODE_DEFAULT_USER_SAP,
    });
    const { data } = await clienteAxios.post(
      "/b1s/v1/DeliveryNotes",
      invoiceBody,
      {
        headers: {
          Cookie: `${loginUserWithAllPTICode.headers["set-cookie"][0]}`,
        },
      }
    );
    return [
      {
        LineNum: 0,
        PartType: "sep_NonInventory",
        DocumentType: "edt_Delivery",
        DocumentNumber: data.DocNum,
        DocEntry: data.DocEntry,
      },
    ];
  } catch (error) {
    console.log(error)
    return [];
  }
};
