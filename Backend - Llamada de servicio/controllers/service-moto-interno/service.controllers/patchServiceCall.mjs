import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import { cancelActualEquipmentCardSales } from "../../../utils/equipmentUtil.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";

const patchServiceCallsInterno = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
    ServiceCallID,
    CustomerCode,
    CustomerName,
    BPBillToAddress,
    U_Almacen,
    ItemCode,
    ItemDescription,
    InternalSerialNum,
    U_Chasis,
    U_Motor,
    U_Casco,
    U_Alarma,
    U_Rotura,
    U_Rayado,
    U_Manchado,
    U_Kit_Herramientas,
    U_Faltante,
    ServiceBPType,
    Subject,
    Resolution,
    Description,
    Priority,
    Status,
    CallType,
    Origin,
    ProblemType,
    ProblemSubType,
    TechnicianCode,
    U_TipoOrigen,
    ServiceCallActivities,
  } = req.body;
  const { sales } = req.body;
  try {
    let merchandise = [];
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
          msg: "Ocurrió un problema al intentar generar la salida de mercancía.",
        });
      }
    }
    await clienteAxios.patch(
      `/b1s/v1/ServiceCalls(${ServiceCallID})`,
      {
        ServiceCallID,
        CustomerCode,
        CustomerName,
        BPBillToAddress,
        U_Almacen,
        ItemCode,
        ItemDescription,
        InternalSerialNum,
        U_Chasis,
        U_Motor,
        U_Casco,
        U_Alarma,
        U_Rotura,
        U_Rayado,
        U_Manchado,
        U_Kit_Herramientas,
        U_Faltante,
        ServiceBPType,
        Subject,
        Resolution,
        Description,
        Priority,
        Status,
        CallType,
        Origin,
        ProblemType,
        ProblemSubType,
        TechnicianCode,
        U_TipoOrigen,
        ServiceCallActivities: [...ServiceCallActivities, ...merchandise],
      },
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    Status === -1 &&
      (await cancelActualEquipmentCardSales({
        body: {
          InternalSerialNum,
          CustomerCode,
          cookies,
        },
      }));
    return res.status(200).send({
      msg: `Service con el ID ${ServiceCallID} editado exitosamente.`,
    });
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

export default patchServiceCallsInterno;
