import { clienteAxios } from "./clienteAxios.mjs";

export const checkAlreadyPurchased = async (req) => {
  const { InternalSerialNum, cookies } = req.body;
  try {
    const { data } = await clienteAxios.get(
      `/b1s/v1/CustomerEquipmentCards?$select=StatusOfSerialNumber,EquipmentCardNum,ServiceBPType&$filter=InternalSerialNum eq '${InternalSerialNum}'`,
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    let checkCode;
    const checkedMaped = data.value.map((el) => ({
      StatusOfSerialNumber:
        el.StatusOfSerialNumber == "sns_Terminated"
          ? (checkCode = false)
          : (checkCode = true),
      EquipmentCard: el.EquipmentCardNum,
      ServiceBPType: el.ServiceBPType,
    }));
    if (checkedMaped.length === 0) {
      return (checkCode = "NoContent");
    } else {
      if (checkedMaped[0].ServiceBPType === "et_Purchasing") {
        if (!checkCode) {
          const solveBadRecord = await clienteAxios.patch(
            `/b1s/v1/CustomerEquipmentCards(${checkedMaped[0].EquipmentCard})`,
            { StatusOfSerialNumber: "sns_Active" },
            {
              headers: {
                Cookie: `${cookies}`,
              },
            }
          );
          if (
            solveBadRecord.status === 204 &&
            solveBadRecord.statusText === "No Content"
          ) {
            return (checkCode = "Tarjeta Reabierta");
          } else {
            return solveBadRecord;
          }
        } else {
          return (checkCode = "Tarjeta Abierta");
        }
      } else {
        return {
          checkCode: "Tipo Venta",
          EquipmentCard: checkedMaped[0].EquipmentCard,
        };
      }
    }
  } catch (error) {
    return error;
  }
};

export const generateEquipmentCard = async (req) => {
  const { CustomerCode, ItemCode, InternalSerialNum, ServiceBPType, cookies } =
    req.body;
  try {
    const resultCreateEquipamentCard = await clienteAxios.post(
      "/b1s/v1/CustomerEquipmentCards",
      {
        InternalSerialNum,
        CustomerCode,
        ItemCode,
        ServiceBPType,
      },
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    return resultCreateEquipamentCard;
  } catch (error) {
    return error;
  }
};

export const cancelActualEquipmentCardSales = async (req) => {
  const { InternalSerialNum, CustomerCode, cookies } = req.body;
  try {
    const { data } = await clienteAxios.get(
      "/b1s/v1/CustomerEquipmentCards?$select=CustomerCode,EquipmentCardNum,StatusOfSerialNumber&$filter=InternalSerialNum" +
        decodeURI(
          ` eq '${InternalSerialNum}' and CustomerCode eq '${CustomerCode}'`
        ),
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    const terminateEquipamentCard = await clienteAxios.patch(
      `/b1s/v1/CustomerEquipmentCards(${data.value[0].EquipmentCardNum})`,
      { StatusOfSerialNumber: "sns_Terminated" },
      {
        headers: {
          Cookie: `${cookies}`,
        },
      }
    );
    if (
      terminateEquipamentCard.status === 204 &&
      terminateEquipamentCard.statusText === "No Content"
    ) {
      return true;
    } else {
      return terminateEquipamentCard;
    }
  } catch (error) {
    return error;
  }
};

export default {
  checkAlreadyPurchased,
  generateEquipmentCard,
  cancelActualEquipmentCardSales,
};
