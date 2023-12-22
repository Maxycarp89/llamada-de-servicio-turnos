import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";
import { deliveryNoteUtil } from "../../../utils/deliveryNoteUtil.mjs";
import { sendMail } from "../../../utils/mailer.mjs";

const patchServiceCalls = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
    ServiceCallID,
    CustomerCode,
    CustomerName,
    Telephone,
    BPBillToAddress,
    BPeMail,
    U_Almacen,
    ItemCode,
    ItemDescription,
    U_Marca,
    U_Modelo,
    InternalSerialNum,
    U_Chasis,
    U_Motor,
    U_Kilometraje,
    City,
    U_Casco,
    U_Alarma,
    U_Rotura,
    U_Rayado,
    U_Manchado,
    U_Kit_Herramientas,
    U_Faltante,
    ServiceBPType,
    Subject,
    Description,
    Priority,
    U_Patente,
    Status,
    CallType,
    Resolution,
    Origin,
    ProblemType,
    ProblemSubType,
    TechnicianCode,
    U_NombColor,
    U_TipoOrigen,
    ServiceCallActivities,
    U_Nivel_Combustible,
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
        msg: "Ocurrió un problema al intentar generar la salida de mercancía. Puede que no haya stock del item seleccionado dentro de la sucursal.",
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
        msg: "Ocurrió un problema al intentar remitir la factura del cliente. Puede que la misma no este conciliada o el cliente posea un saldo en contra o que uno de los documentos de la factura este cerrado. Cómo ultimo motivo es que el cliente de la factura de reserva se encuentre inactivo.",
      });
    }
  }
  await clienteAxios.patch(
    `/b1s/v1/ServiceCalls(${ServiceCallID})`,
    {
      ServiceCallID,
      CustomerCode,
      CustomerName,
      Telephone,
      BPBillToAddress,
      BPeMail,
      U_Almacen,
      ItemCode,
      ItemDescription,
      U_Marca,
      U_Modelo,
      InternalSerialNum,
      U_Chasis,
      U_Motor,
      U_Kilometraje,
      City,
      U_Casco,
      U_Alarma,
      U_Rotura,
      U_Rayado,
      U_Manchado,
      U_Kit_Herramientas,
      U_Faltante,
      ServiceBPType,
      Subject,
      Description,
      Priority,
      U_Patente,
      Status,
      CallType,
      Resolution,
      Origin,
      ProblemType,
      ProblemSubType,
      TechnicianCode,
      U_TipoOrigen,
      U_NombColor,
      U_Nivel_Combustible,
      ServiceCallActivities: [...ServiceCallActivities, ...merchandise],
      ServiceCallInventoryExpenses: [...sendDelivery],
    },
    {
      headers: {
        Cookie: cookies,
      },
    }
  );
  await sendMail({ ...req.body });
  return res.status(200).send({ data: req.body });
};

export default patchServiceCalls;
