import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getItemsFromExistOperations = async (req, res) => {
  const cookies = req.header("Authorization");
  const { ActivityCode } = req.query;
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
      `(${data.value[0].DocEntry})?$select=DocumentLines`
    );
    const documentLine = await clienteAxios.get(
      `/b1s/v1/InventoryGenExits${uriDecodeForItemsExist}`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    const informationMaped = documentLine.data.DocumentLines.map((item) => {
      return {
        ItemCode: item.ItemCode,
        ItemDescription: item.ItemDescription,
        MeasureUnit: item.MeasureUnit,
        Quantity: item.Quantity,
      };
    });
    res.send(informationMaped);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getItemsFromExistOperations;
