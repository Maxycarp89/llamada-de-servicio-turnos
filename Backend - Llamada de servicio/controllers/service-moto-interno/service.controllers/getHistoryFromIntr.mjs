import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getHistoryFromIntr = async (req, res) => {
  const cookies = req.header("Authorization");
  const { Chasis, Type } = req.query;
  try {
    const uriDecode = decodeURI(
      `$select=ServiceCallID,CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CallType,Priority,U_Faltante,U_Kit_Herramientas,U_Manchado,U_Rayado,U_Modelo,U_Rotura,U_Alarma,U_Casco,ServiceCallActivities,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode&$filter=U_Chasis eq '${Chasis}' and contains(ItemCode, 'M0')&$orderby=ServiceCallID desc`
    );
    const historyService = await clienteAxios(
      `/b1s/v1/ServiceCalls?${uriDecode}`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    return res.send(historyService.data.value);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default getHistoryFromIntr;
