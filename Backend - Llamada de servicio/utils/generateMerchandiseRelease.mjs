import { clienteAxios } from "./clienteAxios.mjs";

export const generateMerchandiseRelease = async (req) => {
  const { sales, CustomerCode, cookies } = req.body;
  const { BPL_IDAssignedToInvoice, DocumentLines } = sales;
  try {
    const { data } = await clienteAxios.post(
      "/b1s/v1/InventoryGenExits",
      {
        U_Tipo_Operacion: "1",
        GroupNumber: -2,
        BPL_IDAssignedToInvoice,
        DocumentLines,
      },
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    const postActivity = await clienteAxios.post(
      "/b1s/v1/Activities",
      {
        DocEntry: data.DocEntry,
        CardCode: CustomerCode,
        DocNum: data.DocNum,
        DocType: "60",
      },
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    return [
      {
        ActivityCode: postActivity.data.ActivityCode,
      },
    ];
  } catch (error) {
    console.log(error)
    return [];
  }
};
