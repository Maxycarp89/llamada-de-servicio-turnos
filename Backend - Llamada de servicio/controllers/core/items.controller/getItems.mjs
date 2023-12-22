import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getItems = async (req, res) => {
  const cookies = req.header("Authorization");
  const { item, searchType, warehouse } = req.query;
  const searched = searchType !== undefined ? searchType : "Código";
  let codigo = "";
  let uriDecode;
  let allItems = [];
  try {
    if (searched === "Código") {
      if (item.length < 10) {
        codigo = "R" + "0".repeat(10 - item.length) + item;
      } else {
        codigo = item;
      }
      const resultGetItems = await clienteAxios.get(
        `/b1s/v1/Items('${codigo}')`,
        {
          headers: {
            Cookie: `${cookies}`,
          },
        }
      );
      for (let stock of [resultGetItems.data]) {
        if (stock.Valid === "tYES") {
          for (let ware of stock.ItemWarehouseInfoCollection) {
            ware.WarehouseCode === warehouse && ware.InStock > 0
              ? res.send([resultGetItems.data])
              : ware.WarehouseCode === warehouse &&
                ware.InStock < 1 &&
                res.send({
                  message: "No hay Stock",
                  itemCode: stock.ItemCode,
                  itemDescrip: stock.ItemName,
                });
          }
        } else if (stock.Valid === "tNO") {
          for (let ware of stock.ItemWarehouseInfoCollection) {
            ware.WarehouseCode === warehouse && ware.InStock > 0
              ? res.send({
                  message: "No hay Stock",
                  itemCode: stock.ItemCode,
                  itemDescrip: stock.ItemName,
                })
              : ware.WarehouseCode === warehouse &&
                ware.InStock < 1 &&
                res.send({
                  message: "No hay Stock",
                  itemCode: stock.ItemCode,
                  itemDescrip: stock.ItemName,
                });
          }
        }
      }
    } else {
      uriDecode = decodeURI(
        `$select=ItemCode,ItemName,SalesUnit&$filter=contains(ItemName,'${item.toLowerCase()}') or contains(ItemName,'${item.toUpperCase()}')`
      );
      const resultGetItems = await clienteAxios.get(
        `/b1s/v1/Items?${uriDecode}`,
        {
          headers: {
            Cookie: `${cookies}`,
            Prefer: "odata.maxpagesize=0",
          },
        }
      );
      allItems = [...resultGetItems.data.value];
      res.send(allItems);
    }
  } catch (error) {
    res.send(error);
  }
};

export default getItems;
