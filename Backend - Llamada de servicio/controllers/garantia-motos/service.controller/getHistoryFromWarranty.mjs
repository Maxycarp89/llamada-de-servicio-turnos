import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getHistoryFromWarranty = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CustomerCode } = req.query;
  try {
    const uriDecode = decodeURI(
      `$select=ServiceCallID,CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CallType,Priority,U_Faltante,U_Kit_Herramientas,U_Manchado,U_Rayado,U_Modelo,U_Rotura,U_Alarma,U_Casco,ServiceCallActivities,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,City&$filter=CustomerCode eq '${CustomerCode}' and U_TipoOrigen eq 'M-GARANTIA'&$orderby=ServiceCallID desc`
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

export default getHistoryFromWarranty;
