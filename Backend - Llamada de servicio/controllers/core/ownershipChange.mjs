import { clienteAxios } from "../../utils/clienteAxios.mjs";

const ownershipChange = async (req, res) => {
  const cookies = req.header("Authorization");
  const {
    OldCustomerCode,
    InternalSerialNum,
    NewCustomerCode,
    NewCustomerName,
    ...rest
  } = req.body;
  try {
    const customerEquipmentExist = await clienteAxios.get(
      `/b1s/v1/CustomerEquipmentCards?$filter=CustomerCode eq '${OldCustomerCode}' and InternalSerialNum eq '${InternalSerialNum}'`,
      {
        headers: { Cookie: cookies },
      }
    );
    const { EquipmentCardNum } = customerEquipmentExist.data.value[0];
    await clienteAxios.patch(
      `/b1s/v1/CustomerEquipmentCards(${EquipmentCardNum})`,
      {
        CustomerCode: NewCustomerCode,
        CustomerName: NewCustomerName,
        ServiceBPType: "et_Sales",
        StatusOfSerialNumber: "sns_Active",
      },
      {
        headers: { Cookie: cookies },
      }
    );
    return res.send({ msg: "Tarjeta de equipo editada exitosamente" });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

export default ownershipChange;
