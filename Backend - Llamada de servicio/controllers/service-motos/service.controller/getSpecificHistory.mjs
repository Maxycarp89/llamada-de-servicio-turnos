import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getSpecificHistoryService = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CustomerCode, Chasis, Type } = req.query;
  try {
    const uriDecode = decodeURI(
      `$select=ServiceCallID,CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,U_Nivel_Combustible,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CallType,Priority,U_Faltante,U_Kit_Herramientas,CreationDate,U_Manchado,U_Rayado,U_Modelo,U_Rotura,U_Alarma,U_Casco,ServiceCallActivities,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,ServiceBPType,CustomerCode,City&$filter=contains(U_Chasis, '${Chasis}')&$orderby=ServiceCallID desc`
    );
    const historyLastService = await clienteAxios(
      `/b1s/v1/ServiceCalls?${uriDecode}`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    res.send(historyLastService.data.value);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getSpecificHistoryService;
