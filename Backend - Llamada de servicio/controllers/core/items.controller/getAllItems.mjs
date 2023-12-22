import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getAllItems = async (req, res) => {
  const cookies = req.header("Authorization");
  const { Search } = req.query;
  let found = [];
  try {
    const uriDecode = decodeURI(
      `ItemCode eq '${Search.toUpperCase()}' or contains(ItemName,'${Search.toUpperCase()}')`
    );
    const result = await clienteAxios.get(
      `/b1s/v1/Items?$orderby=ItemCode desc&$filter=${uriDecode}&$select=ItemCode,ItemName`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    found = [...result.data.value];
    res.send(found);
  } catch (error) {
    res.send([]);
  }
};

export default getAllItems;
