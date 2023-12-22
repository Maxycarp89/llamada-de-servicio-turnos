import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const getHistoryService = async (req, res) => {
  const cookies = req.header("Authorization");
  const { CustomerCode, Type, SpecialSearch } = req.query;
  let uriDecode;
  try {
    if (!SpecialSearch) {
      uriDecode = decodeURI(
        `$select=ServiceCallID,CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CreationDate,CallType,Priority,U_Faltante,U_Kit_Herramientas,U_Manchado,U_Rayado,U_Modelo,U_Rotura,U_Alarma,U_Casco,ServiceCallActivities,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode&$filter=CustomerCode eq '${CustomerCode}' and contains(ItemCode, 'M0')&$orderby=ServiceCallID desc`
      );
    } else {
      uriDecode = decodeURI(
        `$select=ServiceCallID,CustomerName,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CreationDate,CallType,Priority,U_Faltante,U_Kit_Herramientas,U_Manchado,U_Rayado,U_Modelo,U_Rotura,U_Alarma,U_Casco,ServiceCallActivities,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode&$filter=CustomerCode eq '${CustomerCode}' and contains(U_Chasis, '${SpecialSearch}')&$orderby=ServiceCallID desc`
      );
    }
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

export default getHistoryService;
