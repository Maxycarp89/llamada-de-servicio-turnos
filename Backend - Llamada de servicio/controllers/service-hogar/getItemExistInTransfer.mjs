import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getItemExistInTransfer = async (req, res) => {
  const cookies = req.header("Authorization");
  const { ActivityCode } = req.query;
  console.log(ActivityCode)
  try {
    const uriDecode = decodeURI(
      `$filter=ActivityCode eq ${ActivityCode}&$select=DocEntry`
    );
    const { data } = await clienteAxios.get(`/b1s/v1/Activities?${uriDecode}`, {
      headers: {
        Cookie: `${cookies}`,
      },
    });
    const uriDecodeForItemsExist = decodeURI(
      `(${data.value[0].DocEntry})?$select=StockTransferLines`
    );
    const documentLine = await clienteAxios.get(
      `/b1s/v1/StockTransfers${uriDecodeForItemsExist}`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    const informationMaped = documentLine.data.StockTransferLines.map((item) => {
      return {
        ItemCode: item.ItemCode,
        ItemDescription: item.ItemDescription,
        Quantity: item.Quantity,
        FromWarehouse: item.FromWarehouseCode,
        ToWarehouse: item.WarehouseCode,
        SerialNumbers: item.SerialNumbers,
      };
    });
    res.send(informationMaped);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getItemExistInTransfer