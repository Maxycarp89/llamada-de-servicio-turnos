import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getFriendsWarehouse = async (req, res) => {
  const cookies = req.header("Authorization");
  const { WhsCode, BPLId } = req.query;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_ALMACENSUCU?$filter=BPLId eq ${BPLId} and WhsCode ne '${WhsCode}'`,
      {
        headers: {
          Cookie: cookies,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    res.send(data.value);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getFriendsWarehouse;
