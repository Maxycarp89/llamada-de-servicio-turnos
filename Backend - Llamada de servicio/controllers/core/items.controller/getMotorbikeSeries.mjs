import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getMotorbikeSeries = async (req, res) => {
  const cookies = req.header("Authorization");
  const { ItemCode, WhsCode } = req.query;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/sml.svc/YUH_SERIES_MOTOS?$select=ItemCode,ItemName,IntrSerial,Name,U_Chasis,SysSerial,U_Motor,U_Num_DNRPA,WhsCode&$filter=ItemCode eq '${ItemCode}' and WhsCode eq '${WhsCode}'`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    return res.status(200).send(data.value);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getMotorbikeSeries;
