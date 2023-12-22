import { clienteAxios } from "../../utils/clienteAxios.mjs";

const historyServiceInDashboard = async (req, res) => {
  const cookies = req.header("Authorization");
  const { frDate, ltDate, type, asigneeCode } = req.body;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/ServiceCalls?$select=ServiceCallID,CustomerName,CreationDate,Resolution,ItemCode,ItemDescription,Status,U_Motor,U_Chasis,U_Almacen,BPBillToAddress,Description,Subject,ServiceBPType,ClosingDate,TechnicianCode,ProblemSubType,ProblemType,Origin,CallType,Priority,U_Faltante,U_Kit_Herramientas,U_Manchado,U_Rayado,U_Modelo,U_Rotura,U_Alarma,U_Casco,U_Nivel_Combustible,ServiceCallActivities,U_Patente,U_Marca,BPeMail,Telephone,U_Kilometraje,InternalSerialNum,CustomerCode,City,U_PedidoRealizado,U_NumeroPedigoG,U_FechaPedidoG,U_CumplidoGrtia,U_NumTranferencia,U_FechaTransferencia,U_ObservaGrtia,U_UsuarioGrtia,UpdateDate,UpdatedTime,U_ArchivoAdj,U_EstadoGrtia&$filter=(CreationDate ge '${frDate}' and CreationDate le '${ltDate}') and U_TipoOrigen eq '${type}'&$orderby=UpdateDate desc`,
      {
        headers: {
          Cookie: `${cookies}`,
          Prefer: "odata.maxpagesize=0",
        },
      }
    );
    return res.send(data.value);
  } catch (error) {
    res.status(400).send(error);
  }
};

export default historyServiceInDashboard;
