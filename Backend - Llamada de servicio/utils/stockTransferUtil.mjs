import { clienteAxios } from "./clienteAxios.mjs";

export const generateTransferStock = async (req) => {
  const { transferBody, cookies } = req.body;
  try {
    const { data } = await clienteAxios.post(
      "/b1s/v1/StockTransfers",
      transferBody,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    const resultPostActivity = await clienteAxios.post(
      "/b1s/v1/Activities",
      {
        DocEntry: data.DocEntry,
        CardCode: data.CardCode,
        DocType: "67",
      },
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    return [{ ActivityCode: resultPostActivity.data.ActivityCode }];
  } catch (error) {
    console.log(error, "Transferencia de stock")
    return []
  }
};
