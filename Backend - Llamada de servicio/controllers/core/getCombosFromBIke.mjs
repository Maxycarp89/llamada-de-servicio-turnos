import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getCombosFromBike = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CardCode } = req.query;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_COMBOS_BIKE?$filter=CardCode eq '${CardCode}'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    if (!data.value.length) {
      return res.send({
        msg: "No se encontraron servicios pertenecientes a este cliente",
      });
    } else {
      return res.send(data.value);
    }
  } catch (error) {
    return res.status(400).send(error);
  }
};

export default getCombosFromBike;
