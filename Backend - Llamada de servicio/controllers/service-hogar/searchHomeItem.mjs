import { clienteAxios } from "../../utils/clienteAxios.mjs";

const searchHomeItem = async (req, res) => {
  const cookies = req.header("Authorization");
  const { NameOrCode, Client, DNI } = req.query;
  try {
    let itemsSearched = [];
    if (NameOrCode) {
      const uriDecode = decodeURI(
        `?$filter=contains(ItemCode, '${NameOrCode.toString().toUpperCase()}') or contains(ItemName, '${NameOrCode.toString().toUpperCase()}')&$select=ItemCode,ItemName,SalesUnit,U_Marca,U_Modelo`
      );
      const { data } = await clienteAxios.get(`/b1s/v1/Items${uriDecode}`, {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      });
      itemsSearched = data.value;
      if (itemsSearched.length > 0) {
        itemsSearched = itemsSearched.filter(
          (e) => e.ItemName.includes("NO USAR") !== true
        );
      }
      return res.status(200).send(itemsSearched);
    } else {
      let uriDecode = Client ? decodeURI(
        `CardCode eq '${Client.toString().toUpperCase()}' and U_Division eq 'DH'`
      ) : decodeURI(
        `LicTradNum eq '${DNI.toString().toUpperCase()}' and U_Division eq 'DH'`
      );
      const resultClienteYProductos = await clienteAxios.get(
        `/b1s/v1/sml.svc/YUH_CLIENTEYPRODASOCIADOS2?$filter=${uriDecode}`,
        {
          headers: {
            Cookie: `${cookies}`,
            Prefer: "odata.maxpagesize=0",
          },
        }
      );
      return res.status(200).send(resultClienteYProductos.data.value)
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export default searchHomeItem;

//0012
