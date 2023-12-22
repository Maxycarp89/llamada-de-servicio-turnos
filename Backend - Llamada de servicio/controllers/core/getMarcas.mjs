import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getMarcas = async (req, res) => {
  const cookies = req.header("Authorization");
  try {
    const { data } = await clienteAxios.get(`/b1s/v1/MARCAS`, {
      headers: {
        Cookie: `${cookies}`,
        Prefer: "odata.maxpagesize=0",
      },
    });
    return res.send(data.value);
  } catch (error) {
    return res.send(error);
  }
};

export default getMarcas;
