import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getCustomerSeller = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CardCode } = req.query;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_CLIENTESALMACEN?$filter=CardCode eq '${CardCode.toString().toUpperCase()}'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    console.log(data.value);
    if (!data.value.length) {
      return res
        .status(200)
        .send({ msg: "No se encontro el socio de negocios." });
    } else {
      return res.status(200).send(data.value);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getCustomerSeller;
