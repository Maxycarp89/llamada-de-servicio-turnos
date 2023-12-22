import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";
import { deliveryNoteUtil } from "../../../utils/deliveryNoteUtil.mjs";

const patchServiceCallBike = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
    ServiceCallID,
    BPBillToAddress,
    BPeMail,
    Resolution,
    CallType,
    CustomerCode,
    CustomerName,
    Description,
    InternalSerialNum,
    ItemCode,
    ItemDescription,
    Origin,
    Priority,
    ProblemSubType,
    ProblemType,
    ServiceBPType,
    Status,
    Subject,
    TechnicianCode,
    U_Almacen,
    U_Chasis,
    U_Faltante,
    U_Manchado,
    U_Rayado,
    U_Rotura,
    U_TipoOrigen,
    ServiceCallActivities,
    U_Marca,
    U_Modelo
  } = req.body;
  const { sales } = req.body;
  const { invoiceBody } = req.body;
  let merchandise = [];
  let sendDelivery = [];
  if (sales.DocumentLines.length > 0) {
    merchandise = await generateMerchandiseRelease({
      body: {
        sales,
        CustomerCode,
        cookies,
      },
    });
    if (!merchandise.length) {
      return res.status(200).send({
        msg: "Ocurrió un problema al intentar generar una salida de mercancí",
      });
    }
  }
  if (Status === -1 && !!invoiceBody === true) {
    sendDelivery = await deliveryNoteUtil({
      body: {
        invoiceBody,
      },
    });
    if (!sendDelivery.length) {
      return res.status(200).send({
        msg: "Ocurrió un problema al intentar remitir la factura del cliente. Puede que la misma no este conciliada o el cliente posea un saldo en contra o que uno de los documentos de la factura este cerrado.",
      });
    }
  }
  await clienteAxios.patch(
    `/b1s/v1/ServiceCalls(${ServiceCallID})`,
    {
      ServiceCallID,
      BPBillToAddress,
      BPeMail,
      CallType,
      CustomerCode,
      CustomerName,
      Description,
      InternalSerialNum,
      ItemCode,
      ItemDescription,
      Origin,
      Priority,
      ProblemSubType,
      Resolution,
      ProblemType,
      ServiceBPType,
      Status,
      Subject,
      TechnicianCode,
      U_Almacen,
      U_Chasis,
      U_Faltante,
      U_Manchado,
      U_Rayado,
      U_Rotura,
      U_TipoOrigen,
      ServiceCallActivities: [...ServiceCallActivities, ...merchandise],
      ServiceCallInventoryExpenses: [...sendDelivery],
      U_Marca,
      U_Modelo
    },
    {
      headers: {
        Cookie: cookies,
      },
    }
  );
  return res.status(200).send({
    ...req.body,
  });
};

export default patchServiceCallBike;
