import { clienteAxios } from "../../utils/clienteAxios.mjs";

const usuarioPtoEmision = async (req, res) => {
  const cookies = req.header("Authorization");
  const { UserCode, Warehouse } = req.query;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_USUARIOPTOEMISION?$filter=USER_CODE eq '${UserCode}' and BPLId eq ${Warehouse} and (startswith(PTICode,'06') or startswith(PTICode,'07'))`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    const valueWithoutOldCentral = data.value.filter(
      (e) => e.PTICode !== "0600"
    );
    return res.send(valueWithoutOldCentral);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default usuarioPtoEmision;
