import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import { generateTransferStock } from "../../../utils/stockTransferUtil.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";

const patchWarrantyService = async (req, res) => {
  const cookies = req.header("Authorization");
  const { transferBody, sales } = req.body;
  const {
    ServiceCallID,
    CustomerCode,
    BPBillToAddress,
    BPeMail,
    CallType,
    CustomerName,
    Description,
    InternalSerialNum,
    ItemCode,
    ItemDescription,
    Origin,
    Priority,
    ProblemSubType,
    ProblemType,
    Resolution,
    ServiceBPType,
    Status,
    Subject,
    TechnicianCode,
    Telephone,
    U_Alarma,
    U_Almacen,
    U_Casco,
    U_Chasis,
    U_Patente,
    U_Faltante,
    U_Kilometraje,
    U_Kit_Herramientas,
    U_Manchado,
    U_Marca,
    U_Modelo,
    U_Motor,
    U_Rayado,
    U_Rotura,
    ServiceCallActivities,
    City,
    U_NumeroPedigoG,
    U_FechaPedidoG,
    U_CumplidoGrtia,
    U_ObservaGrtia,
    U_UsuarioGrtia,
    U_NumTranferencia,
    U_FechaTransferencia,
    U_ArchivoAdj,
    U_EstadoGrtia,
    U_Nivel_Combustible,
  } = req.body;
  let transferStock = [];
  let salesRelease = [];
  try {
    if (transferBody.StockTransferLines.length > 0) {
      transferStock = await generateTransferStock({
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
    }
    if (sales.DocumentLines.length > 0) {
      salesRelease = await generateMerchandiseRelease({
        body: { sales, CustomerCode, cookies },
      });
      if (!salesRelease.length) {
        return res.status(200).send({
          msg: "Ocurrió un problema al intentar realizar la salida de mercancía",
        });
      }
    }
    await clienteAxios.patch(
      `/b1s/v1/ServiceCalls(${ServiceCallID})`,
      {
        BPBillToAddress,
        BPeMail,
        CallType,
        CustomerName,
        Description,
        InternalSerialNum,
        ItemCode,
        ItemDescription,
        Origin,
        Priority,
        ProblemSubType,
        ProblemType,
        Resolution,
        ServiceBPType,
        Status,
        Subject,
        TechnicianCode,
        Telephone,
        U_Alarma,
        U_Almacen,
        U_Casco,
        U_Chasis,
        U_Patente,
        U_Faltante,
        U_Kilometraje,
        U_Kit_Herramientas,
        U_Manchado,
        U_Marca,
        U_Modelo,
        U_Motor,
        U_Rayado,
        U_Rotura,
        City,
        U_NumeroPedigoG,
        U_FechaPedidoG,
        U_CumplidoGrtia,
        U_ObservaGrtia,
        U_UsuarioGrtia,
        U_NumTranferencia,
        U_FechaTransferencia,
        U_ArchivoAdj,
        U_EstadoGrtia,
        U_Nivel_Combustible,
        ServiceCallActivities: [
          ...ServiceCallActivities,
          ...transferStock,
          ...salesRelease,
        ],
      },
      {
        headers: {
          Cookie: cookies,
        },
      }
    );
    return res.status(200).send({
      BPBillToAddress,
      BPeMail,
      CallType,
      CustomerName,
      Description,
      InternalSerialNum,
      ItemCode,
      ItemDescription,
      Origin,
      Priority,
      ProblemSubType,
      ProblemType,
      Resolution,
      ServiceBPType,
      Status,
      Subject,
      TechnicianCode,
      Telephone,
      U_Alarma,
      U_Almacen,
      U_Casco,
      U_Chasis,
      U_Patente,
      U_Faltante,
      U_Kilometraje,
      U_Kit_Herramientas,
      U_Manchado,
      U_Marca,
      U_Modelo,
      U_Motor,
      U_Rayado,
      U_Rotura,
      City,
      U_NumeroPedigoG,
      U_FechaPedidoG,
      U_CumplidoGrtia,
      U_ObservaGrtia,
      U_UsuarioGrtia,
      U_NumTranferencia,
      U_FechaTransferencia,
      U_ArchivoAdj,
      U_EstadoGrtia,
      CustomerCode,
      ServiceCallActivities: [
        ...ServiceCallActivities,
        ...transferStock,
        ...salesRelease,
      ],
    });
  } catch (error) {
    console.log(error)
    res.status(400).send(error);
  }
};

export default patchWarrantyService;
