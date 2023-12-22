import { clienteAxios } from "../../../utils/clienteAxios.mjs";
import {
  cancelActualEquipmentCardSales,
  checkAlreadyPurchased,
  generateEquipmentCard,
} from "../../../utils/equipmentUtil.mjs";
import { sendMail, sendMailWarranty } from "../../../utils/mailer.mjs";

const postServiceWarranty = async (req, res) => {
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
    City,
    U_Casco,
    U_Alarma,
    U_Rotura,
    U_Rayado,
    U_Manchado,
    U_Kit_Herramientas,
    U_Nivel_Combustible,
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
    U_Kilometraje,
    U_TipoOrigen,
  } = req.body;
  if (ServiceBPType === "srvcSales") {
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
  } else {
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
      City,
      U_Casco,
      U_Alarma,
      U_Rotura,
      U_Rayado,
      U_Manchado,
      U_Kilometraje,
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
      U_TipoOrigen,
      U_EstadoGrtia: "ST"
    },
    {
      headers: {
        Cookie: `${cookies}`,
      },
    }
  );
  await sendMailWarranty("josematwm@gmail.com");
  await sendMailWarranty("garantiaspostventa@yuhmak.com.ar");
  await sendMailWarranty("garantiasservice@yuhmak.com.ar");
  await sendMailWarranty("postventagdc@yuhmak.com.ar");
  await sendMailWarranty("victordipaola@yuhmak.com.ar");
  return res.status(200).json({ data });
};

export default postServiceWarranty;
