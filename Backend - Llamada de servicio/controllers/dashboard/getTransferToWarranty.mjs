import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getTransferToWarranty = async (req, res) => {
  const cookies = req.header("Authorization");
  const { Warehouse } = req.query;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/StockTransfers?$select=StockTransferLines,DocEntry,DocDate&$filter=ToWarehouse eq '${Warehouse}'&$orderby=DocEntry desc`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=200",
        },
      }
    );
    console.log(data.value);
    let stockTransfered = [];
    if (data.value.length > 0) {
      for (let i = 0; i < data.value.length; i++) {
        let test = data.value[i].StockTransferLines.filter((e) => {
          return {
            ...e,
          };
        });
        test = test.map((e) => {
          return {
            ...e,
            DocDate: data.value[i].DocDate,
          };
        });
        stockTransfered = [...stockTransfered, ...test];
      }
    }
    res.send(stockTransfered);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getTransferToWarranty;
