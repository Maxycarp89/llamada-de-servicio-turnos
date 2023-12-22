import { clienteAxios } from "../../utils/clienteAxios.mjs";
import { generateTransferStock } from "../../utils/stockTransferUtil.mjs";

const patchServiceCallsHome = async (req, res) => {
  const cookies = req.header("Authorization");
  const { transferBody, ServiceCallID, ...rest } = req.body;
  try {
    const { StockTransferLines } = transferBody;
    if (!StockTransferLines.length) {
      await clienteAxios.patch(
        `/b1s/v1/ServiceCalls(${ServiceCallID})`,
        {
          ServiceCallID,
          ...rest,
        },
        {
          headers: {
            Cookie: cookies,
          },
        }
      );
      res.status(200).send({ data: { ...rest, ServiceCallID, transferBody } });
    } else {
      const transferStock = await generateTransferStock({
        body: {
          transferBody,
          cookies,
        },
      });
      if (!transferStock.length) {
        return res.status(200).send({
          msg: "Ocurrió un problema al intentar realizar la transferencia",
        });
      }
      await clienteAxios.patch(
        `/b1s/v1/ServiceCalls(${ServiceCallID})`,
        {
          ServiceCallID,
          ...rest,
          ServiceCallActivities: [
            ...rest.ServiceCallActivities,
            ...transferStock,
          ],
        },
        {
          headers: {
            Cookie: cookies,
          },
        }
      );
      res.status(200).send({
        data: {
          ...rest,
          ServiceCallID,
          ServiceCallActivities: [...transferStock],
        },
      });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

export default patchServiceCallsHome;
