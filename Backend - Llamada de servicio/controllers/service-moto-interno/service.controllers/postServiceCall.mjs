import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import {
  checkAlreadyPurchased,
  generateEquipmentCard,
  cancelActualEquipmentCardSales,
} from "../../../utils/equipmentUtil.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";

const postServiceCallInterno = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
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
    Description,
    Priority,
    Status,
    CallType,
    Origin,
    ProblemType,
    ProblemSubType,
    TechnicianCode,
    U_TipoOrigen,
  } = req.body;
  const { sales } = req.body;
  let merchandise = [];
  try {
    const checkEquipamentCardP = await checkAlreadyPurchased({
      body: { InternalSerialNum, cookies },
    });
    if (checkEquipamentCardP == "NoContent") {
      await generateEquipmentCard({
        body: {
          InternalSerialNum,
          CustomerCode,
          ItemCode,
          ServiceBPType: "et_Purchasing",
          cookies,
        },
      });
    }
    if (checkEquipamentCardP.checkCode === "Tipo Venta") {
      const resultCancelCard = cancelActualEquipmentCardSales({
        body: {
          InternalSerialNum,
          CustomerCode,
          cookies,
        },
      });
      if (resultCancelCard === true) {
        await generateEquipmentCard({
          body: {
            InternalSerialNum,
            CustomerCode,
            ItemCode,
            ServiceBPType: "et_Purchasing",
            cookies,
          },
        });
      }
    }
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
    const { data } = await clienteAxios.post(
      "/b1s/v1/ServiceCalls",
      {
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
        Description,
        Priority,
        Status,
        CallType,
        Origin,
        ProblemType,
        ProblemSubType,
        TechnicianCode,
        U_TipoOrigen,
        ServiceCallActivities: [...merchandise],
      },
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    res.send(data);
  } catch (error) {
    return res.status(200).send(error);
  }
};

export default postServiceCallInterno;
