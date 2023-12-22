import { clienteAxios } from "../../../utils/clienteAxios.mjs";

const searchCustomerToWarranty = async (req, res) => {
  const cookies = req.header("Authorization");
  const { DNI, Client, Chasis, Motor, Serie, ClientName, WhsCode } = req.query;
  let data = [];
  let uriDecode;
  if (DNI) {
    uriDecode = decodeURI(
      `LicTradNum eq '${DNI.toString().toUpperCase()}' and contains(ItemCode, 'M0')`
    );
  } else if (Client) {
    uriDecode = decodeURI(
      `CardCode eq '${Client.toString().toUpperCase()}' and contains(ItemCode, 'M0')`
    );
  } else if (Chasis) {
    uriDecode = decodeURI(
      `U_Chasis eq '${Chasis.toString().toUpperCase()}' and contains(ItemCode, 'M0')`
    );
  } else if (Motor) {
    uriDecode = decodeURI(
      `U_Motor eq '${Motor.toString().toUpperCase()}' and contains(ItemCode, 'M0')`
    );
  } else if (Serie) {
    uriDecode = decodeURI(
      `IntrSerial eq '${Serie.toString().toUpperCase()}' and contains(ItemCode, 'M0')`
    );
  } else if (ClientName) {
    uriDecode = decodeURI(
      `contains(CardName, '${ClientName.toString().toUpperCase()}') and contains(ItemCode, 'M0')`
    );
  }
  const resultClienteYProductos = await clienteAxios.get(
    `/b1s/v1/sml.svc/YUH_CLIENTEYPRODASOCIADOS2?$filter=${uriDecode}`,
    {
      headers: {
        Cookie: `${cookies}`,
        Prefer: "odata.maxpagesize=0",
      },
    }
  );
  data = [...resultClienteYProductos.data.value];
  if (!data.length) {
    let secondUriDecode;
    if (Chasis || Motor || Serie) {
      if (Chasis) {
        secondUriDecode = decodeURI(
          `contains(U_Chasis, '${Chasis.toUpperCase()}') and WhsCode eq '${WhsCode}'`
        );
      } else if (Motor) {
        secondUriDecode = decodeURI(
          `contains(U_Motor, '${Motor.toUpperCase()}') and WhsCode eq '${WhsCode}'`
        );
      } else if (Serie) {
        secondUriDecode = decodeURI(
          `contains(IntrSerial, '${Serie.toUpperCase()}') and WhsCode eq '${WhsCode}'`
        );
      }
      const resultMotorbike = await clienteAxios.get(
        `/b1s/v1/sml.svc/YUH_STOCKVEHICULO?$filter=${secondUriDecode}`,
        {
          headers: {
            Cookie: `${cookies}`,
            Prefer: "odata.maxpagesize=0",
          },
        }
      );
      if (!resultMotorbike.data.value.length) {
        res
          .status(400)
          .send({ msg: "No se encontraron ningún vehículo con esos datos" });
      } else {
        const resultCustomerYUHMAK = await clienteAxios.get(
          `/b1s/v1/BusinessPartners?$filter=CardCode eq 'P30623893096'&$select=CardName,CardCode,Address,MailAddress,Phone1`,
          {
            headers: {
              Cookie: `${cookies}`,
              Prefer: "odata.maxpagesize=0",
            },
          }
        );
        res.send(
          resultMotorbike.data.value.map((data) => ({
            CardCode: resultCustomerYUHMAK.data.value[0].CardCode,
            CardName: resultCustomerYUHMAK.data.value[0].CardName,
            Address: resultCustomerYUHMAK.data.value[0].Address,
            Cellular: resultCustomerYUHMAK.data.value[0].Phone1,
            E_Mail: null,
            ItemCode: data.ItemCode,
            Dscription: data.ItemName,
            IntrSerial: data.IntrSerial,
            U_Chasis: data.U_Chasis,
            U_Motor: data.U_Motor,
            U_Marca: data.ItemCode.slice(0, 6),
            U_Marca: data.ItemCode.slice(6),
            WhsCode: data.WhsCode,
          }))
        );
      }
    } else {
      res.status(400).send({
        msg: "No se encontraron vehiculos vendidos en YUHMAK asociados a ese cliente.",
      });
    }
  } else {
    return res.send(data);
  }
};

export default searchCustomerToWarranty;
