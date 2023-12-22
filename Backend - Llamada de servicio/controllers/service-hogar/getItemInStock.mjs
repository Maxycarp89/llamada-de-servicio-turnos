import { clienteAxios } from "../../utils/clienteAxios.mjs";

const getItemInStockHA = async (req, res) => {
  const cookies = req.header("Authorization");
  const { WhsCode, NameOrCode } = req.query;
  console.log(req.query);
  try {
    const uriDecode = decodeURI(
      `$filter=WhsCode eq '${WhsCode.toString().toUpperCase()}' and contains(ItemCode, '${NameOrCode.toString().toUpperCase()}') or WhsCode eq '${WhsCode.toString().toUpperCase()}' and contains(ItemName, '${NameOrCode.toString().toUpperCase()}')`
    );
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_ITEMSTOCK?${uriDecode}`,
      {
        headers: {
          Cookie: cookies,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    if (data.value.length > 0) {
      return res.status(200).send(data.value);
    } else {
      return res.status(200).send({
        msg: "No se encontro el item buscado dentro de la sucursal seleccionada al iniciar sesión.",
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getItemInStockHA;
