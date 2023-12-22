import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const searchInternMotorbike = async (req, res) => {
  const cookies = req.header("Authorization");
  const { NameOrCode, Chasis, Motor, Serie, WhsCode } = req.query;
  let uriDecode;
  try {
    if (NameOrCode) {
      uriDecode = decodeURI(
        `contains(ItemCode, '${NameOrCode.toUpperCase()}') or contains(ItemName, '${NameOrCode.toUpperCase()}') and WhsCode eq '${WhsCode}'`
      );
    } else if (Chasis) {
      uriDecode = decodeURI(
        `contains(U_Chasis, '${Chasis.toUpperCase()}') and WhsCode eq '${WhsCode}'`
      );
    } else if (Motor) {
      uriDecode = decodeURI(
        `contains(U_Motor, '${Motor.toUpperCase()}') and WhsCode eq '${WhsCode}'`
      );
    } else if (Serie) {
      uriDecode = decodeURI(
        `contains(IntrSerial, '${Serie.toUpperCase()}') and WhsCode eq '${WhsCode}'`
      );
    }
    const resultMotorbike = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_STOCKVEHICULO?$filter=${uriDecode}`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    res.send(resultMotorbike.data.value);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default searchInternMotorbike;
