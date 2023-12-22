import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getSpecificHistoryBike = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CustomerCode, ItemCode } = req.query;
  try {
    const uriDecode = decodeURI(
      `$select=ServiceCallID,CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CallType,Priority,U_Faltante,U_Manchado,U_Rayado,U_Rotura,ServiceCallActivities,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,U_Marca,U_Modelo&$filter=contains(U_Chasis, '${ItemCode}') and U_TipoOrigen eq 'BIKES'&$orderby=ServiceCallID desc`
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
}

export default getSpecificHistoryBike