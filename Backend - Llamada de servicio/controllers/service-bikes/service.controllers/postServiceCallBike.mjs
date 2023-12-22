import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";

const postServiceCallBike = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
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
    U_Marca,
    U_Modelo
  } = req.body;
  const { sales } = req.body;
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
        msg: "Ocurrió un problema para intentar al intentar generar una salida de mercancía.",
      });
    }
  }
  const { data } = await clienteAxios.post(
    "/b1s/v1/ServiceCalls",
    {
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
      ServiceCallActivities: [...merchandise],
      U_Marca,
      U_Modelo
    },
    {
      headers: {
        Cookie: `${cookies}`,
      },
    }
  );
  return res.status(200).json(data);
};

export default postServiceCallBike;
