import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import { generateEquipmentCard } from "../../../utils/equipmentUtil.mjs";
import { generateMerchandiseRelease } from "../../../utils/generateMerchandiseRelease.mjs";
import { sendMail } from "../../../utils/mailer.mjs";

const postServiceCalls = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
    CustomerCode,
    CustomerName,
    Telephone,
    BPBillToAddress,
    BPeMail,
    U_Almacen,
    ItemCode,
    ItemDescription,
    U_Marca,
    U_Modelo,
    InternalSerialNum,
    U_Chasis,
    U_Motor,
    U_Kilometraje,
    City,
    U_Casco,
    U_Alarma,
    U_Rotura,
    U_Rayado,
    U_Manchado,
    U_Kit_Herramientas,
    U_Faltante,
    ServiceBPType,
    Subject,
    U_Patente,
    Description,
    Priority,
    Status,
    CallType,
    Origin,
    ProblemType,
    ProblemSubType,
    TechnicianCode,
    U_Nivel_Combustible,
    U_NombColor,
    U_TipoOrigen,
  } = req.body;
  if (InternalSerialNum !== null) {
    const checkExistPurchService = await clienteAxios.get(
      `/b1s/v1/ServiceCalls?$select=ServiceCallID,Status,CustomerCode,ServiceBPType&$filter=InternalSerialNum eq '${InternalSerialNum}' and ServiceBPType eq 'srvcPurchasing'&$orderby=ServiceCallID desc`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    if (checkExistPurchService.data.value.length > 0) {
      const existPurchasing = checkExistPurchService.data.value.filter(
        (check) => check.Status === -3 || check.Status === -2
      );
      if (existPurchasing.length > 0) {
        return res.send({
          msg: `Actualmente existe una llamada de servicio de tipo COMPRA ${
            existPurchasing[0].Status === -3 ? "abierta" : "pendiente"
          } con el ID ${
            existPurchasing[0].ServiceCallID
          } para esta moto. Cerrarla para proseguir con la creación de la misma`,
        });
      }
    }
    const checkExistSaleService = await clienteAxios.get(
      `/b1s/v1/CustomerEquipmentCards?$select=CustomerCode,ServiceBPType,InternalSerialNum&$filter=InternalSerialNum eq '${InternalSerialNum}' and ServiceBPType eq 'et_Sales'&$orderby=EquipmentCardNum desc`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    if (checkExistSaleService.length > 0) {
      if (CustomerCode !== checkExistSaleService.data.value[0].CustomerCode) {
        return res.send({
          msg: `Esta moto ya le pertenece al cliente ${checkExistSaleService.data.value[0].CustomerCode}. Realizar un cambio de titularidad en caso de que sea necesario.`,
        });
      }
    } else {
      await generateEquipmentCard({
        body: {
          CustomerCode,
          ItemCode,
          InternalSerialNum,
          cookies,
          ServiceBPType: "et_Sales",
        },
      });
    }
  }
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
        msg: "Ocurrió un problema al intentar generar la salida de mercancía.",
      });
    }
  }
  const { data } = await clienteAxios.post(
    "/b1s/v1/ServiceCalls",
    {
      CustomerCode,
      CustomerName,
      Telephone,
      BPBillToAddress,
      BPeMail,
      U_Almacen,
      ItemCode,
      ItemDescription,
      U_Marca,
      U_Modelo,
      InternalSerialNum,
      U_Chasis,
      U_Motor,
      U_Kilometraje,
      City,
      U_Casco,
      U_Alarma,
      U_Patente,
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
      U_Nivel_Combustible,
      U_NombColor,
      U_TipoOrigen,
      ServiceCallActivities: [...merchandise],
    },
    {
      headers: {
        Cookie: `${cookies}`,
      },
    }
  );
  await sendMail(data);
  return res.status(200).json({ data });
};

export default postServiceCalls;
