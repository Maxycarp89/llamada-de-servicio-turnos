import { clienteAxios } from "../../utils/clienteAxios.mjs";
import { generateTransferStock } from "../../utils/stockTransferUtil.mjs";

const postServiceCalls = async (req, res) => {
  const cookies = req.header("Authorization");
  const { transferBody, ...rest } = req.body;
  try {
    const { StockTransferLines } = transferBody;
    if (!StockTransferLines.length) {
      const { data } = await clienteAxios.post(
        "/b1s/v1/ServiceCalls",
        { ...rest },
        {
          headers: {
            Cookie: `${cookies}`,
          },
        }
      );
      return res.status(200).json({ data });
    } else {
      const transferStock = await generateTransferStock({
        body: {
          transferBody,
          cookies,
        },
      });
      if (!transferStock.length) {
        return res.status(200).send({
          msg: "Ocurrió un problema al intentar generar la transferencia de stock",
        });
      }
      const { data } = await clienteAxios.post(
        `/b1s/v1/ServiceCalls`,
        {
          ...rest,
          ServiceCallActivities: [...transferStock],
        },
        {
          headers: {
            Cookie: `${cookies}`,
          },
        }
      );
      return res.status(200).send({
        data: {
          ...data
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export default postServiceCalls;
